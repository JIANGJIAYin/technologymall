var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weartechsSchema=new Schema({
  productId: String,
  productName: String,
  productImage: String,
  salePrice: Number,
  type: String,
  productNum: Number,
  checked: String
});

module.exports=mongoose.model('Weartechs',weartechsSchema);
