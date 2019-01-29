var express = require("express");
var router = express.Router();
var NoteBooks = require('./../models/noteBooks');

//商品展示
router.get('/list',(req,res,next)=>{
  let priceLevel=req.param('priceLevel');
  let typeLevel=req.param('typeLevel');
  let priceGt="";
  let priceLte="";
  let type="";
  let params={};
  let paramsPrice={};
  let paramsType={};

  //价格过滤
  function priceFilter(){
    switch (priceLevel) {
      case '0':priceGt=0;priceLte=4000;break;
      case '1':priceGt=4000;priceLte=5000;break;
      case '2':priceGt=5000;priceLte=6000;break;
      case '3':priceGt=600;priceLte=7000;break;
      case '4':priceGt=7000;priceLte=20000;break;
    }
  }

  // 类型过滤
  function typeFilter() {
    switch (typeLevel) {
      case '0':type='huawei';break;
      case '1':type='xiaomi';break;
    }
  }

  // 查询，传参实现特定查询
  function findNoteBook(param) {
    NoteBooks.find(param,(err,document)=>{
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

  // 条件查询
  if (priceLevel !== 'All' && typeLevel !== 'All') {
    // 选择特定价格区间、特定类型
    priceFilter();
    typeFilter();

    // 按价格、类型同时查找
    params={
      salePrice:{
        $gt: priceGt,
        $lte: priceLte
      },
      type: type
    };
    findNoteBook(params);
  } else if (priceLevel !== 'All' && typeLevel === 'All') {
    // 选择特定价格
    priceFilter();

    //按价格查询
    paramsPrice={
      salePrice: {$gt: priceGt,$lte: priceLte}
    };
    findNoteBook(paramsPrice);
  } else if (priceLevel === 'All' && typeLevel !== 'All') {
    // 选择特定类型
    typeFilter();

    //按类型查询
    paramsType={
      type: type
    };
    findNoteBook(paramsType);
  } else{
    // 选择所有价格，所有类型。查询所有
    findNoteBook();
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
        let noteBooksItem='';
        userDoc.cartList.forEach(function (item) {
          if (item.productId==productId) {
            noteBooksItem=item;
            item.productNum++;
          }
        });
        if (noteBooksItem) {
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
          NoteBooks.findOne({productId:productId},(err2,noteBooksDoc)=>{
            if (err2) {
              res.json({
                status: 1,
                msg: err2.message,
                result: ''
              })
            }else{
              if (noteBooksDoc) {
                noteBooksDoc.productNum=1;
                noteBooksDoc.checked=1;
                userDoc.cartList.push(noteBooksDoc);
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
