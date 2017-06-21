<template>
  <div class="home">
      <div class="mywrapper" flex="main:center">
        <div class="main">
               <div v-if="!isEdir" class="balance" flex="main:justify cross:center">
                          <div class="balan-left">全选
                              <span v-touch:tap="checkAllShop"> 
                                 <i class="fa fa-check-circle" :class="{'checkall':ischeckall}" aria-hidden="true"></i>
                              </span>
                              </div>
                          <div v-touch:tap="delteShops" class="balan-right">删除</div>
                  </div>

              <div id="wrapper" v-el:wrpone>
                  <div id="scroller">
                      <header class="header">我的收藏</header>
                      <div class="nav" flex="main:justify">
                        <span>商品收藏</span>
                        <span class="editrspan" v-touch:tap="editrCollection">{{isEdir?'编辑':'取消'}}</span>
                      </div>
                      <div class="collitem border1px setbottomborder" flex="main:justify" v-for="item in lists">
                      <div class="itemleft" flex="main:center">
                         <div class="itemimg">
                              <img :src="ip + item.cover">
                            </div>
                          <div class="itemshop" flex="dir:top">
                            <p class="name">{{item.title}}</p>
                          <!--   <p class="sizecolor">颜色：黑黄色 大小：默认款式：蓝牙款</p> -->
                            <p class="lastprice">{{item.price}}通币</p>
                          </div>
                      </div>
                      <div class="itemright" flex="main:center cross:center">
                        <span v-if="isEdir" class="gobuy">前往购买</span>
                         <span v-if="!isEdir" class="checkcell" v-touch:tap="checkItem(item)">
                           <i class="fa fa-check-circle" :class="{'checked':item.check}" aria-hidden="true"></i>
                         </span>
                      </div>
                         
                            
                      </div>
                     
                  </div>
                  </div>
        </div>

     </div>
    </div>
</template>

<script>


import {myMixin}    from '../../mixin'
import {IP,ApiPostcolist,ApicancelCollect}    from '../../api'

import {Toast,Indicator} from 'mint-ui'

export default {
  components: {
  
  },
    mixins: [myMixin],
  vuex: {
      actions: {
      
      },
      getters: {
       
      }
  },
  data () {
    return {
        ip:IP,
        isEdir:true,
        scrollinance:null,
        lists:[],//收藏列表
        dellist:[],//准备删除的数组
        // ischeckall:false,//全选
        option:{
          page:1,
          rows:10

        }

        }

  },

  computed:{
    ischeckall:function(){
      let isall = this.lists.every(function(value){
        return value.check == true
      })
      return isall 
    }
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      this.loadMyCollectionData()
      // setTimeout(function(){
      //   vm.addiscroll("wrpone")
      // },2000)
     
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
    delteShops(){//删除选中收藏
      let vm = this,
      gidstr = '',
         gidlist = [];
      vm.dellist.forEach(function(value){
        gidlist.push(value.id)
      })
       gidstr = gidlist.join(',')

           
              vm.axios.post(ApicancelCollect,{gids:gidstr}).then((response)=>{
                if (response.data.retcode==1) {
                  vm.lists.$remove(...vm.dellist)
                  Toast({message:"删除成功！"})
                            vm.$nextTick(function(){
                                 
                                   vm.upDateScroll()
                                 
                                })
                }

              },(response)=>{})


    },
    checkItem(item){//选中商品
      let vm = this
      item.check = !item.check
      if (item.check) {
        vm.dellist.push(item)
      }else{
        vm.dellist.$remove(item)
      }


    },
    checkAllShop(){//全选收藏
     let vm = this
     
      if (vm.ischeckall) {
        vm.lists.forEach(function(value){
            value.check = false
        })
        vm.dellist = []
      }else{
         vm.lists.forEach(function(value){
            value.check = true
        })
        
          vm.dellist = vm.lists
      }

    },
    editrCollection(){
        this.isEdir = !this.isEdir
    },
    upDateScroll(){
      let vm =this

      if (vm.scrollinance) {
          vm.scrollinance.refresh()
      }else{
          vm.scrollinance =  vm.addiscroll("wrpone");
      }
    },
    loadMyCollectionData(){//获取收藏列表
        let vm = this 
        vm.axios.post(ApiPostcolist,vm.option).then((response)=>{
          let data = response.data
            if (data.retcode ==1 ) {

              data.data.rows.forEach(function(value){
                value.check = false
              })
              vm.lists = data.data.rows
             
              if ( vm.lists.length>0) {
                        vm.$nextTick(function(){
                                 
                                   vm.upDateScroll()
                                 
                                })
              }
            }
        },(response)=>{})
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

         .mywrapper{
             position:absolute;
             top: 0;
             left: px2rem(70);
             bottom:px2rem(60);
             right: 0;
            background:#090C12;
            .main{
                position: relative;
                 background:transparent;
                width: 75%;
                  .balance{
                        position:absolute;
                        left: 0;
                        right: 0;
                        bottom:0;
                        height: px2rem(60);
                       background:red;
                       z-index: 11;
                        background:$color-deepblue;
                        padding:px2rem(10) px2rem(10);
                        @include font-dpr(14px);
                        .balan-left{
                          color:white;
                          i{
                            @include font-dpr(18px);
                          }
                          .checkall{
                            color:$color-orange;

                          }
                        }
                        .balan-right{
                          background:$color-orange;
                          width: px2rem(120);
                          height: px2rem(45);
                          line-height: px2rem(45);
                          letter-spacing: px2rem(2);
                          text-align: center;
                        }

                      }
               #wrapper{
                  position: absolute;
                  z-index: 1;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  overflow: hidden;
                    background:transparent;
                  
                }
                 #scroller{
                      background:transparent;
                       position:absolute;
                     
                      z-index: 1;
                      -webkit-tap-highlight-color: rgba(0,0,0,0);
                      width: 100%;
                      -webkit-transform: translateZ(0);
                      -moz-transform: translateZ(0);
                      -ms-transform: translateZ(0);
                      -o-transform: translateZ(0);
                      transform: translateZ(0);
                      -webkit-touch-callout: none;
                      -webkit-user-select: none;
                      -moz-user-select: none;
                      -ms-user-select: none;
                      user-select: none;
                      -webkit-text-size-adjust: none;
                      -moz-text-size-adjust: none;
                      -ms-text-size-adjust: none;
                      -o-text-size-adjust: none;
                      text-size-adjust: none;

                      .header{
                        width: 100%;
                        height: px2rem(50);
                        line-height: px2rem(50);
                        text-align: center;
                        letter-spacing: px2rem(1);
                         @include font-dpr(14px);
                         background:transparent;
                         color:white;
                      }
                      .nav{
                          width: 100%;
                          // height: px2rem(50);
                          background:$color-deepblue;
                          color:$color-cheapccc;
                          @include font-dpr(14px);
                           letter-spacing: px2rem(1);
                           padding: px2rem(10);
                           border-radius: 3px;
                           .editrspan{
                            color:$color-orange;
                           }
                      }
                      .collitem{
                         padding:px2rem(15);
                          background:#0F1219;
                          color:#ccc;
                          .itemleft{
                              .itemimg{
                                width: px2rem(100);
                                height: px2rem(100);
                                background:transparent;
                              }
                              .itemshop{
                                 padding-left:px2rem(10);
                                 .name{
                                  @include font-dpr(12px);
                                  height: px2rem(30);

                                 }
                                 .sizecolor{
                                  @include font-dpr(10px);
                                  color:$color-lightblue;
                                 }
                                .lastprice{
                                 
                                 position:absolute;
                                 bottom:px2rem(10);
                                 color:$color-orange;
                                 @include font-dpr(12px);
                                }
                              }
                          }
                          .itemright{
                              .gobuy{
                                color:$color-orange;
                              }
                              .checkcell{
                                .fa-check-circle{
                                  @include font-dpr(20px);
                                }
                                .checked{
                                  color:$color-orange;
                                }
                              }
                          }

                      }
                    }
            }
                       

    
     }
  }
  
</style>
