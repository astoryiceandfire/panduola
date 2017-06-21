<template>
  <div class="home">
      <div class="srapper" flex="dir:left">
      <!-- 左边wraper -->
            <div class="writem">
             <!--  <div id="wrapper" v-el:wrpone>
                  <div id="scroller"> -->
                      <div class="home_up">
                             <div class="swiper-container" v-el:imgswiper>
                                <div class="swiper-wrapper">
                                  <div class="swiper-slide" v-for="item in datainfo.images">
                                    <img :src="ip+item">
                                  </div>
                                </div>
                                <div class="swiper-pagination"></div>
                              </div>
                       
                      </div>
                
                      <div class="home_down">
                           <h1 class="shoptitle" flex="cross:center main:justify">
                             <span class="left">
                                <i slot="icon" :class=['fa',aclist[type].imgi] aria-hidden="true"></i>{{aclist[type].title}}
                                <counter></counter>
                             </span>
                             <span class="right">第{{datainfo.periods||datainfo.period}}期</dpan>

                           </h1>
                           <div class="middle" flex="dir:top"><!-- //这个flex暂时就这样吧 -->
                             
                             <h2>{{datainfo.title}}</h2>
                            <!--  <small>{{datainfo.subhead}}</small> -->
                             <small v-if='datainfo.limitmember!==0'>限购数量{{datainfo.limitmember}}次</small>
                                  <!--  进度条 -->
                                 <!--  //幸运抢购 限时抢购 -->
                                   <div v-if="!(type==2)" class="conduct-info">
                                        <div class="conduct-info-top">
                                          <p>剩余</p>
                                          <p>总需</p>
                                        </div>
                                      <div class="conduct-info-center">
                                        <p>{{datainfo.remainmember}}</p>
                                        <p>
                                          <i :style="{width:Math.round(datainfo.joinedmember/datainfo.totalmember*100)+'%'}"></i>
                                          <span :style="{left:Math.round(datainfo.joinedmember/datainfo.totalmember*100)+'%'}"></span>
                                        </p>
                                        <p>{{datainfo.totalmember}}</p>
                                      </div>
                                    
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
                <section class="wr_top" flex="main:justify">
                  <div v-touch:tap='enterRuls' class="left" flex="cross:center main:center"><i></i><span>活动规则</span></div>
                  <div  v-touch:tap="enterphotos" class="middle" flex="cross:center main:center"><i></i><span>图文详情</span></div>
                  <div class="right" flex="cross:center main:center" v-touch:tap='enterphase'><i></i><span>往期揭晓</span></div>
                
                </section>
                <section class="wr_bottom">
                  <h1 class="zs-border-left"><span>所有参与记录</span></h1>
                   <div v-for="item in orderpage" class="recode" flex="dir:left">
                     <div class="left" flex="main:center cross:center">
                       <div class="imgwr">
                       <img v-if='item.portrait' :src="ip+item.portrait" alt="" />
                       <img v-else src="../../assets/images/default.png" alt=''>
                       </div>
                     </div>
                     <div class="right" flex="main:justify cross:center box:last">
                       <div class="name" flex="dir:top">
                         <span class="title">{{item.nickname}}</span>
                         <span>参与{{item.buycount||item.paycount}}人次</span>
                         <span>{{item.buytime*1000 | dateFormat 'yyyy-MM-dd hh:mm:ss'}}</span>
                       </div>
                       <div class="adress" flex="dir:top ">
                         <span>用户地址</span>
                         <span>{{item.areaip.slice(0,8)}}...</span>
                       </div>
                     </div>
                   </div>
                 
                </section>
                  
                </div>
              </div>
              <div class="footer" v-if='datainfo.remainmember!==0' v-touch:tap="enterPayMoney()"><span>立即参与</span></div>
            </div>
             
                 <div v-if="isHidden"  class="zs-container">
                 <div  class="wrap-message" flex="dir:top cross:center">
                     <div class="close">
                          <i v-touch:tap="hiddenWraper" class="closeicon" aria-hidden="true"></i>
                          </div>
                     <p class="title">选择参与人次</p>
                     <div class="compute" flex="main:justify-content cross:center">
                           <div v-touch:tap="addreducetimes('reduce')" class="reduce"><i class="fa fa-minus" aria-hidden="true"></i>
                                  </div>
                           <input type="number" v-on:keyup="wirteNumber" name="" v-model="buytimes">
                           <div v-touch:tap="addreducetimes('add')" class="add"><i class="fa fa-plus" aria-hidden="true"></i>
                              </div>
                           <span v-touch:tap="getTopTimes" class="topcount">最大</span>
                         </div>
                     <div v-touch:tap="balanceBill" class="atonce" >
                        <span >立即参与</span>
                        </div>              
                 </div>
                  </div>
              

              <!--  右面的滚动 -->

      </div>
  
 
  </div>
</template>

<script>
// import tophaseout from 'view/activity/Tophaseout'
import Swiper    from 'assets/js/swiper'
import {myMixin}    from '../../mixin'
import {IP,
      ApiComProblem,
        ApiIshopInfo, //幸运抢购和限时抢购
        ApiOrderPage, //幸运抢购与限时抢购参与记录
        ApiAuctionInfo, //低价竞拍
        ApiOrderList, //竞拍参与记录
        ApiStarttime, //起始参与时间
        ApiNewestIshop,//最新一期夺宝
        ApibalanceOrder,//结算
        ApiPassIshopList,//查询往期揭晓
    }    from '../../api'
import counter from "../../components/counter.vue";
import { Indicator,Toast } from 'mint-ui';
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
            ip:IP,
             id:0,//活动商品id
             type:0,//商品活动类型-1幸运抢购2显示抢购3限时竞拍
             datainfo:{},//商品详情
              isHidden:false,//参与次数选择弹窗
              buytimes:1,//准备参与次数
              isRequesting:false,//避免多次提交请求
              rightGun:null,//参与记录滚动
              option:{
                mobile:undefined,
                shoptype:undefined,
                shopid:undefined,
                buycount:undefined,
                paycount:undefined,

              },
            orderpage:[],//所有参与记录
            opinglist:{},//即将揭晓
            adverlist:{},//公告信息

       }
  },
  computed:{
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      vm.datainfo=[]//清空数据
      vm.id=vm.$route.params.id;
      vm.type=vm.$route.query.type;
      vm.buytimes = 1

     
       if (vm.type==2) {
           vm.getData(vm.id,ApiAuctionInfo)// 低价竞拍 商品详情
           vm.option.shoptype = Number(3) 
           vm.getJoinRecode(ApiOrderList)//查询所有低价竞拍参与记录
            
       }else{
           vm.getData(vm.id,ApiIshopInfo)//幸运抢购 限时抢购 商品详情
           vm.option.shoptype = Number(1) 
           vm.getJoinRecode()//查询所有参与记录

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
  methods:{


    //进入往期揭晓
    enterphase () {
      let vm = this

      vm.$router.go({name:'tophaseout',params:{'id':vm.id}})
    },
    //进入图文详情
    enterphotos(){
      let vm = this
      vm.$router.go({name:'graphicDetails',params:{id:vm.id}})
    },
    //进入活动规则
    enterRuls(){
      let vm =this
      if (vm.type==0||vm.type==1) {
        this.$router.go({name:'ruls'})
      }else{
        this.$router.go({name:'ruls',query:{isDiJia:true}})
      }
    },
    //结算第一步
    balanceBill(){

     

      let vm = this,
        shoptype = 1;
        if (vm.type==0||vm.type==1) {
          shoptype = 1
        }else{
          shoptype = 3
        }
      if (vm.isRequesting==true) return//如果正在请求在返回
       vm.hiddenWraper()
        Indicator.open("请求中...")
        vm.isRequesting = true
          // vm.option.shoptype = Number(vm.type) 
          vm.option.shopid = vm.id
          vm.option.buycount = vm.buytimes
          vm.option.paycount = vm.buytimes
          vm.option.mobile = localStorage.getItem('zsmobile') 

          vm.axios.post(ApibalanceOrder,vm.option).then((response)=>{
            vm.isRequesting = false

            if(response.data.retcode == 1) {
                  Indicator.close()
                  vm.$router.go({
                    name:"activityPayMoney",
                    params:{id:vm.id},
                    query:{type:shoptype,
                            buycount:vm.buytimes,
                            paycount:vm.buytimes,
                            integral:response.data.data.money,
                            ordercode:response.data.data.ordercode}
                  })
                
               
              }else{
                  Indicator.close()
                Toast({
                  message:response.data.retmsg
                })
              }

          }).catch((response)=>{
             vm.isRequesting = false
              Indicator.close()
          })
    },
    //键盘输入大小
    wirteNumber(){
      let vm = this,
        remainder = vm.datainfo.totalmember-vm.datainfo.joinedmember,
        plremainder = vm.datainfo.limitmember-vm.datainfo.buyInfo.buycount
    
        vm.buytimes = Number(vm.buytimes)

        if (vm.buytimes<=0) {
          vm.buytimes=1
        }

      if (vm.datainfo.limitmember==0&&vm.buytimes>remainder) {
        console.log("317")
         vm.buytimes = remainder
       }else if(vm.datainfo.limitmember!=0&&vm.buytimes>plremainder){
        console.log('320')
        vm.buytimes = plremainder
       }

    },
    //参与次数最大
    getTopTimes(){
      let vm =this
     
      if (vm.type==2) {//低价竞拍
       return
      }
      if (vm.datainfo.limitmember==0) {
         vm.buytimes=vm.datainfo.totalmember-vm.datainfo.joinedmember
       }else{

        let remainder = vm.datainfo.totalmember-vm.datainfo.joinedmember,
        plremainder = vm.datainfo.limitmember-vm.datainfo.buyInfo.buycount
         vm.buytimes = remainder>=plremainder?plremainder:plremainder-remainder
       }
     
     
    },
    //隐藏遮罩
    hiddenWraper(){
      this.isHidden=false
      // this.buytimes=1//参与次数恢复1
    
       
    },
    //加减次数
    addreducetimes(str){

       
        let vm =this 
          if (str=='reduce') {
            if (vm.buytimes<=1) return
            vm.buytimes--
          }else if(str=='add'){
            if (vm.datainfo.limitmember==0) {
                if (vm.buytimes==vm.datainfo.totalmember-vm.datainfo.joinedmember) return
                vm.buytimes++
            }else{

                if (vm.buytimes==vm.datainfo.limitmember-vm.datainfo.buyInfo.buycount) return
                 vm.buytimes++
            }


          
          }
     
    },

    //立即支付 进入支付页面
    enterPayMoney(){
      let vm =this
      vm.isHidden =true
      // vm.$router.go({
      //   name:"activityPayMoney",
      //   params:{id:vm.id},
      //   query:{type:vm.type}
      // })

    },
  
    //即将揭晓数据
          getLotterActive(){
                  let vm =this
                vm.axios.post(ApiLotteryActivity).then((response)=>{
                        if(response.data.retcode == 1) {
                              let jsonData = response.data.data.list;
                              vm.opinglist = jsonData

                              // if (vm.shoplist.length==0) {
                              //   vm.isloading='暂无记录'
                              // }
                              vm.opinglist.sort(function(valuepev,valuenext){
                                return valuepev.downtime - valuenext.downtime

                              })
                           
                               // Vue.nextTick(function(){
                               //  vm.zswiper();
                               // })

                               setTimeout(function(){
                                        vm.zswiper();
                                },100)

                      
                      }
                }).catch((response)=>{

                })

          },
    //加载商品详情数据
        getData(id,api){
                let vm = this
              vm.axios.post(api, {
                id: id
              }).then((response) => {
                if(response.data.retcode == 1) {
                  let data = response.data.data
                  if (vm.type==2) {
                    data.limitmember=0
                  }
                  if (data.buyInfo==null) {
                    data.buyInfo={
                      buycount:0
                    }
                  }

                vm.datainfo = data
                 this.$nextTick(() =>{
                        vm.zsWiperImg()
                      
                    })
              
                }

              }, (response) => {
                
              })

        },
        //查询参与记录
        getJoinRecode(api=ApiOrderPage){
          let vm =this
          vm.axios.post(api,{shopid:vm.id,page:1,rows:1000}).then((response)=>{
                  if(response.data.retcode == 1) {
               
                  vm.orderpage = response.data.data.rows
                  if (vm.rightGun) {
                    vm.rightGun.refresh()

                  }else{

                          vm.$nextTick(function(){

                        vm.rightGun = vm.addiscroll("wrptwo")//右侧滚动
                      })

                  }
                
                  
                
                }
          }).catch((response)=>{

          })


        },
   
          //图片窗
          zsWiperImg(){
             let swiper = new Swiper(this.$els.imgswiper,{
              pagination: '.swiper-pagination',
              slidesPerView: 1,
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

  .home{
       background:#080A0F;
       padding-left: px2rem(70);
       padding-bottom:px2rem(60);
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
                                height: 45%;
                                background:#202533;
                                position:absolute;
                                z-index: 12;
                                top: 50%;
                                left: 50%;
                                -webkit-transform: translate(-50%, -50%);
                                transform:translate(-50%,-50%);
                               
                                max-width:px2rem(400);
                                @include font-dpr(14px);
                                i.closeicon{
                                  background:url(../../assets/images/closeicon@3x.png) no-repeat;
                                  background-size:cover;
                                  width: px2rem(20);
                                  height: px2rem(20);
                                  display: inline-block;
                                }
                               
                                justify-content: space-around;
                                .close{
                                  text-align: right;
                                  width: 100%;
                                  padding-top:px2rem(10);
                                 padding-right:px2rem(20);
                                 margin-bottom: px2rem(-20);
                                }
                                .title{
                                  text-align: center;
                                  color:$color-zibai;
                                  @include font-dpr(20px);
                                }
                                .compute{
                                    width: 80%;
                                    height: px2rem(50);
                                    line-height: px2rem(50);

                                    i{
                                      
                                    }
                                    .reduce,.add{
                                      width: px2rem(100);
                                      height: 100%;
                                      background:#505D80;
                                      text-align: center;
                                    }
                                    input{
                                      height: px2rem(50);
                                    
                                      background:$color-primary;
                                      color:$color-orange;
                                      border:none;
                                      text-align: center;
                                    }
                                    .topcount{
                                      color:$color-deepblue;
                                       background:#505D80;
                                       height: px2rem(50);
                                      line-height: px2rem(50);
                                      width: px2rem(120);
                                      text-align: center;
                                      margin-left: px2rem(4);
                                      @include font-dpr(16px);
                                    }
                                }
                                .atonce{
                                  text-align: center;
                                  width: 80%;
                                  span{
                                    display: inline-block;
                                    height: px2rem(50);
                                    line-height: px2rem(50);
                                    width: 100%;
                                    background:$color-orange;
                                  }
                                }

                          }
                 }
                 //弹窗


         .srapper{
          width: 100%;
          height: 100%;
           
              .writem{
                width:40%;
                position:relative;
                height: 100%;

               

               

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
                       

                    }
                   
                    .home_down{
                      height: 50%;
                      background:#10121A;
                      padding:0 px2rem(10);
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
                                //进度条
                                .conduct-info {
                                        padding: px2rem(10) px2rem(15);
                                        box-sizing: border-box;
                                        >div {
                                          display: -webkit-box-flex;
                                          display: flex;
                                        }
                                        .conduct-info-top {
                                          @include font-dpr(12px);
                                          color: $color-cheapccc;
                                          p:nth-of-type(1) {
                                            -webkit-flex: 7.5;
                                            flex: 7.5;
                                          }
                                          p:nth-of-type(2) {
                                            -webkit-flex: 1;
                                            flex: 1;
                                          }
                                        }
                                        .conduct-info-center {
                                          @include font-dpr(22px);
                                          -webkit-align-items: center;
                                          align-items: centner;
                                          p:nth-of-type(1) {
                                            color: #F5CB00;
                                            -webkit-flex: 1;
                                            flex: 1;
                                          }
                                          p:nth-of-type(2) {
                                            color: #F5CB00;
                                            -webkit-flex: 6;
                                            flex: 6;
                                            height: px2rem(10);
                                            background: #ccc;
                                            border-radius: px2rem(20);
                                            margin: 0 px2rem(30);
                                            position: relative;
                                            i {
                                              position: absolute;
                                              left: 0;
                                              top: 0;
                                              width: 50%;
                                              height: 100%;
                                              background: #F5CB00;
                                              border-radius: px2rem(20);
                                            }
                                            span {
                                              position: absolute;
                                              left: 50%;
                                              top: px2rem(-3);
                                              width: px2rem(15);
                                              height: px2rem(15);
                                              background: #F5CB00;
                                              border: 2px solid #F5CB00;
                                              border-radius: 50%;
                                            }
                                          }
                                          p:nth-of-type(3) {
                                            color: #F5CB00;
                                            -webkit-flex: 1;
                                            flex: 1;
                                          }
                                        }
                                        
                                      }
                                      // 进度条
                                 h2{
                                  color:$color-white;
                                  @include font-dpr(14px);
                                  height: px2rem(50);
                                  line-height: px2rem(50);
                                 } 
                                 small{
                                  color:#3B4661;
                                   color:#FFFFFF;
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
                          }
                    
                    }

                #scroller1{
                  //最新揭晓
                   background:$color-primary;
                  padding:px2rem(12);
                  padding-left:0px;
                    section.wr_top{
                      color:$color-white;
                      div{
                        width: 30%;
                        height: px2rem(50);
                        line-height: px2rem(50);
                        background:$color-zise;

                      }
                            i{
                                    display: inline-block;
                                    width: px2rem(30);
                                    height: px2rem(30);
                                    margin-right: px2rem(10);
                                   
                                    
                            }
                          div.left{
                            i{
                              background: url(../../assets/images/ActivityDetails-list01-icon.png)center no-repeat;
                              background-size: 100% 100%;
                            
                             
                            }

                          }
                          div.middle{
                            i {
                                  background: url(../../assets/images/ActivityDetails-list02-icon.png)center no-repeat;
                                 
                                  background-size: 100% 100%;
                                }
                          }
                          div.right{
                            i {
                                background: url(../../assets/images/ActivityDetails-list03-icon.png)center no-repeat;
                               background-size: 100% 100%;
                               
                              }
                          }
                     
                        
                           
                                   
                        }
                    //热门活动
                    section.wr_bottom{
                      // height: calc(55vh);
                          h1{
                            @include font-dpr(14px);
                             margin-top: px2rem(10);
                             color:$color-fontsingle;

                          }
                          .recode{
                            height: px2rem(100);
                            width: 100%;
                            .left{
                              width: 25%;
                              background:#10121A;

                              .imgwr{
                                width: px2rem(70);
                                height: px2rem(70);
                                background:#ccc;
                                border-radius:50%;
                                border:none;
                                img{

                                }
                              }
                            }
                            .right{
                                  width: 75%;
                                  background:$color-zise;
                                  .name{

                                  }
                                  span{
                                    color:#6E6F72;
                                  }
                                  .title{
                                    color:$color-cheapccc;
                                  }
                                  .adress{
                                    width: px2rem(130);

                                  }
                            }
                          }

                       

                    }

                         
                  
                }



         }
    
     
  }
  
</style>
