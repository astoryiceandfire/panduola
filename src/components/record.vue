<template>
<div class="abtb">
    <zs-header title='订单详情'></zs-header>

  <div class="main">
          <div class="reresult" flex="dir:top main:center cross:center">
               <span class="imgbg"> </span>
               <span class="coincount">+100.0通币</span>
               <span class="success">兑换成功</span>
                              
          </div>
       
        <mt-cell title="游戏信息："></mt-cell>

        <div class="coininfo" flex="cross:center">
              <div class="left"><img src="./../assets/images/xunzhang-icon.png"></div>
              <div class="right" flex="dir:top">
                <h1 class="title">星际不语</h1>
                <span class="bili">(100钻石=1通币)</span>
              </div>
        </div>

       
        <template v-if='true'>
         <mt-cell title="消耗钻石数量"><span style="color:red">100000个</span></mt-cell>
        </template>
         <!--  <template v-if='true'>
         <mt-cell title="获奖信息"><span style="color:red">第3名</span></mt-cell>
         <mt-cell title="获得奖励"><span style="color:red">10.00</span></mt-cell>
        </template>
          <template v-if='true'>
         <mt-cell title="获得金额"><span style="color:red">100.00</span></mt-cell>
         <mt-cell title="手续费"><span style="color:red">0.00</span></mt-cell>
        </template>
          <template v-if='true'>
         <mt-cell title="购买数量"><span style="color:red">2张</span></mt-cell>
         <mt-cell title="快递费"><span style="color:red">3通币</span></mt-cell>
          <mt-cell title="总计"><span style="color:red">9通币</span></mt-cell>
        </template> -->
        <mt-cell>
          <span slot="icon" >ddddddd</span>
        </mt-cell>
<mt-cell title="标题文字" value="说明文字"></mt-cell>





       



  </div>

         <div class="footer">
           <mt-button size='large' type='normal' v-touch:tap="exChangeCoin" >确定</mt-button>
        </div>
      
 

   

  </div><!-- home -->
</template>

<script>
// import { goback} from '../vuex/actions';

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
      titleone:"消耗钻石dddd数量",
      list:[{"text":123},{"text":123}]
     
    }
  },
  computed:{
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let self = this
      
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
       

  }
}
</script>

<style lang="scss" scoped>
  @import "./../assets/scss/style.scss";
 
  .abtb{
       background:$color-ccc;
       position:relative;
      .main{
             .reresult{
               padding:px2rem(40);
               background:$color-white;
               margin-bottom: px2rem(10);

                span.imgbg{
                   display: inline-block;
                   width: px2rem(100);
                   height: px2rem(100);
                   background:url("./../assets/images/success-icon.png");
                   background-size:cover;

                }
                span.coincount{
                  color: $color-red;
                  line-height: px2rem(60);
                }
                span.success{
                  color: $color-ngreen;
                }
             }
             .coininfo{
                      height: px2rem(200);
                     background:$color-white;
                     padding:px2rem(40);
                     margin-bottom: px2rem(10);

                    .left{
                      width: px2rem(100);
                      height: px2rem(100);
                      
                    }
                    .right{

                          .title{
                             @include font-dpr(15px);
                             font-weight: bold;
                          }
                          .bili{
                            color: #C0C0C0;
                          }
                    }

               }
               
      }
     

     .footer{
                position:absolute;
                width: px2rem(500);
                bottom: px2rem(100);
                left: px2rem(125);

               }
       

    }
  
 
  
</style>
