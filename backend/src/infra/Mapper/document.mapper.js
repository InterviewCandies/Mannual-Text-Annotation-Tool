const Document = require('../../domain/Document')

module.exports = class DocumentMapper {
  toEntity(data) {
    const { _id, projectId, content, status, user, admin, created_at, updated_at } = data
    let { labels } = data
    let { history } = data
    labels = labels || []
    history = history || []
    return new Document(_id, projectId, content, status, history, labels,user,admin, created_at, updated_at);
  }

  toDatabase(entity) {
    const { content, labels, status, history, user, admin } = entity
    const document = {
      content,
      history,
      labels,
      status,
      user,
      admin,
      updated_at: new Date().toLocaleString(),
    }
    return document
  }
}
