<template>
  <div class="abtb">

 <zs-header title='通币介绍'></zs-header>
 <div class="tbbg" flex='main:center cross:center'>
      <img src="../assets/images/tbtop.png">
 </div>


   <div class="arctitle">
     <h1 class="title">通币介绍</h1>
     <p class="conone">通币是深圳宙斯科技有限公司与上海积分通信息服务有限公司合作发行的互联网积分消费系统，用户可通过兑换积分通币在线上及线下支持银联POS机的任何网点进行消费，具有安全、方便、快捷等优点。</p>
     <h1 class="title">通币使用流程</h1>
         <p class="contwo">在您通过游戏赚取游戏币后，您可通过游戏币按一定比例兑换成通币，而通币又有何用处呢？您可以从商城里进入，使用通币购买您所喜爱的商品；同时通币还支持线下银联POS机使用。当您的通币累积到一定数量时，可通过<span class="operate">“我的通付卡>添加通付卡>认购通付卡”</span>
      进入，申请认购后将其添加至您的账户中，然后再进行圈存操作<span class="operate">“圈存通币”</span>，成功后即可在线下支持银联POS机的商铺中消费了。     

      </p>

     
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
      console.log('hook-example activated!')
      transition.next()
    },
    deactivate(transition) {
      console.log('hook-example deactivated!')
      transition.next()
    }
  },
  methods:{
    handlereturn(){
   
    this.goback()

      },
    

  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/style.scss";

  .abtb{
     background:$color-white;
     
  }
  .tbbg{
   
    background:url("../assets/images/infotop.png") no-repeat;
    background-size:px2rem(750) px2rem(400);
    height: px2rem(400);
    img{
      width: px2rem(200);
      height: px2rem(200);
    }
  }
  .mint-header{
    z-index: 100;
  }
  .arctitle{
    padding: px2rem(20) px2rem(40);

    h1.title{
          height:px2rem(100);
          line-height: px2rem(100);
          font-weight: bold;
           @include font-dpr(15px);
    }
    p{
        @include font-dpr(13px);
        color: $color-invalid;
        .operate{
          color: $color-red;
        }
    }


  }
</style>
