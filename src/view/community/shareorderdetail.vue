<template>
  <div class="home">
      <div class="mywrapper" flex="main:center">
        <div class="main">
               

              <div id="wrapper" v-el:wrpone>
                  <div id="scroller">
                      <header class="headercenter">晒单详情</header>
                     <!--  detail -->
                      <div class="shareitem">
                          <div class="share-header" flex="main:justify cross:center">
                            <div class="share-header-left">商品：{{item.title}}</div>
                            <div class="share-header-right">第{{item.shopNum}}期</div>
                          </div>
                          <div class="share-main" v-touch:tap="enterDetail(item)">
                            <div class="share-user" flex="dir:left cross:center">
                              <div class="share-user-img">
                                <img :src="ip + item.portrait">
                              </div>
                              <div class="share-user-name">{{item.nickname}}</div>
                              <div class="share-user-time">{{item.loginlasttime}}</div>
                            </div>
                            <div class="share-content">
                              <div class="share-contents">
                                {{item.content}}
                              </div>
                              <div class="share-images" v-for="imgitem in item.images">
                                <img :src="ip + imgitem" v-if='imgitem'>
                              </div>
                            </div>

                          </div>
                     </div>
        
                    <!--  detail -->
                         
                     
        
                     
                  </div>
                  </div>
        </div>

     </div>
    </div>
</template>

<script>


import {myMixin}    from '../../mixin'
import {IP,ApiAllShowData}    from '../../api'


export default {
  components: {
 
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
        ip:IP,
        scrollinance:null,
      
        item : {},    // 数据
         

        }

  },

  computed:{
   
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      vm.scrollinance =  vm.addiscroll("wrpone",vm.Getdata);
      vm.item = vm.$route.query
      console.log(vm.lists)
    

      transition.next()
    },
    activate(transition) {
  
      transition.next()
    },
    deactivate(transition) {
     this.lists = []

      transition.next()
    }
  },
  methods:{
    
    

  
    upDateScroll(){
      let vm =this
     
      if (vm.scrollinance) {

       vm.scrollinance.refresh()
      }else{
        vm.scrollinance =  vm.addiscroll("wrpone",vm.Getdata);

      }

        
        
     
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

         .mywrapper{
             position:absolute;
             top: 0;
             left: px2rem(70);
             bottom:px2rem(60);
             right: 0;
            background:#090C12;
            .main{
                position: relative;
                 background:transparent;
                width: 75%;
              
               #wrapper{
                  position: absolute;
                  z-index: 1;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  overflow: hidden;
                    background:transparent;
                  
                }
                 #scroller{
                      background:transparent;
                       position:absolute;
                     
                      z-index: 1;
                      -webkit-tap-highlight-color: rgba(0,0,0,0);
                      width: 100%;
                      -webkit-transform: translateZ(0);
                      -moz-transform: translateZ(0);
                      -ms-transform: translateZ(0);
                      -o-transform: translateZ(0);
                      transform: translateZ(0);
                      -webkit-touch-callout: none;
                      -webkit-user-select: none;
                      -moz-user-select: none;
                      -ms-user-select: none;
                      user-select: none;
                      -webkit-text-size-adjust: none;
                      -moz-text-size-adjust: none;
                      -ms-text-size-adjust: none;
                      -o-text-size-adjust: none;
                      text-size-adjust: none;

                      .headercenter{
                        width: 100%;
                        height: px2rem(50);
                        line-height: px2rem(50);
                        text-align: center;
                        letter-spacing: px2rem(2);
                         @include font-dpr(14px);
                         background:transparent;
                         color:white;
                      }
                       .shareitem{
                            .share-header{
                              height: px2rem(60);
                              background:#181C27;
                              color:$color-deeporange;
                              @include font-dpr(14px);
                              padding: 0 px2rem(10);
                            }
                            .share-main{
                              padding:px2rem(20) px2rem(10);
                                .share-user{
                                  .share-user-img{
                                    width: px2rem(50);
                                    height: px2rem(50);
                                    border-radius: 50%;
                                    background:$color-cheapccc
                                  }
                                  .share-user-name{
                                    color:$color-cheapccc;
                                    @include font-dpr(16px);
                                    padding-left:px2rem(10);
                                  }
                                  .share-user-time{
                                    color:$color-cheapccc;
                                    @include font-dpr(14px);
                                    position: absolute;
                                    right: px2rem(10);
                                  }

                                }
                                .share-content{
                                  color:$color-zibai;
                                  @include font-dpr(14px);
                                  padding:0 px2rem(50);
                                  .share-contents{
                                    padding:px2rem(20) 0;
                                  }

                                }

                            }

                        }
                     
             
                    }
            }
                       

    
     }
  }
  
</style>
