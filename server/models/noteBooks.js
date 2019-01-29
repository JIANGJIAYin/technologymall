var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notebooksSchema = new Schema({
  productId: String,
  productImage: String,
  productName: String,
  salePrice: Number,
  type: String,
  productNum: Number,
  checked: String
});

module.exports=mongoose.model('Notebooks',notebooksSchema);
