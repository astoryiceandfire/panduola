<template>

  <mt-header fixed :title="title">
  <div slot='left' class="left" style="padding-left:0.5rem">
    <span   v-touch:tap="handlereturn" style='width:0.6rem;border-radius:0.1rem' class="colorbg">
      <img class="leftimg" src="../assets/images/right.png" alt="" :class="[isdimleft?'isdim':'']">

    </span>
    <span   v-touch:tap="handlenter" style='width:0.6rem;margin-left:0.5rem;border-radius:0.1rem' class="colorbg">
         <img src="../assets/images/right.png" alt="" :class="[isdimright?'isdim':'']">
 </span>
  <span v-touch:tap="refreshLoad" style='width:0.6rem ;margin-left:0.5rem;border-radius:0.1rem' class="colorbg">
         <img class="clireimg" src="../assets/images/refresh.png" alt="">
 </span>
  </div>

 <div slot=right>
  <mt-button class="rightBtn"  v-touch:tap="handleclose" style='width:0.6rem;margin-right:0.2rem'>
         <img  src="../assets/images/3icon.png" alt="">
  </mt-button>
   <slot name=right></slot>
 </div>

    
  </mt-header>
<!--   <div class="null"></div> -->
</template>

<script>
import { goback} from '../vuex/actions';
export default {
  name: 'zsheader',
  data(){
    return {
          isdimleft:true,
          isdimright:true,
          routename:['activity','shoping','community','person'],
        }
  },

  props: {
    title: String,
  },
    vuex: {
      actions: {
        goback
      },
      getters: {
       
      }
  },
  watch:{
   '$route':function(){
    let vm = this 

      if (vm.routename.indexOf(vm.$route.name)!=-1) {
     
           vm.isdimleft = true
      }else{
       
          vm.isdimleft = false
         
      }
  
   }

  },
  methods:{
    refreshLoad(){//刷新
       
       location.reload()
    },
    handlereturn(){
      
     let vm = this
       if (vm.isdimleft==false) {
      
              history.go(-1)
               vm.isdimright = false
           }else{

       }
      
    
    

    },
    handleclose(){
      console.log("close")

                var u = navigator.userAgent;
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
              window.Logic.close();
            } else if (u.indexOf('iPhone') > -1) {//苹果手机
              window.webkit.messageHandlers.close.postMessage(null);
            } else if (u.indexOf('Windows Phone') > -1) {//winphone手机

            }
    },
    handlenter(){
        // console.log("go1")
       history.go(1)
       
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .null{
        height: 0.8rem;

       }
      /* .mint-header{
        height: 60px!important;
       }*/
       .mint-button{
        height: 0.8rem;

       }
       .rightBtn{
        height: 0.6rem;
        padding:0.1rem;
           &:active{
              background:rgb(128,128,128);
          };
       }
       .colorbg{
           &:active{
              background:rgb(128,128,128);
          };
       }
       .left{
        display: flex;
        justify-content: space-between;
       }
       span{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0.6rem;
       }
        img{
          width: 0.28rem;
          height: 0.35rem;
        
        }
        img.clireimg{
          width: 0.38rem;
          height: 0.38rem;
        }
        .isdim{
           filter:alpha(Opacity=80);-moz-opacity:0.2;opacity: 0.2;
        }
        .leftimg{
          -moz-transform:rotate(180deg);
           -ms-transform:rotate(180deg);
          -webkit-transform:rotate(180deg);
          transform: rotate(180deg);
        }
     
</style>
