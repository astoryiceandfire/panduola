

// const API_IP  = 'http://112.74.128.2:8787/'




// const API_URLP = 'http://sdkapi.zeustel.com'//正式服
// const API_URLPAY = 'http://jfapi.zeustel.com'//正式服
// export const appid = '4d029789cf1d4e0facee1da3391fd8b6'//正式服


// const API_URLP = 'http://testsdkapi.zeustel.com'//测试服
// const API_URLPAY = 'http://testjfapi.zeustel.com'//测试服
 export const appid = 'd7547a1d89bf4c608352c6990edf0b5b'//测试服

// const API_URLP = 'http://10.1.1.223:8011/sdk'//测试服
// const API_URLPAY = 'http://10.1.1.223:8080/jf'//测试服
//  export const appid = 'd7547a1d89bf4c608352c6990edf0b5b'//测试服
let API_IP = ''
  if (process.env.NODE_ENV =='development') {
          // API_IP  = 'http://115.29.5.34:8989/'  
            API_IP  = ''  
        }



const API_URL = '/TitanMall'
export const appkey = '0ef818eefcd00d17625c3b585716168b'//加密


//appstart
export const ApiappStart=`${API_URL}/appStart.do`	
//获取验证码
export const ApigetImageCode =`${API_URL}/inter/game/getImageCode.do`	
//兑换
export const ApiexchangePro =`${API_URL}/inter/game/exchangePro.do`
//确认兑换
export const ApiconfimExchange =`${API_URL}/inter/game/confimExchange.do`
//查询兑换记录列表
export const ApiqueryExchange =`${API_URL}/inter/game/queryExchange.do`
//查询兑换记录详情
export const ApiqueryExchangeInfo =`${API_URL}/inter/game/queryExchangeInfo.do`
//确认兑换地址
export const ApiconfirmAddress =`${API_URL}/inter/game/confirmAddress.do`
//确认收货
export const ApireConfirm =`${API_URL}/inter/game/receiveConfirm.do`

// IP 为了查看图片
export const IP               =  `${API_IP}`
//token登录
export const ApiTokenLogin    =  `${API_URL}/inter/member/tokenLogin.do`

//钻石兑换
export const ApiZuanShi    =  `${API_URL}/api/integral/exchanApply/v1`
//本地钻石兑换查询
export const ApiZuanShiCheck = `${API_URL}/api/outer/exchanStatus/v1`
// //本地钻石兑换
// export const ApiZuanShi    =  `http://10.1.1.222:10006/api/integral/exchanApply/v1`
// //本地钻石兑换查询
// export const ApiZuanShiCheck = `http://10.1.1.222:10006/api/outer/exchanStatus/v1`


//查询公告列表
export const ApiAdvertList    =  `${API_URL}/queryAdvertList.do`

//商城-首页
export const ApiCategory      =  `${API_URL}/inter/shop/queryCategory.do`

//商城-查询杂志商品列表
export const ApiMagazinePage  =  `${API_URL}/inter/shop/queryMagazinePage.do`

//商城-查询商城商品列表
export const ApiGoodsList  =  `${API_URL}/inter/shop/queryGoodsList.do`

//商城-查询商城分类商品(2个分类)
export const ApiGoodsLists    =  `${API_URL}/inter/shop/queryGoodsLists.do`

//商城-询商城分类商品
export const ApiSortGoods     =  `${API_URL}/inter/shop/querySortGoods.do`

//商城-查询商品杂志详情
export const ApiGoodsImgs     =  `${API_URL}/inter/shop/queryGoodsImgs.do`

//商城-查询商城商品详情
export const ApiGoosdInfo     	=  `${API_URL}/inter/shop/queryGoosdInfo.do`

//商城-查询商城商品规格
export const ApiGoodsSpec     	=  `${API_URL}/inter/shop/queryGoodsSpec.do`

//商城-收藏
export const ApicollectGoods     	=  `${API_URL}/inter/shop/collectGoods.do`

//商城-取消收藏
export const ApicancelCollect     	=  `${API_URL}/inter/shop/cancelCollect.do`
//上传头像
export const ApiUploadImg       =  `${API_URL}/upload/partrait.do`


//购物车-加入清单
export const ApiaddIntoCart     =  `${API_URL}/inter/order/addIntoCart.do`

//购物车-查看清单商品
export const ApiqueryCartList     =  `${API_URL}/inter/order/queryCartList.do`

//社区-首页
export const ApiAllCoterie      =  `${API_URL}/inter/community/queryAllCoterie.do`

//社区-查询主贴详情
export const ApiPostInfo      =  `${API_URL}/inter/community/queryPostInfo.do`

//社区-查询主贴列表
export const ApiPostList      =  `${API_URL}/inter/community/queryPostList.do`

//社区-查询跟帖回复
export const ApiPostReply      =  `${API_URL}/inter/community/queryPostReply.do`
//社区-发帖
export const ApicommPost      =  `${API_URL}/inter/community/addPost.do`
//社区-主贴点赞
export const ApienvyPost      =  `${API_URL}/inter/community/envyPost.do`

//查询活动参与记录
export const ApiJoinActivityPage      =  `${API_URL}/inter/member/queryJoinActivityPage.do`

//商城-查询评价列表
export const ApiMcommentPage     	=  `${API_URL}/inter/shop/queryMcommentPage.do`

//活动-查询热门活动
export const ApiHotActivity     	=  `${API_URL}/inter/activity/queryHotActivity.do`

//活动-查询预告活动
export const ApiPreActivity     	=  `${API_URL}/inter/activity/queryPreActivity.do`

//活动-查询开奖中活动
export const ApiLotteryActivity     =  `${API_URL}/inter/activity/queryLotteryActivity.do`

//活动-查询已开奖活动
export const ApiEndActivity     	=  `${API_URL}/inter/activity/queryEndActivity.do`

//活动-活动规则
export const ApiComProblem     	=  `${API_URL}/queryComProblem.do`



//夺宝-查询夺宝商品详情
export const ApiIshopInfo     		=  `${API_URL}/inter/shop/queryIshopInfo.do`

//夺宝-查询所有参与记录
export const ApiOrderPage     		=  `${API_URL}/inter/order/queryOrderPage.do`

//夺宝-计算开奖详情
export const ApiLotteryResult    	=  `${API_URL}/inter/order/queryLotteryResult.do`

//夺宝-查询夺宝商品列表进行中
export const ApiIshopList    	=  `${API_URL}/inter/shop/queryIshopList.do`

//夺宝-查询夺宝商品列表已结束
export const ApiLatestAnnounce    	=  `${API_URL}/inter/shop/queryLatestAnnounce.do`

//夺宝-查询夺宝图文详情
export const ApiShopContent    	=  `${API_URL}/inter/shop/queryShopContent.do`

//夺宝-查询起始参与时间
export const ApiStarttime    	=  `${API_URL}/inter/order/queryStarttime.do`

//夺宝-查询最新一期夺宝
export const ApiNewestIshop    	=  `${API_URL}/inter/shop/queryNewestIshop.do`


//夺宝-查询晒单
export const ApiAllShowData    	=  `${API_URL}/inter/shop/queryAwardList.do`






//竞拍-查询竞拍商品列表
export const ApiAuctionList    	=  `${API_URL}/inter/auction/queryAuctionList.do`

//竞拍-查询竞拍商品详情
export const ApiAuctionInfo    	=  `${API_URL}/inter/auction/queryAuctionInfo.do`

//竞拍-查询所有参与记录
export const ApiOrderList    	=  `${API_URL}/inter/auction/queryOrderList.do`


//个人中心查询实时消息
export const Apimyshopmessage   	=  `${API_URL}/inter/member/queryMessage.do`



//活动和游戏首页
export const ApiSlides        =  `${API_URL}/querySlides.do`

//夺宝-查询往期揭晓商品
export const ApiPassIshopList    	=  `${API_URL}/inter/shop/queryPassIshopList.do`

//个人中心====================下
//用户登陆
export const ApiPostLogin      =  `${API_URL}/inter/member/login.do`
// export const ApiTokenLogin  = `/sapi/userinfo/v1`

//用户注册
export const ApiPostRegister     =  `${API_URL}/inter/member/register.do`

//获取验证码
export const ApiPostVerify     =  `${API_URL}/sms/getVercode.do`
//获取用户
export const Apisingledata     =  `${API_URL}/inter/member/queryMemberInfo.do`


//查询中奖记录
export const Apigetawarnote    =  `${API_URL}/inter/member/queryLotteryPage.do`
//查询中奖订单详情
export const Apiawarddetails    =  `${API_URL}/inter/auction/queryLottery.do`

//查询活动记录
export const Apiactionnote     =  `${API_URL}/inter/member/queryJoinActivityPage.do`

//查询常见问题
export const Apicomproblem     =  `${API_URL}/queryComProblem.do`

//验证账号
export const Apichecknumber     =  `${API_URL}/inter/member/verifyUser.do`
//找回密码 获取验证码
export const Apigetver     =  `${API_URL}/sms/findPassword.do`
//找回密码 校验验证码
export const Apicheckver     =  `${API_URL}/inter/member/verifyCode.do`
//找回密码 重置密码
export const Apiresetpass     =  `${API_URL}/inter/member/resetPassword.do`
//查询我的消息
export const Apimymessage     =  `${API_URL}/inter/member/queryMymess.do`
//用户充值-》确认充值
export const Apirecharge    =  `${API_URL}/inter/order/recharge.do`
//用户充值-》立即充值 h5 
export const Apipingpay    =  `${API_URL}/api/money/aliH5charge/v1`
//我的订单
export const Apimyordes    =  `${API_URL}/inter/order/queryMyOrders.do`
//查询主贴回复
export const Apicommentlist    =  `${API_URL}/inter/community/queryPostReply.do`
//查询我的帖子
// export const ApiPostList    =  `${API_URL}/inter/community/queryPostList.do`
// 
//查询我的收藏queryCollectLsit/shop/queryGoodsList.do
 export const ApiPostcolist    =  `${API_URL}/inter/shop/queryCollectLsit.do`
//查询通币充值记录
 export const Apiorderrelist    =  `${API_URL}/inter/member/queryMemberAccountDetails.do`
//查询收货地址
 export const Apiaddrlist    =   `${API_URL}/inter/addr/getUserAddrs.do`
 //添加修改收货地址
 export const Apiaddrsave   =   `${API_URL}/inter/addr/addUserAddrs.do`

//修改昵称
 export const Apiupnickname   =    `${API_URL}/inter/member/updateNickname.do`

 //默认地址
 export const Apidefault    =  `${API_URL}/inter/addr/setDefaultAddrs.do`
 //删除收货地址
 export const Apidel    =   `${API_URL}/inter/addr/delAddrs.do`

//获取省市区列表
 export const Apigetareals    =   `${API_URL}/inter/addr/getRegions.do`
//确认收货
 export const Apiconfir    =   `${API_URL}/inter/order/receiveConfirm.do`
//商城确认收货
 export const Apinconfir    =   `${API_URL}/inter/member/receiveConfirm.do`

//评价商城商品
 export const ApijudgeMshop    =   `${API_URL}/inter/shop/judgeMshop.do`
 //删除订单
 export const ApideleteOrder    =   `${API_URL}/inter/order/deleteOrder.do`
 //取消订单
 export const ApicanceOrder    =   `${API_URL}/inter/order/cancelOrder.do`
 
//我的订单详情
 export const ApiOrderInfo    =   `${API_URL}/inter/order/queryOrderInfo.do`
 //查询物流
 export const ApiqueryPostInfo =   `${API_URL}/inter/order/queryPostInfo.do`
 
 //再次购买
 export const ApibuyAgain    =   `${API_URL}/inter/order/buyAgain.do`
 //清单结算
 export const ApibalanceOrder    =   `${API_URL}/inter/order/balanceOrder.do`
 //购物车-确认支付
 export const Apiconfirpay    =   `${API_URL}/inter/order/payOrder.do`
  //支付接口
 export const Apipaymoneyv    =   `${API_URL}/api/money/pay/v1.do`
 //购物车-结算支付
 export const Apipaymoney    =   `${API_URL}/inter/order/payMoney.do`
 
  //购物车-支付结果
 export const ApiqPayResult   =   `${API_URL}/inter/order/queryPayResult.do`

  //购物车-跟买下单
 export const ApiqfollowBuy   =   `${API_URL}/inter/order/followBuy.do`
 //中奖记录 确认地址
 export const ApiaddressConfirm   =   `${API_URL}/inter/member/addressConfirm.do`
  //中奖记录 低价竞拍确认地址
 export const ApiadraucConfirm   =   `${API_URL}/inter/auction/addressConfirm.do`
 //中奖记录 确认收货
 export const ApireceiveConfirm   =   `${API_URL}/inter/member/receiveConfirm.do`
  //中奖详情
 export const ApiqueryLottery   =   `${API_URL}/inter/member/queryLottery.do`
 //添加晒单
 export const ApiaddShowAward   =   `${API_URL}/inter/shop/addShowAward.do`


 //删除商品清单
export const apideleteCarts =  `${API_URL}/inter/order/deleteCarts.do`
//修改密码
 export const Apiupdatepass    =   `${API_URL}/inter/member/updatePassword.do`
//主贴评论
 export const ApireplyPost    =   `${API_URL}/inter/community/replyPost.do`
//跟帖评论
 export const Apienvypos    =   `${API_URL}/inter/community/envyPos.do`
//查询主贴回复
 export const Apiqcomment    =   `${API_URL}/inter/community/queryCommentList.do`


//个人中心====================上

