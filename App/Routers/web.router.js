
const webController = require('../Controllers/webController.js')

module.exports = function(app) {
  app.get('/', webController.Index);
}