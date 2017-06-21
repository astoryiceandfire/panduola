<template>
  <div class="activList">
      <header flex="cross:center">
          
           <span>{{aclist[typeclass].title}}</span>
      </header>
   
        

     
       <div class="activeswiper">
          <!--  //没有活动时候 -->
                    <div class="noactivity" flex="dir:top main:center cross:center" v-if="noactivity">
                      <img src="../../assets/images/nogoods.png">
                      <span>暂时还没有记录</span>
                    </div>
                  <!--  //没有活动时候 -->
          <zs-notessiper :list="lists" :typeclass="typeclass"></zs-notessiper>
      </div>
                   
               
             
           

          

  
 
  </div>
</template>

<script>

import Swiper    from '../../assets/js/swiper'
import ZsNotessiper    from '../../components/notessiper'
import {Apigetawarnote,Apiactionnote,ApiqueryExchange }    from '../../api'
import Vue from 'vue'
import { Indicator,Toast } from 'mint-ui';

export default {
  components: {
  	ZsNotessiper
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
      exchangetexts:['未兑换','待确认地址','未发货','已发货','已签收'],
      aclist:[{title:"中奖纪录",imgi:"fa-star-o"},
              {title:"参与记录",imgi:"fa-clock-o"},
              {title:"兑换记录",imgi:"fa-clock-o"}
             ],
       noactivity:false,//是否有记录
      typeclass:'0',//中奖纪录0 参与记录1 ,
      zsswiper:null,
      option:{
        
          page:1,
          rows:1000,
         
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

       vm.typeclass =  vm.$route.params.id;//中奖纪录0 参与记录1
       
       if (vm.typeclass==0) {
            
             vm.getNotesList(Apigetawarnote)//中奖记录
            
       }else if(vm.typeclass==1){
             
             vm.getNotesList(Apiactionnote)//参与记录
       }else if(vm.typeclass==2){
            vm.getExchangeList()//兑换记录
       }
      
     


      transition.next()
    },
    activate(transition) {
  
      transition.next()
    },
    deactivate(transition) {
       this.zsswiper = null
      this.noactivity = false
      transition.next()
    }
  },
  methods:{
    //左右滚动
          swiperFoo(){
            let vm = this
            if (vm.zsswiper) {
                vm.zsswiper.update()

            }else{
               
                vm.zsswiper = new Swiper(vm.$children[0].$els.notesswiper, {  
                  slidesPerView: vm.slidesPerView,
                  paginationClickable: true,
                  spaceBetween: 30
              });

            }
          	

           

          },
          getExchangeList(){//查询兑换列表
            let vm = this
            this.axios.post(ApiqueryExchange,{}).then(function(response){
              let data = response.data
             
              if (data.retcode==1) {
              
                // vm.lists = vm.lists.concat(data.data.rows)
                data.data.rows.forEach(function(value){
                  value.shopname = value.productName

                  value.buytime = value.exchangeTime/1000
                  value.orderstatus = vm.exchangetexts[value.exchangeState] 
                  if (value.isSysCoins==1) {
                    value.shopname = `${value.productNum}${value.productName}礼包`
                  }

                })
                 vm.lists = data.data.rows
               
                // 数组判断
                 if (vm.lists.length==0) {
                          
                         Indicator.close()
                         setTimeout(function(){
                           vm.noactivity = true//显示没有活动的提示

                         },500)

                        }else{
                           Vue.nextTick(function () {
                               vm.swiperFoo();
                                Indicator.close()
                              
                          })


                        }
                //数组判断
              }
            },function(response){})

          },
          //幸运抢购、显示抢购
          getNotesList(api){
                let vm = this
                Indicator.open('加载中...')
               vm.compare =function(value1,value2){
                    return  Number(value2.buytime) - Number(value1.buytime)
                }
              
                  vm.axios.post(api,vm.option).then((response)=>{
                      let data = response.data
                      if (data.retcode == 1) {

                        vm.lists = data.data.rows.sort(vm.compare)

                         if (vm.lists.length==0) {
                          
                               Indicator.close()
                               setTimeout(function(){
                                 vm.noactivity = true//显示没有活动的提示

                               },500)

                        }else{
                               Vue.nextTick(function () {
                                   vm.swiperFoo();
                                    Indicator.close()
                                  
                              })


                        }


                                       
                      }
                    }).catch((response)=>{
                       Indicator.close()
                    })

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
