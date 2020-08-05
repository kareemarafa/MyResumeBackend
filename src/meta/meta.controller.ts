import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MetaService } from './meta.service';
import { Meta, MetaModel } from './meta.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('meta')
@ApiTags('Meta')
export class MetaController {
  constructor(private readonly service: MetaService) {
  }

  /**
   * Get All Items
   */
  @Get()
  @ApiOperation({ summary: 'Get all items' })
  async getAllFeatureItems(): Promise<Meta[]> {
    return await this.service.getAllItems();
  }

  /**
   * Get One Item
   * @param id Product ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get single item' })
  getFeatureItem(@Param('id') id: string): Promise<Meta> {
    return this.service.getOneItem(id);
  }

  /**
   * Insert One Item
   * @param key
   * @param value
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create feature item' })
  @ApiBody({ type: [MetaModel] })
  async addFeatureItem(
    @Body('key') key: string,
    @Body('value') value: string,
  ) {
    const submittedBody: MetaModel = {
      key,
      value
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
   * @param key
   * @param value
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update item' })
  @ApiBody({ type: [MetaModel] })
  async updateFeatureItem(
    @Param('id') id: string,
    @Body('key') key: string,
    @Body('value') value: string,
  ) {
    const submittedBody: MetaModel = {
      id,
      key,
      value
    };
    return await this.service.updateItem(submittedBody);
  }
}
