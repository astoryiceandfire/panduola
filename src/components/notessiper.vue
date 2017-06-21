<template>
         
                        <div class="swiper-container" v-el:notesswiper>
                                <div class="swiper-wrapper">
                                <div v-touch:tap="enterCofirmAward(item)" flex="dir:top cross:center " class="swiper-slide" v-for="item in list">
                                    <div class="card_img" >
                                      <p flex="main:justify"> <span>{{item.buytime*1000 | dateFormat 'yyyy-MM-dd hh:mm:ss'}}</span>
                                      <span class="orderstatus">{{item.orderstatus}}</span></p>
                                      <img :src="ip+item.cover">
                                    
                                    </div>
                                    <div class="card_notice" flex="dir:top main:justify">
                                        <div class="top" flex="cross:center">
                                          <p class="nametitle">{{item.shopname||item.title}}</p>

                                          <span v-if='item.type' :class=["actype",typetitle[item.type].class]>{{typetitle[item.type].title}}</span>

                                        </div>
                                        <div class="middle" flex="main:justify cross:center">
                                          <div class="ac_left">
                                            <p class="mid_title" v-if="item.shopperiods">第{{item.shopperiods}}期</p>
                                          
                                            </p>
                                          </div>
                                          
                                          <div class="ac_right">

                                            <p v-if="item.type==3" class="mid_title">出价:<span class="orangecolor">{{item.paycount}}</span>通币</p><!-- //低价竞拍出价 -->
                                            <p v-else class="mid_title" v-if="item.paycount">参与人次:<span class="orangecolor">{{item.paycount}}</span>次</p><!-- //幸运抢购 限时抢购参与次数 -->
                                           
                                          </div>
                                        </div>
                                        <div class="bottom" flex="cross:center main:center">
                                        <template v-if="typeclass==0"><!-- //中奖纪录 -->
                                                 <template v-if="item.type==3">
                                                 <span>竞拍出价</span>
                                                  <span class="orangecolor">{{item.paycount}}通币</span>
                                              </template>
                                              <template v-else>
                                                <span>幸运号码：</span>
                                                <span class="orangecolor">{{item.bingocode}}</span>
                                              
                                              </template>
                                        </template>
                                        <template v-if="typeclass==1"><!-- 、、参与记录 -->
                                            <p  v-if="item.wuser">中奖人:<span class="orangecolor">{{item.wuser.nickname}}</span></p>
                                            <p  v-if="!item.wuser" class="orangecolor">活动进行中</p>
                                       
                                             
                                        </template>
                                         <template v-if="typeclass==2"><!-- 、、兑换记录 -->
                                             <span >兑换码：</span>
                                                <span class="orangecolor">{{item.code}}</span>
                                       
                                             
                                        </template>

                                        
                                        
                                             
                                          </div>
                                       
                                    </div>
                                    
                               
                                    </div>
                              </div>
                          
                         </div>

          
                   
</template>

<script>
import counter from "../components/counter";
import {IP} from '../api'
export default {
      name: 'ZsCommsiwper',
      components: {
        counter
      },
      data(){
          return {
            ip :IP,
            typetitle:[{},{title:"幸运抢购",class:"organbg"},{title:"限时抢购",class:"bluebg"},{title:"低价竞拍",class:"redbg"}]
          }
      },

      props: {
        list: Array,
        typeclass:String,//0中奖记录 1 参与记录 2 兑换记录
       
       
        
      },
       
      methods:{
        enterCofirmAward(item){
              let vm =this
              if (vm.typeclass == 0||vm.typeclass == 2) {//中奖记录

                if (item.isSysCoins==1) {//兑换通币 不需要进入详情页
                  return 
                }

                    this.$router.go({
                    name:"cofirmAwardInfo",
                    query:item,
                  })
              }else{//参与记录
               
                if (item.wuser) {//活动已结束

                      vm.$router.go({
                        name:"activityReadDetails",
                        params:{id:item.shopid},
                        query:{type:item.type-1}
                      })

                }else{//活动未结束
                 
                  vm.$router.go({
                    name:"activityDetails",
                    params:{id:item.shopid},
                    query:{type:item.type-1}
                  })

                }



              }

         
        }
       
      }
};
</script>


<style lang="scss" scoped>
  @import "../assets/scss/style.scss";
     .swiper-container {
           
            height: 100%;
     
            .swiper-wrapper{
         
                      .swiper-slide {

                        background:$color-primary;
                              .card_img{
                                width: 100%;
                                height: 70%;


                                    p {
                                          position: absolute;
                                         
                                          background:$color-zise;
                                         
                                         
                                          width: 100%;
                                          height: px2rem(30);
            
                                          line-height: px2rem(30);
                                          padding:0 px2rem(10);
                                         
                                          color: $color-cheapccc;
                                         
                                          @include font-dpr(10px);
                                          font-weight: 900;
                                        span.orderstatus{
                                          color: $color-orange;
                                        }
                                       
                                      }
                                   
                              }
                              .card_notice{
                                width: 100%;
                                height: 30%;
                                background:$color-zise;
                                padding: 0 px2rem(10);
                                      .top{
                                          p.nametitle{
                                            color:$color-white;
                                            @include font-dpr(12px);
                                            white-space: nowrap;
                                            overflow: hidden;
                                            text-align: left;
                                          }
                                          webkit-flex-grow: 1;
                                          flex-grow: 1;
                                          img{
                                                position: absolute;
                                                left: 60%;
                                                bottom: 20%;
                                                width: px2rem(90);
                                                height: px2rem(90);
                                                
                                          }
                                           span.actype{
                                               position:absolute;
                                             width: px2rem(40);
                                             height: px2rem(40);
                                              line-height: px2rem(20);
                                               right:0;
                                               bottom:25%;
                                              color: $color-black;
                                                @include font-dpr(10px);
                                                text-align: center;

                                                       }

                                       }
                                       .middle{
                                          webkit-flex-grow: 1;
                                         flex-grow: 1;
                                         
                                           
                                            .mid_title{
                                              color:$color-deccc;
                                                @include font-dpr(12px);
                                                white-space: nowrap;
                                                overflow: hidden;
                                            }
                                            

                                       }
                                       .bottom{
                                        webkit-flex-grow: 1;
                                         flex-grow: 1;
                                         color: $color-white;
                                         background:#202533;
                                        span{                                              
                                                line-height: px2rem(30);
                                                height: px2rem(30);                                             
                                                @include font-dpr(10px);
                                                white-space: nowrap;
                                          }
                                          p{
                                              width: 100%;
                                              @include font-dpr(12px);
                                            span{
                                              @include font-dpr(12px);
                                            }
                                          }

                                       }
                                       .orangecolor{
                                        color: $color-orange;
                                       }
                              }
                  }
            }
           
           
     }
</style>
