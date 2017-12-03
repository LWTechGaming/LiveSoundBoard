function get (identifier, type) {
  switch (type) {
    case 'id':
      return document.getElementById(identifier)
    case 'name':
      return document.getElementsByName(identifier)
    case 'class':
      return document.getElementsByClassName(identifier)
    case 'tag':
      return document.getElementsByTagName(identifier)
    default:
      return document.getElementById(identifier)
  }
}

function remove (idToRemove, elementToRemove, type) {
  switch (type) {
    case 'id':
      document.getElementById(idToRemove).parentNode.removeChild(elementToRemove)
      break
    case 'name':
      document.getElementsByName(idToRemove).parentNode.removeChild(elementToRemove)
      break
    case 'class':
      document.getElementsByClassName(idToRemove).parentNode.removeChild(elementToRemove)
      break
    case 'tag':
      document.getElementsByTagName(idToRemove).parentNode.removeChild(elementToRemove)
      break
    default:
      document.getElementById(idToRemove).parentNode.removeChild(elementToRemove)
      break
  }
}

exports.get = get
exports.remove = remove
