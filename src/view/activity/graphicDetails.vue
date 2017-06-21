<template>
  <div class="home">
      <div class="mywrapper" flex="main:center">
        <div class="main">

              <div id="wrapper" v-el:wrpone>
                  <div id="scroller">
                      <header class="header">图片详情</header>
                     
                      <div class="collitem border1px setbottomborder" flex="main:justify" v-for="item in lists">
                      
                         <img :src="ip+item">
                            
                      </div>
                     
                  </div>
                  </div>
                  <div class="without" v-if='isShowTip'>暂无详情</div>
        </div>

     </div>
    </div>
</template>

<script>


import {myMixin}    from '../../mixin'
import {IP,ApiShopContent}    from '../../api'

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
        isShowTip:false,
        id:'',
        lists:[],      
       

        }

  },


  route: {
    data(transition) {
      let vm = this
       vm.id=vm.$route.params.id;
      this.loadData()

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
          vm.scrollinance =  vm.addiscroll("wrpone");
         
      }
    },
    loadData(){//获取收藏列表
        let vm = this 
        vm.axios.post(ApiShopContent,{id:vm.id}).then((response)=>{
          let data = response.data
            if (data.retcode ==1 ) {

              vm.lists = data.data.content;
             
             
              if ( vm.lists.length>=1) {
               this.isShowTip = false
             
                        vm.$nextTick(function(){
                                
                                   
                                   setTimeout(function(){
                                     vm.upDateScroll()
                                   },500)
                                 
                                })
              }else{
                this.isShowTip = true
                 console.log( this.isShowTip)
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
                .without{
                  color:#ffffff;
                  position: absolute;
                  top:50%;
                  left:45%;
                   @include font-dpr(14px);
                }
              
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
                          
                       
                          

                      }
                    }
            }
                       

    
     }
  }
  
</style>
