<template>
  <div class="shoping">
   
           <!--  右面的滚动 -->
           <div class="shopingnav">            
                    <nav flex='dir:left main:center cross:center'>
                      <div v-for='item in cidlists' :class='["nav-item", curcid==item.cid?"nav-active":""]'>
                        <span v-touch:tap='changeCidGoods(item)'>{{item.name}}</span>
                      </div>                   
                    </nav>               
           </div>    
                 <div class="shopswiper">
                   <!--  //没有商品时候 -->
                    <div class="noactivity" flex="dir:top main:center cross:center" v-if="noactivity">
                     <!--  <img src="../../../assets/images/noshoping.png"> -->
                      <span>暂无可购买的通付卡</span>
                    </div>
                  <!--  //没有商品的时候 -->
                        <div class="swiper-container" v-el:activeswiper>
                                <div class="swiper-wrapper" v-if="!noactivity">
                                <div class="swiper-slide" flex='dir:top main:center cross:top'>
                                  <div class="cardimg"><img src="../../../assets/images/card.png" alt=""></div>
                                  <span class="card-number">6222 1002 6220 2020</span>
                                  <div class="card-button"><span class="span-button" v-touch:tap="mangeCardItem">圈存</span></div>                                         
                                  </div>

                                  <div class="swiper-slide" flex='dir:top main:center cross:top'>
                                  <div class="cardimg"><img src="../../../assets/images/card.png" alt=""></div>
                                  <span class="card-number">6222 1002 6220 2028</span>
                                  <div class="card-button"><span class="span-button" v-touch:tap="mangeCardItem">圈存</span></div>                                         
                                  </div>

                              </div>
                               
                           
                          
                         </div>
                   </div>
              <!--  右面的滚动 -->

                  <!--  弹窗 -->
                   <div v-if="isExchange"  class="zs-container">
                      <!-- <div  class="wrap-message" flex="dir:top cross:center">
                        <div class="exchange-item">
                            <span class="item-up">请输入兑换码</span>
                            <div class="item-content" flex="main:justify">
                              <input type="text" v-model= 'exchangecode' class="item-input item-input-first"  onkeydown="this.value=this.value.replace(/\D/g,'').replace(/....(?!$)/g,'$& ')">
                              <div class="exquestion" flex="dir:center cross:center"><img src="../../../assets/images/exchange.png" alt=""></div>
                            </div>
                        </div>
                        <div class="exchange-item">
                           <span class="item-up">请输入验证码</span>
                            <div class="item-content" flex="main:justify">
                              <input type="text"  v-model= 'verificationcode' class="item-input item-input-second">
                              <div class="verifdiv">
                                <img :src="codesrc" alt="">
                              </div>
                            </div>
                        </div>
                        <div class="exchange-item">
                          <div class="exchange-button">兑换</div>
                        </div>
              
                         

                        </div>
                 
                 
                 </div> -->
                  </div>
              
           <!--  弹窗 -->

  
 
  </div>
</template>

<script>

import Swiper    from '../../../assets/js/swiper'
import IScroll    from '../../../assets/js/iscroll'
import {IP,
        ApiCategory,
        ApiSortGoods,
        ApigetImageCode,
        ApiexchangePro,
        } from '../../../api'
import {Toast,Indicator} from 'mint-ui'
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
      isExchange:false,//是否显示兑换
     
    cidlists:[{name:'我的通付卡',cid:0},
              {name:'购买通付卡',cid:1},
              {name:'绑定通付卡',cid:2}],
   
      ip:IP,
      
      curcid:0,//当前分类
      noactivity:false,
      swperance:null,//滚动实例
      lists:[],//商品数据
     
    
  }},
  computed:{
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      
      vm.lists = []
    
     setTimeout(vm.swperanceFun,100)
     

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
   mangeCardItem(){
    this.$router.go({name:"carditem",query:{name:"圈存到通付卡"}})
   },
     // tab切换
    changeCidGoods(item){
     


      let vm = this

      if (item.cid ==2) {
        vm.noactivity = false
          this.$router.go({name:"carditem",query:{name:"绑定通付卡"}})
        }else if(item.cid==1){
           vm.curcid = item.cid
           vm.noactivity = true
        }else if (item.cid==0){
           vm.noactivity = false
          vm.curcid = item.cid
          setTimeout(vm.swperanceFun,100)
          
        }
       
        
     
    },
    //列表滚动
    swperanceFun(){
      let vm = this
     
        vm.swperance = new Swiper(this.$els.activeswiper, {
             
              slidesPerView: 3,
              paginationClickable: true,
              spaceBetween: 30,
              loop:false
                    });

     

    },

   
  

      

  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/style.scss";
  @import '../../../assets/css/swiper.css' ;  

  .shoping{
               //弹窗
       // .zs-container{
                       
                         
       //                  .wrap-message{
       //                          width: 70%;
       //                          height: 58%;
       //                          background:#202533;
       //                          position:absolute;
       //                          z-index: 12;
       //                          top: 50%;
       //                          left: 54%;
       //                          -webkit-transform: translate(-50%, -50%);
       //                          transform:translate(-50%,-50%);
       //                          // max-width:px2rem(400);
       //                          @include font-dpr(14px);                             
       //                         justify-content: space-around;
       //                         .exchange-item{
       //                            line-height: px2rem(40);
       //                            width: 55%;

       //                            .item-up{
       //                              color:$color-orange;
       //                              @include font-dpr(15px);
       //                              font-weight: bold;
       //                              letter-spacing: px2rem(2);
       //                            }
       //                            .exquestion{
       //                              margin-left: px2rem(-40);
       //                              width: px2rem(40);
       //                              padding:px2rem(10);
       //                              // img{
       //                              //   width: px2rem(20);
       //                              //   height: px2rem(20);
       //                              // }
       //                              text-align: center;
       //                            }
       //                            .item-input{
       //                              background:$color-zise;
       //                              border:none;
       //                              color:$color-lightblue;
       //                            }
       //                            .item-input-first{
       //                              width: 100%;
       //                            }
       //                             .item-input-second{
       //                              width: 70%;
       //                            }
       //                            .verifdiv{
       //                              width: 30%;
       //                            }
       //                            .exchange-button{
       //                              width: 100%;
       //                              height: 100%;
       //                              color:#000000;
       //                              text-align: center;
       //                              background:$color-orange;
       //                              @include font-dpr(14px);
       //                            }
  

       //                         }
                               
                              
                                

       //                    }
       //           }
                 //弹窗
    
         background:#090C12;
         padding-left: px2rem(70);
         position:relative;
         color:$color-cheapccc;
           .shopingnav{
                height: px2rem(60);
                width: 100%;
                position:relative;
                text-align: center;
                @include font-dpr(12px);
                nav{
                  width: 100%;
                  height: 100%;
                  .nav-item{
                    width: 15%;
                    height: px2rem(40);
                    line-height: px2rem(40);

                    &.nav-active{
                      color:$color-orange;
                      background:$color-deepblue;
                    }
                  }

                }               
               

           }
           .shopswiper{
            position:absolute;
            // width: 100%;
            left: px2rem(70);
            top: px2rem(60);
            right: 0;
            bottom:px2rem(60);
             .noactivity{
                               
                                width: 100%;
                               height: 100%;
                                z-index: 110;
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

              

                .swiper-container {
                                      width: 100%;
                                     height: 100%;
                                     padding-left: px2rem(30);
                                  }
                                  .swiper-slide {
                                    background:#090C12;
                                    .card-number{
                                      @include font-dpr(14px);
                                      color:#ffffff;
                                      line-height: px2rem(60);
                                    }
                                    .card-button{
                                      width: 100%;
                                      text-align: center;
                                      
                                      line-height: px2rem(30);
                                      span.span-button{
                                        display: inline-block;
                                        width:40%;
                                        @include font-dpr(12px);
                                        background:$color-orange;
                                        color:#000000;
                                        letter-spacing: px2rem(10);
                                        text-align: center;
                                        border-radius:2px;

                                      }
                                    }
                                   
                                   
                                    }
                                    


           }

                  
                            
                         

        
     
  }
  
</style>
