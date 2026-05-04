import { Controller, Get, Param, Query } from '@nestjs/common';
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

  @Get('trends')
  listTrends(@Query('country') country?: string) {
    return this.contentService.listTrends(country);
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
