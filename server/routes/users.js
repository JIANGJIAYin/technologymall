var express = require('express');
var router = express.Router();
var Users = require('./../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登录
router.post('/login',(req,res,next)=>{
  let userName=req.body.userName;
  let userPwd=req.body.userPwd;
  let params={
    userName: userName,
    userPwd: userPwd
  };
  Users.findOne(params,(err,doc)=>{
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: ''
      });
    }else{
      if (doc) {
        res.cookie("userId",doc.userId,{
          path: '/',
          maxAge: 1000*60*60
        });
        res.cookie("userName",doc.userName,{
          path: '/',
          maxAge: 1000*60*60
        });
        res.json({
          status: 0,
          msg: '',
          result: doc.userName
        });
      }
    }
  });
});

// 检测登录状态
router.post('/checkLogin',(req,res,next)=>{
  let userId=req.cookies.userId;
  let userName=req.cookies.userName;
  if (!userId) {
    res.json({
      status: 1,
      msg: '未登录',
      result: ''
    });
  }else{
    res.json({
      status: 0,
      msg: '',
      result: userName || ''
    });
  }
});

// 登出
router.post('/logout',(req,res,next)=>{
  res.cookie("userId","",{
    path: '/',
    maxAge: -1
  });
  res.json({
    status: 0,
    msg: '已退出登录',
    result: ''
  })
});

// 购物车列表
router.get('/cartList',(req,res,next)=>{
  let userId=req.cookies.userId;
  Users.findOne({userId:userId},(err,userDoc)=>{
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: ''
      })
    }else{
      // if (userDoc) {
        res.json({
          status: 0,
          msg: '',
          result: userDoc.cartList
        });
      // }
    }
  });
});

// 删除购物车商品
router.post('/del',(req,res,next)=>{
  let productId=req.body.productId;
  let userId=req.cookies.userId;
  Users.update({
      userId:userId
    },
    {
      $pull:{
        'cartList': {
          'productId': productId
        }
      }
    },(err,userDoc)=>{
      if (err) {
        res.json({
          status: 1,
          msg: err.message,
          result: ''
        });
      }else{
        if (userDoc) {
          res.json({
            status: 0,
            msg: '',
            result: 'success'
          })
        }
      }
    })
});

// 修改商品
router.post('/update',(req,res,next)=>{
  let userId=req.cookies.userId;
  let productNum=req.body.productNum;
  let checked=req.body.checked;
  let productId=req.body.productId;
  Users.update(
    {
      // 修改条件
      "userId": userId,
      "cartList.productId": productId
    },
    {
      // 修改内容
      "cartList.$.productNum": productNum,
      "cartList.$.checked": checked
    },(err,userDoc)=>{
      if (err) {
        res.json({
          status: 1,
          msg: err.message,
          result: ''
        });
      }else{
        if (userDoc) {
          res.json({
            status: 0,
            msg: '',
            result: 'update success'
          })
        }
      }
    })
});

// 选择购物车所有商品
router.post('/selectAll',(req,res,next)=>{
  let userId=req.cookies.userId;
  let checkedAll=req.body.checkedAll?'1':'0';
  Users.findOne({userId: userId},(err,userDoc)=>{
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: ''
      });
    }else{
      if (userDoc) {
        userDoc.cartList.forEach((item)=>{
          item.checked=checkedAll;
        });
        userDoc.save((err,userDoc)=>{
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
              result: 'success'
            })
          }
        })
      }
    }
  })
});

// 地址列表
router.get('/addressList',(req,res,next)=>{
  let userId=req.cookies.userId;
  Users.findOne({userId:userId},(err,user)=>{
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: ''
      });
    }else{
      if (user) {
        res.json({
          status: 0,
          msg: '',
          result: user.addressList
        });
      }
    }
  })
});

// 设置地址
router.post('/setAddress',(req,res,next)=>{
  let userId=req.cookies.userId;
  let addressId=req.body.addressId;
  if (!addressId) {
    res.json({
      status: '1003',
      msg: 'address is null',
      result: ''
    });
  }else{
    Users.findOne({userId: userId},(err,doc)=>{
      if (err) {
        res.json({
          status: 1,
          msg: err.message,
          result: ''
        });
      }else{
        if (doc) {
          doc.addressList.forEach((item)=>{
            if (item.addressId == addressId) {
              item.isDefault=true;
            }else{
              item.isDefault=false;
            }
          });
          doc.save((err2,doc2)=>{
            if (err2) {
              res.json({
                status: 1,
                msg: err2.message,
                result: ''
              });
            }else{
              res.json({
                status: 0,
                msg: '',
                result: doc2.addressList
              })
            }
          })
        }
      }
    });
  }
});

// 删除地址
router.post('/delAddress',(req,res,next)=>{
  let userId=req.cookies.userId;
  let addressId=req.body.addressId;
  Users.update(
    {
      userId: userId
    },
    {
      $pull: {
        'addressList': {
          'addressId': addressId
        }
      }
    },(err,doc)=>{
      if (err) {
        res.json({
          status: 1,
          msg: err.message,
          result: ''
        });
      }else{
        if (doc) {
          res.json({
            status: 0,
            msg: '',
            result: 'del success'
          })
        }
      }
    })
});

// 创建订单
router.post('/createOrder',(req,res,next)=>{
  let userId=req.cookies.userId;
  let addressId=req.body.addressId;
  let orderPrices=req.body.orderPrices;

  Users.findOne({userId: userId},(err,doc)=>{
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: ''
      });
    }else{
      if (doc) {
        let goods=[];
        let address=[];
        doc.cartList.forEach((item)=>{
          if (item.checked == '1') {
            goods.push(item);
          }
        });

        doc.addressList.forEach((item)=>{
          if (item.addressId == addressId) {
            address.push(item);
          }
        });

        // 创建订单号函数
        // function createOrderId(){
        //   let orderId='';
        //
        //   return orderId;
        // }


        // 生成订单随机数
        let random1=Math.floor(Math.random()*10);
        let random2=Math.floor(Math.random()*10);

        let createDate = new Date();

        let orderId='781-'+random1+'-'+createDate+'-'+random2;

        // 创建订单对象
        let order={
          orderId: orderId,
          orderTotalPrices: orderPrices,
          addressInfo: address,
          goodsList: goods,
          orderStatus: '1',
          createDate: createDate
        };
        // console.log(order);
        doc.orderList.push(order);

        doc.save((err2,doc2)=>{
          if (err2) {
            res.json({
              status: 1,
              msg: err.message,
              result: ''
            });
          }else{
            res.json({
              status: 0,
              msg: '',
              result: {
                orderId: order.orderId,
                orderTotal: order.orderTotalPrices
              }
            })
          }
        });
      }
    }
  });
});


module.exports = router;
