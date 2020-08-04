import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course, CourseModel } from './courses.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('courses')
@ApiTags('Courses')
export class CoursesController {
  constructor(private readonly service: CoursesService) {
  }

  /**
   * Get All Items
   */
  @Get()
  @ApiOperation({ summary: 'Get all items' })
  async getAllFeatureItems(): Promise<Course[]> {
    return await this.service.getAllItems();
  }

  /**
   * Get One Item
   * @param id Product ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get single item' })
  getFeatureItem(@Param('id') id: string): Promise<Course> {
    return this.service.getOneItem(id);
  }

  /**
   * Insert One Item
   * @param title
   * @param author
   * @param certificateLink
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create feature item' })
  @ApiBody({ type: [CourseModel] })
  async addFeatureItem(
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('certificateLink') certificateLink: string,
  ) {
    const submittedBody: CourseModel = {
      title,
      author,
      certificateLink,
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
   * @param author
   * @param certificateLink
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update item' })
  @ApiBody({ type: [CourseModel] })
  async updateFeatureItem(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('dueDate') author: string,
    @Body('description') certificateLink: string,
  ) {
    const submittedBody: CourseModel = {
      id,
      title,
      author,
      certificateLink,
    };
    return await this.service.updateItem(submittedBody);
  }
}
