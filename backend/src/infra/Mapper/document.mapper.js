const Document = require('../../domain/Document')

module.exports = class DocumentMapper {
  toEntity(data) {
    const { _id, projectId, content, status,user, created_at, updated_at } = data
    let { labels } = data
    labels = labels || []
    return new Document(_id, projectId, content, status, labels,user, created_at, updated_at);
  }

  toDatabase(entity) {
    const { content, labels, status,user } = entity
    const document = {
      content,
      labels,
      status,
      user,
      updated_at: new Date().toLocaleString(),
    }
    return document
  }
}
