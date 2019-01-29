var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var earPhonesSchema = new Schema({
  productId: String,
  productName: String,
  productImage: String,
  salePrice: Number,
  type: String,
  productNum: Number,
  checked: String
});

//注意：这里的第一个参数不能用驼峰形式写，且首字母大写并与数据库的文档名对应
module.exports = mongoose.model("Earphones",earPhonesSchema);
