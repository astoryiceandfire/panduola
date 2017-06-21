<template>
  <div class="activList">
      <header flex="cross:center">
           <i :class=['fa',aclist[type].imgi,'fa-2x'] aria-hidden="true"></i> 
           <span>{{aclist[type].title}}</span>
      </header>
   
        

     
       <div class="activeswiper">
             <!--  //没有活动时候 -->
                    <div class="noactivity" flex="dir:top main:center cross:center" v-if="noactivity">
                      <img src="../../assets/images/nogoods.png">
                      <span>暂时还没有活动</span>
                    </div>
                  <!--  //没有活动时候 -->
                 
          <zs-commsiwper :list="lists" :type="type"></zs-commsiwper>
      </div>
                   
               
             
           

          

  
 
  </div>
</template>

<script>

import Swiper    from '../../assets/js/swiper'
import ZsCommsiwper    from '../../components/commsiwper'
import {ApiIshopList,
        ApiAuctionList}    from '../../api'
import Vue from 'vue'
import { Indicator,Toast } from 'mint-ui';

export default {
  components: {
  	ZsCommsiwper
  },
  vuex: {
      actions: {
      
      },
      getters: {
       
      }
  },
  data () {
    return {
    	lists:[],
      slidesPerView:3,//分页数目
      aclist:[{title:"幸运抢购",imgi:"fa-star-o"},
              {title:"限时抢购",imgi:"fa-clock-o"},
              {title:"低价竞拍",imgi:"fa-gavel"}],
      noactivity:false,//是否有活动
      type:'0',//幸运抢购0 显示抢购1 低价竞拍2,
      option:{//幸运抢购0 显示抢购1请求参数
          islimittime:0,
          page:1,
          rows:1000,
          type:null,
          shopid:null,
      }

     

    
  }},
  computed:{
   
  },
  
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
     vm.lists=[]
      Indicator.open('加载中...')
   

       vm.type =  vm.$route.params.id;//幸运抢购0 显示抢购1 低价竞拍2

       
       if (vm.type==0) {
              vm.option.islimittime = 0
             vm.getShopList()//幸运抢购
       }else if(vm.type==1){
              vm.option.islimittime = 1
             vm.getShopList()//显示抢购
       }else if(vm.type==2){
        vm.getShopList(ApiAuctionList)//低价竞拍

       }
      
     


      transition.next()
    },
    activate(transition) {
  
      transition.next()
    },
    deactivate(transition) {
     this.noactivity = false
      transition.next()
    }
  },
  methods:{
    //左右滚动
          swiper(){
            let vm=this
          	

              new Swiper(this.$children[0].$els.commswiper, {
            
              slidesPerView: vm.slidesPerView,
              paginationClickable: true,
              spaceBetween: 30
              });

          },
          //幸运抢购、显示抢购
          getShopList(api=ApiIshopList){
                let vm = this
              
                  vm.axios.post(api,vm.option).then((response)=>{
                      let data = response.data
                      if (data.retcode == 1) {
                        vm.lists = data.data.rows
                        Indicator.close()
                        if (vm.lists.length==0) {
                          
                        
                         setTimeout(function(){
                           vm.noactivity = true//显示没有活动的提示
                         },500)

                        }else{
                           Vue.nextTick(function () {
                               vm.swiper();
                              
                          })

                        }

                         
                        
                      }
                    }).catch((response)=>{})

          }


      

  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/style.scss";
  @import '../../assets/css/swiper.css' ;  

  .activList{
     background:$color-primary;
      padding-left: px2rem(70);
      padding-bottom:px2rem(60);

               header{
                        color:$color-white;
                        height: 8%;
                        padding-left:px2rem(20);
                        i{
                            color: $color-orange;
                          }
                          span{
                            display: inline-block;
                            padding-left:px2rem(15);
                             @include font-dpr(14px);
                             letter-spacing: px2rem(3);
                          }
                  }
               .activeswiper{
              
                width: 100%;
                height: 92%;
                 .noactivity{
                               
                                width: 100%;
                               height: 100%;
                                z-index: 110;
                                  img{
                                      width: px2rem(80);
                                      height: px2rem(80);
                                    }
                                    span{
                                      display: inline-block;                        
                                      margin-top: px2rem(10);
                                      @include font-dpr(10px);
                                      color:$color-cheapccc;                         
                                    }
                              }
               }
     
   
  }
  
</style>
