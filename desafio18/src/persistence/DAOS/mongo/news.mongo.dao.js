import * as dotenv from "dotenv";

import { NewsModel } from "../../models/news.model.js";
import logger from "../../../logs/news.logs.js";
import mongoose from "mongoose";
dotenv.config();
export default class DaoMongo {
  static init() {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL, (err) => {
      if (err) {
        logger.fatal(err);
      } else {
        logger.info("Conectado a MongoDB!");
      }
    });
  }

  async getAllNews() {
    try {
      const response = await NewsModel.find({});
      return response;
    } catch (error) {
      logger.fatal(error);
    }
  }

  async getNew(id) {
    try {
      const response = await NewsModel.findById(id);
      return response;
    } catch (error) {
      logger.fatal(error);
    }
  }

  async createNew(obj) {
    try {
      const response = await NewsModel.create(obj);
      return response;
    } catch (error) {
      logger.fatal(error);
    }
  }

  async updateNew(id, body) {
    try {
      const response = await NewsModel.updateOne(id, body);
      return response;
    } catch (error) {
      logger.fatal(error);
    }
  }

  async deleteNew(id) {
    try {
      const response = await NewsModel.deleteOne(id);
      return response;
    } catch (error) {
      logger.fatal(error);
    }
  }
}
