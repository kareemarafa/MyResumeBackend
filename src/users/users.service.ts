import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModel } from './users.interface';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly FeatureModel: Model<User>,
  ) {
  }

  /**
   * Insert One Item
   * @param item Add Item to database
   */
  async insertItem(item: UserModel) {
    const newItem = new this.FeatureModel(item);
    const result = await newItem.save();
    return result.id as string;
  }

  /**
   * Get All Items
   */
  getAllItems(): Promise<User[]> {
    // Mapping and reformat the response
    return this.FeatureModel.find({})
      .then(items => {
        return items;
      });
  }

  /**
   * Get One Item
   * @param id Item ID
   */
  async getOneItem(id: string) {
    return await this.findItemByID(id);
  }

  /**
   * Get One Item
   * @param username
   */
  async getOneItemByUsername(username: string) {
    return await this.FeatureModel.findOne({ username })
      .then(item => {
        return item;
      });
  }


  /**
   * Update One Item
   * @param item Body Data
   */
  async updateItem(item: UserModel) {
    const updatedFeatureItem = await this.findItemByID(item.id);
    for (const key of Object.keys(item)) {
      if (item[key]) {
        updatedFeatureItem[key] = item[key];
      }
    }
    updatedFeatureItem.save();
    return { message: 'FeatureItem Updated Successfully!', data: updatedFeatureItem };
  }

  /**
   * Delete One Item
   * @param id Item ID
   */
  async deleteItem(id: string) {
    const result = await this.FeatureModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find item!');
    } else {
      return { message: 'Item Deleted Successfully!' };
    }
  }

  /**
   * Looking for item in Database using Item ID
   * @param id
   */
  async findItemByID(id: string) {
    let featureItem;
    try {
      featureItem = await this.FeatureModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not found featureItem assigned to this ID');
    }
    if (!featureItem) {
      throw new NotFoundException('Could not found featureItem assigned to this ID');
    }
    return featureItem;
  }
}
