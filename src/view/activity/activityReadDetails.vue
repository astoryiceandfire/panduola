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
                             </span>
                             <span class="right">第{{datainfo.periods||datainfo.period}}期</dpan>

                           </h1>
                           <div class="middle" flex="dir:top">
                             
                             <h2>{{datainfo.title}}</h2>
                             <small v-if='datainfo.subhead'>{{datainfo.subhead}}</small>
                             <div class="lucknumber"><span class="fontcolor">幸运号码：321115515</span></div>
                             <div class="winner">
                               <span>获奖者</span>
                               <div class="itemicon" flex="main:justify">
                                   <div class="left" flex="main:justify">
                                     <div class="left_left">
                                       <img v-if='datainfo.wuser.portrait' :src="ip + datainfo.wuser.portrait">
                                         <img v-else src="../../assets/images/default.png" alt=''>
                                     </div>
                                     <div class="left_right" flex="dir:top main:justify">
                                       <span>{{datainfo.wuser.nickname}}</span>
                                       <span>{{datainfo.publishtime*1000 | dateFormat 'yyyy-MM-dd hh:mm:ss'}}</span>
                                     </div>
                                   </div>
                                   <div class="right" flex="dir:top main:justify">
                                     <span>用户：{{datainfo.wuser.mid}}</span>
                                     <span>人次：{{datainfo.wuser.paycount||datainfo.wuser.buycount}}</span>
                                   </div>
                               </div>
                             </div>
                               
                               
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
                  <div class="middle" flex="cross:center main:center"><i></i><span>图文详情</span></div>
                  <div class="right" flex="cross:center main:center"><i></i><span>往期揭晓</span></div>
                
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
                     <div class="right" flex="main:justify cross:center">
                       <div class="name" flex="dir:top">
                         <span class="title">{{item.nickname}}</span>
                         <span>参与{{item.buycount||item.paycount}}人次</span>
                         <span>{{item.buytime*1000 | dateFormat 'yyyy-MM-dd hh:mm:ss'}}</span>
                       </div>
                       <div class="adress" flex="dir:top">
                         <span>用户地址</span>
                         <span>{{item.areaip.slice(0,8)}}...</span>
                       </div>
                     </div>
                   </div>
                 
                </section>
                  
                </div>
              </div>
              <div class="footer" >
              <span>该商品已下架,新一期活动正在火热进行中</span>
              <span v-touch:tap="goshoping" class="goshoping">立即前往</span></div>
            </div>
             
               

      </div>
  
 
  </div>
</template>

<script>

import Swiper    from 'assets/js/swiper'
import {myMixin}    from '../../mixin'
import {IP,
        ApiComProblem,
        ApiIshopInfo, //幸运抢购和限时抢购
        ApiOrderPage, //参与记录
        ApiAuctionInfo, //低价竞拍
        ApiOrderList, //竞拍记录
        ApiStarttime, //起始参与时间
        ApiNewestIshop,//最新一期夺宝
      
    }    from '../../api'
import counter from "../../components/counter.vue";
import { Indicator,Toast } from 'mint-ui';
import Vue from 'vue'

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
             datainfo:{//商品详情
              images:'',
              subhead:'',
              periods:'',
              title:'',
              publishtime:'',
              wuser:{
                portrait:'',
                nickname:'',
                mid:'',
                paycount:'',
              }
             },
              isHidden:false,//参与次数选择弹窗
              buytimes:1,//准备参与次数
              isRequesting:false,//避免多次提交请求
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
      vm.datainfo={//商品详情//清空数据
              images:'',
              subhead:'',
              periods:'',
              title:'',
              publishtime:'',
              wuser:{
                portrait:'',
                nickname:'',
                mid:'',
                paycount:'',
              }
             }

      vm.id=vm.$route.params.id;
      vm.type=vm.$route.query.type;


     
       if (vm.type==2) {
           vm.getData(vm.id,ApiAuctionInfo)// 低价竞拍 商品详情
           // vm.option.shoptype = Number(3) 
             vm.getJoinRecode(ApiOrderList)//查询所有低价竞拍参与记录
       }else{
           vm.getData(vm.id,ApiIshopInfo)//幸运抢购 限时抢购 商品详情
           // vm.option.shoptype = Number(1) 
             vm.getJoinRecode()//查询所有参与记录

       }
  
         
       // vm.getJoinRecode()
       
       
     
  
     
     

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
    //
    goshoping(){
      let vm =this

      vm.$router.go({name:'activitylist',params:{id:vm.type.toString()}})
      
            
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
 
    
    //加载商品详情数据
        getData(id,api){
                let vm = this
              vm.axios.post(api, {
                id: id
              }).then((response) => {
                if(response.data.retcode == 1) {
                  let data = response.data.data
                 
                    data.wuser = JSON.parse(data.wuser)
                    
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
                  vm.$nextTick(function(){
                     vm.addiscroll("wrptwo")//右侧滚动
                
                  })
                  
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
   //弹窗


         .srapper{
          width: 100%;
          height: 100%;
           
              .writem{
                width:40%;
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
                      color:$color-cheapccc;
                        span.goshoping{
                          background:$color-orange;
                          display: inline-block;
                          height: px2rem(40);
                          line-height: px2rem(40);
                          @include font-dpr(12px);
                          color:#090C12;
                          width: px2rem(100);
                         
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
                                 .lucknumber{
                                  background:#181C26;


                                 }
                                 .winner{
                                      color:$color-cheapccc;
                                      @include font-dpr(10px);
                                      .itemicon{
                                            .left{
                                              .left_left{
                                                width: px2rem(40);
                                                height: px2rem(40);
                                                background:#ccc;
                                                border-radius:50%;
                                              }
                                            }

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
                                 
                            }
                          }

                       

                    }

                         
                  
                }



         }
    
     
  }
  
</style>
