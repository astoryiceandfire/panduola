<template>
  <div class="app" v-cloak :class="{'change-page':changePage}" >
      <!-- 路由 -->
     
      <div class="wrap">
        <zs-navbar :curindex="curindex"></zs-navbar>

       <!--  <router-view class="v" :transition="effect" keep-alive></router-view> -->
        <router-view class="v" keep-alive></router-view>
        <zs-header ></zs-header>
      </div>

     
  </div>
</template>

<script>
import store from './vuex/store'
import ZsNavbar from './components/sidebar'
import ZsHeader from './components/headerl'

export default {
    name: 'App',
    store: store,
    components: {
      ZsNavbar,
       ZsHeader
    },
    ready() {
    },
    data() {
      return {
        effect       :  'next',        //用于切换过渡动画
        changePage   :  true,         //用于过渡设置样式
        loadshow     :  false,         //用于全局loading
      
      }
    },
         route: {
        data(transition) {
          let vm = this
          // this.curindex = this.$route.query.isCur;
        

          transition.next()
        },
        activate(transition) {
      
          transition.next()
        },
        deactivate(transition) {
         
          transition.next()
        }
      },
       computed:{
            curindex:function(newval,oldval){
              //写的
              let curnumber
              let vm =this
             
            if (vm.$route.query.isCur) {
              sessionStorage.setItem("isCur", this.$route.query.isCur);
              curnumber = vm.$route.query.isCur
            }else {
              curnumber = sessionStorage.getItem('isCur')?sessionStorage.getItem('isCur'):0
            }
              

              return Number(curnumber);
            }

       
       },
    
}
</script>

<style>
  [v-cloak] { 
    display: none;
  }
  
</style>
