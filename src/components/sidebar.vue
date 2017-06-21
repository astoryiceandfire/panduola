<template>
  <div class="zs-navbar" flex="dir:top box:mean">
      <template v-for="item in list">

          <div class="item" flex="dir:top main:center cross:center" v-touch:tap="changeIndex($index)":class="{'is-selected':curindex===$index}">
            <div class="item-icon">
                <i :class=["fa",item.ifont,"fa-2x"] aria-hidden="true"></i>
                  </div>
            <div class="item-label">{{item.title}}</div>
            
        </div>
        
      </template>

     

   
  </div>
</template>

<script>
import { Toast  } from 'mint-ui';
export default {
  name: 'ZsNavbar',
  props:{
    curindex:Number,
    },

  data(){
    return{
      list:[{title:'活动专区',ifont:'fa-bolt'},
            {title:'通币商城',ifont:'fa-shopping-bag'},
            {title:'用户社区',ifont:'fa-comments-o'},
            {title:'个人中心',ifont:'fa-user'}],
     
    }
  },
  methods:{
        changeIndex(index){          
        
            switch(index){
              case 0:
              this.$router.replace({
                name:"activity",
                query:{isCur:0}
              })
              break;
              case 1:
               this.$router.replace({
                name:"shoping",
                 query:{isCur:1}
              })
               // Toast({message:'暂未开放'})

              break;
              case 2:
               this.$router.replace({
                  name:"community",
                  query:{isCur:2   
                  }
              })
             
              break;
              case 3:
              this.$router.replace({
                name:"person",
                 query:{isCur:3}
              })
              break;

            }

        }
    },
  // computed:{

   
  // },

};
</script>

<style lang="scss" scoped>
  @import "../assets/scss/style.scss";
  .zs-navbar{
        width: px2rem(70);
        position: fixed;
        left: 0;
        top: 0;
        bottom: px2rem(60);

         text-align: center;
        z-index: 10;
        background: $color-lhblack;
              .item{
                color: $color-white;
                 @include font-dpr(10px);
              }

            .is-selected {
                  border-right: px2rem(5) solid $color-active;
                  color: $color-active;
                  margin-right: px2rem(-5);
                }
       


  }



 
</style>
