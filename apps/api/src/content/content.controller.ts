import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('health')
  getHealth() {
    return this.contentService.getHealth();
  }

  @Get('countries')
  listCountries() {
    return this.contentService.listCountries();
  }

  @Get('countries/:slug')
  getCountry(@Param('slug') slug: string) {
    return this.contentService.getCountry(slug);
  }

  @Get('countries/:slug/explainers/:explainerSlug')
  getExplainer(
    @Param('slug') slug: string,
    @Param('explainerSlug') explainerSlug: string,
  ) {
    return this.contentService.getExplainer(slug, explainerSlug);
  }

  @Get('editorial/countries/:slug/explainers')
  listEditorialExplainers(@Param('slug') slug: string) {
    return this.contentService.listEditorialExplainers(slug);
  }

  @Get('editorial/countries/:slug/attribution')
  getAttributionReport(@Param('slug') slug: string) {
    return this.contentService.getAttributionReport(slug);
  }

  @Post('ai/drafts/explainers')
  createExplainerDraft(
    @Body()
    body: {
      countrySlug?: string;
      question?: string;
      title?: string;
      category?: string;
      topicSlug?: string;
    },
  ) {
    return this.contentService.createExplainerDraft(body);
  }

  @Get('trends')
  listTrends(@Query('country') country?: string) {
    return this.contentService.listTrends(country);
  }

  @Post('trends/ingest/internal-search')
  ingestInternalSearchTrends(@Body() body: { countrySlug?: string }) {
    return this.contentService.ingestInternalSearchTrends(
      body.countrySlug ?? 'nigeria',
    );
  }

  @Post('users')
  upsertUser(@Body() body: { email?: string; name?: string }) {
    return this.contentService.upsertUser(body.email ?? '', body.name);
  }

  @Get('saved-items')
  listSavedItems(@Query('email') email = '') {
    return this.contentService.listSavedItems(email);
  }

  @Post('saved-items')
  saveExplainer(
    @Body()
    body: {
      email?: string;
      countrySlug?: string;
      explainerSlug?: string;
    },
  ) {
    return this.contentService.saveExplainer(body);
  }

  @Post('billing/checkout')
  createCheckoutSession(@Body() body: { email?: string }) {
    return this.contentService.createCheckoutSession(body.email);
  }

  @Get('search')
  search(
    @Query('q') query = '',
    @Query('country') country?: string,
    @Query('locale') locale?: string,
  ) {
    return this.contentService.search(query, country, locale);
  }
}
