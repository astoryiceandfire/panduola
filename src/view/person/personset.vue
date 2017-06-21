<template>
  <div class="abtb">
 
   <zs-header title='个人设置'></zs-header>
<mt-cell title="手机号" v-touch:tap='entermang' is-link>
  <span>15690868587</span>
</mt-cell>


<mt-cell v-touch:tap='entermanger' title="通付卡管理" is-link></mt-cell>
<mt-cell title="收货地址管理" is-link></mt-cell>
<mt-cell title="安全设置" is-link></mt-cell>


 

   

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
      // msg: 'This is a Home Page',
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
    //手机号
    entermang(){

        this.log("kkk")
    },
    //同福卡管理
    entermanger(){
     
      this.$router.go({
        name:'mangerpay'
      })
    }
   
    

  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/style.scss";
 
  .abtb{
       background:$color-white;
       padding: 0 px2rem(40);
       // margin-top: 40px;
       .null{
        height: 40px;
       }
     
     
       

    }
  
 
  
</style>
