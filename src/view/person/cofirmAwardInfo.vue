<!-- //幸运抢购 限时抢购 低价竞拍支付页面 -->
<template>
  <div class="home">
      <div class="srapper" flex="dir:left">
      <!-- 左边wraper -->
            <div class="writem" flex="main:center">
                  <div class="cof-wriper">
                    <p class="titlename">中奖确认</p>
                      <div class="cof-img">
                      <img :src="ip + item.cover">  
                          </div>
                      <p class="cof-name">{{item.shopname||item.title}}</p>
                      <p class="cof-number" flex="main:center cross:center">
                        <span class="color-left">{{item.code? "兑换码：":'幸运号码'}}</span>
                        <span class="fa-circle-organbg color-right" >{{item.bingocode||item.code}}</span></p>
                
                  </div>
                    
                                     
                    <!--   </div>
                    
                  </div> -->
          
            </div>
            <!-- 左边wraper -->
            
           <!--  右面的滚动 writem-->
           <div class="writem1">
              <div id="wrapper1" v-el:wrptwo>
                <div id="scroller1">
                  <div class="inset-wraper-up" flex="dir:top cross:center">
                    
                  
                          <div class="cof-item cof-item-first" flex="main:justify cross:center">
                            <div class="item-left">
                            <span>订单流程</span>
                                </div>
                            <div class="item-right"><span class="fa-circle-organbg">{{item.orderstatus}}</span></div>
                          </div>

                          <div class="cof-item  border1px setbottomborder" flex="main:justify cross:center">
                            <div :class="['item-left',item.buytime ? 'fa-circle-organbg':'']">
                            <i class="fa fa-circle" aria-hidden="true"></i><span>获得奖品</span>
                              </div>
                            <div class="item-right"><span>{{item.buytime*1000 | dateFormat 'yyyy-MM-dd hh:mm:ss'}}</span></div>
                          </div>

                          <div class="cof-item border1px setbottomborder" flex="main:justify cross:center">
                            <div :class="['item-left',item.addresstime ? 'fa-circle-organbg':'']">
                            <i class="fa fa-circle " aria-hidden="true"></i><span>确认收货地址</span></div>
                            <div class="item-right"><span>{{item.addresstime *1000 | dateFormat 'yyyy-MM-dd hh:mm:ss'}}</span></div>
                          </div>

                          <div class="cof-item border1px setbottomborder" flex="main:justify cross:center">
                            <div :class="['item-left',item.sendtime ? 'fa-circle-organbg':'']">
                            <i class="fa fa-circle" aria-hidden="true"></i><span>奖品派发</span></div>
                            <div class="item-right"><span>{{item.sendtime *1000 | dateFormat 'yyyy-MM-dd hh:mm:ss'}}</span></div>
                          </div>

                          <div class="cof-item border1px setbottomborder" flex="main:justify cross:center">
                            <div :class="['item-left',item.receivetime ? 'fa-circle-organbg':'']">
                            <i class="fa fa-circle" aria-hidden="true"></i><span>确认收货</span></div>
                            <div class="item-right"><span>{{item.receivetime*1000 | dateFormat 'yyyy-MM-dd hh:mm:ss'}}</span></div>
                          </div>

                         <!--  <div class="cof-item border1px setbottomborder" flex="main:justify cross:center">
                            <div :class="['item-left',isCheck ? 'fa-circle-organbg':'']">
                            <i class="fa fa-circle" aria-hidden="true"></i><span>签收完成</span></div>
                            <div class="item-right"><span>2016-12-30-121-2-</span></div>
                          </div> -->
                      </div>
                      <!-- #inset-wraper-up -->
                       <!-- #inset-wraper-down -->
                       <div class="inset-wraper-down">
                           <div class="cof-item cof-item-first" flex="main:justify cross:center">
                              <div class="item-left">
                              <span>地址信息</span>
                                  </div>
                              <div class="item-right"><span></span></div>
                            </div>
                           <!--  <template v-if="defaultarea.recvName"> -->
                               <div class="cof-item border1px setbottomborder" flex="main:justify cross:center">
                              <div class='item-left'>收货人:
                              <span>{{defaultarea.recvName}}</span></div>
                              <div class="item-right">电话号码:<span>{{defaultarea.recvMobile}}</span></div>
                          </div>

                            <div class="cof-item border1px setbottomborder">
                              <div class='item-left item-adr'>收货地址:
                              <p>{{defaultarea.areastr}}</p></div>
                              
                          </div>
                          <!--   </template> -->
                         <!--    <template v-if="!defaultarea.recvName">
                            <div v-touch:tap="enterAddress">添加收货地址</div>
                              
                            </template>
 -->
                           
                       <!--    //确认收货地址 -->
                          <div v-if="!item.addresstime" class="cof-item cof-item-last border1px setbottomborder" flex="main:center cross:center">
                            <div v-touch:tap="cofrimAddress" class="item-left">
                          <span>确定</span></div>
                            <div v-touch:tap="enterAddress" class="item-right"><span>其他地址</span></div>
                          </div>
                            <!--    //确认收货 -->
                               <div v-if="item.sendtime&&!item.receivetime" class="cof-item cof-item-last border1px setbottomborder" flex="main:center cross:center">
                            <div v-touch:tap="getGoods" class="item-left">
                          <span>确定收货</span></div>
                            <div class="item-right"><span>退货。。</span></div>
                          </div>
                         <!--  发布晒单 -->
                           <div v-if="item.receivetime&&!item.code" class="cof-item cof-item-last border1px setbottomborder" flex="main:center cross:center">
                            <div v-touch:tap="showGoods(item)" class="item-left">
                          <span>晒单</span></div>
                           <!--  <div class="item-right"><span>退货。。</span></div> -->
                          </div>
                          <!--  发布晒单 -->



                       </div>
                        <!-- #inset-wraper-down-->

              
                
                  
                </div>
              </div>
           









            </div>

              <!--  右面的滚动writem1 -->

      </div>

 
  </div>
</template>

<script>

import Swiper    from '../../assets/js/swiper'
import {myMixin}    from '../../mixin'
import md5 from 'md5'

import {IP,Apigetareals,ApireceiveConfirm,appkey,appid,Apiaddrlist,Apirecharge,Apiawarddetails,ApiaddressConfirm,ApiqueryLottery,ApiadraucConfirm,ApiqueryExchangeInfo,ApiconfirmAddress,ApireConfirm} from '../../api'
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
         
            slideList:{A:{img:""}},
            exchangetexts:['未兑换','待确认地址','未发货','已发货','已签收'],
            ip:IP,
            isCheck:true,
            defaultarea:{
              recvName:'',
              recvMobile:'',
              areastr:'',
            },//用户收货默认地址
            item:{
              addresstime:'',
              bingocode:'',
              orderstatus:'',
              recevetime:'',
              shopid:'',
              type:'',
              sendtime:'',
              buytime:'',
              publishtime:'',
              cover:''
            },//中奖商品信息详情

           option:{//跨域公共请求凭借参数
                  "reqData":"",
                  'sign':"",
                  'signType':0
            },
          reqData : { //获取收货地址列表
                      id:0,     // 查询参数
                    pageNo : 1,   // 查询页数
                    userId : localStorage.getItem('userid') != null ? localStorage.getItem('userid') : "",   
                    pageSize : 10,  // 查询显示的数目
                     }


           


       }
  },

  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
         
         
   

   

    if (vm.$route.query.type==3) {
       vm.getdetailinifo(vm.$route.query.oid,Apiawarddetails)

    }else if(vm.$route.query.code){
      vm.getExchangeInfo(vm.$route.query.id)//获取兑换详情

    }else{
       vm.getdetailinifo(vm.$route.query.oid,ApiqueryLottery)

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

  },
  methods:{

    showGoods(item){
      this.$router.go({name:'postorder',query:item})
    },
    getExchangeInfo(id){//获取兑换记录详情
      let vm = this
      vm.axios.post(ApiqueryExchangeInfo,{'id':id}).then(function(response){
          let data = response.data.data
          data.buytime = Date.parse(new Date(data.exchangeTime))/1000||''
          data.addresstime = Date.parse(new Date(data.addresstime))/1000||''
           data.receivetime = Date.parse(new Date(data.receivetime))/1000||''
          data.sendtime = Date.parse(new Date(data.sendTime))/1000||''

          data.orderstatus = vm.exchangetexts[data.exchangeState]
          vm.item = data
          
         
          //
           if ( vm.item.payee) {

                let areas = vm.item.payee.split(',')
                   vm.defaultarea.recvName = areas[0]
                  vm.defaultarea.recvMobile = areas[1]
                  vm.defaultarea.areastr = vm.item.address

                  vm.$nextTick(function(){
                     vm.addiscroll("wrptwo")
                     
                  })
                }else{

                  vm.getDefaulta()//没有确认收货地址便加载默认地址
                }
               
          //
      },function(response){})

    },
    //确认收货
    getGoods(){
      let vm =this
      if (vm.$route.query.code) {//兑换商品收货
        vm.axios.post(ApireConfirm,{id:vm.$route.query.id}).then((response)=>{
              if (response.data.retcode==1) {
                vm.item.receivetime= new Date().getTime()/1000;
                vm.item.orderstatus='已签收'

              }
            })

      }else{
           vm.axios.post(ApireceiveConfirm,{oid:vm.item.oid}).then((response)=>{
              if (response.data.retcode==1) {
                vm.item.receivetime= new Date().getTime()/1000;
                vm.item.orderstatus='已签收'

              }
            })
      }
           
    },
    //确认地址
    cofrimAddress(){
              let vm =this,
            api='',
            option={
              iaddress:"",
              payee:"",
              invoicess:'',
             
            }

           
           

            option.iaddress=vm.defaultarea.areastr
            option.payee = `${vm.defaultarea.recvName},${vm.defaultarea.recvMobile}`

              if (vm.$route.query.type==3) {
                option.id = vm.$route.query.oid
               api = ApiadraucConfirm
              }else if(vm.$route.query.code){
                api = ApiconfirmAddress//兑换确认地址
                option.exChangeCode = vm.$route.query.code
                option.address = vm.defaultarea.areastr
              } else{
                api =ApiaddressConfirm
                 option.oid=vm.$route.query.oid
                 

              }


              if ((!option.iaddress&&!option.address)||!option.payee) {
                Toast({
                  message:"请添加地址信息",
                  duration:2000,
                })
                return 
              }


                Indicator.open("确认中...")
            vm.axios.post(api,option).then((response)=>{
              if (response.data.retcode==1) {

                vm.item.addresstime=new Date().getTime()/1000;
                vm.item.payee = vm.defaultarea.recvName + vm.defaultarea.recvMobile
                vm.item.iaddress = vm.defaultarea.areastr
                  Indicator.close()
                 Toast({
                      message:"确认完成",
                      duration:1000,
                    })
                

                  }else{
                     Indicator.close()
                    Toast({
                      message:"确认出错",
                      duration:1000,
                    })
                    

                  }



            },(response)=>{
               Indicator.close()
            })



    },
    //其他地区
    enterAddress(){
          this.$router.replace({
            name:'administration'
          })

    },
    //获取默认收货地址列表
    getDefaulta(){
      let lists=[],
       vm=this,
      pingstr='';
      pingstr= localStorage.getItem('arealists')
      console.log(pingstr)
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
             vm.$nextTick(function(){
                     vm.addiscroll("wrptwo")
                     Indicator.close()
                  })

           

      

           


    },
    
  	   //中奖详情
          getdetailinifo(oid,api){
          

            let vm =this
             Indicator.open('加载中...')
            vm.axios.post(api,{'oid':oid}).then((response)=>{
              if (response.data.retcode==1) {
                   Indicator.close()
                vm.item = response.data.data
                if ( vm.item.payee) {

                let areas = vm.item.payee.split(',')
                   vm.defaultarea.recvName = areas[0]
                  vm.defaultarea.recvMobile = areas[1]
                  vm.defaultarea.areastr = vm.item.iaddress

                  vm.$nextTick(function(){
                     vm.addiscroll("wrptwo")
                     
                  })
                }else{

                  vm.getDefaulta()//没有确认收货地址便加载默认地址
                }
               
               


              }
            })
          },

  	



    
    

  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/style.scss";
  @import '../../assets/css/swiper.css' ;  
     

  .home{
       background:$color-white;
       padding-left: px2rem(70);
       padding-bottom:px2rem(60);

         .srapper{
          width: 100%;
          height: 100%;
           
              .writem{
                width:40%;
                position:relative;
                height: 100%;
                 background:#10121A;
                .cof-wriper{
                      width: 80%;
                      height: 90%;
                      padding-top:px2rem(20);
                     
                      .titlename{
                        color:$color-cheapccc;
                        @include font-dpr(14px);
                        height: 10%;
                      }

                      .cof-img{
                        width: 100%;
                        height: 60%;
                       
                      }
                      .cof-name{
                        width: 100%;
                        height: 20%;
                       padding-top:px2rem(10);
                        background:$color-zise;
                        @include font-dpr(14px);
                        color: $color-white;
                        text-indent: px2rem(10);

                        // padding-top:px2rem(20);

                      }
                      .cof-number{
                          width: 100%;
                          height: 10%;
                          padding-left:px2rem(10);
                          padding-right:px2rem(10);
                          background:#202533;
                           @include font-dpr(8px);
                          span.color-left{
                            @include font-dpr(8px);
                            color: $color-cheapccc;
                          }
                            span.color-right{
                            @include font-dpr(10px);
                           
                          }

                      }
                }

               

               

              }
              .writem1{
                width: 60%;
                min-height: 100%;
                 position:relative;
                 background:$color-primary;
        
                 
                       

              }
                #wrapper,#wrapper1 {
                  position: absolute;
                  z-index: 1;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  overflow: hidden;
                
                  
                  // overflow: hidden;
                    background:$color-primary;
                  
                }

              
                   
                

                #scroller1{
                  //最新揭晓
                   background:$color-primary;
                    // background:$color-white;
                  padding:px2rem(12);
                  padding-left:0px;
                  color:$color-cheapccc;
                  margin-bottom: px2rem(60);
                    // height: 100%;
                    // width: 100%;
                  .inset-wraper-up{
                    background:#10121A;
                    margin-bottom: px2rem(10);
                     color:#A5A5A5;
                     height: 50%;

                       .cof-item{
                        flex:1;
                            width: 100%;
                            min-height: px2rem(45);
                            // padding:px2rem(8);

                        }
                        .cof-item-first{
                          background:$color-zise;
                        }
                  }
                  .inset-wraper-down{
                     background:#10121A;
                     color:#A5A5A5;
                     // height: 50%;
                     
                          @include font-dpr(12px);
                       .cof-item{
                           
                            width: 100%;
                            padding:px2rem(10);
                             min-height: px2rem(50);
                            
                              span{
                                color:#fff;
                                @include font-dpr(10px);
                              
                            }

                      }
                      .cof-item-first{
                         background:$color-zise;
                        span{
                            color:#A5A5A5;
                           @include font-dpr(12px);
                        }
                       
                      }
                      .cof-item-last{
                       .item-left,.item-right{
                          width: 20%;
                          
                          text-align: center;
                          margin-left:px2rem(10);
                          margin-right:px2rem(10);
                          height: px2rem(40);
                          line-height: px2rem(40);

                          background:$color-orange;
                          span{
                             color: $color-zise;

                             @include font-dpr(13px);
                               letter-spacing: px2rem(2);
                          }
                         
                       }

                      }
                        .item-adr{

                          span{
                            display: inline-block;
                          }
                        }


                  }
                   
              

                         
                  
                }



         }
    
     
  }
  
</style>
