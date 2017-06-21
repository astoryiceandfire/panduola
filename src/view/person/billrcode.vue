<template>
  <div class="home">
      <div class="mywrapper" flex="main:center">
        <div class="main">
               

              <div id="wrapper" v-el:wrpone>
                  <div id="scroller">
                      <header class="header">订单明细</header>
                     
                      <div class="collitem border1px setbottomborder" flex="main:justify" v-for="item in lists">
                      <div class="itemleft" flex="main:center cross:center">
                         <div class="itemimg">
                              <img src="../../assets/images/takeicon.png">
                            </div>
                          <div class="itemshop" flex="dir:top">
                            <p class="name">{{item.recodestype}}</p>
                         
                         
                          </div>
                      </div>
                      <div class="itemright" flex="dir:top">
                        <span class="paypice">{{item.score}}通币</span>
                        <span class="paytime">{{item.addtime}}</span>
                      </div>
                         
                            
                      </div>
                     
                  </div>
                  </div>
        </div>

     </div>
    </div>
</template>

<script>


import {myMixin}    from '../../mixin'
import {IP,Apiorderrelist}    from '../../api'

import {Toast,Indicator} from 'mint-ui'

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
        lists:[], 
        page:1,
        total:1,     
        option:{
          page:1,
          rows:10

        }

        }

  },

  computed:{
   
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      this.loadMyCollectionData()

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
          vm.scrollinance =  vm.addiscroll("wrpone",vm.loadMyCollectionData);
      }
    },
    loadMyCollectionData(){//获取收藏列表
        let vm = this 
        vm.option.page = vm.page
        vm.axios.post(Apiorderrelist,vm.option).then((response)=>{
          let data = response.data
            if (data.retcode ==1 ) {

              vm.lists = vm.lists.concat(data.data.rows)
              vm.total = data.data.total
             
              if ( vm.lists.length>0) {
                        vm.$nextTick(function(){
                                 
                                   vm.upDateScroll()
                                 
                                })
              }
            }
        },(response)=>{})
    }


      

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

                      .header{
                        width: 100%;
                        height: px2rem(50);
                        line-height: px2rem(50);
                        text-align: center;
                        letter-spacing: px2rem(2);
                         @include font-dpr(16px);
                         background:transparent;
                         color:white;
                      }
                     
                      .collitem{
                         padding:px2rem(15);
                          background:#0F1219;
                          color:#ccc;
                          .itemleft{
                              .itemimg{
                                width: px2rem(50);
                                height: px2rem(50);
                                background:transparent;
                              }
                              .itemshop{
                                 padding-left:px2rem(10);
                                 .name{
                                  @include font-dpr(12px);
                                  height: px2rem(30);
                                  color:$color-white;
                                  letter-spacing: px2rem(2);

                                 }
                             
                              }
                          }
                          .itemright{
                             span{
                                   text-align: right;
                                }
                                .paypice{
                                  color:$color-orange;
                                  @include font-dpr(14px);
                                    letter-spacing: px2rem(2);
                                }
                                .paytime{
                                  color:$color-cheapccc;
                                  @include font-dpr(11px);
                                    letter-spacing: px2rem(1);
                                }
                           
                          }

                      }
                    }
            }
                       

    
     }
  }
  
</style>
