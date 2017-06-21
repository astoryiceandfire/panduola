<template>
<div class="shareitem" v-for="item in lists">
      <div class="share-header" flex="main:justify cross:center">
        <div class="share-header-left">商品：{{item.title}}</div>
        <div class="share-header-right">第{{item.shopNum}}期</div>
      </div>
      <div class="share-main" v-touch:tap="enterDetail(item)">
        <div class="share-user" flex="dir:left cross:center">
          <div class="share-user-img">
            <img :src="ip + item.portrait">
          </div>
          <div class="share-user-name">{{item.nickname}}</div>
          <div class="share-user-time">{{item.loginlasttime}}</div>
        </div>
        <div class="share-content">{{item.content.length>20?item.content.slice(0,20)+'...':item.content}}</div>
      </div>
</div>
        
</template>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

   
  </div>
</template>

<script>
import {IP} from '../api'
export default {
  name: 'ShareItem',
  props:{
    lists:Array
   
    },

  data(){
    return{
    ip:IP,
     
    }
  },
  methods:{
    enterDetail(item){
     this.$router.go({name:'shareorderdetail',query:item})
    }

       
    },
  computed:{


   
  },

};
</script>

<style lang="scss" scoped>
  @import "../assets/scss/style.scss";
  .shareitem{
      .share-header{
        height: px2rem(60);
        background:#181C27;
        color:$color-deeporange;
        @include font-dpr(14px);
        padding: 0 px2rem(10);
      }
      .share-main{
        padding:px2rem(20) px2rem(10);
          .share-user{
            .share-user-img{
              width: px2rem(50);
              height: px2rem(50);
              border-radius: 50%;
              background:$color-cheapccc
            }
            .share-user-name{
              color:$color-cheapccc;
              @include font-dpr(16px);
              padding-left:px2rem(10);
            }
            .share-user-time{
              color:$color-cheapccc;
              @include font-dpr(14px);
              position: absolute;
              right: px2rem(10);
            }

          }
          .share-content{
            color:$color-zibai;
            @include font-dpr(14px);
            padding:0 px2rem(50);

          }

      }

  }

 
</style>
