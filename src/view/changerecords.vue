<template>
  <div class="componentswrap">
    <zs-header title='我的订单'></zs-header>
   

    <div id="wrapper">
        <div id="scroller">
            <div class="content">
                        <div v-for="n in 10" :class="['item','border-green',false?'border-red':'']" flex="cross:center">
                               <div class="left" flex="dir:top cross:center main:justify">
                                  <div><img src="../assets/images/success-icon.png"></div>
                                  <span :class="['greenclass',flase ? 'redclass':'']">充值成功</span>
                               </div>
                               <div class="middle" flex="dir:top main:justify">
                                 <h1>微信充值￥10.00</h1>
                                 <span>订单号：15165161651651561</span>
                               </div>
                               <div class="right" flex="dir:top main:justify">
                                 <h1 style="color:#F66F6B">+10.00通币</h1>
                                 <time style="color:#6E6E6E">06-08 08:02</time>
                               </div>
                          
                        </div>
              </div><!-- content -->
          </div><!-- wrapper -->
     </div><!-- scroller -->

       <!--   <div class="item" flex="cross:center">
           <div class="left" flex="dir:top cross:center main:justify">
              <div><img src="../assets/images/success-icon.png"></div>
              <span >充值成功</span>
           </div>
           <div class="middle" flex="dir:top main:justify">
             <h1>微信充值￥10.00</h1>
             <span>订单号：15165161651651561</span>
           </div>
           <div class="right" flex="dir:top main:justify">
             <h1>+10.00通币</h1>
             <time>06-08 08:02</time>
           </div>
          
        </div> -->
      
  




 

   

  </div>
</template>

<script>
// import { goback} from '../vuex/actions';
import IScroll    from '../assets/js/iscroll'
import {Toast} from 'mint-ui'
export default {
  components: {
  
  },
  // vuex: {
  //     actions: {
  //     goback
  //     },
  //     getters: {
       
  //     }
  // },
  data () {
    return {
    
    }
  },
  computed:{
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      vm.iscroll()
      
        

  


      transition.next()
    },
    activate(transition) {
      console.log('hook-example activated!')
      transition.next()
    },
    deactivate(transition) {
      console.log('hook-example deactivated!')
      transition.next()
    }
  },
    methods:{
               //滑动组件
            iscroll(){
                  let self  = this
                  
                 
              
                  
                  self.$nextTick(() =>{
                    var myScroll = new IScroll('#wrapper', { 
                      
                      preventDefault: true,
                      scrollbars: false,
                      click:true,
                    
                     
                  });
                     // myScroll.refresh()

                  //滚动完毕  
                  myScroll.on('scrollEnd',function(){  

                 
                    
                    

                      let _this = this
                      if(this.y == 0 ){
                         
                          myScroll.refresh()
                      }else if( _this.y <= _this.maxScrollY){
                          self.reqdata.page ++
                          if (self.reqdata.page <= self.total  ) {
                            
                         log("加载数据")
                            
                          }
                          myScroll.refresh()
                      }
                      
                  }) 

                  myScroll.on('scrollStart',function(){  
                   
                      let _this = this
                      if(_this.y >= 0 ){

                          self.pullDown = true
                          myScroll.refresh()
                      }else if( _this.y ==  _this.maxScrollY){
                          self.pullUp = true
                          myScroll.refresh()
                      }
                  })

                  self.banTouchmove()
                });
              },

              preventDefault(e){ 
                e.preventDefault(); 
              }, 
              banTouchmove(){
                document.addEventListener('touchmove', this.preventDefault, false) 
              },
              restoreTouchmove(){
                document.removeEventListener('touchmove', this.preventDefault, false)
              },

     
     
      

    }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/style.scss";
 
  .componentswrap{
       
       background:$color-ccc;
       padding: 0 px2rem(20);
       .content{
            
          padding-top: px2rem(20);
                .border-red{
                  border-left:px2rem(10) $color-red solid;
                 }
                  .border-green{
                  border-left:px2rem(10) $color-ngreen solid;
                 }
            .item{
              // background:$color-white;
               height: px2rem(150);
               position:relative;
               margin-bottom: px2rem(10);
               background:url("../assets/images/record_right.png") no-repeat $color-white;
               background-position:top px2rem(45) right 0px;
              


                  .left{
                     margin:auto px2rem(30);
                      height: px2rem(100);
                      div{
                        width: px2rem(60);
                        height: px2rem(60);
                      }
                      span{
                        white-space: nowrap;
                      }
                      .greenclass{
                        color: $color-ngreen;
                      }
                       .redclass{
                        color:$color-red;
                      }
                    }
                    .middle{
                      height: px2rem(100);
                    }
                    .right{
                      height: px2rem(100);
                      position: absolute;
                      right: px2rem(15);

                    }
            }
       }
     
      
     
       

    }
  
  #wrapper {
      position: absolute;
      z-index: 1;
      top:px2rem(60);
      bottom: 0px;
      left: 0;
      width: 100%;
      background: #ccc;
      overflow: hidden;
       padding: 0 px2rem(20);
}

#scroller {
      position: absolute;
      z-index: 1;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      width: px2rem(710);
      // width: 100%;
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

     
}

  
</style>
