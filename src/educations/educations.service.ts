import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Education, EducationModel } from './educations.interface';
import { Model } from 'mongoose';

@Injectable()
export class EducationsService {
  constructor(
    @InjectModel('Education') private readonly FeatureModel: Model<Education>,
  ) {
  }

  /**
   * Insert One Item
   * @param item Add Item to database
   */
  async insertItem(item: EducationModel) {
    const newItem = new this.FeatureModel(item);
    const result = await newItem.save();
    return result.id as string;
  }

  /**
   * Get All Items
   */
  getAllItems(): Promise<Education[]> {
    // Mapping and reformat the response
    return this.FeatureModel.find({})
      .populate('courseList')
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
   * Update One Item
   * @param item Body Data
   */
  async updateItem(item: EducationModel) {
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
