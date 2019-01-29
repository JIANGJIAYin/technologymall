var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Phones = require('./../models/phones');

mongoose.connect('mongodb://127.0.0.1:27017/technologyMall');
mongoose.connection.on('connected',()=>{
  console.log('mongodb connected success');
});
mongoose.connection.on('error',()=>{
  console.log(('mongodb connected fail'));
});
mongoose.connection.on('disconnected',()=>{
  console.log('mongodb disconnected');
});

router.get('/list',(req,res,next)=>{

  let priceLevel = req.param('priceLevel');
  let typeLevel = req.param('typeLevel');
  let paramsPrice={};
  let paramsType={};
  let params={};
  let priceGt='';
  let priceLte='';
  let type='';

  //价格过滤方法
  function priceFilter(){
    switch (priceLevel) {
      case '0':priceGt=0;priceLte=1000;break;
      case '1':priceGt=1000;priceLte=2000;break;
      case '2':priceGt=2000;priceLte=3000;break;
      case '3':priceGt=3000;priceLte=20000;break;
    }
  }

  //类型过滤方法
  function typeFilter() {
    switch (typeLevel) {
      case '0':type='xiaomi';break;
      case '1':type='meizu';break;
      case '2':type='huawei';break;
    }
  }

  //查询方法，传参实现特定查询
  function findPhones(params){
    Phones.find(params,(err,document)=>{
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
      salePrice:{
        $gt:priceGt,
        $lte:priceLte
      },
      type:type
    };
    findPhones(params);

  } else if (priceLevel !== 'All' && typeLevel === 'All') {
    //如果选择特定区间的价格，所有的类型，按价格查找
    priceFilter();
    paramsPrice={
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    };
    findPhones(paramsPrice);

  } else if (priceLevel === 'All' && typeLevel !== 'All') {
    //如果选择所有价格，特定类型，按类型查找
    typeFilter();
    paramsType={
      type:type
    };
    findPhones(paramsType);

  } else {
    //如果选择所有价格，所有类型，查询所有，不需要传递条件（参数）
    findPhones();
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
        let phonesItem='';
        userDoc.cartList.forEach(function (item) {
          if (item.productId==productId) {
            phonesItem=item;
            item.productNum++;
          }
        });
        if (phonesItem) {
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
          Phones.findOne({productId:productId},(err2,phoneDoc)=>{
           if (err2) {
             res.json({
               status: 1,
               msg: err2.message,
               result: ''
             })
           }else{
             if (phoneDoc) {
               phoneDoc.productNum=1;
               phoneDoc.checked=1;
               userDoc.cartList.push(phoneDoc);
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

module.exports = router;
