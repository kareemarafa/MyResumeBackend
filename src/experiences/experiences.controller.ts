import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { Experience, ExperienceModel } from './expoeriences.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly service: ExperiencesService) {
  }

  /**
   * Get All Items
   */
  @Get()
  async getAllFeatureItems(): Promise<Experience[]> {
    return await this.service.getAllItems();
  }

  /**
   * Get One Item
   * @param id Product ID
   */
  @Get(':id')
  getFeatureItem(@Param('id') id: string): Promise<Experience> {
    return this.service.getOneItem(id);
  }

  /**
   * Insert One Item
   * @param role
   * @param roleDescription
   * @param companyName
   * @param companyWebsite
   * @param startDate
   * @param endDate
   * @param current
   * @param companyLocation
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async addFeatureItem(
    @Body('role') role: string,
    @Body('role_description') roleDescription: string[],
    @Body('company_name') companyName: string,
    @Body('company_website') companyWebsite: string,
    @Body('start_date') startDate: string,
    @Body('end_date') endDate: string,
    @Body('current') current: boolean,
    @Body('company_location') companyLocation: string,
  ) {
    const submittedBody: ExperienceModel = {
      role,
      roleDescription,
      companyName,
      companyWebsite,
      startDate,
      endDate,
      current,
      companyLocation,
    };
    const generatedId = await this.service.insertItem(submittedBody);
    return { message: 'Item created successfully!', data: { id: generatedId, ...submittedBody } };
  }

  /**
   * Delete One Item
   * @param featureItemId featureItemId ID
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteFeatureItem(@Param('id') featureItemId: string) {
    return await this.service.deleteItem(featureItemId);
  }


  /**
   * Update One Item
   * @param id
   * @param role
   * @param roleDescription
   * @param companyName
   * @param companyWebsite
   * @param startDate
   * @param endDate
   * @param current
   * @param companyLocation
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateFeatureItem(
    @Param('id') id: string,
    @Body('role') role: string,
    @Body('role_description') roleDescription: string[],
    @Body('company_name') companyName: string,
    @Body('company_website') companyWebsite: string,
    @Body('start_date') startDate: string,
    @Body('end_date') endDate: string,
    @Body('current') current: boolean,
    @Body('company_location') companyLocation: string,
  ) {
    const submittedBody: ExperienceModel = {
      id,
      role,
      roleDescription,
      companyName,
      companyWebsite,
      startDate,
      endDate,
      current,
      companyLocation,
    };
    return await this.service.updateItem(submittedBody);
  }
}
