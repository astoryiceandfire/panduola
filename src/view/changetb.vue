<template>
  <div class="abtb">
   <zs-header title='兑换通币' rightword="kexiao" lank="{name:'Home'}">
      <mt-button v-touch:tap="enterrecords"  slot="right">兑换记录</mt-button>  
   </zs-header>

    <div class="cell border1px setbottomborder" flex='main:justify'><span>当前钻石数量：</span><span>0.0个</span></div>
  <div class="cell border1px setbottomborder" flex='main:justify'><span>可兑换通币数量：</span><span>0通币</span></div>
  <div class="cell border1px setbottomborder" flex='main:justify cross:center'><span>兑换数量：</span><div class="inputd"><input type="number" name="count" id='count' placeholder="兑换数量"></div></div>
 <span class="explain">
   *兑换后可获得通币<span style="color: #f03d52;">(1钻石=1通币)</span>,兑换的通币可在宙斯平台使用
 </span>
<div class="exchange" flex='main:center cross:center'>
   <mt-button size='large' type='normal' v-touch:tap="exChangeCoin" >兑换</mt-button>
</div>
 

   

  </div><!-- home -->
</template>

<script>
import { goback} from '../vuex/actions';

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
      msg: 'This is a Home Page',
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
    //进入兑换记录
    enterrecords(){
    
      this.$router.go({name:"changerecords"})

    },
    //兑换通币
    exChangeCoin(){
   
          this.$router.go({
            name:'record'
          })

      },
    

  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/style.scss";
 
  .abtb{
       background:$color-white;
       padding: 0 px2rem(40);
       // margin-top: 40px;
       .null{
        height: 40px;
       }
     
       .cell{
        height: px2rem(80);
        line-height: px2rem(80);
       }
       .explain{
        display: inline-block;
        margin-top: px2rem(20);
        @include font-dpr(10px);
        // text-indent: px2rem(10);
       }
       .exchange{
        height: px2rem(120);

       }
       .inputd{
        height: px2rem(70);
        #count{
          border:none;
          height: px2rem(60);
          width: px2rem(200);
          text-indent: px2rem(10);
        }
       }
       

    }
  
 
  
</style>
