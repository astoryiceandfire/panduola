<template>
  <div class="shoping">
   
           <!--  右面的滚动 -->
           <div class="shopingnav">            
                    <nav flex='dir:left main:center cross:center'>
                      <div  class='nav-item nav-active'>
                        <span >{{title}}</span>
                      </div>                   
                    </nav>               
           </div>    
                 <div class="shopswiper">
                 
                        <div class="card-container" flex="dir:top main:left cross:center">
                        <div class="card-inut">
                          <span>通付卡卡号</span>
                          <input type="number" class="item-input">
                        </div>

                        <div class="card-inut">
                          <span  v-if ="title.substr(0,2) =='绑定'">通付卡密码</span>
                           <span v-if ="title.substr(0,2) =='圈存'" >通币数量</span>
                          <input type="number" class="item-input">
                        </div>
                         <div class="card-button">
                            <span v-touch:tap="mangeCardItem">{{title.substr(0,2)}}</span></div>                                         
                                  </div>

                   </div>
              <!--  右面的滚动 -->


  </div>
 
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
      title:"",
     
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
      vm.title = vm.$route.query.name
    
      vm.swperanceFun()
     

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
      Toast({message:this.title.substr(0,2) + '失败'})
    },
   
     // tab切换
    changeCidGoods(item){
     


      let vm = this
   vm.curcid = item.cid
     
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
       .zs-container{
                       
                         
                        .wrap-message{
                                width: 70%;
                                height: 58%;
                                background:#202533;
                                position:absolute;
                                z-index: 12;
                                top: 50%;
                                left: 54%;
                                -webkit-transform: translate(-50%, -50%);
                                transform:translate(-50%,-50%);
                                // max-width:px2rem(400);
                                @include font-dpr(14px);                             
                               justify-content: space-around;
                               .exchange-item{
                                  line-height: px2rem(40);
                                  width: 55%;

                                  .item-up{
                                    color:$color-orange;
                                    @include font-dpr(15px);
                                    font-weight: bold;
                                    letter-spacing: px2rem(2);
                                  }
                                  .exquestion{
                                    margin-left: px2rem(-40);
                                    width: px2rem(40);
                                    padding:px2rem(10);
                                    // img{
                                    //   width: px2rem(20);
                                    //   height: px2rem(20);
                                    // }
                                    text-align: center;
                                  }
                                  .item-input{
                                    background:$color-zise;
                                    border:none;
                                    color:$color-lightblue;
                                  }
                                  .item-input-first{
                                    width: 100%;
                                  }
                                   .item-input-second{
                                    width: 70%;
                                  }
                                  .verifdiv{
                                    width: 30%;
                                  }
                                  .exchange-button{
                                    width: 100%;
                                    height: 100%;
                                    color:#000000;
                                    text-align: center;
                                    background:$color-orange;
                                    @include font-dpr(14px);
                                  }
  

                               }
                               
                              
                                

                          }
                 }
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
         

              

                .card-container {
                                      width: 100%;
                                     height: 100%;
                                     .card-inut{
                                      line-height: px2rem(60);
                                      width: 70%;
                                      span{
                                        // margin-right: px2rem(20);
                                        display: inline-block;
                                        width: px2rem(100);

                                      }
                                      input{
                                      
                                        width: 60%;
                                        background:#cccccc;
                                        line-height: px2rem(40);
                                        border-radius:2px;
                                          border:2px solid $color-orange;
                                        // flex-shrink: 0;
                                        // flex-grow: 0;
                                      }
                                     }
                                     .card-button{
                                       width: 70%;
                                       text-align: center;
                                       margin-top: px2rem(20);
                                        span{
                                        display: inline-block;
                                        width:20%;
                                        background:$color-orange;
                                        color:#000000;
                                        letter-spacing: px2rem(10);
                                        @include font-dpr(12px);
                                        text-align: center;
                                        border-radius:2px;
                                        line-height: px2rem(40);

                                      }
                                     }
                                  }
                               
                                    


           }

                  
                            
                         

        
     
  }
  
</style>
