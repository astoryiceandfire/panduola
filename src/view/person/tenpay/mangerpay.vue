<template>
<div class="abtb">
    <zs-header title='我的通付卡'></zs-header>

  <div class="main">
        <mt-cell title="我的通付卡" v-touch:tap='entermang'>
              <mt-button v-touch:tap="editrPay">编辑</mt-button>
            </mt-cell>
            <div class="mypays"flex="dir:top main:justify">
              <div class="top" flex='main:justify'>
                    <div class="top_left">
                      <span class="img">ss</span>
                      <span>嘴美贵宾卡</span>
                    </div>
                    <div class="top_right">
                      <span>圈存</span>
                    </div>
              </div>
              <div class="bottom">
                    <p><span>5646</span><span>5646</span><span>5646</span><span>5646</span></p>
              </div>
            </div>
        <mt-cell title="添加通付卡" v-touch:tap="addPay" is-link></mt-cell>
        <mt-cell title="购买通付卡" v-touch:tap="buyPay" is-link></mt-cell>



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
    entermang(){

        this.log("kkk")
    },
    //返回
    handlereturn(){
   
        this.goback()

      },
      //编辑
      editrPay(){

      },
      //添加
      addPay(){

      },
      //购买
      buyPay(){

      },
    

  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/style.scss";
 
  .abtb{
       background:$color-white;
       padding: 0 px2rem(40);
      .main{
        margin-top: px2rem(40);
      }
      .mypays{
        height: px2rem(300);
        background:url('../../../assets/images/card02.png') no-repeat ;
        background-size:px2rem(750) px2rem(300);
        padding:px2rem(20) px2rem(30);
        border-radius: px2rem(20);
      }
     
     
       

    }
  
 
  
</style>
