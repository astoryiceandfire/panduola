<template>
  <div class="home">
      <div class="srapper" flex="dir:left">
      <!-- 左边wraper -->
            <div class="writem">
              <div id="wrapper" v-el:wrpone>
                  <div id="scroller">
                      <div class="home_up">
                       <!--  <img :src="ip+slideList.A.img"> -->
                      </div>
                      <div class="home_middle" flex="cross:center main:justify">

                          <div v-for="item in aclist" class="mi_item" flex="dir:top cross:center">
                             <i :class=['fa',item.imgi,'fa-2x'] aria-hidden="true"></i> 
                              <span>{{item.title}}</span>
                          </div>
                  
                          
                      </div>
                      <div class="home_down">
                            <mt-cell title="活动公告">
                                  <i slot="icon" class="fa fa-bullhorn" aria-hidden="true"></i>
                                  <span>更多 <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                                    </span>
                            </mt-cell>
                            <template v-for="n in 5">
                                 <div class="do_item" flex="cross:center">
                                 <div class="do_item_top" flex="dir:top main:center cross:center" style="width:280px"> 
                                   <span class="do_icon" flex="cross:center main:center">
                                      <i slot="icon" class="fa fa-star-o fa-2x" aria-hidden="true"></i>
                                      </span>
                                   <span class="acspan">活动公告</span>
                                   </div>
                                 <p>哦你如果你能奶粉嫩纷纷俺了肯定能发呢恩纷纷诶哦房内of你哦恩菲捏你非农诶南非 看</p>
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
                  <h1>最新揭晓</h1>
                  <div class="swiper-container" v-el:activeswiper>
                      <div class="swiper-wrapper">
                      <div flex="dir:top cross:top" class="swiper-slide" v-for="n in 10">
                        <!-- <div class="sw_top"> -->
                          <div class="sw_img">
                            <img src="../assets/images/homepage/shop_02.png">
                          </div>
                          <span class="sw_span1">逻辑蓝牙键盘</span>
                          <span class="sw_span2">兼容多种系统，外观时尚</span>
                          <span class="sw_span3"> 12:23:33</span>
                       <!--  </div> -->
                        <!-- <div class="sw_bottom">
                         
                        </div> -->
                      </div>
                    </div>
                    <!-- Add Pagination -->
                    <!-- <div class="swiper-pagination"></div> -->
                </div>
                </section>
                <section class="wr_bottom">
                  <h1>热门活动</h1>
                  <div v-for="n in 6" class="wr_hot" flex="dir:left cross:center">
                    <div class="hot_left">
                      <div class="left_top">                        
                        <img src="../assets/images/homepage/shop_02.png">                       
                        <span class="shoptitle">魔音蓝牙耳机</span>
                        <span class="actype organbg">幸运<br>抢购</span>
                      </div>
                     <!--  <div class="left_bottom"></div> -->
                    </div>
                    <div class="hot_right" flex="dir:top cross:center">
                      <span>59%</span>
                      <span>64人参加</span>
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

import Swiper    from '../assets/js/swiper'
import IScroll    from '../assets/js/iscroll'
export default {
  components: {
  
  },
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
             {title:"低价竞拍",imgi:"fa-gavel"}]
    }
  },
  computed:{
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      vm.iscroll("wrpone")
      vm.iscroll("wrptwo")
      vm.swiper();

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
    //左右滚动
          swiper(){

              let swiper = new Swiper(this.$els.activeswiper, {
              // pagination: '.swiper-pagination',
              slidesPerView: 3,
              paginationClickable: true,
              spaceBetween: 30
                    });

          },

       //滑动组件
      iscroll(el){
            let self  = this
            
            let srcollEl = self.$els[el]
          
            
            self.$nextTick(() =>{
           new IScroll(srcollEl, { 
                mouseWheel: true,
                preventDefault: true,
                scrollbars: false,
                fadeScrollbars: true,
                click: true ,
                bounce :true,
                momentum:true,
               
            });
              // self.preventDefault()
             

            })
               self.banTouchmove()
             
          },
     preventDefault(e){ 
        e.preventDefault(); 
      }, 
      banTouchmove(){
        document.addEventListener('touchmove', this.preventDefault, false) 
      },
      restoreTouchmove(){
        document.removeEventListener('touchmove', this.preventDefault, false)
      }
   
    

  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/style.scss";
  @import '../assets/css/swiper.css' ;  

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
                  background: #ccc;
                  overflow: hidden;
                }

               
                #scroller{
                    .home_up{
                       height: px2rem(150);
                       background:red;

                    }
                    .home_middle{
                      // height: 90px;
                      background:blue;
                    }
                    .home_down{
                        .do_item{
                          margin-bottom: px2rem(10);

                            .do_item_top{
                                    background:red;
                                     height: px2rem(90);
                                     .do_icon{
                                    width: px2rem(45);
                                    height: px2rem(45);
                                    background:$color-orange;
                                    border-radius:50%;
                                  }
                                  span.acspan{
                                    white-space: nowrap;
                                  }

                            }
                            p{
                              padding:px2rem(4) px2rem(10);

                            }

                            

                        }
                    }
                  
                }
                #scroller1{
                  //最新揭晓
                    section.wr_top{
                     
                              h1{
                                margin-top: px2rem(10);
                                height: px2rem(30);
                              
                                 @include font-dpr(14px);
                              }
                              .sw_img{
                                      // width: 100%;
                                      height: 60%;
                                    }
                                    span.sw_span1{
                                      @include font-dpr(12px);
                                      white-space: nowrap;
                                      overflow: hidden;
                                      line-height: px2rem(20);


                                    }
                                    span.sw_span2{
                                       @include font-dpr(10px);
                                        white-space: nowrap;
                                      overflow: hidden;
                                       line-height: px2rem(20);
                                      
                                    }
                                    span.sw_span3{
                                       @include font-dpr(10px);
                                        white-space: nowrap;
                                      overflow: hidden;
                                       line-height: px2rem(20);
                                      
                                    }
                        }
                    //热门活动
                    section.wr_bottom{
                      // height: calc(55vh);
                      h1{
                        height: px2rem(50);
                        line-height: px2rem(50);
                        @include font-dpr(14px);
                      }
                            .wr_hot{
                                           .hot_left{
                                                  width: 75%;                                              
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
                                                                color: red;
                                                                @include font-dpr(10px);
                                                                text-align: center;

                                                              }


                                                              span.shoptitle{
                                                                 position:absolute;
                                                                  color: red;
                                                                  left: 0px;
                                                                  top:50%;
                                                                  transform:translatey(-50%);
                                                                  color: #ffffff;
                                                                  @include font-dpr(14px);

                                                              }
                                                        }

                                               }
                                        .hot_right{ 
                                          flex-grow: 1;
                                          span{
                                            display: inline-block;
                                            height: px2rem(40);
                                          }
                                          span:first-child{
                                            @include font-dpr(18px);
                                          }

                                        }

                            }

                    }

                         
                  
                }



         }
    
     
  }
  
</style>
