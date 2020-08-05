import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserModel } from './users.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly service: UsersService) {
  }

  /**
   * Get All Items
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all items' })
  async getAllFeatureItems(): Promise<User[]> {
    return await this.service.getAllItems();
  }

  /**
   * Get One Item
   * @param id Product ID
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get single item' })
  getFeatureItem(@Param('id') id: string): Promise<User> {
    return this.service.getOneItem(id);
  }

  /**
   * Insert One Item
   * @param role
   * @param username
   * @param firstname
   * @param lastname
   * @param password
   * @param email
   * @param phone
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create feature item' })
  @ApiBody({ type: [UserModel] })
  async addFeatureItem(
    @Body('role') role: string,
    @Body('username') username: string,
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
  ) {
    const submittedBody: UserModel = {
      role,
      username,
      firstname,
      lastname,
      password,
      email,
      phone,
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
   * @param role
   * @param username
   * @param firstname
   * @param lastname
   * @param password
   * @param email
   * @param phone
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update item' })
  @ApiBody({ type: [UserModel] })
  async updateFeatureItem(
    @Param('id') id: string,
    @Body('role') role: string,
    @Body('username') username: string,
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
  ) {
    const submittedBody: UserModel = {
      role,
      username,
      firstname,
      lastname,
      password,
      email,
      phone,
    };
    return await this.service.updateItem(submittedBody);
  }
}
