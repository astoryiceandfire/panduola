// Route config
// import component from './view/index'
// // import components from './components/index'
// let {
// 	activity,
// 	shoping,
// 	person,
// 	activitylist,
// 	Login,
// 	activeNotes,
// 	activityDetails,
// 	activityPayMoney,
// 	} = component
// let {activeListView} = components

export default (router) => {
	router.map({
        // 活动首页--首页
		'/activity':{
		  name: 'activity',
		 component: (resolve) => {require(['./view/activity/activity.vue'], resolve)  },
		  // component:activity
	      
	   },
	     // 幸运抢购 、低价竞拍、显示夺宝-商品详情-
		'/activityDetails/:id':{
		  name: 'activityDetails',		
		  // component:activityDetails
		  component: (resolve) => {require(['./view/activity/activityDetails.vue'], resolve)  },
	      
	   },
	       // 幸运抢购 、低价竞拍、显示夺宝-已揭晓商品详情-
		'/activityReadDetails/:id':{
		  name: 'activityReadDetails',		
		  // component:activityDetails
		  component: (resolve) => {require(['./view/activity/activityReadDetails.vue'], resolve)  },
	      
	   },
	   // 登陆首页--登陆
		'/Home':{
		  name: 'Home',		
		  // component:Login
		   component: (resolve) => {require(['./view/Login.vue'], resolve)  },
	      
	   },
	   //幸运抢购 、低价竞拍、显示夺宝列表
	   	'/activitylist/:id':{
		  name: 'activitylist',
		  // component: require('./view/Home.vue'),
		  // component:activitylist
		  component: (resolve) => {require(['./view/activity/activitylist.vue'], resolve)  },
	      
	   },
	   //幸运抢购 、低价竞拍、显示夺宝商品支付页面 id商品id
	   	'/activityPayMoney/:id':{
		  name: 'activityPayMoney',
		  // component:activityPayMoney
		  component: (resolve) => {require(['./view/activity/activityPayMoney.vue'], resolve)  },
	      
	   },
	   //参与记录 活动记录
	   	'/activeNotes/:id':{
		  name: 'activeNotes',
		  // component: require('./view/Home.vue'),
		  // component:activeNotes
		    component: (resolve) => {require(['./view/activity/activityNotes.vue'], resolve)  },
	      
	   },
	      //图片详情
	   	'/graphicDetails/:id':{
		  name: 'graphicDetails',
		  // component: require('./view/Home.vue'),
		  // component:activeNotes
		    component: (resolve) => {require(['./view/activity/graphicDetails.vue'], resolve)  },
	      
	   },
	     //确认中奖信息
	   	'/cofirmAwardInfo':{
		  name: 'cofirmAwardInfo',
		    component: (resolve) => {require(['./view/person/cofirmAwardInfo.vue'], resolve)  },
	      
	   },
	       //地址管理
	   	'/administration':{
		  name: 'administration',
		 
		    component: (resolve) => {require(['./view/person/administration.vue'], resolve)  },
	      
	   },
	    // 商城--首页
		'/shoping':{
		  name: 'shoping',
		  // component: require('./view/Home.vue'),
		  // component:shoping
		   component: (resolve) => {require(['./view/shopping/shoping.vue'], resolve)  },
	      
	   },
	    // 商城--商品详情
		'/shopDetails':{
		  name: 'shopDetails',
		  // component: require('./view/Home.vue'),
		  // component:shoping
		   component: (resolve) => {require(['./view/shopping/shopDetails.vue'], resolve)  },
	      
	   },
	     // 商城--支付订单
		'/payorder':{
		  name: 'payorder',
		   component: (resolve) => {require(['./view/shopping/payorder.vue'], resolve)  },
	      
	   },
	       // 商城--商品评价
		'/shoprated':{
		  name: 'shoprated',
		   component: (resolve) => {require(['./view/person/shoprated.vue'], resolve)  },
	      
	   },
	     // 个人中心--首页
		'/person':{
		  name: 'person',
		  // component: require('./view/Home.vue'),
		  // component:person
		   component: (resolve) => {require(['./view/person/slperson.vue'], resolve)  },
	      
	   },
	    // 个人中心--我的订单
		'/myorders/:id':{
		  name: 'myorders',
		   component: (resolve) => {require(['./view/person/myorders/myorders.vue'], resolve)  },
	      
	   },
	     // 个人中心--通付卡管理
		'/mangercard':{
		  name: 'mangercard',
		   component: (resolve) => {require(['./view/person/paycards/mangercard.vue'], resolve)  },
	      
	   },
	   '/carditem':{
		  name: 'carditem',
		   component: (resolve) => {require(['./view/person/paycards/carditem.vue'], resolve)  },
	      
	   },
	   	'/mycollection':{
		  name: 'mycollection',
		   component: (resolve) => {require(['./view/person/mycollection.vue'], resolve)  },
	      
	   },
	    	'/billrcode':{
		  name: 'billrcode',
		   component: (resolve) => {require(['./view/person/billrcode.vue'], resolve)  },
	      
	   },
	       // 规则
		'/ruls':{
		  name: 'ruls',
		  // component: require('./view/Home.vue'),
		  // component:person
		   component: (resolve) => {require(['./view/person/activityRuls.vue'], resolve)  },
	      
	   },
		 
	        // 社区
		'/community':{
		  name: 'community',
		   component: (resolve) => {require(['./view/community/community.vue'], resolve)  },
	      
	   },
	       // 社区晒单
		'/shareorder':{
		  name: 'shareorder',
		   component: (resolve) => {require(['./view/community/shareorder.vue'], resolve)  },
	      
	   },
	       // 发布晒单
		'/postorder':{
		  name: 'postorder',
		   component: (resolve) => {require(['./view/community/postorder.vue'], resolve)  },
	      
	   },
	         // 晒单详情
		'/shareorderdetail':{
		  name: 'shareorderdetail',
		   component: (resolve) => {require(['./view/community/shareorderdetail.vue'], resolve)  },
	      
	   },
	         // 发布帖子
		'/postmessage':{
		  name: 'postmessage',
		   component: (resolve) => {require(['./components/postmessage.vue'], resolve)  },
	      
	   },
      // 热门帖子
		'/hottopic':{
		  name: 'hottopic',
		   component: (resolve) => {require(['./view/community/hottopic.vue'], resolve)  },
	      
	   },
	     // 与我相关
		'/myposts':{
		  name: 'myposts',
		   component: (resolve) => {require(['./view/community/myposts.vue'], resolve)  },
	      
	   },
	     // 帖子详情
		'/postdetail/:id':{
		  name: 'postdetail',
		   component: (resolve) => {require(['./view/community/postdetail.vue'], resolve)  },
	      
	   },


		  		 //往期揭晓
		 '/tophaseout/:id' : {
			 name : 'tophaseout' ,
			 component : (resolve) => {require(['./view/person/tophaseout.vue'],resolve)  },
		 },
		 '/querypayresult' : {
			 name : 'querypayresult' ,
			 component : (resolve) => {require(['./components/querypayresult.vue'],resolve)  },
		 },
		 







 		// //关于通币
 	 //   '/abouttb':{
 		// 	name: 'abouttb',
 			
 		// 	component:abouttb
 	 //   },
 	 //   //兑换通币页面
 	 //   '/changetb':{
 		// 	name: 'changetb',
 			
 		// 	component:changetb
 	 //   },
 	 //   //兑换通币结果页面
 	 //   '/record':{
 		// 	name: 'record',
 		
 		// 	component:record
 	 //   },
 	 //   //兑换记录
 	 //   '/changerecords':{
 		// 	name: 'changerecords',
 			
 		// 	component:changerecords
 	 //   },
 	 //   //个人设置
 	 //   '/personset':{
 		// 	name: 'personset',
 		
 		// 	component:personset
 	 //   },
 	 //     //绑定手机号
 	 //   '/bindmob':{
 		// 	name: 'bindmob',
 		// 	component:bindmob
 	 //   },
 	   
 	 //       //通服卡管理
 	 //   '/mangerpay':{
 		// 	name: 'mangerpay',
 		// 	component:mangerpay
 	 //   },





    //    // 潘多拉-404
	   // '*':{
    //     name: 'Error',
    //     component: require("./views/Error.vue")
	   // }

	})

    //默认/重定向到home页
	router.redirect({
	  '/': '/Home'
	})


	//全局放一个routlist
	window.routeList = [];

	router.beforeEach(function(transition){
		// console.log('-----before-----');
		// window.scrollTo(0, 0);
	
	  //   if(routeList.length > 1 && transition.to.name==routeList[routeList.length-2]['name']){
	  //       router.app.effect='next';//返回
	  //       // console.log("进入了next")
	  //       routeList.splice(routeList.length-1,1);
	  //       setTimeout(function(){
	  //           //这里加上延迟是要在afterEach之后在执行
	  //           transition.next()
	  //       },300);
	  //   } else {
	  //   	// console.log("进入了prev")
	  //   	router.app.effect='prev';//前进
		 //    routeList.push({
			// 	name : transition.to.name,
			// 	path : transition.to.path,
			// 	query : transition.to.query,
			// 	params : transition.to.params,
			// 	timer: +new Date
			// });

			 transition.next();
	  //   }

    });

	router.afterEach((transition) => {
	  console.log('成功浏览到: ' + transition.to.name)
	})

}
