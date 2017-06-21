<template>
  <div class="home">
      <div class="srapper" flex="dir:left">
      <!-- 左边wraper -->
            <div class="writem">
              <div id="wrapper" v-el:wrpone>
                  <div id="scroller">
                      <div class="home_up">
                        <img :src="ip+slideList.A.img">
                       
                      </div>
                      <div class="home_middle" flex="cross:center">

                          <div v-touch:tap="enterlist($index)" v-for="item in aclist" class="mi_item" flex="dir:top cross:center">
                             <i :class=['fa',item.imgi,'fa-2x'] aria-hidden="true"></i> 
                              <span>{{item.title}}</span>
                          </div>
                  
                          
                      </div>
                      <div class="home_down">
                            <mt-cell title="活动公告" >
                                  <i slot="icon" class="fa fa-volume-up" aria-hidden="true"></i>
                                  <!-- <span>更多 <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                                    </span> -->
                            </mt-cell>
                            <template v-for="item in adverlist">
                                 <div class="do_item" flex="cross:center">
                                 <div class="do_item_top" flex="dir:top cross:center"> 
                                   <span class="do_icon" flex="cross:center main:center">
                                      <!-- <i slot="icon" class="fa fa-star-o fa-2x" aria-hidden="true"></i> -->
                                      <img :src="ip + item.icon">
                                      </span>
                                   <span class="acspan">{{item.title}}</span>
                                   </div>
                                 <p class="adv_p" v-html="item.content"></p>
                            </div>
                              
                            </template>
                        
                      </div>
                    
                  </div>
              </div> 
            </div>
            <!-- 左边wraper -->
            
           <!--  右面的滚动 -->
           <div class="writem1">
              <div id="wrapper1" v-el:wrptwo>
                <div id="scroller1">
                <section class="wr_top">
                  <h1 class="zs-border-left">即将揭晓</h1>
                 <!--  //没有活动时候 -->
                    <div class="noactivity" flex="dir:top main:center cross:center" v-if="isnohasactive">
                      <img src="../../assets/images/nogoods.png">
                      <span>暂时还没有活动</span>
                    </div>
                  <!--  //没有活动时候 -->
                 
                    
                 
                  <div class="swiper-container" v-el:activeswiper>
                      <div class="swiper-wrapper">
                      <div v-touch:tap='enterShoping(item)' flex="dir:top cross:top" class="swiper-slide" v-for="item in opinglist">
                     
                          <div class="sw_img">
                            <img :src="ip+item.leftimgwide">
                          </div>
                          <span class="sw_span1">{{item.subhead.split(';')[0]}}</span>
                         <!--  <span class="sw_span2">兼容多种系统，外观时尚</span> -->
                          <span class="sw_span3"> 
                              <counter  :downtime='item.downtime/1000' :formattime="'mmss'"></counter>
                              
                          </span>
                     
                      </div>
                      <!-- //已揭晓 -->
                      <!--  <div v-touch:tap="enterReadDetail(item)" flex="dir:top cross:top" class="swiper-slide" v-for="item in readlist">
                     
                          <div class="sw_img">
                            <img :src="ip+item.leftimgwide">
                          </div>
                          <span class="sw_span1">{{item.subhead.split(';')[0]}}</span>
                          <span class="sw_span2">兼容多种系统，外观时尚</span>
                          <span class="sw_span3"> 
                             
                              <span >已揭晓</span>
                          </span>
                     
                      </div> -->
                     <!--  //已揭晓 -->
                    </div>
                   
                </div>
                </section>
                <section class="wr_bottom">
                  <h1 class="zs-border-left">热门活动</h1>
                  <div v-for="item in hotlist" class="wr_hot" v-touch:tap="enterDetailPage(item)" flex="dir:left cross:center">

                      <i :class="{'act_tip_joined':item.isJoin==1}"></i> <!--  //是否参与 -->
                    <div class="hot_left">
                      <div class="left_top">                        
                        <!-- <img src="../../assets/images/homepage/shop_02.png">     -->         

                        <template v-if="item.leftimgwide||item.rightimgwide">
                            <img v-if="$index%2==0" :src="ip+item.leftimgwide" />
                            <img v-else :src="ip+item.rightimgwide" />
                         </template>

                        <span class="shoptitle">{{item.subhead.split(';')[0]}}</span>
                        <span v-if="item.type==0" class="actype organbg">幸运<br>抢购</span>
                        <span v-if="item.type==1" class="actype bluebg">限时<br>抢购</span>
                        <span v-if="item.type==2" class="actype redbg">低价<br>竞拍</span>
                      </div>
                     <!--  <div class="left_bottom"></div> -->
                    </div>
                    <div class="hot_right" flex="dir:top cross:center">
                          <div v-if="item.type!==2">活动进度：<span>{{Math.floor(item.joinedmember / item.totalmember * 100)}}%</span></div>
                          <div>参与人数：<span>{{item.joinedmember}}人</span></div>
                      
                    </div>

                  </div>
                </section>
                  
                </div>
              </div>
            </div>

              <!--  右面的滚动 -->

      </div>
  
 
  </div>
</template>

<script>

import Swiper    from '../../assets/js/swiper'
import {myMixin}    from '../../mixin'
import {ApiSlides,IP,ApiEndActivity,ApiHotActivity,ApiLotteryActivity,ApiAdvertList}    from '../../api'
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
            isnohasactive:false,//是否有活动
            ip:IP,
            hotlist:{},//热门活动数据
            opinglist:{},//即将揭晓
            adverlist:{},//公告信息
            readlist:{},//已揭晓数据30条
            insscroll:null,
            insscrolltwo:null,
            insSwper:null,//左右滚动

       }
  },
 

  route: {
    data(transition) {
      let vm = this
   
       vm.getData()//顶部图片

       vm.getLotterActive()//即将开奖数据
       vm.getAdverList()//公告信息
        vm.getHotActive()//热门活动数据
        vm.loadEndActivit()//一开奖数据
          vm.insscroll = vm.addiscroll("wrpone")
           vm.insscrolltwo = vm.addiscroll("wrptwo")


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
    //正在揭晓数据进入详情
    enterShoping(item){
      let vm =this
          vm.$router.go({
            name:"activityDetails",
            params:{id:item.id},
            query:{type:vm.type}
          })
          

    },
    //已揭晓数据进入详情
    enterReadDetail(item){
      let vm =this
          vm.$router.go({
            name:"activityReadDetails",
            params:{id:item.id},
            query:{type:item.type}
          })
    },
    //进入热门活动的详情页面
    enterDetailPage(item){
      let vm =this
          vm.$router.go({
            name:"activityDetails",
            params:{id:item.id},
            query:{type:item.type}
          })
          

    },
    
    //公告信息
           getAdverList(){
               let vm =this
                  vm.axios.post(ApiAdvertList,{showArea:1}).then((response)=>{
                          if(response.data.retcode == 1) {
                                let jsonData = response.data.data.adverts;
                                vm.adverlist = jsonData
                                vm.$nextTick(function(){
                                 
                                   vm.insscroll.refresh()
                                })
                                

                        
                        }
                  }).catch((response)=>{

                  })

           },
    //即将揭晓数据
          getLotterActive(){
                  let vm =this

                vm.axios.post(ApiLotteryActivity,{}).then((response)=>{

                        if(response.data.retcode == 1) {
                              let jsonData = response.data.data.list;
                             
                               vm.opinglist = jsonData.sort(function(valuepev,valuenext){
                                return valuepev.downtime - valuenext.downtime

                              })
                               if (vm.opinglist.length==0) {
                                 vm.isnohasactive = true 
                               }else{
                                   vm.$nextTick(function(){
                                       vm.zswiper();
                                     })

                               }

                           
                              

                              

                      
                      }
                }).catch((response)=>{

                })

          },
          //加载yi开奖数据
          loadEndActivit(){
            let vm =this
            vm.axios.post(ApiEndActivity,{}).then(function(response){
              if (response.data.retcode==1) {
                 vm.readlist = response.data.data.list.slice(0,10)
                        vm.$nextTick(function(){
                                 vm.zswiper();
                               })


              }
            })

          },
    //加载数据
        getData(){
                let vm = this
              vm.axios.post(ApiSlides, {
                type: 1
              }).then((response) => {
                if(response.data.retcode == 1) {
      
                  let slideList = {}
                  let jsonData = response.data.data.slideList
                  for(let item of jsonData) {
                    slideList[item.position] = item
                  }

                  vm.slideList = slideList
                }

              }, (response) => {
                
              })

        },
        //热门活动数据
        getHotActive(){
          let vm =this

          vm.axios.post(ApiHotActivity,{}).then((response)=>{

                  if(response.data.retcode == 1) {
                  let jsonData = response.data.data.list;
                  vm.hotlist = jsonData
                  vm.$nextTick(function(){
                     vm.insscrolltwo.refresh()
                  })
                  
                
                }
          }).catch((response)=>{

          })


        },
    //左右滚动
          zswiper(){

            let vm =this
            if (vm.insSwper) {
              vm.insSwper.update()


            }else{
                vm.insSwper = new Swiper(this.$els.activeswiper, {
              // pagination: '.swiper-pagination',
              slidesPerView: 3,
              paginationClickable: true,
              spaceBetween: 30
                    });

            }

            

          },
          //进入幸运抢购 限时抢购 低价竞拍页面
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
       background:$color-white;
       padding-left: px2rem(70);

         .srapper{
            // width: px2rem(780);
            // height: 100px;
             position:absolute;
             top: 0;
             left: px2rem(70);
             bottom:px2rem(60);
             right: 0;
              .writem{
                width:42%;
                position:relative;
               

               

              }
              .writem1{
                width: 58%;
                 position:relative;
                 
               
                 

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

               
                #scroller{
                  background:$color-primary;
                  padding:px2rem(12);
                  padding-left:0px;
                    .home_up{
                       height: px2rem(150);
                       background:$color-deepblue;

                    }
                    .home_middle{
                      height: px2rem(80);
                      background:$color-deepblue;
                       margin-top: px2rem(10);
                        -webkit-justify-content: space-around; 
                        justify-content: space-around;


                      i{
                        color: $color-orange;
                      }
                      span{
                        color: $color-white;
                      }
                     
                       
                     

                    }
                    .home_down{
                          a{
                            background:$color-primary;
                            color:$color-white;
                            
                            @include font-dpr(14px);
                            i{
                              color:$color-orange;
                            }
                          
                          }
                        .do_item{
                          margin-bottom: px2rem(10);
                          width: 100%;

                            .do_item_top{
                                    background:$color-primary;
                                     height: px2rem(90);//why???
                                     width: 300px;//why???

                                     webkit-justify-content: space-around;
                                     justify-content: space-around;
                                    

                                     .do_icon{
                                      display: inline-block;
                                    width: px2rem(45);
                                    height: px2rem(45);
                                    background:#ccc;
                                    border-radius:50%;
                                  }
                                  span.acspan{
                                    white-space: nowrap;
                                    color:$color-white;
                                  }

                            }
                            p{
                              height: px2rem(90);
                              max-height: px2rem(90);
                              max-width: px2rem(500);
                              padding:px2rem(10) px2rem(10);
                              background:$color-deepblue;
                              color: $color-cheapccc;
                              @include font-dpr(10px);
                              overflow: hidden;

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
                             h1{
                                margin-top: px2rem(10);
                                height: px2rem(30);                             
                                 @include font-dpr(14px);
                                 color:$color-fontsingle;
                                
                              }
                              .noactivity{
                                position: absolute;
                                width: 100%;
                                min-height: px2rem(250);
                                z-index: 10;
                                  img{
                                      width: px2rem(80);
                                      height: px2rem(80);
                                    }
                                    span{
                                      display: inline-block;                        
                                      margin-top: px2rem(10);
                                      @include font-dpr(10px);
                                      color:$color-cheapccc;                         
                                    }
                              }
                              div.swiper-container{
                                    margin-top: px2rem(20);
                                    padding:px2rem(15);
                                    background:#10121A;
                                    // height: px2rem(300);
                                    .swiper-slide{
                                      background:$color-deepblue;
                                      overflow: hidden;
                                      width: 100%;
                                    }

                              }
                              .sw_img{
                                        width: 100%;
                                        height: 60%;
                                        overflow: hidden;
                                        img{
                                          // width: 100%;
                                            overflow: hidden;

                                        }
                                        // background-size:cover;
                                        
                                    }
                                    span.sw_span1{
                                      
                                      @include font-dpr(14px);
                                      white-space: nowrap;
                                      overflow: hidden;
                                      line-height: px2rem(20);
                                      color:$color-cheapccc;
                                      // display: inline-block;
                                      // height: px2rem(20);


                                    }
                                    span.sw_span2{
                                       @include font-dpr(12px);
                                        white-space: nowrap;
                                      overflow: hidden;
                                       line-height: px2rem(20);
                                       color:#454F6F;
                                       // display: inline-block;
                                       // height: px2rem(20);
                                      
                                    }
                                    span.sw_span3{
                                      display: inline-block;
                                       @include font-dpr(10px);
                                        white-space: nowrap;
                                      overflow: hidden;
                                       line-height: px2rem(20);
                                       color:$color-orange;
                                       // height: px2rem(20);
                                      
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
                            .wr_hot{
                              position:relative;
                               margin-top: px2rem(10);
                               .act_tip_joined {
                                        background: url(../../assets/images/act_tip_joined.png)center no-repeat;
                                        background-size: 100%;
                                      }
                                      >i {
                                            position: absolute;
                                            top: px2rem(-2);
                                            right: 0;
                                            width: px2rem(65);
                                            height: px2rem(65);
                                            background: url(../../assets/images/act_tip_unjoined.png)center no-repeat;
                                            background-size: 100%;
                                          }

                                           .hot_left{
                                                  width: 70%;                                              
                                                 overflow: hidden;
                                                  margin-bottom: px2rem(10);
                                                 
                                                       .left_top{
                                                         height: px2rem(150);
                                                          overflow: hidden;
                                                          img{
                                                            // height: 50%;
                                                          }
                                                          
                                                          position:relative;
                                                              width:100%;
                                                              span.actype{
                                                                width: px2rem(40);
                                                                height: px2rem(40);
                                                                line-height: px2rem(20);
                                                                position:absolute;
                                                                left: 0;
                                                                bottom:px2rem(4);
                                                                color: $color-black;
                                                                @include font-dpr(10px);
                                                                text-align: center;

                                                              }


                                                              span.shoptitle{
                                                                 position:absolute;
                                                                 
                                                                  // left: 0px;
                                                                  top:50%;
                                                                  transform:translatey(-50%);
                                                                  color: $color-cheapccc;
                                                                  @include font-dpr(14px);

                                                              }
                                                        }

                                               }
                                        .hot_right{ 
                                          @include font-dpr(10px);
                                              flex-grow: 1;
                                              color:$color-white;
                                              span{
                                                display: inline-block;
                                              
                                                color:$color-orange;
                                              }
                                              


                                        }

                            }
                          .wr_hot:nth-of-type(odd){
                              .shoptitle{
                                left: 50%;
                              }

                          }
                          .wr_hot:nth-of-type(even){
                               .shoptitle{
                                left:0px;
                              }
                          }

                    }

                         
                  
                }



         }
    
     
  }
  
</style>
