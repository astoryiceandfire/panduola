<template>
  <div class="home">
      <div class="mywrapper" flex="main:center">
        <div class="main">
               

              <div id="wrapper" v-el:wrpone>
                  <div id="scroller">
                      <header class="headercenter">用户晒单</header>
                      <shorder-item :lists='lists'></shorder-item>
                     
        
                     
                  </div>
                  </div>
        </div>

     </div>
    </div>
</template>

<script>


import {myMixin}    from '../../mixin'
import {IP,ApiAllShowData}    from '../../api'
import ShorderItem from '../../components/shorderitem'
import {Toast,Indicator} from 'mint-ui'

export default {
  components: {
        ShorderItem
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
      
        lists : [],    // 数据
            page:1,
            total:0,
            searchoption : {      // 查询参数
                   page : 1,   // 查询页数
                  rows:10,
                  sid:'',//商品基础id
                  hid:'',//用户id
              },

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
      vm.Getdata()

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
      Getdata(){//查询主贴
        let vm = this
        vm.searchoption.page = vm.page
        vm.searchoption.total = vm.total
        vm.axios.post(ApiAllShowData,vm.searchoption).then((response)=>{
          if (response.data.retcode  == 1) {
            vm.total = response.data.data.total
          
            vm.lists = vm.lists.concat(response.data.data.rows)
                      vm.$nextTick(function(){
                                 
                                   vm.upDateScroll()
                                })

          }
        },(response)=>{})

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
                     
             
                    }
            }
                       

    
     }
  }
  
</style>
