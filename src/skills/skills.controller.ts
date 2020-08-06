import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { Skill, SkillModel } from './skills.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('skills')
@ApiTags('Skills')
export class SkillsController {
  constructor(private readonly service: SkillsService) {
  }

  /**
   * Get All Items
   */
  @Get()
  @ApiOperation({ summary: 'Get all items' })
  async getAllFeatureItems(): Promise<Skill[]> {
    return await this.service.getAllItems();
  }

  /**
   * Get One Item
   * @param id Product ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get single item' })
  getFeatureItem(@Param('id') id: string): Promise<Skill> {
    return this.service.getOneItem(id);
  }

  /**
   * Insert One Item
   * @param skillName
   * @param progress
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create feature item' })
  @ApiBody({ type: [SkillModel] })
  async addFeatureItem(
    @Body('skillName') skillName: string,
    @Body('progress') progress: number,
  ) {
    const submittedBody: SkillModel = {
      skillName,
      progress
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
   * @param skillName
   * @param progress
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update item' })
  @ApiBody({ type: [SkillModel] })
  async updateFeatureItem(
    @Param('id') id: string,
    @Body('skillName') skillName: string,
    @Body('progress') progress: number,
  ) {
    const submittedBody: SkillModel = {
      id,
      skillName,
      progress
    };
    return await this.service.updateItem(submittedBody);
  }
}
