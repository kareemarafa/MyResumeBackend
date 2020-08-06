import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { Testimonial, TestimonialModel } from './testimonials.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('testimonials')
@ApiTags('Testimonials')
export class TestimonialsController {
  constructor(private readonly service: TestimonialsService) {
  }

  /**
   * Get All Items
   */
  @Get()
  @ApiOperation({ summary: 'Get all items' })
  async getAllFeatureItems(): Promise<Testimonial[]> {
    return await this.service.getAllItems();
  }

  /**
   * Get One Item
   * @param id Product ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get single item' })
  getFeatureItem(@Param('id') id: string): Promise<Testimonial> {
    return this.service.getOneItem(id);
  }

  /**
   * Insert One Item
   * @param name
   * @param comment
   * @param photo
   * @param role
   * @param companyName
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create feature item' })
  @ApiBody({ type: [TestimonialModel] })
  async addFeatureItem(
    @Body('skillName') name: string,
    @Body('skillName') comment: string,
    @Body('skillName') photo: string,
    @Body('skillName') role: string,
    @Body('skillName') companyName: string,
  ) {
    const submittedBody: TestimonialModel = {
      name,
      comment,
      photo,
      role,
      companyName,
    };
    const generatedId = await this.service.insertItem(submittedBody);
    return { message: 'Item has been created successfully!', data: { id: generatedId, ...submittedBody } };
  }

  /**
   * Delete One Item
   * @param featureItemId featureItemId ID
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete item' })
  async deleteFeatureItem(@Param('id') featureItemId: string) {
    return await this.service.deleteItem(featureItemId);
  }


  /**
   * Update One Item
   * @param id
   * @param name
   * @param comment
   * @param photo
   * @param role
   * @param companyName
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update item' })
  @ApiBody({ type: [TestimonialModel] })
  async updateFeatureItem(
    @Param('id') id: string,
    @Body('skillName') name: string,
    @Body('skillName') comment: string,
    @Body('skillName') photo: string,
    @Body('skillName') role: string,
    @Body('skillName') companyName: string,
  ) {
    const submittedBody: TestimonialModel = {
      id,
      name,
      comment,
      photo,
      role,
      companyName,
    };
    return await this.service.updateItem(submittedBody);
  }
}
