import { PipelineStage } from "mongoose";
import {
  Document,
  Model,
  SaveOptions,
  ModifyResult,
  HydratedDocument,
  PopulateOptions,
} from "mongoose";

interface IQuery {
  query?: any;
  page?: number;
  limit?: number;
  sort?: any;
  select?: string;
  options?: any;
}

interface IPopulate {
  query?: any;
  populate: PopulateOptions | (string | PopulateOptions)[];
  sort?: any;
  select?: string;
  page: number;
  limit: number;
}

interface IUpdateAndPopulate {
  query?: any;
  populate: PopulateOptions | (string | PopulateOptions)[];
  select?: string;
  data: any;
  options?: any;
}

export class MongooseBaseService<IMongooseModel extends Document> {
  _mongooseModel: Model<IMongooseModel>;
  constructor(mongooseModel: Model<IMongooseModel>) {
    this._mongooseModel = mongooseModel;
  }

  async getAll(populate?: PopulateOptions | (string | PopulateOptions)[]): Promise<IMongooseModel[]> {
    return (await this._mongooseModel.find({}).populate(populate).lean()) as IMongooseModel[];
  }

  async getById(id: any, select?: string): Promise<IMongooseModel> {
    return (await this._mongooseModel.findById(id).select(select).lean()) as IMongooseModel;
  }

  async getOne(query: any): Promise<IMongooseModel> {
    return (await this._mongooseModel.findOne(query).lean()) as IMongooseModel;
  }

  async getByQuery({
    page = 0,
    limit = 10,
    select,
    sort,
    query,
  }: IQuery): Promise<{
    records: IMongooseModel[];
    metadata: {
      totalPage: number;
      totalRecord: number;
      currentPage: number;
      limit: number;
    };
  }> {
    const [docs, count] = await Promise.all([
      this._mongooseModel
        .find(query)
        .select(select)
        .sort(sort)
        .skip(page * limit)
        .limit(limit)
        .lean(),
      this._mongooseModel.find(query).countDocuments(),
    ]);

    return {
      records: docs as IMongooseModel[],
      metadata: {
        totalPage: Math.ceil(count / limit),
        totalRecord: count,
        currentPage: page,
        limit,
      },
    };
  }

  async getDistinct({
    distinct,
    query,
  }: {
    distinct: string;
    query: IQuery;
  }): Promise<any[]> {
    return await this._mongooseModel.distinct(distinct, query);
  }

  async create(data: any, options: SaveOptions = {}): Promise<IMongooseModel> {
    const model = new this._mongooseModel(data);
    return (await model.save(options)) as IMongooseModel;
  }

  async createOrUpdate(query: IQuery, data: any, options: any = {}) {
    return await this._mongooseModel.findOneAndUpdate(query, data, {
      new: true,
      upsert: true,
      ...options,
    });
  }

  async countByQuery(query: IQuery) {
    return await this._mongooseModel.find(query).countDocuments();
  }

  async updateOne(
    query: IQuery,
    data: any,
    options: any = {}
  ): Promise<ModifyResult<HydratedDocument<IMongooseModel, {}, {}>>> {
    return await this._mongooseModel.findOneAndUpdate(query, data, {
      new: true,
      ...options,
    });
  }

  async updateMany(query: any, data: any, options: any = {}): Promise<any> {
    return await this._mongooseModel.updateMany(query, data, {
      new: true,
      ...options,
    });
  }

  async updateById(
    id: any,
    data: any,
    options: any = {}
  ): Promise<ModifyResult<HydratedDocument<IMongooseModel, {}, {}>>> {
    return await this._mongooseModel.findByIdAndUpdate(id, data, {
      new: true,
      ...options,
    });
  }

  async deleteById(id: any, options = {}): Promise<any> {
    return await this._mongooseModel.findByIdAndDelete(id, options);
  }

  async deleteOne(query: any, options = {}): Promise<any> {
    return await this._mongooseModel.findOneAndDelete(query, options);
  }

  async deleteMany(query: any, options = {}): Promise<any> {
    const doc = await this._mongooseModel.deleteMany(query, options);
    return doc;
  }

  async insertMany(data: any[]) : Promise<any> {
    if (!data.length) return [];
    const docs = await this._mongooseModel.insertMany(data)
    return docs
  }

  async populate(iPopulate: IPopulate): Promise<{
    records: IMongooseModel[];
    metadata: {
      totalPage: number;
      totalRecord: number;
      currentPage: number;
      limit: number;
    };
  }> {
    const { query, sort, select, populate, page, limit } = iPopulate;
    const [docs, count] = await Promise.all([
      this._mongooseModel
        .find(query)
        .populate(populate)
        .select(select)
        .sort(sort)
        .skip(page * limit)
        .limit(limit)
        .exec(),
      this._mongooseModel.find(query).countDocuments(),
    ]);

    return {
      records: docs as IMongooseModel[],
      metadata: {
        totalPage: Math.ceil(count / limit),
        totalRecord: count,
        currentPage: page,
        limit,
      },
    };
  }

  async getOneAndPopulate(iPopulate: IPopulate): Promise<any> {
    const { query, sort, select, populate } = iPopulate;
    return await this._mongooseModel
      .findOne(query)
      .populate(populate)
      .select(select)
      .sort(sort)
      .exec();
  }

  async updateOneAndPopulate(
    iUpdateAndPopulate: IUpdateAndPopulate
  ): Promise<any> {
    const { query, data, populate, select, options = {} } = iUpdateAndPopulate;
    return await this._mongooseModel
      .findOneAndUpdate(query, data, {
        ...options,
        new: true,
      })
      .populate(populate)
      .select(select)
      .exec();
  }

  async aggregate(arg: PipelineStage[]) {
    return await this._mongooseModel.aggregate(arg);
  }
}
