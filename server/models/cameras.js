var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var camerasSchema = new Schema({
  productId: String,
  productName: String,
  productSummary:String,
  productImage: String,
  salePrice: Number,
  type: String,
  productNum: Number,
  checked: String
});

module.exports = mongoose.model('Cameras',camerasSchema);
