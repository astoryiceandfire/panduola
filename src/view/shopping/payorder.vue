<template>

      <div class="mainwrapper" flex="dir:left">
      <!-- 左边wraper -->
            <div class="part-left">
              <div id="wrapper" v-el:wrshop>
                  <div id="scroller">
                    <h1>支付订单</h1>
                    <div class="shipping" flex="dir:top box:justify"><!-- //收货地址 -->
                     <div class="name" flex="main:justify">
                       <span>{{defaultarea.recvName}}</span>
                       <span>{{defaultarea.recvMobile}}</span>
                     </div>
                     <div class="adress">
                       <p><span>地址：</span>{{defaultarea.areastr}}</p>
                     </div>
                     <div class="editor" v-touch:tap='enterOtherAddress'>
                       <span class="orangecolor">使用其他地址></span>
                     </div>
                      </div><!-- //收货地址 -->
                    <div class="goods"><!-- !-- 商品区 --> 
                     <div class="good" flex="dir:left" v-for="item in shopitems">
                       <div class="good-img">
                      
                          <img v-if="item.shopimg" :src="ip + item.shopimg">
                          <img v-if="item.cover" :src="ip + item.cover">
                      
                        
                       </div>
                       <div class="good-info" flex="dir:top main:justify box:justify">
                         <div class="good-title">商品名称:<span>{{item.shopname||item.goodsname}}</span></div>
                         <div class="good-style">颜色：<span>{{item.standard}}</span></div>
                         <div class="good-price" flex="main:justify"> <span>￥{{item.price||item.paycount}}</span> <span>x {{item.buycount}}</span></div>
                       </div>
                     </div>
                      
                    </div><!-- 商品区 -->


                      
                      
                   
                  </div>
              </div>
            </div>
            <!-- 左边wraper -->
            
           <!--  右面的支付 -->
           <div class="part-rigth">
             <div class="header">余额支付</div>
            <!--  支付类型 -->
             <div v-touch:tap="checkClick('isBalance')" class="payclass border1px setarrborder" flex="main:justify">
                  <div class="left">账户余额：<span class="fontcolor">{{integral}}</span>通币  </div>
                  <div class="right">
                    <i :class=['fa','fa-check-circle',isBalance?'fontcolor':''] aria-hidden="true"></i>

                  </div>
                </div>
               <div v-touch:tap="checkClick('isAlipay')" class="payclass alipayclass border1px setarrborder" flex="main:justify">
                <div class="left">
                    <div class="aili" flex="main:justify cross:center">
                        <img class="al-left" src="../../assets/images/alipaylogo.png" alt="">
                        <div class="al-right" flex="dir:top main:center">
                              <p>支付宝 <img class="tuijian" src="../../assets/images/tuijian.png" alt=""></p>
                              <p>数亿用户都在用,安全可托付</p>
                            </div>
                      </div>
                          <span  class="fontcolor fontcolors">{{othercount}}元</span> 
                          <!-- <span  class="fontcolor fontcolors">1000</span>  -->
                  </div>

                  <div class="right">
                    <i :class=['fa','fa-check-circle',isAlipay?'fontcolor':'']  aria-hidden="true"></i>

                  </div>
               </div>
               <!-- 空标签 -->
               <div v-el:nulllabel style="display:none"></div>
               <div class="paymoney" flex="main:justify cross:center">
                 <div>总共消费:<span class="order-price">{{ordertotal}}</span>通币</div>
                 <div><span v-touch:tap='chosePayCheck' class="beginorder">立即支付</span></div>
                <!--  <div><span v-touch:tap='payKindOfAlipay' class="beginorder">立即支付</span></div> -->
               </div>
           <!--  支付类型 -->
            </div>

              <!--  右面的支付 -->

      </div>
  
 

</template>

<script>

import Swiper    from '../../assets/js/swiper'
import {myMixin}    from '../../mixin'
import {IP,ApiZuanShi,appid,Apiconfirpay,ApiqPayResult}    from '../../api'
import counter from "../../components/counter.vue";
import {getShopLists} from '../../vuex/getters'
import md5 from 'md5'
import { Indicator,Toast } from 'mint-ui';
export default {

    mixins: [myMixin],
 
  data () {
    return {
      ip:IP,

      integral:0,
      timer:null,
      isBalance:true,//通币支付
      isAlipay:false,//支付宝支付
      defaultarea:null,//默认收货地址
      lists:null,
      ispayon:false,//是否是待支付继续
      shopitemsroll:null,//商品滚动
      ordercodeid:"",//订单id
      payoption:{//确认支付option
          token:"",
          mobile:localStorage.getItem('zsmobile') != null ? localStorage.getItem('zsmobile') : "", 
          shoplist:[],
          orderid:"",
          totalprice:'',
          money:"",
          chargeType:"",
          iaddress:"",
          invoices:"",
          bid:"",
          paytype:0,
          cartid:0,

        },
        
        payresopt:{//支付结果查询option
          type:2,
          ordercode:"",
          mobile:localStorage.getItem('mobile') != null ? localStorage.getItem('mobile') : "", 
        },
       }
  },
   mixins: [myMixin],
  vuex:{
    getters:{
    
      shopitems:getShopLists,//购物车选中结算商品
    }
  },
  computed:{
       ordertotal(){//总支付价格
        let vm = this,
          totalmoney=0

         vm.shopitems.forEach(function(value){
         
            totalmoney += (value.price||value.paycount)*value.buycount
        })
           
        
        return totalmoney
       },
          othercount:function(){//支付宝付款数
          let vm =this

          if (vm.isBalance) {
            if (vm.integral-vm.ordertotal>=0) {
              return 0
            }else{
              return vm.ordertotal - vm.integral
            }
          
          }else{
            return vm.ordertotal
          }

    }
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      
    // vm.coinName =  localStorage.getItem("zscoinName")||'奖券';//钻石别名
    //  vm.integral =  localStorage.getItem("zsintegral")||100000;//个人积分
    // vm.gamesbill = localStorage.getItem("zsgameCoin")||100//钻石数目
      vm.integral = Number(vm.$route.query.integral).toFixed(2);//个人积分
      vm.ordercodeid = vm.$route.query.ordercodeid//订单
     
    // vm.gamesbill = 100//钻石数目
    vm.payoption.token = vm.$route.query.token
    vm.ispayon = vm.$route.query.ispayon
    
      
  vm.getDefaulta()//

    this.$nextTick(function(){
        vm.shopitemsroll = vm.addiscroll("wrshop")
    })


   


     
       
         

       
       
     
  
     
     

      transition.next()
    },
    activate(transition) {
  
      transition.next()
    },
    deactivate(transition) {
     this.timer = null
      transition.next()
    }
  },
  methods:{
    enterOtherAddress(){//选择其他收货地址
     this.$router.go({name:"administration"})
    },
    //获取默认收货地址列表
    getDefaulta(){
      let lists=[],
       vm=this,
      pingstr='';
      pingstr= localStorage.getItem('arealists')
      if (pingstr) {
         lists = pingstr.split('&')
      

              for(let i = 1 ;i<=lists.length-1;i++){
                let item = JSON.parse(lists[i])
               
                      if (item.isDefault==1) {
                        vm.defaultarea = item
                        return
                      }
                 
              }
          
            }else{
              vm.defaultarea={}


            }
             // vm.$nextTick(function(){
             //         vm.addiscroll("wrptwo")
             //         Indicator.close()
             //      })

    },

        //支付方式切换
    checkClick(value){
      let vm =this
      if (value=='isBalance') {
        vm.isBalance = !vm.isBalance
      }else if(value='isAlipay'){

        vm.isAlipay=!vm.isAlipay


      }

    },
     //检查兑换方式选择
        chosePayCheck(){
          let vm =this 
        
        if (vm.isBalance&&vm.isAlipay==false) {
                      if (vm.othercount==0) {
                        vm.beginPay()//通币余额支付

                          }else{
                              Toast({
                              message:"通币不足"
                              })                          
                          }


              }else if (vm.isAlipay&&vm.isBalance==false) {
                  
                  // 、、纯支付宝支付
                    vm.beginPay()//


              }else if (vm.isAlipay&&vm.isBalance) {

              // if (vm.integral >= vm.ordertotal) {
              //   if (vm.othercount<=0) {
                  vm.beginPay()//通币余额支付
              //   }else{

              //     // vm.exChangeTongBi()//兑换钻石请求SDK
              //     //支付宝支付
              //   }
                



              //     }else{
              //         Toast({
              //         message:"金额不足以抵扣"
              //         })
              //     }


              } else{
                Toast({
                  message:"请选择支付方式"
                })
                
              }
        },
        payKindOfAlipay(){//支付宝支付

             let str = `<form name="punchout_form" method="post" action="https://openapi.alipay.com/gateway.do?charset=UTF-8&method=alipay.trade.wap.pay&sign=R90bu6GRQWhoFlrCczlAdo9UyrM%2BdWHzoc499wZsJ%2FLtZfKwm8G8uQ1jmooWbNlhvI%2FVmpvRiWXMI15CaxhRHwDfqcMptTMJkHeHE79pXmtoB%2Bfn%2Bh3jtGhy1gUjpyzNuSw8a1vbOpfj%2F4tqave%2BlzKvf5bJ93E8eDGFWV2kMEAXOkGYdY3oW0VGK89kxDXxp4BeZz%2Ftf2cPCegYGZrbtV%2FIs94ab2k1OkYmdJuaHKn9c28FcaQZ50Ze2UOeANfbVuTSPSVrX2rQ%2BM%2FARUQLADX%2BFW1rggMs00Fx47NNSldMEdc2R9wqr%2FJGf74q1DNPtpk2aGoS7yzLRmgwkk6Ylw%3D%3D&return_url=http%3A%2F%2F115.29.5.34%3A8220%2Fjgame%2Findex.html%23%21%2Fquerypayresult%3FuserId%3D20%26payOrderCode%3DPALi20170406140620044%26mobile%3D15978456142&notify_url=http%3A%2F%2F115.29.5.34%3A8220%2Fjgame%2Finter%2Fpay%2Falicharge%2Fcallback&version=1.0&app_id=2016080300158680&sign_type=RSA&timestamp=2017-04-06+14%3A06%3A20&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json">
<input type="hidden" name="biz_content" value="{    &quot;out_trade_no&quot;:&quot;PALi20170406140620044&quot;,    &quot;total_amount&quot;:&quot;53.0&quot;,    &quot;subject&quot;:&quot;商城购买消费支付&quot;,    &quot;seller_id&quot;:&quot;2088102169787373&quot;,    &quot;product_code&quot;:&quot;QUICK_WAP_PAY&quot;  }">
<input type="submit" value="立即支付" style="display:none" >
</form>
<script>document.forms[0].submit();\<\/script>`
this.$els.nulllabel.innerHTML=str
console.log(this.$els.nulllabel)
document.forms[0].submit()
// let hstr = document.getElementById("nulllabel")
// hstr.innerHTML=str
// console.log(hstr)

        },
        //  //兑换申请请求SDK
        // exChangeTongBi(){//兑换钻石
        //   let vm=this,
        //   sign = '',
        //   option={};
        //   option.userId = localStorage.getItem('zsuserid') 
        //    option.mobile = localStorage.getItem('zsmobile') 

        //     // option.money =parseFloat(40.0).toFixed(1)  //需要兑换申请钻石数
        //     option.money =parseFloat(vm.deduction).toFixed(1)  //需要兑换申请钻石数
            
        //     option.appId = appid
          
        //       Object.keys(option).sort().forEach(function( value,index,array){
              
        //                 sign +=`${value}=${option[value]}&`
        //                 if (index==array.length-1) {
                        
                         
        //                   sign = sign.slice(0,sign.length-1)
                         
        //                     sign = md5(sign)
                           

        //                   }
        //               }) 
                  
        //           // option.iscross = true //跨域
        //           option.sign = sign; 

         
        //       // Toast({message:"进入兑换申请"})

        //   vm.http.post(ApiZuanShi,option).then((response)=>{
        //     // Toast({message:"1进入兑换申请"})
        //     if (response.data.success==1) {
        //           vm.postMobile(response.data.data)//客户端发起请求
        //           // Toast({message:"发送兑换申请响应数据"})
        //     }else{
        //       // Toast({message:"兑换申请失败"})
        //        Toast({message:response.data.msg})
        //     }


            
            
          

        //   }).catch((response)=>{

        //     Toast({message:"失败",
        //       duration:20000})
        //   })


        // },
        //向客户端发起兑换请求
        // postMobile(data){
        //    // Toast({message:"2进入向客户端发起兑换申请的方法"})
        //     var u = navigator.userAgent;
        //   if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        //    // Toast({message:"2发起app客户端兑换申请"})
        //       window.Logic.showMsg(0x4,JSON.stringify(data));
        //   } else if (u.indexOf('iPhone') > -1) {//苹果手机
        //   window.webkit.messageHandlers.deliver.postMessage(JSON.stringify(data));
            
        //   } else if (u.indexOf('Windows Phone') > -1) {//winphone手机

        // }
        //       this.beginPay()//通币支付请求
        // },

         beginPay(){//支付订单第二步
              let vm =this       
         
          Indicator.open('支付中...')
          vm.payoption.totalprice = vm.ordertotal.toString()

          vm.payoption.money = vm.othercount
        
          vm.payoption.payee=vm.defaultarea.recvName +',' + vm.defaultarea.recvMobile
          vm.payoption.iaddress = vm.defaultarea.areastr
           console.log(vm.ispayon.toString())
          if (vm.ispayon.toString() == 'true') {//待支付继续支付
             console.log('进入了待支付')
                 
                    vm.shopitems.forEach(function(value){
                    value.shopname = value.goodsname
                    value.shoptype=2
                    value.price=value.paycount/value.buycount
                     value.shopimg = value.cover
                     value.shopid = value.goodsid
                      value.mid=localStorage.getItem('zsmid') != null ? localStorage.getItem('zsmid') : "",

                      
                      delete value.isonsale
                      delete value.check
                      delete value.discounttype
                      delete value.inventory
                      delete value.orderstatus
                      delete value.goodsid
                      delete value.iscomment                    
                    
                      delete value.nickname
                      delete value.goodsname
                      delete value.cover
                      delete value.paycount
                              
                      vm.payoption.orderid = ""
                      delete value.ordercode
                      value.itemno = ''
                      value.providers = ''
                      value.discount = ''
                      value.period = ''
                      value.sid = ''

                    }) 
         

          }else{//购物车购买
            console.log('进入了购物车')

              vm.shopitems.forEach(function(value){
                    delete value.isonsale
                    delete value.check
                    delete value.discounttype
                    delete value.inventory
                    delete value.orderstatus
                    delete value.goodsid
                    delete value.iscomment

              }) 
         
           
          }


             

         
          vm.shopitems.forEach(function(value){
            delete value.isonsale
            delete value.check
            delete value.discounttype
            delete value.inventory
            delete value.orderstatus
            delete value.goodsid
            delete value.iscomment
          }) 
         //第三方支付传参

              if (vm.othercount!==0&&vm.isBalance==true) {
                
                console.log("混合支付")
                vm.payoption.paytype=3
                // 如果payType   =3  ，     chargeType   =    ali_pay 支付宝    wx_pay 微信
                // payType  0 余额  1支付宝 2 微信 3 混合支付
               
              }else if(vm.isBalance==false&&vm.othercount!==0){
                console.log("纯第三方支付")
                vm.payoption.paytype=1//支付宝
                 vm.payoption.chargeType="ali_pay"

              }else if (vm.isBalance==true&&(vm.othercount==0)) {
                console.log("纯余额支付")
                vm.payoption.paytype=0
                
              }

              // if (vm.payoption.othercount!==0) {

              //   vm.payoption.chargeType=""
              //   switch(vm.curindex){
              //     case 0:
              //     vm.payoption.chargeType="wx"
                  
              //     break;
              //     case 1:
              //     vm.payoption.chargeType="alipay_wap"
                  
              //     break;
              //     default:

              //   }
              // }
        
         //第三方支付传参

          vm.payoption.shoplist = JSON.stringify(vm.shopitems)       
            // vm.payoption.paytype=0
            // vm.payoption.chargeType=""        
            vm.axios.post(Apiconfirpay,vm.payoption).then((response)=>{
              let data = response.data
              if (data.retcode==1) {
                      Indicator.close()
                   switch(data.data.payType){
                    case 0:
                          vm.ordercodeid=data.data.ordercode
                          Toast({message:'购买成功'})
                            setTimeout(function(){
                                vm.$router.go({name:"myorders",params:{id:2 }})
                              },800)
                      break;//纯余额支付
                    case 1:
                          vm.$els.nulllabel.innerHTML=data.data.form
                          document.forms[0].submit()
                      break;//支付宝支付
                    case 3:
                          vm.$els.nulllabel.innerHTML=data.data.form
                          document.forms[0].submit()
                      break;//混合支付
                    default:

                   }

             

                
              }else{
                  Indicator.close()
                  Toast({
                    message:data.retmsg
                  })
                 
              }
             

          })
        










        },
        //查询订单支付结果
        queryPayResult() {
          let vm =this
          vm.payresopt.ordercode = vm.ordercodeid
            vm.payresopt.mobile = sessionStorage.getItem("zsmobile")
            vm.axios.post(ApiqPayResult,vm.payresopt).then((response)=>{
              if (response.data.retcode==1) {
                Indicator.close()
                Toast({
                message:"购买成功",
                duration:500})
                
              
              }

            }).catch((response)=>{

            })

        },
   
   
    

  }
      
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/style.scss";
  @import '../../assets/css/swiper.css' ;  



         .mainwrapper{
           background:$color-primary;
          width: 100%;
          height: 100%;         
           padding-left: px2rem(70);
           padding-bottom:px2rem(60);
           color:$color-cheapccc;
           
              .part-left{
                  width:45%;
                  position:relative;
                 
                  #wrapper{

                    position: absolute;
                     width: 100%;
                    height: 100%;
                    z-index: 1;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    
                    overflow: hidden;
                    // background:$color-primary;                
                  }              
                  #scroller{
                    width:100%;
                      min-height: 100%;
                      padding:px2rem(12);
                      background:$color-primary;
                      h1{
                        height: px2rem(30);
                        line-height: px2rem(30);
                        background:#10121A;
                        color:white;

                      }
                      .shipping{
                          width: 100%;
                           min-height: 40%;
                           padding:0 px2rem(10);
                            .name{
                              width: 100%;
                              height: px2rem(42);
                              line-height: px2rem(42);
                            }
                            .adress{
                               min-height: px2rem(42);
                            
                            }
                            .editor{
                              width: 100%;
                              height: px2rem(42);
                              line-height: px2rem(42);
                              span{
                                @include font-dpr(12px);
                                letter-spacing: px2rem(1); 
                              }

                            }
                      }
                      .goods{
                          width: 100%;

                          .good{
                              padding:px2rem(10);
                            .good-img{
                              width: px2rem(80);
                              min-height: px2rem(80);
                              background:red;
                              flex:none;
                            }
                            .good-info{
                              padding-left:px2rem(8);
                               @include font-dpr(10px);
                                 color: $color-cheapccc;
                              .good-title{
                                  white-space: nowrap;
                                  text-overflow: ellipsis;

                                 span{
                                  color:$color-zibai;
                                  @include font-dpr(8px);
                                 

                                 }
                              }
                              .good-style{
                                margin-top: px2rem(10);
                                span{
                                  color:$color-zibai;
                                   @include font-dpr(11px);
                                }
                              }
                              .good-price{
                                span{
                                  color:$color-orange;
                                   @include font-dpr(13px);
                                }
                              }
                            }
                          }
                      }

                    }
                    
                  }
              }
              .part-rigth{
                  width: 55%;
                 position:relative;
                 color:$color-cheapccc;
                 .header{
                  height: px2rem(50);
                  line-height: px2rem(50);
                  text-indent: px2rem(10);
                   background:#10121A;
                 }
                  .payclass{
                        @include font-dpr(14px);
                        height: px2rem(60);
                        line-height: px2rem(60);
                       
                      
                        padding:0 px2rem(10);
                        span{
                          @include font-dpr(14px);
                        }
                        i{
                          font-size: 1.5em;
                        }
                      }
                      .alipayclass{
                        .left{
                          position:relative;
                          overflow: visible;
                          .fontcolors{
                            position:absolute;
                            top: 0px;
                            left: 100%;
                            margin-left: 20px;
                          }
                          .aili{
                            width: 100%;
                            height: 100%;
                            .al-left{
                              width: 50px;
                              height: 50px;
                            }
                            .al-right{
                              // color: #ffffff;
                              height: 100%;
                              padding-left:15px;
                              p{
                                height: 35px;
                                line-height:35px;
                                position:relative;
                                @include font-dpr(10px);
                                &:first-child{
                                  font-weight: bolder;
                                  @include font-dpr(14px);
                                }
                                .tuijian{
                                  position:absolute;
                                  width: 60px;
                                  left:100px;
                                }

                              }
                            }

                          }

                        }
                        .right{

                        }

                      }
                 
               .paymoney{
                      position:fixed;
                      height: px2rem(60);
                      width: 50%;
                      right: 0px;
                      bottom:px2rem(60);
                      padding:0 px2rem(10);
                      z-index: 10;
                       color:#FFFFFF;
                      background:$color-deepblue;
                      .order-price{
                        color:$color-orange;
                        display: inline-block;
                        @include font-dpr(14px);
                        text-indent: 10px;
                      }
                      .beginorder{
                        display: inline-block;
                        width: px2rem(120);
                        height: px2rem(40);
                        text-align: center;
                        line-height: px2rem(40);
                        color:#000000;
                        background:$color-orange;

                      }
                     
               }
                 

              }
                
              
    
     

  
</style>
