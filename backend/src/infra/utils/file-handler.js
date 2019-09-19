module.exports = class FileHandler {
  extract(contents, fileType) {
    let arr = []
    if (fileType === 'json') {
      try {
        arr = contents
        arr = arr.map((document) => document = document.text)
      } catch (e) {
        return false
      }
    } else {
      arr = contents.toString().split('\n')
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i] === '\r') {
          arr.splice(i, 1);
        }
      }
    }
    return arr
  }
}
