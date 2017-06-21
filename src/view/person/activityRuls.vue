<template>
  <div class="home">
      <div class="srapper" flex="dir:left">
      <!-- 左边wraper -->
            <div class="writem">
              <div id="wrapper" v-el:wrpone>
                  <div id="scroller">
                      <div id="content">
                          <header><span>活动规则</span></header>
                          <ul>
                            <li v-for="item in rulsdata">
                            <p class="title">{{item.title}}</p>
                               <p class="subtitle border1px setarrborder">
                                 {{item.content}}
                               </p>
                            </li>
                          </ul>
                        

                      </div>
                     
                  </div>
              </div>
            </div>
            <!-- 左边wraper -->
          

      </div>
  
 
  </div>
</template>

<script>


import {myMixin}    from '../../mixin'
import {IP,ApiComProblem}    from '../../api'

import { Indicator,Toast } from 'mint-ui';
export default {

    mixins: [myMixin],
  vuex: {
      actions: {
      
      },
      getters: {
       
      }
  },
  data () {
    return {
      insscroll:null,
      rulsdata:[],
      ruledata:[{title:"什么是低价竞拍?",content:"低价竞拍,简单的说,就是比谁的出价低!在规定时间内,唯一最低价的出价者为获胜者.",onSwitch:false},
            {title:"什么是唯一最低价?",content:"唯一最低价即唯一且最低的价格.首先必须是唯一,然后是最低,也就是所有唯一价格中最低的价格.或者可以说成没有重复的最低价,例如：奖品出价结果为：1(22人)、2(1人)、5(2人)、8(4人)，则取出价2的人为中奖者.",onSwitch:false},
            {title:"如果没有唯一最低价怎么办？",content:"虽然这种情况出现概率极低，一旦出现，系统将选取出价人数最少的那一组价格，取最低价格，第一个对该价位出价的用户作为中奖者,例如：奖品出价结果为：1(7人)、3(5人)、5(2人)、6(4人)，则取第一个出价5的人为中奖者.",onSwitch:false}],
        

       }
  },
  computed:{
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      let istrue = vm.$route.query.isDiJia
      if (istrue) {
        vm.rulsdata = vm.ruledata
        vm.$nextTick(function(){
                                 
               vm.insscroll = vm.addiscroll("wrpone")
         
            })
      }else{
         vm.getRuls()

      }

     
      if (vm.insscroll) {
        vm.insscroll.refresh()

      }else{
       
           vm.insscroll = vm.addiscroll("wrpone")


        
      }
     

     
        
  

     
       
         

       
       
     
  
     
     

      transition.next()
    },
    activate(transition) {
  
      transition.next()
    },
    deactivate(transition) {
     
      transition.next()
    }
  },
  methods:{
    //请求活动规则
    getRuls(api=ApiComProblem){
      let vm =this
      vm.axios.post(ApiComProblem,{}).then(function(response){
        if (response.data.retcode==1) {
          vm.rulsdata=response.data.data
          vm.$nextTick(function(){
                                 
               vm.insscroll = vm.addiscroll("wrpone")
         
            })

        }
      },function(){})
    }
    
   
    
    

  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/style.scss";
  @import '../../assets/css/swiper.css' ;  

  .home{
       background:$color-white;
       padding-left: px2rem(70);

         .srapper{
             position:absolute;
             top: 0;
             left: px2rem(70);
             bottom:px2rem(60);
             right: 0;
              #wrapper{
                  position: absolute;
                  z-index: 1;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  
                  overflow: hidden;
                    background:$color-primary;
                  
                }
                 #scroller{
                      background:#color-white;
                     
                      top:0;
                      left: 0;
                      right: 0;

                      #content{
                        width: 100%;
                        background:#090C12;
                        padding:0 px2rem(100);
                        text-align: center;
                        padding-bottom:px2rem(60);
                       
                        header{
                          height: px2rem(50);
                          line-height: px2rem(50);

                          span{
                              @include font-dpr(14px);
                              color:$color-white;
                          }
                        }

                        ul{

                          color:#fff;
                          li{
                           p.title{
                            text-align: left;
                            color:$color-orange;
                            letter-spacing: 2px;
                            @include font-dpr(14px);
                            height: px2rem(50);
                            line-height: px2rem(50);
                            border-left:px2rem(5) solid $color-orange;
                            text-indent: px2rem(10);
                           }
                           p.subtitle{
                             color: #F7F7F6;
                             text-align: left;
                              padding:px2rem(10);
                              @include font-dpr(12px);
                              line-height: px2rem(25);
                              background:#10121A;


                           }
                          }
                        }

                      }

                 
                }

             
            }
     
  }
  
</style>
