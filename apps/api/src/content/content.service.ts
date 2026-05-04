import { Injectable, NotFoundException } from '@nestjs/common';
import { ExplainerCategory, Prisma } from '@prisma/client';
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

type DraftRequest = {
  countrySlug?: string;
  question?: string;
  title?: string;
  category?: string;
  topicSlug?: string;
};

type GeneratedDraft = {
  title: string;
  summary: string;
  body: string;
  category: ExplainerCategory;
  readingTime: number;
};

type DraftMode = 'deepseek' | 'openai' | 'local_fallback';

type DraftGeneration = GeneratedDraft & {
  mode: DraftMode;
};

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

  async createExplainerDraft(request: DraftRequest) {
    const countrySlug = request.countrySlug?.trim() || 'nigeria';
    const question = request.question?.trim() || request.title?.trim();

    if (!question) {
      throw new NotFoundException('Draft question is required');
    }

    const country = await this.prisma.country.findUnique({
      where: { slug: countrySlug },
    });

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    const topic =
      (request.topicSlug
        ? await this.prisma.topic.findUnique({
            where: {
              countryId_slug: {
                countryId: country.id,
                slug: request.topicSlug,
              },
            },
          })
        : null) ??
      (await this.prisma.topic.findUnique({
        where: {
          countryId_slug: {
            countryId: country.id,
            slug: 'current-curiosity',
          },
        },
      }));

    const generated = await this.generateDraft(question, country.name, request);
    const slug = slugify(generated.title);
    const existing = await this.prisma.explainer.findUnique({
      where: { countryId_slug: { countryId: country.id, slug } },
      include: { country: true, topic: true, images: true, sources: true },
    });

    if (existing?.status === 'PUBLISHED') {
      return {
        mode: 'existing_published',
        explainer: this.mapExplainer(existing),
      };
    }

    const explainer = await this.prisma.explainer.upsert({
      where: { countryId_slug: { countryId: country.id, slug } },
      update: {
        title: generated.title,
        summary: generated.summary,
        body: generated.body,
        category: generated.category,
        status: 'DRAFT',
        readingTime: generated.readingTime,
        topicId: topic?.id,
        publishedAt: null,
      },
      create: {
        slug,
        title: generated.title,
        summary: generated.summary,
        body: generated.body,
        category: generated.category,
        status: 'DRAFT',
        readingTime: generated.readingTime,
        countryId: country.id,
        topicId: topic?.id,
      },
      include: { country: true, topic: true, images: true, sources: true },
    });

    return {
      mode: generated.mode,
      explainer: this.mapExplainer(explainer),
      nextSteps: [
        'Attach source links',
        'Add image attribution if needed',
        'Move to IN_REVIEW before publishing',
      ],
    };
  }

  async getAttributionReport(countrySlug: string) {
    const country = await this.prisma.country.findUnique({
      where: { slug: countrySlug },
    });

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    const explainers = await this.prisma.explainer.findMany({
      where: { countryId: country.id },
      include: { country: true, topic: true, images: true, sources: true },
      orderBy: [{ status: 'desc' }, { title: 'asc' }],
    });

    return {
      country: this.mapCountry(country),
      counts: {
        total: explainers.length,
        missingSources: explainers.filter(
          (explainer) => explainer.sources.length === 0,
        ).length,
        missingImages: explainers.filter(
          (explainer) => explainer.images.length === 0,
        ).length,
        missingImageCredits: explainers.filter((explainer) =>
          explainer.images.some((image) => !image.credit || !image.sourceUrl),
        ).length,
      },
      explainers: explainers.map((explainer) => ({
        ...this.mapExplainer(explainer),
        attribution: {
          hasSources: explainer.sources.length > 0,
          hasImages: explainer.images.length > 0,
          imagesHaveCredits: explainer.images.every(
            (image) => image.credit && image.sourceUrl,
          ),
        },
      })),
    };
  }

  async ingestInternalSearchTrends(countrySlug: string) {
    const country = await this.prisma.country.findUnique({
      where: { slug: countrySlug },
    });

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    const logs = await this.prisma.searchLog.findMany({
      where: { country: country.slug },
      orderBy: { createdAt: 'desc' },
      take: 500,
    });
    const counts = new Map<string, number>();

    for (const log of logs) {
      const query = log.query.trim().toLowerCase();

      if (query.length >= 3) {
        counts.set(query, (counts.get(query) ?? 0) + 1);
      }
    }

    const trends = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([query, count]) => ({
        query,
        score: Math.min(100, count * 20),
        source: 'INTERNAL_SEARCH' as const,
        region: 'internal',
        countryId: country.id,
      }));

    await this.prisma.trend.deleteMany({
      where: { countryId: country.id, source: 'INTERNAL_SEARCH' },
    });

    if (trends.length > 0) {
      await this.prisma.trend.createMany({ data: trends });
    }

    return {
      country: this.mapCountry(country),
      ingested: trends.length,
      trends,
    };
  }

  async upsertUser(email: string, name?: string) {
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail) {
      throw new NotFoundException('Email is required');
    }

    const user = await this.prisma.user.upsert({
      where: { email: normalizedEmail },
      update: { name: name?.trim() || undefined },
      create: { email: normalizedEmail, name: name?.trim() || undefined },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async listSavedItems(email: string) {
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail) {
      return { user: null, savedItems: [] };
    }

    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        savedItems: {
          orderBy: { createdAt: 'desc' },
          include: {
            explainer: {
              include: {
                country: true,
                topic: true,
                images: true,
                sources: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return { user: null, savedItems: [] };
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      savedItems: user.savedItems.map((item) => ({
        id: item.id,
        createdAt: item.createdAt.toISOString(),
        explainer: this.mapExplainer(item.explainer),
      })),
    };
  }

  async saveExplainer(request: {
    email?: string;
    countrySlug?: string;
    explainerSlug?: string;
  }) {
    const normalizedEmail = normalizeEmail(request.email ?? '');
    const countrySlug = request.countrySlug?.trim() || 'nigeria';
    const explainerSlug = request.explainerSlug?.trim();

    if (!normalizedEmail || !explainerSlug) {
      throw new NotFoundException('Email and explainer slug are required');
    }

    const user = await this.prisma.user.upsert({
      where: { email: normalizedEmail },
      update: {},
      create: { email: normalizedEmail },
    });
    const explainer = await this.prisma.explainer.findFirst({
      where: {
        slug: explainerSlug,
        status: 'PUBLISHED',
        country: { slug: countrySlug },
      },
    });

    if (!explainer) {
      throw new NotFoundException('Published explainer not found');
    }

    const savedItem = await this.prisma.savedItem.upsert({
      where: {
        userId_explainerId: {
          userId: user.id,
          explainerId: explainer.id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        explainerId: explainer.id,
      },
      include: {
        explainer: {
          include: { country: true, topic: true, images: true, sources: true },
        },
      },
    });

    return {
      id: savedItem.id,
      createdAt: savedItem.createdAt.toISOString(),
      explainer: this.mapExplainer(savedItem.explainer),
    };
  }

  async createCheckoutSession(email?: string) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PRICE_ID;
    const appUrl = process.env.APP_URL ?? 'http://localhost:3000';

    if (!secretKey || !priceId) {
      return {
        setupRequired: true,
        missing: [
          !secretKey ? 'STRIPE_SECRET_KEY' : null,
          !priceId ? 'STRIPE_PRICE_ID' : null,
        ].filter(Boolean),
      };
    }

    const body = new URLSearchParams({
      mode: 'subscription',
      success_url: `${appUrl}/pro?checkout=success`,
      cancel_url: `${appUrl}/pro?checkout=cancelled`,
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
    });
    const normalizedEmail = normalizeEmail(email ?? '');

    if (normalizedEmail) {
      body.set('customer_email', normalizedEmail);
    }

    const response = await fetch(
      'https://api.stripe.com/v1/checkout/sessions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      },
    );

    if (!response.ok) {
      return {
        setupRequired: true,
        missing: ['Valid Stripe Checkout configuration'],
      };
    }

    const session = (await response.json()) as { id: string; url: string };

    return {
      setupRequired: false,
      id: session.id,
      url: session.url,
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

    if (countrySlug && !country) {
      return {
        query: normalizedQuery,
        countries: [],
        explainers: [],
      };
    }

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

  private async generateDraft(
    question: string,
    countryName: string,
    request: DraftRequest,
  ): Promise<DraftGeneration> {
    const preferredProvider = process.env.AI_PROVIDER?.trim().toLowerCase();

    if (preferredProvider === 'openai' && process.env.OPENAI_API_KEY) {
      return this.generateOpenAiDraft(question, countryName, request);
    }

    if (process.env.DEEPSEEK_API_KEY && preferredProvider !== 'openai') {
      return this.generateDeepSeekDraft(question, countryName, request);
    }

    if (process.env.OPENAI_API_KEY) {
      return this.generateOpenAiDraft(question, countryName, request);
    }

    return this.generateLocalDraftGeneration(question, request);
  }

  private async generateDeepSeekDraft(
    question: string,
    countryName: string,
    request: DraftRequest,
  ): Promise<DraftGeneration> {
    const baseUrl = (
      process.env.DEEPSEEK_BASE_URL ?? 'https://api.deepseek.com'
    ).replace(/\/+$/, '');

    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.DEEPSEEK_MODEL ?? 'deepseek-v4-flash',
          messages: [
            {
              role: 'system',
              content:
                'You write LoreSabi explainer drafts. Return only valid JSON with title, summary, body, category, and readingTime. Keep it plain, sourced-sounding, cautious, and mark no unsourced claim as final. For current affairs, do not pretend to have live news access. Write a source-review brief that explains what must be verified before publication.',
            },
            {
              role: 'user',
              content: buildDraftPrompt(question, countryName),
            },
          ],
          response_format: { type: 'json_object' },
          thinking: { type: 'disabled' },
          stream: false,
        }),
      });

      if (!response.ok) {
        return this.generateLocalDraftGeneration(question, request);
      }

      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string | null } }>;
      };
      const parsed = parseDraftJson(data.choices?.[0]?.message?.content);

      return {
        ...buildGeneratedDraft(parsed, question, request),
        mode: 'deepseek',
      };
    } catch {
      return this.generateLocalDraftGeneration(question, request);
    }
  }

  private async generateOpenAiDraft(
    question: string,
    countryName: string,
    request: DraftRequest,
  ): Promise<DraftGeneration> {
    try {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.AI_MAIN_MODEL ?? 'gpt-5-mini',
          instructions:
            'You write LoreSabi explainer drafts. Return only valid JSON with title, summary, body, category, and readingTime. Keep it plain, sourced-sounding, cautious, and mark no unsourced claim as final. For current affairs, do not pretend to have live news access. Write a source-review brief that explains what must be verified before publication.',
          input: buildDraftPrompt(question, countryName),
        }),
      });

      if (!response.ok) {
        return this.generateLocalDraftGeneration(question, request);
      }

      const data = (await response.json()) as { output_text?: string };
      const parsed = parseDraftJson(data.output_text);

      return {
        ...buildGeneratedDraft(parsed, question, request),
        mode: 'openai',
      };
    } catch {
      return this.generateLocalDraftGeneration(question, request);
    }
  }

  private generateLocalDraftGeneration(
    question: string,
    request: DraftRequest,
  ): DraftGeneration {
    return {
      ...this.generateLocalDraft(question, request),
      mode: 'local_fallback',
    };
  }

  private generateLocalDraft(
    question: string,
    request: DraftRequest,
  ): GeneratedDraft {
    const title = normalizeTitle(request.title || question);

    return {
      title,
      summary: `${title} is ready to be turned into a LoreSabi explainer. This draft is a structured starting point and still needs source review.`,
      body: [
        `Draft brief: answer "${question}" in plain English.`,
        'Start with the direct answer, then explain why the question matters for identity, history, culture, or current public conversation.',
        'Before publishing, attach credible sources, add image attribution where useful, and check the wording for sensitive claims.',
      ].join('\n\n'),
      category: normalizeCategory(request.category),
      readingTime: 3,
    };
  }
}

function normalizeTitle(value: string) {
  const trimmed = value.trim().replace(/\s+/g, ' ');
  return trimmed.endsWith('?') ? trimmed : `${trimmed}?`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function normalizeCategory(value?: string) {
  const normalized = value
    ?.trim()
    .toUpperCase()
    .replace(/[\s-]+/g, '_');

  if (
    normalized &&
    Object.values(ExplainerCategory).includes(normalized as ExplainerCategory)
  ) {
    return normalized as ExplainerCategory;
  }

  return ExplainerCategory.HISTORY;
}

function parseDraftJson(value?: string | null) {
  if (!value) {
    return {};
  }

  const trimmed = value
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/i, '')
    .trim();
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');

  if (start === -1 || end === -1 || end <= start) {
    return {};
  }

  try {
    return JSON.parse(trimmed.slice(start, end + 1)) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function buildGeneratedDraft(
  parsed: Record<string, unknown>,
  question: string,
  request: DraftRequest,
): GeneratedDraft {
  const title = stringValue(parsed.title) || normalizeTitle(question);
  const readingTime = Number(parsed.readingTime);

  return {
    title,
    summary:
      stringValue(parsed.summary) ||
      `${title} needs a clear short answer and source review.`,
    body:
      stringValue(parsed.body) ||
      `Draft brief: answer "${question}" in plain English, then add source-backed context before publication.`,
    category: normalizeCategory(
      stringValue(parsed.category) ||
        request.category ||
        inferCategory(question),
    ),
    readingTime:
      Number.isFinite(readingTime) && readingTime > 0 ? readingTime : 3,
  };
}

function stringValue(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function buildDraftPrompt(question: string, countryName: string) {
  const today = new Date().toISOString().slice(0, 10);

  return [
    `Current date: ${today}`,
    `Country: ${countryName}`,
    `Question: ${question}`,
    `Allowed categories: ${Object.values(ExplainerCategory).join(', ')}`,
    'If this is about current affairs, make the draft clearly review-only and avoid stale year-specific claims unless the question asks for that year.',
    'Include source-checking notes inside the body when facts need live verification.',
  ].join('\n');
}

function inferCategory(question: string) {
  const normalized = question.toLowerCase();

  if (
    /\b(current|news|election|politics|president|government|war|conflict|protest)\b/.test(
      normalized,
    )
  ) {
    return ExplainerCategory.CURRENT_AFFAIRS;
  }

  return undefined;
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}
