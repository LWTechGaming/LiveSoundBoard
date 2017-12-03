const EventEmitter = require('events')

class Dispatcher extends EventEmitter {
  constructor () {
    super()
    this.setMaxListeners(14)
  }

  emit (event, args) {
    super.emit(event, args)
  }
}

exports.Dispatcher = Dispatcher
