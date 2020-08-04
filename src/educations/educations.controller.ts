import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { Education, EducationModel } from './educations.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('educations')
@ApiTags('Educations')
export class EducationsController {
  constructor(private readonly service: EducationsService) {
  }

  /**
   * Get All Items
   */
  @Get()
  @ApiOperation({ summary: 'Get all items' })
  async getAllFeatureItems(): Promise<Education[]> {
    return await this.service.getAllItems();
  }

  /**
   * Get One Item
   * @param id Product ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get single item' })
  getFeatureItem(@Param('id') id: string): Promise<Education> {
    return this.service.getOneItem(id);
  }

  /**
   * Insert One Item
   * @param title
   * @param dueDate
   * @param description
   * @param courseList
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create feature item' })
  @ApiBody({ type: [EducationModel] })
  async addFeatureItem(
    @Body('title') title: string,
    @Body('dueDate') dueDate: string,
    @Body('description') description: string,
    @Body('courseList') courseList: string[]
  ) {
    const submittedBody: EducationModel = {
      title,
      dueDate,
      description,
      courseList
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
   * @param title
   * @param dueDate
   * @param description
   * @param courseList
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update item' })
  @ApiBody({ type: [EducationModel] })
  async updateFeatureItem(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('dueDate') dueDate: string,
    @Body('description') description: string,
    @Body('courseList') courseList: string[]
  ) {
    const submittedBody: EducationModel = {
      id,
      title,
      dueDate,
      description,
      courseList
    };
    return await this.service.updateItem(submittedBody);
  }
}
