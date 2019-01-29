var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var usersSchema=new Schema({
  userId: String,
  userPwd: String,
  userName: String,
  cartList: [
    {
      productId: String,
      productName: String,
      productImage: String,
      salePrice: Number,
      productNum: Number,
      checked: String
    }
  ],
  orderList: [
    {
      orderId: String,
      orderTotalPrices: Number,
      addressInfo: Array,
      goodsList: Array,
      orderStatus: String,
      createDate: String
    }
  ],
  addressList: [
    {
      addressId: String,
      userName: String,
      postCode: Number,
      tel: Number,
      streetName: String,
      isDefault: Boolean
    }
  ]
});
module.exports=mongoose.model('Users',usersSchema);
