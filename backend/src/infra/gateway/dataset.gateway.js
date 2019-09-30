const mongoose = require('mongoose');

const { ObjectId } = mongoose.mongo
const searchQuery =(searchKey) => [
  { content: { $regex: searchKey, $options: 'i' } },
  { created_at: { $regex: searchKey, $options: 'i' } },
  { updated_at: { $regex: searchKey, $options: 'i' } },
]
const Query =(project_id,searchKey='')=> 
{ 
  return  { 
          $and:
            [
              {
                $or: searchQuery(searchKey)
              },
              {
                project_id,
              },
          ],  
    }
}

class DatasetGateway {
  constructor({ DocumentModel, documentMapper, database }) {
    this.DocumentModel = DocumentModel;
    this.documentMapper = documentMapper
    this.database = database
  }

  async findById(id) {
    const document = await this.DocumentModel.findOne({ _id: id })
    return this.documentMapper.toEntity(document)
  }


  async importData(project_id, dataset) {
    const dbItem= dataset.map(content=> { return {project_id : project_id ,content : content} })  
    const document = await this.DocumentModel.insertMany(dbItem)
    return document.map(this.documentMapper.toEntity)
  }


  async exportData(project_id) {
    const documents = await this.DocumentModel.aggregate([{ $match: { project_id: ObjectId(project_id)} },
      { $addFields: {
        labels: '$labels.content',
        history: '$history.content',
        },
      },
      {
        $lookup: {
            from : "users",
            localField: "user",
            foreignField: "_id",
            as: "userInfo"
        }
      },
      {
        $lookup: {
            from : "users",
            localField: "admin",
            foreignField: "_id",
            as: "adminInfo"
        }
      },
      
      {
        $unwind: {
          path: "$userInfo",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$adminInfo",
          preserveNullAndEmptyArrays: true
        }
      },
      { $project: { 
        content: true,
        _id: false,
        user: "$userInfo.username",
        admin:"$adminInfo.username",
        labels: {
          $reduce: {
            input: '$labels',
            initialValue: '',
            in: {
              $concat: [
                '$$value',
                {
                  $cond: {
                    if: { $eq: ['$$value', ''] },
                    then: ' ',
                    else: ', ',
                  },
                },
                '$$this',
              ],
            },
          },
        
        }, 
        history: {
          $reduce: {
            input: '$history',
            initialValue: '',
            in: {
              $concat: [
                '$$value',
                {
                  $cond: {
                    if: { $eq: ['$$value', ''] },
                    then: ' ',
                    else: ', ',
                  },
                },
                '$$this',
              ],
            },
          }
        },
        
        
      } }])
    return documents.map(this.documentMapper.toEntity)
  }

  async list(project_id, page, perPage, sortKey, trend,searchKey) { 
    const query = Query(project_id,searchKey)
    const size = await this.DocumentModel.count(query)
    let filter = { }
    if (sortKey == 'content') filter = { content: trend }
    else if (sortKey == 'status') filter = { status: trend }
    else if (sortKey == 'creared_at') filter = { created_at: trend }
    else filter = { updated_at: trend }
    const labeledDocs = await this.DocumentModel.count({ project_id,
      $nor: [
        { labels: { $exists: false } },
        { labels: { $size: 0 } },
      ] })
    const documents = await this.DocumentModel.find(query)
      .sort(filter)
      .skip((perPage * page) - perPage)
      .limit(perPage)
    return {
      size,
      labeled: labeledDocs,
      dataset: documents.map(this.documentMapper.toEntity),
    };
  }
  async getDocsByUserId(project_id,userId,maxDocs){
      const documents = await this.DocumentModel.aggregate([{
          $match : {
            project_id : ObjectId(project_id),
            user :userId
          }
        },
        {
          $sample : {
            size : maxDocs
          }
        }
      ]) 
      
      return  {  size : documents.length , dataset : documents.map(this.documentMapper.toEntity) } 
  }
  async getAll(project_id){
    const size = await this.DocumentModel.count({project_id})
    const labeledDocs = await this.DocumentModel.count({ project_id,
      $nor: [
        { labels: { $exists: false } },
        { labels: { $size: 0 } },
      ] })
    const documents = await this.DocumentModel.find({project_id})
    return  {
      size,
      labeled: labeledDocs,
      dataset: documents.map(this.documentMapper.toEntity),
    };
  }

  async getRandomRecord(project_id) {
    const size = await this.DocumentModel.count({ project_id })
    const labeledDocs = await this.DocumentModel.count({ project_id,
      $nor: [
        { labels: { $exists: false } },
        { labels: { $size: 0 } },
      ] })
    const documents = await this.DocumentModel.aggregate([{ $match: { project_id: ObjectId(project_id),
      'labels.0': { $exists: false } } },
    { $sample: { size: 1 } }])
    return {
      size,
      labeled: labeledDocs,
      dataset: documents.map(this.documentMapper.toEntity),
    }
  }

  async edit(entity) {
    const dbItem = this.documentMapper.toDatabase(entity)
    await this.DocumentModel.updateOne({ _id: entity.id }, dbItem);
    const updatedDoc = await this.findById(entity.id)
    return updatedDoc
  }


  async delete(entity) {
    const result = await this.DocumentModel.deleteOne({ _id: entity.id });
    // eslint-disable-next-line eqeqeq
    return result.deletedCount == 1;
  }


  async verify(entity) {
    const dbItem = this.documentMapper.toDatabase(entity)
    await this.DocumentModel.updateOne({ _id: entity.id }, dbItem)
    const updatedDoc = await this.findById(entity.id)
    return updatedDoc
  }


  async annotate(entity) {
    const dbItem = this.documentMapper.toDatabase(entity)
    await this.DocumentModel.updateOne({ _id: entity.id }, dbItem)
    const updatedDoc = await this.findById(entity.id)
    return updatedDoc;
  }
}

module.exports = DatasetGateway;
