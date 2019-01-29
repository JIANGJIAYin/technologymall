var express = require('express');
var router=express.Router();
var EarPhones=require('./../models/earPhones');

router.get('/list',(req,res,next)=>{
  let priceLevel=req.param('priceLevel');
  let typeLevel=req.param('typeLevel');
  let priceGt="";
  let priceLte="";
  let type="";
  let params={};
  let paramsPrice={};
  let paramsType={};

  //过滤价格方法
  function priceFilter(){
    switch (priceLevel) {
      case '0':priceGt=0;priceLte=100;break;
      case '1':priceGt=100;priceLte=200;break;
      case '2':priceGt=200;priceLte=300;break;
      case '3':priceGt=300;priceLte=20000;break;
    }
  }

  //过滤类型方法
  function typeFilter(){
    switch (typeLevel) {
      case '0':type='xiaomi';break;
      case '1':type='meizu';break;
    }
  }

  //查询方法，传参不同，实现特定条件查询
  function findEarPhone(params){
    EarPhones.find(params,(err,document)=>{
      if (err) {
        res.json({
          status: 1,
          msg: err.message,
          result: ''
        })
      }else{
        res.json({
          status: 0,
          msg: '',
          result: document
        })
      }
    });
  }

  if (priceLevel !== 'All' && typeLevel !== 'All') {
    //如果选择的既是特定价格区间又是特定类型，同时按价格、类型查找
    priceFilter();
    typeFilter();
    params={
      salePrice: {$gt: priceGt, $lte: priceLte},
      type: type
    };
    findEarPhone(params);
  } else if (priceLevel !== 'All' && typeLevel === 'All') {
    //如果选择特定区间的价格，所有的类型，按价格查找
    priceFilter();
    paramsPrice={
      salePrice: {$gt: priceGt, $lte: priceLte}
    };
    findEarPhone(paramsPrice);
  } else if (priceLevel === 'All' && typeLevel !== 'All') {
    //如果选择所有价格，特定类型，按类型查找
    typeFilter();
    paramsType={type: type};
    findEarPhone(paramsType);
  } else{
    //如果选择所有价格，所有类型，查询所有，不需要传递条件（参数）
    findEarPhone();
  }

});

//添加商品到购物车
router.post('/addCart',(req,res,next)=>{
  let Users=require('./../models/users');
  let productId=req.body.productId;
  let userId='10001';
  Users.findOne({userId:userId},(err,userDoc)=>{
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if (userDoc) {
        let earPhonesItem='';
        userDoc.cartList.forEach(function (item) {
          if (item.productId==productId) {
            earPhonesItem=item;
            item.productNum++;
          }
        });
        if (earPhonesItem) {
          userDoc.save((err1,doc1)=>{
            if (err1) {
              res.json({
                status: 1,
                msg: err1.message,
                result: ''
              });
            }else{
              res.json({
                status: 0,
                msg: '',
                result: doc1.cartList
              });
            }
          });
        } else{
          //未存在商品，用户下面的cartList 需要增加一条商品信息
          EarPhones.findOne({productId:productId},(err2,earPhoneDoc)=>{
            if (err2) {
              res.json({
                status: 1,
                msg: err2.message,
                result: ''
              })
            }else{
              if (earPhoneDoc) {
                earPhoneDoc.productNum=1;
                earPhoneDoc.checked=1;
                userDoc.cartList.push(earPhoneDoc);
                userDoc.save((err3,doc3)=>{
                  if (err3) {
                    res.json({
                      status: 1,
                      msg: err3.message,
                      result: ''
                    });
                  }else{
                    res.json({
                      status: 0,
                      msg: '',
                      result: doc3.cartList
                    });
                  }
                });
              }
            }
          });
        }
      }
    }
  });
});

module.exports=router;
