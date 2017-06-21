<!-- //幸运抢购 限时抢购 低价竞拍支付页面 -->
<template>
  <div class="home">
      <div class="srapper" flex="dir:left">
      <!-- 左边wraper -->
            <div class="writem" flex="dir:top">
       
                      <div class="home_up">
                        <img :src="ip+datainfo.images[0]">
                       
                      </div>
                
                      <div class="home_down" flex="dir:top ">
                           <h1 class="shoptitle" flex="cross:center main:justify">
                             <span class="left">
                                <i slot="icon" :class=['fa',aclist[type].imgi] aria-hidden="true"></i>{{aclist[type].title}}
                             </span>
                             <span class="right">第{{datainfo.periods||datainfo.period}}期</dpan>

                           </h1>
                           <div class="middle" flex="dir:top"><!-- //这个flex暂时就这样吧 -->
                             
                             <h2>{{datainfo.title}}</h2>
                             <small>{{datainfo.subhead}}</small>
                                  <!--  进度条 -->
                                 <!--  //幸运抢购 限时抢购 -->
                                   <div v-if="!(type==2)" class="panicbuy" flex="main:justify">
                                       
                                    <div class="panicleft">剩余人次：{{datainfo.totalmember-datainfo.joinedmember}}人次</div>
                                    <div class="panicright">参与人次：<span class="fontcolor">{{datainfo.joinedmember}}</span>人次</div>
                                  </div>
                                  <!--  进度条 -->
                                 <!--  低价竞拍 -->
                                 <div class="lowprice" v-else>
                                  <p>距离活动结束 <counter :downtime='datainfo.endtime'></counter></p>
                                  <p> 当前已参与人数<span> {{datainfo.joinedmember}}人</span></p>
                                 </div>

                                 <!--  低价竞拍 -->

                           </div>
                                 
                                
                         
                            
                             

                        
                    <!--   </div>
                    
                  </div> -->
              </div>
            </div>
            <!-- 左边wraper -->
            
           <!--  右面的滚动 -->
           <div class="writem1">
              <div id="wrapper1" v-el:wrptwo>
                <div id="scroller1">
                <section class="wr_top">
                <div v-touch:tap="checkClick('isBalance')" class="payclass border1px setarrborder" flex="main:justify">
                	<div class="left">账户余额：<span class="fontcolor">{{recoption.integral}}</span>通币	</div>
                	<div class="right">
                		<i :class=['fa','fa-check-circle',isBalance?'fontcolor':''] aria-hidden="true"></i>

                	</div>
                </div>
        <!--        <div v-touch:tap="checkClick('isDiamond')" class="payclass  border1px setarrborder" flex="main:justify">
               	<div class="left">{{coinName}}抵扣：<span  class="fontcolor">{{deduction}}</span>{{coinName}}	</div>
                	<div class="right">
                		<i :class=['fa','fa-check-circle',isDiamond?'fontcolor':'']  aria-hidden="true"></i>

                	</div>
               </div> -->
                 <div class="totalcount  border1px setarrborder">
               	<div class="left">总共消费：<span  class="fontcolor">{{recoption.paycount||recoption.buycount}}</span>通币	</div>
         
               </div>
               


                
                </section>
                
                  
                </div>
              </div>
              <div :class="['footer',ispaying ? 'disablecolor' : '']" v-touch:tap="chosePayCheck"><span>立即支付</span></div>
          




            </div>

              <!--  右面的滚动 -->

      </div>
 <!--  购买结果 -->
                  <div v-if="isShow"  class="zs-container">
                 <div  class="wrap-message" flex="dir:top cross:center">
                   <div class="msg-top">
                      <p class="title">支付成功</p>
                       <p class="subtitle">请等待系统揭晓中奖情况</p>
                  </div>

                    
                     
                     <div  class="atonce">
                        <span v-touch:tap="goShoping">继续抢购</span> <span v-touch:tap="goCheckShoping">查看抢购记录</span>
                        </div>              
                 </div>
                  </div>
              
<!--  购买结果 -->
 
  </div>
</template>

<script>

import Swiper    from '../../assets/js/swiper'
import {myMixin}    from '../../mixin'
import md5 from 'md5'
import {IP,  
        appid,
        appkey,
        ApiIshopInfo, //幸运抢购和限时抢购
        ApiOrderPage, //参与记录
        ApiAuctionInfo, //低价竞拍
        ApiOrderList, //竞拍记录
        ApiStarttime, //起始参与时间
        ApiNewestIshop,//最新一期夺宝
        Apipaymoney,
		ApiqPayResult,//支付结果 返回订单数据
		ApiZuanShi,//兑换钻石
    }    from '../../api'
import counter from "../../components/counter.vue";
import { Indicator,Toast  } from 'mint-ui';
export default {
  components: {
        counter
  },
    mixins: [myMixin],
  vuex: {
      actions: {
      
      },
      getters: {
       
      }
  },
  data () {
    return {
           aclist:[{title:"幸运抢购",imgi:"fa-star-o"},
                   {title:"限时抢购",imgi:"fa-clock-o"},
                   {title:"低价竞拍",imgi:"fa-gavel"}],
            slideList:{A:{img:""}},
            isShow:false,//结果遮罩
            ispaying:false,//正在支付中
            ip:IP,
             id:0,//活动商品id
             type:"0",//商品活动类型-1幸运抢购2显示抢购3限时竞拍
             datainfo:{},//商品详情
             isBalance:true,//通币支付
             isDiamond:false,//钻石支付
             gamesbill:111,//游戏币 钻石，
             coinName:null,//钻石别名
             // deduction:null,//需要游戏币抵扣的数目

             recoption:{//从路由中收到的参数
             	paycount:null,
             	buycount:null,
             	id:null,
             	type:null,
             	integral:null,
             },
             requestion:{//需要发起的请求参数
             		chargeType: null, //第三方支付类型
					paytype: 0, //支付类型				
					shoptype: null, //商品类型
					ordercode:null, //订单号
					paycount: null, //支付金额
					money: null, //第三方支付金额
					mobile:null,

             },
             restion:{//查询支付结果参数
             	type:null,//1夺宝;2商城;3表示竞拍
             	ordercode:null,//订单号
             	mobile:null,
             },
           
            orderpage:[],//所有参与记录
            opinglist:{},//即将揭晓
            adverlist:{},//公告信息
           


       }
  },

  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      vm.datainfo=[]//清空数据
      vm.id=vm.$route.params.id;//商品id
      vm.disablecolor = false//这个不确定会怎么样
      vm.isDiamond=false
       vm.isShow = false

       vm.recoption.id=vm.$route.params.id;//商品id
      vm.recoption.paycount=Number.parseFloat(vm.$route.query.paycount).toFixed(2);
      vm.recoption.buycount=Number.parseFloat(vm.$route.query.buycount).toFixed(2);
      vm.recoption.type=vm.$route.query.type;//幸运抢购0 限时抢购1 低价竞拍2
      vm.recoption.integral=Number.parseFloat(vm.$route.query.integral).toFixed(2);//剩余通币
      vm.recoption.ordercode=vm.$route.query.ordercode;//本次订单
      vm.gamesbill = localStorage.getItem("zsgameCoin")//钻石数
      vm.gamesbill =  Number.parseInt(vm.gamesbill) 
       vm.coinName =  localStorage.getItem("zscoinName");//钻石别名

       vm.restion.ordercode=vm.$route.query.ordercode;//本次订单号
       if (vm.$route.query.type==1||vm.$route.query.type==2) {
       	 vm.restion.type = 1//1夺宝;2商城;3表示竞拍
       }else{//1夺宝;2商城;3表示竞拍
       		vm.restion.type = vm.$route.query.type
       }
       

     
       if (vm.recoption.type==2) {
           vm.getData(vm.id,ApiAuctionInfo)// 低价竞拍 商品详情
       }else{
           vm.getData(vm.id,ApiIshopInfo)//幸运抢购 限时抢购 商品详情
       }
    

         

       
       
     
  
     
     

      transition.next()
    },
    activate(transition) {
  
      transition.next()
    },
    deactivate(transition) {
     
      transition.next()
    }
  },
  computed:{
  	// deduction:function(){//抵扣数
		 //  		let vm =this

		 //  		if (vm.isBalance) {
		 //  			if (vm.recoption.integral-vm.recoption.buycount>=0) {
		 //  				return 0
		 //  			}else{
		 //  				return vm.recoption.buycount -vm.recoption.integral  
		 //  			}
		 			
		 //  		}else{
		 //  			return vm.recoption.buycount
		 //  		}

  	// }

  },
  methods:{

    //获取钻石数
    getGameCoin(){
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
            
                let data = window.Logic.Info();
              
                  data  = JSON.parse(data)
                 vm.gamesbill =  Number.parseInt(data.gameCoin) 
                  localStorage.setItem('zsgameCoin',data.gameCoin)  
    
            } else if (u.indexOf('iPhone') > -1) {//苹果手机  
              
            } else if (u.indexOf('Windows Phone') > -1) {//winphone手机

          }

    },
    //继续抢购
    goShoping(){
      this.$router.replace({
        name:"activity"
       
      })

    },
    //查看抢购记录
    goCheckShoping(){
      this.$router.replace({
        name:"activeNotes",
        params:{id:1}
      })

    },
  	//支付方式切换
  	checkClick(value){
  		let vm =this
      vm.isBalance = true
  		// if (value=='isBalance') {
  		// 	vm.isBalance = !vm.isBalance
  		// }else if(value='isDiamond'){
  		// 	vm.isDiamond=!vm.isDiamond

  		// }

  	},
   
    //加载商品详情数据
        getData(id,api){
                let vm = this
              vm.axios.post(api, {
                id: id
              }).then((response) => {
                if(response.data.retcode == 1) {

                vm.datainfo = response.data.data
                }

              }, (response) => {
                
              })

        },
        //兑换申请请求SDK
        exChangeTongBi(){//兑换钻石
        	let vm=this,
          sign = '',
        	option={};
        	option.userId = localStorage.getItem('zsuserid') 
			     option.mobile = localStorage.getItem('zsmobile') 

			      // option.money =parseFloat(40.0).toFixed(1)  //需要兑换申请钻石数
            option.money =parseFloat(vm.deduction).toFixed(1)  //需要兑换申请钻石数
            
            option.appId = appid
          
              Object.keys(option).sort().forEach(function( value,index,array){
              
                        sign +=`${value}=${option[value]}&`
                        if (index==array.length-1) {
                        
                         
                          sign = sign.slice(0,sign.length-1)
                         
                            sign = md5(sign)
                          }
                      }) 
                  
                  option.iscross = true //跨域
                  option.sign = sign; 

        	vm.axios.post(ApiZuanShi,option).then((response)=>{
            if (response.data.success==1) {
                  vm.postMobile(response.data.data)//客户端发起请求      
            }else{
               Toast({message:response.data.msg})
            }

        	}).catch((response)=>{

            Toast({message:"失败",
              duration:20000})
          })


        },
        //向客户端发起兑换请求
        postMobile(data){
           // Toast({message:"2进入向客户端发起兑换申请的方法"})
        		var u = navigator.userAgent;
					if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
					 // Toast({message:"2发起app客户端兑换申请"})
							window.Logic.showMsg(0x4,JSON.stringify(data));
					} else if (u.indexOf('iPhone') > -1) {//苹果手机
					window.webkit.messageHandlers.deliver.postMessage(JSON.stringify(data));
						
					} else if (u.indexOf('Windows Phone') > -1) {//winphone手机

				}
				this.beginPay()//通币支付请求
        },
        //检查兑换方式选择
        chosePayCheck(){
        	let vm =this ,
          hasAford = vm.recoption.integral-vm.recoption.buycount;
         
            if (hasAford>=0){
                vm.beginPay()//通币余额支付
            }else{
              Toast({
                   message:"通币不足,请充值"
                   })
            }

         
				// if (vm.isBalance&&vm.isDiamond==false) {
		  //       		if (vm.deduction==0) {
		  //       			vm.beginPay()//通币余额支付

		  //       		}else{
			 //        			Toast({
			 //        			message:"通币不足"
			 //        			})

			        			
		  //       		}


		  //       	}else if (vm.isDiamond&&vm.isBalance==false) {
			 //        		if (vm.deduction<=vm.gamesbill) {
			 //        			vm.exChangeTongBi()//兑换钻石请求SDK


			 //        		}else{
				//         			Toast({
				//         			message:"钻石不足"
				//         			})
			 //        		}

		  //       	}else if (vm.isDiamond&&vm.isBalance) {

				// 			if (vm.recoption.integral +vm.gamesbill >= vm.buycount) {
				// 				if (vm.deduction<=0) {
				// 					vm.beginPay()//通币余额支付
				// 				}else{

				// 					vm.exChangeTongBi()//兑换钻石请求SDK
				// 				}
								



			 //        		}else{
				//         			Toast({
				//         			message:"金额不足以抵扣"
				//         			})
			 //        		}


		  //       	} else{
		  //       		Toast({
		  //       			message:"请选择支付方式"
		  //       		})
		        		
		  //       	}
        },
        beginPay(){//支付订单第二步
              let vm =this
           // Toast({message:"进入支付订单"})
           
      
        	Indicator.open("支付中...")
        	vm.requestion.shoptype = vm.recoption.type
        	vm.requestion.ordercode = vm.recoption.ordercode
        	vm.requestion.paycount = vm.recoption.buycount||vm.recoption.paycount//乱七八糟
        	vm.requestion.mobile = localStorage.getItem('zsmobile') 
          vm.requestion.remark = '备注'
          // vm.requestion.
          if (vm.isDiamond==true) {
              vm.requestion.isDiamondMixture = true//兑换钻石了
          }else{
             vm.requestion.isDiamondMixture = false//没有兑换钻石

          }
          if (vm.disablecolor==false) {
              vm.disablecolor = true //灰色
          }else{
            return 
          }
        	vm.axios.post(Apipaymoney,vm.requestion).then((response)=>{
	        		let data = response.data

	        		if (data.retcode==1) {
                Indicator.close()
                 

                  vm.isShow = true


                //    if (vm.isDiamond==true) {
                //         vm.getGameCoin()
                //   }
                // vm.isDiamond=false
                 


	        			
	        		}else{
		        			Indicator.close()
    							Toast({
    								message:data.retmsg
    							})
                 
	        		}
               vm.disablecolor = false//灰色

        	})
        










        },
        //查询订单支付结果
        queryPayResult() {
        	let vm =this
        		vm.restion.mobile = sessionStorage.getItem("zsmobile")
        		vm.axios.post(ApiqPayResult,vm.restion).then((response)=>{
        			if (response.data.retcode==1) {
        				Indicator.close()
							
        			}

        		}).catch((response)=>{

        		})

        },
        //查询参与记录
        getJoinRecode(){
          let vm =this
          vm.axios.post(ApiOrderPage,{shopid:vm.id,page:1,rows:1000}).then((response)=>{
                  if(response.data.retcode == 1) {
               
                  vm.orderpage = response.data.data.rows
                   
                
                }
          }).catch((response)=>{

          })


        },
    //左右滚动
          zswiper(){

              let swiper = new Swiper(this.$els.activeswiper, {
              // pagination: '.swiper-pagination',
              slidesPerView: 3,
              paginationClickable: true,
              spaceBetween: 30
                    });

          },
          enterlist(index){
            // index++;


             this.$router.go({
                name:"activitylist",
                params:{id:index}
              })
            


          },

    
    

  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/style.scss";
  @import '../../assets/css/swiper.css' ;  
         //弹窗
       .zs-container{
                        position:fixed;
                        width: 100%;
                        height: 100%;
                        left:0;
                        right: 0;
                        top: 0;
                        bottom:0;
                         // opacity:0.5; filter: alpha(opacity=30);
                          background-color:hsla(0%,0%,0%,.8); 
                        z-index: 11;
                         
                        .wrap-message{
                                width: 50%;
                                height: 40%;
                                background:#202533;
                                position:absolute;
                                z-index: 12;
                                top: 50%;
                                left: 50%;
                                -webkit-transform: translate(-50%, -50%);
                                transform:translate(-50%,-50%);
                               
                                max-width:px2rem(400);
                                @include font-dpr(14px);
                                // i.closeicon{
                                //   background:url(../../assets/images/closeicon@3x.png) no-repeat;
                                //   background-size:cover;
                                //   width: px2rem(20);
                                //   height: px2rem(20);
                                //   display: inline-block;
                                // }
                               
                                justify-content: space-around;
                                 // justify-content: center;
                                // .close{
                                //   text-align: right;
                                //   width: 100%;
                                //   padding-top:px2rem(10);
                                //  padding-right:px2rem(20);
                                //  margin-bottom: px2rem(-20);
                                // }
                                .title{
                                  text-align: center;
                                  color:$color-zibai;
                                  @include font-dpr(20px);
                                  height: px2rem(40);
                                }
                                .subtitle{
                                  color:$color-cheapccc;
                                   @include font-dpr(16px);
                                }
                                
                                .atonce{
                                  text-align: center;
                                  width: 80%;
                                  span{
                                    display: inline-block;
                                    height: px2rem(50);
                                    line-height: px2rem(50);
                                    width: 48%;
                                    background:$color-orange;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    @include font-dpr(14px);
                                  }
                                }

                          }
                 }
                 //弹窗

  .home{
       background:$color-white;
       padding-left: px2rem(70);
       padding-bottom:px2rem(60);

         .srapper{
          width: 100%;
          height: 100%;
           
              .writem{
                width:40%;
                height: 100%;
                position:relative;

               

               

              }
              .writem1{
                width: 60%;
                 position:relative;
                
                 .footer{
                      position:absolute;
                      width: 100%;
                      bottom:0px;
                      right: 0px;
                      background:#000000;
                      z-index: 10;
                      height: px2rem(60);
                      line-height: px2rem(60);
                      text-align: center;
                        span{
                          background:$color-orange;
                          display: inline-block;
                          height: px2rem(40);
                          line-height: px2rem(40);
                          @include font-dpr(14px);
                          width: px2rem(120);
                        }
                        &.disablecolor{
                          background:$color-cheapccc;

                        }
                 }
                 
               
                 

              }
                #wrapper,#wrapper1 {
                  position: absolute;
                  z-index: 1;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  overflow: hidden;
                    background:$color-primary;
                  
                }   
                    .home_up{
                       
                       background:$color-deepblue;
                        height: 50%;
                         flex-grow: 1;
                      -webkit-flex-frow:1;
                      -ms-flex-frow:1;
                      // img{
                      //   width: 100%;
                      //   height: 100%;
                      // }

                    }
                   
                    .home_down{
                      height: 50%;
                      background:#10121A;
                      padding:0 px2rem(10);
                      flex-grow: 1;
                      -webkit-flex-frow:1;
                      -ms-flex-frow:1;
                      .shoptitle{
                          height: px2rem(40);
                          background:$color-zise;
                          color:$color-cheapccc;
                          @include font-dpr(14px);
                      }

                          // a{
                          //   background:$color-primary;
                          //   color:$color-white;
                            
                          //   @include font-dpr(14px);
                          //   i{
                          //     color:$color-orange;
                          //   }
                           
                          // }
                          .middle{
                              
                                 h2{
                                  color:$color-white;
                                  @include font-dpr(14px);
                                  height: px2rem(50);
                                  line-height: px2rem(50);
                                 } 
                                 small{
                                  color:#3B4661;
                                   height: px2rem(30);
                                 } 
                                 .lowprice{
                                    color: $color-cheapccc;
                                    @include font-dpr(14px);
                                    span{
                                      color:$color-orange;
                                       @include font-dpr(14px);
                                    }
                                 } 
                                 .panicbuy{
                                 	color:$color-cheapccc;
                                 }                      
                          }
                    
                    }

                #scroller1{
                  //最新揭晓
                   background:$color-primary;
                  padding:px2rem(12);
                  padding-left:0px;
                    section.wr_top{
                     	
                     	.payclass{
                     		@include font-dpr(14px);
                     		height: px2rem(60);
                     		line-height: px2rem(60);
                     		color:$color-white;
                     		background:#10121A;
                     		span{
                     			@include font-dpr(14px);
                     		}
                     		i{
                     			font-size: 1.5em;
                     		}
                     	}
                     	.totalcount{
                     		@include font-dpr(14px);
                     		height: px2rem(60);
                     		line-height: px2rem(60);
                     		color:$color-white;
                     		span{
                     			@include font-dpr(14px);
                     		}
                     	}
                      
                                 
                      
                 

                       

                    }

                         
                  
                }



         }
    
     
  }
  
</style>
