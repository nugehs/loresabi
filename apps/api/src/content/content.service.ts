import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

type CountryWithRelations = Prisma.CountryGetPayload<{
  include: {
    topics: { orderBy: { title: 'asc' } };
    explainers: {
      orderBy: { publishedAt: 'desc' };
      include: { country: true; topic: true; images: true; sources: true };
    };
    images: true;
    trends: { orderBy: { capturedAt: 'desc' }; take: 10 };
  };
}>;

type ExplainerWithRelations = Prisma.ExplainerGetPayload<{
  include: { country: true; topic: true; images: true; sources: true };
}>;

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  getHealth() {
    return {
      name: 'LoreSabi API',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  async listCountries() {
    const countries = await this.prisma.country.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { explainers: true, trends: true } },
      },
    });

    return countries.map((country) => ({
      ...this.mapCountry(country),
      explainerCount: country._count.explainers,
      trendCount: country._count.trends,
    }));
  }

  async getCountry(slug: string) {
    const country = await this.prisma.country.findUnique({
      where: { slug },
      include: {
        topics: { orderBy: { title: 'asc' } },
        explainers: {
          where: { status: 'PUBLISHED' },
          orderBy: { publishedAt: 'desc' },
          include: { country: true, topic: true, images: true, sources: true },
        },
        images: true,
        trends: { orderBy: { capturedAt: 'desc' }, take: 10 },
      },
    });

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return this.mapCountryDetail(country);
  }

  async getExplainer(countrySlug: string, explainerSlug: string) {
    const explainer = await this.prisma.explainer.findFirst({
      where: {
        slug: explainerSlug,
        status: 'PUBLISHED',
        country: { slug: countrySlug },
      },
      include: { country: true, topic: true, images: true, sources: true },
    });

    if (!explainer) {
      throw new NotFoundException('Explainer not found');
    }

    return this.mapExplainer(explainer);
  }

  async listEditorialExplainers(countrySlug: string) {
    const country = await this.prisma.country.findUnique({
      where: { slug: countrySlug },
    });

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    const explainers = await this.prisma.explainer.findMany({
      where: { countryId: country.id },
      include: { country: true, topic: true, images: true, sources: true },
      orderBy: [{ status: 'desc' }, { updatedAt: 'desc' }],
    });

    return {
      country: this.mapCountry(country),
      counts: {
        total: explainers.length,
        published: explainers.filter(
          (explainer) => explainer.status === 'PUBLISHED',
        ).length,
        draft: explainers.filter((explainer) => explainer.status === 'DRAFT')
          .length,
        inReview: explainers.filter(
          (explainer) => explainer.status === 'IN_REVIEW',
        ).length,
      },
      explainers: explainers.map((explainer) => this.mapExplainer(explainer)),
    };
  }

  async listTrends(countrySlug?: string) {
    const trends = await this.prisma.trend.findMany({
      where: countrySlug ? { country: { slug: countrySlug } } : undefined,
      orderBy: [{ capturedAt: 'desc' }, { score: 'desc' }],
      take: 25,
      include: { country: true },
    });

    return trends.map((trend) => ({
      id: trend.id,
      query: trend.query,
      source: trend.source,
      score: trend.score,
      region: trend.region,
      country: trend.country ? this.mapCountry(trend.country) : null,
      capturedAt: trend.capturedAt.toISOString(),
    }));
  }

  async search(query: string, countrySlug?: string, locale?: string) {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return { query: normalizedQuery, countries: [], explainers: [] };
    }

    const country = countrySlug
      ? await this.prisma.country.findUnique({ where: { slug: countrySlug } })
      : null;

    await this.prisma.searchLog.create({
      data: {
        query: normalizedQuery,
        locale,
        country: country?.slug ?? countrySlug,
      },
    });

    const [countries, explainers] = await Promise.all([
      this.prisma.country.findMany({
        where: {
          OR: [
            { name: { contains: normalizedQuery, mode: 'insensitive' } },
            {
              officialName: { contains: normalizedQuery, mode: 'insensitive' },
            },
            { demonym: { contains: normalizedQuery, mode: 'insensitive' } },
          ],
        },
        take: 8,
        orderBy: { name: 'asc' },
      }),
      this.prisma.explainer.findMany({
        where: {
          status: 'PUBLISHED',
          countryId: country?.id,
          OR: [
            { title: { contains: normalizedQuery, mode: 'insensitive' } },
            { summary: { contains: normalizedQuery, mode: 'insensitive' } },
            { body: { contains: normalizedQuery, mode: 'insensitive' } },
          ],
        },
        include: { country: true, topic: true, images: true, sources: true },
        take: 10,
        orderBy: { publishedAt: 'desc' },
      }),
    ]);

    return {
      query: normalizedQuery,
      countries: countries.map((result) => this.mapCountry(result)),
      explainers: explainers.map((result) => this.mapExplainer(result)),
    };
  }

  private mapCountry(country: Prisma.CountryGetPayload<object>) {
    return {
      id: country.id,
      slug: country.slug,
      name: country.name,
      officialName: country.officialName,
      iso2: country.iso2,
      iso3: country.iso3,
      region: country.region,
      subregion: country.subregion,
      capital: country.capital,
      demonym: country.demonym,
      population: country.population?.toString() ?? null,
      latitude: country.latitude?.toString() ?? null,
      longitude: country.longitude?.toString() ?? null,
    };
  }

  private mapCountryDetail(country: CountryWithRelations) {
    return {
      ...this.mapCountry(country),
      topics: country.topics.map((topic) => ({
        id: topic.id,
        slug: topic.slug,
        title: topic.title,
        description: topic.description,
      })),
      explainers: country.explainers.map((explainer) =>
        this.mapExplainer(explainer),
      ),
      images: country.images.map((image) => this.mapImage(image)),
      trends: country.trends.map((trend) => ({
        id: trend.id,
        query: trend.query,
        source: trend.source,
        score: trend.score,
        region: trend.region,
        capturedAt: trend.capturedAt.toISOString(),
      })),
    };
  }

  private mapExplainer(explainer: ExplainerWithRelations) {
    return {
      id: explainer.id,
      slug: explainer.slug,
      title: explainer.title,
      summary: explainer.summary,
      body: explainer.body,
      category: explainer.category,
      status: explainer.status,
      readingTime: explainer.readingTime,
      publishedAt: explainer.publishedAt?.toISOString() ?? null,
      country: this.mapCountry(explainer.country),
      topic: explainer.topic
        ? {
            id: explainer.topic.id,
            slug: explainer.topic.slug,
            title: explainer.topic.title,
            description: explainer.topic.description,
          }
        : null,
      images: explainer.images.map((image) => this.mapImage(image)),
      sources: explainer.sources.map((source) => ({
        id: source.id,
        title: source.title,
        url: source.url,
        publisher: source.publisher,
        type: source.type,
        accessedAt: source.accessedAt?.toISOString() ?? null,
      })),
    };
  }

  private mapImage(image: Prisma.ImageGetPayload<object>) {
    return {
      id: image.id,
      url: image.url,
      alt: image.alt,
      credit: image.credit,
      sourceUrl: image.sourceUrl,
    };
  }
}
