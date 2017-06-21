<template>
         
                        <div class="swiper-container" v-el:commswiper>
                                <div class="swiper-wrapper">
                                <div flex="dir:top cross:center " class="swiper-slide" v-for="item in list">
                                    <div class="card_img" v-touch:tap="enterActiveShop(item)">
                                      <p>第{{item.periods||item.period}}期</p>
                                      <img :src="ip+item.cover">
                                       <template v-if="type!=2">
                                              <p v-if="item.limitmember!==0" class="limitmember">每人限购{{item.limitmember}}次</p>
                                          </template>
                                    
                                    </div>
                                    <div class="card_notice" flex="dir:top main:justify">
                                        <div class="top" flex="cross:center">
                                          <p class="nametitle">{{item.title}}</p>
                                         
                                          <img v-if="item.limitstart==0&&type==0" src="../assets/images/ic_act_no_limit.png" />

                                        </div>
                                        <div class="middle" flex="main:justify cross:center">
                                          <div class="ac_left">
                                            <p class="mid_title">推荐参与度</p>
                                            <p class="star">
                                        
                                               <i v-for="n in item.rating" class="fa fa-star fontcolor" aria-hidden="true"></i>
                                                <i v-for=" n in 5 - item.rating" class="fa fa-star" aria-hidden="true"></i>
                                       
                                            </p>
                                          </div>
                                          <div class="ac_middle">
                                            <p v-if="item.limitstart>0||item.starttime" class="mid_title">开始倒计时</p>
                                             <p v-else class="mid_title">截止倒计时</p>
                                            <p>
                                            <counter :item='item' :downtime='item.limitstart||item.starttime||item.limitend||item.endtime'></counter>
                                           
                                            </p>

                                          </div>
                                          <div class="ac_right">
                                            <p class="mid_title">参与人次</p>
                                            
                                            <p v-if="type==2" class="jointimes">{{item.joinedmember}}</p>
                                            <p v-else class="jointimes">{{item.joinedmember + '/' + item.totalmember}}</p>
                                          </div>
                                        </div>
                                        <div class="bottom" flex="cross:center main:center">
                                              <span style="background:#ccc;color:white" v-if="!item.Begin&&(item.starttime>0||item.limitstart>0)">未开始</span>
                                              <span v-touch:tap="enterActiveShop(item)" v-else >立即参与</span>

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
          }
      },

      props: {
        list: Array,
         // list: Number,
         type:String,//幸运抢购0 显示抢购1 低价竞拍2
       
        
      },
       
      methods:{
        
        enterActiveShop(item){


          let vm =this

          if(!item.Begin&&(item.starttime>0||item.limitstart>0)){
            
            return 
          }
          vm.$router.go({
            name:"activityDetails",
            params:{id:item.id},
            query:{type:vm.type}
          })
          
        },
       
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
                                position:relative;
                                width: 100%;
                                height: 60%;
                                p.limitmember{
                                  position:absolute;
                                  right:0px;
                                  bottom:0px;
                                  color:#FFFFFF;
                                  @include font-dpr(12px);
                                  // background:$color-deeporange;
                                }

                                    p:nth-of-type(1) {
                                        position: absolute;
                                        left: 50%;
                                        top: px2rem(20);
                                        transform: translatex(-50%);
                                        width: px2rem(80);
                                        height: px2rem(30);
                                        display: -webkit-box-flex;
                                        display: flex;
                                        -webkit-align-items: center;
                                        align-items: center;
                                        -webkit-justify-content: center;
                                        justify-content: center;
                                        line-height: px2rem(30);
                                        border: 3px solid $color-cheapccc;
                                        color: $color-cheapccc;
                                        border-radius: px2rem(30);
                                        @include font-dpr(10px);
                                        font-weight: 900;
                                        background: #000;
                                      }
                                      p:nth-of-type(1):before {
                                        content: "";
                                        position: absolute;
                                        top: 50%;
                                        left: px2rem(-30);
                                        margin-top: px2rem(-5);
                                        width: px2rem(5);
                                        height: px2rem(5);
                                        background: $color-cheapccc;
                                        border-radius: px2rem(10);
                                      }
                                      p:nth-of-type(1):after {
                                        content: "";
                                        position: absolute;
                                        top: 50%;
                                        right: px2rem(-30);
                                        margin-top: px2rem(-5);
                                        width: px2rem(5);
                                        height: px2rem(5);
                                        background: $color-cheapccc;
                                        border-radius: px2rem(10);
                                      }
                              }
                              .card_notice{
                                width: 100%;
                                height: 40%;
                                      background:$color-zise;
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
                                                left: 50%;
                                                bottom: 10%;
                                                width: px2rem(90);
                                                height: px2rem(90);
                                                transform: translatex(-50%);
                                                
                                          }

                                       }
                                       .middle{
                                          webkit-flex-grow: 1;
                                         flex-grow: 1;
                                            background:#10121A;
                                            .ac_left{
                                              .star{
                                                // white-space: nowrap;
                                                // overflow: hidden;
                                              }
                                            }
                                            .mid_title{
                                              color:$color-cheapccc;
                                                @include font-dpr(12px);
                                                white-space: nowrap;
                                                overflow: hidden;
                                            }
                                            .ac_right{
                                                .jointimes{
                                                  color: $color-deeporange;
                                                   @include font-dpr(10px);
                                                }
                                            }

                                       }
                                       .bottom{
                                        webkit-flex-grow: 1;
                                         flex-grow: 1;;

                                          span{
                                                display: inline-block;
                                                line-height: px2rem(30);
                                                height: px2rem(30);
                                                width: px2rem(100);
                                                background:$color-deeporange;
                                                @include font-dpr(12px);
                                                white-space: nowrap;
                                          }
                                       }
                              }
                  }
            }
           
           
     }
</style>
