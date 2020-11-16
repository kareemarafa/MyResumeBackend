import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Experience, ExperienceModel } from './expoeriences.interface';
import { PaginateModel } from 'mongoose';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectModel('Experience') private readonly FeatureModel: PaginateModel<Experience>,
  ) {
  }

  /**
   * Insert One Item
   * @param item Add Item to database
   */
  async insertItem(item: ExperienceModel) {
    const newItem = new this.FeatureModel(item);
    const result = await newItem.save();
    return result.id as string;
  }

  /**
   * Get All Items
   */
  getAllItems(): Promise<Experience[]> {
    // Mapping and reformat the response
    return this.FeatureModel.find({})
      .then(items => {
        return items;
      });
  }


  /**
   * Find all messages in a channel
   *
   * @param {number} [page=1]
   * @param {number} [limit=10]
   * @returns
   */
  async getAllItemWithPagination(page = 1, limit = 10) {
    const options = {
      populate: [
        // Your foreign key fields to populate
      ],
      page: Number(page),
      limit: Number(limit),
    };
    // Get the data from database
    return await this.FeatureModel.paginate(null, options);
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
  async updateItem(item: ExperienceModel) {
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
      throw new NotFoundException('Could not found featureItem assigned to this ID');
    } else {
      return {
        statusCode: 200,
        message: 'Item Deleted',
      };
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
