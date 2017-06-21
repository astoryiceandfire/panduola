<template>
  <div class="abtb">

  <zs-header title='绑定手机号'></zs-header>



<div class="page-part">
<mt-cell title="手机号"></mt-cell>
 <mt-field :value.sync='moblie' placeholder="您的手机号" type="tel"></mt-field>
 <mt-cell title="验证码"></mt-cell>
 <mt-field :value.sync='identcode' placeholder="请输入验证码" type="text">
    <mt-button v-touch:tap="getidentcode">获取验证码</mt-button>
 </mt-field>
</div>
    <div class="binding"> 
    <div>
      <mt-button v-touch:tap="handlereturn" size='large' type='normal'>绑定</mt-button>
    </div>
    <div> <p>*为了保障您的账号安全，请先绑定您的手机号</p></div>

            
    </div>
       

  </div><!-- home -->
</template>

<script>


export default {
  components: {

  },
  // vuex: {
  //     actions: {

  //     },
  //     getters: {
       
  //     }
  // },
  data () {
    return {
      moblie:'',
      identcode:''
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
  

  }
}


</script>

<style lang="scss" scoped>
  @import "../../assets/scss/style.scss";
 
  .abtb{
       background:$color-white;
       padding: 0 px2rem(40);
       .binding{
       
        padding:px2rem(80) px2rem(100);
        line-height: px2rem(80);
        p{
          color: $color-red;
          @include font-dpr(11px);
        }

       }
     
     
       

    }
  
 
  
</style>
