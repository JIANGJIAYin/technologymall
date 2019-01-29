var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var phonesSchema = new Schema({
  productId: String,
  productName: String,
  productImage: String,
  salePrice: Number,
  productSummary: String,
  type: String,
  productNum: Number,
  checked: String
});

module.exports = mongoose.model("Phones",phonesSchema);
