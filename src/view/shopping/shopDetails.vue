<template>
  <div class="home">
      <div class="shopwrapper" flex="dir:left">
        <div class="shop-left">
        <!-- //滚动 -->
          <div class="swiper-container" v-el:imgswiper>
            <div class="swiper-wrapper">
             <div class="swiper-slide" v-for="image in infodata.images">
                    <img :src="ip+image">
                  </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <!-- //滚动 -->   
            <div class="title" flex="main:justify cross:center">
                <span>商品详情</span>
                <i v-touch:tap="changeCollection" class="fa fa-star fa-collection" :class="[infodata.iscollect==1?'collection':'']" aria-hidden="true"></i>
                </div><!--  //标题   -->
            <div class="shop-details" flex="dir:top main:justify">
              <div class="shop-name">
                <h1>{{infodata.title}}</h1>
                <small></small>
              </div>
              <div class="shop-count" flex="main:justify cross:center">
                <span>已售{{infodata.solecount}}件</span>
                <span class="price">￥:{{infodata.price}}</span>
              </div>
            </div>
        </div>
        <div class="shop-right">
          <nav flex="main:center cross:center">
            <span v-touch:tap='shopTab' :class="[isDetail?'':'navcheck']">商品详情</span>
            <span v-touch:tap='shopTab' :class="[isDetail?'navcheck':'']">累计评价({{comments.length}})</span>
          </nav>
          <div class="contentwraper" v-el:contentwraper>

              <div class="content" >
                <div v-show="!isDetail" class="details" v-html='html'></div>
                <div v-show="isDetail" class="assess">
                  <div class="nocomments" v-if='comments.length==0'>还没有评论</div>
                  <div class="assess-item border1px setbottomborder" v-for="commentItem in comments" flex="dir:left box:first">
                    <div class="portrait">
                       <img v-if='commentItem.portrait' :src="ip + commentItem.portrait">
                        <img v-else src="../../assets/images/default.png">
                    </div>
    
                    <div class="comment">
                      <p class="com-top" flex="main:justify"><span>{{commentItem.nickname}}</span><span>{{commentItem.showtime*1000 | dateFormat 'yyyy-MM-dd hh:mm:ss'}}</span></p>
                      <p class="com-content">{{commentItem.content}}</p>
                    </div>
                  </div>
                </div>
            </div>
            
          </div>
          <div class="footer" flex="main:justify cross:center">
            <div class="add" flex="cross:center" v-touch:tap='addShopingCar'>
                <span class="addbg" ></span>
                <span class="addshop">添加购物车</span>
                </div>
            <div v-touch:tap="addShopingCar('isnow')" class="buy"><span>立即购买</span></div>
          </div>

        </div>
     
      </div>
     <!--  弹窗 -->
                   <div v-if="isShopSize"  class="zs-container">
                 <div  class="wrap-message" flex="dir:top cross:center">
                     <div class="close">
                          <i v-touch:tap="hiddenWraper" class="closeicon" aria-hidden="true"></i>
                          </div>
                     <div class="detalitem" flex="dir:left box:first">
                          <span class="shopname">商品名称:</span>
                            <span class="detalrules">{{infodata.title}}</span>
                        </div>
                        <div class="detalitem">
                        <template v-for='item in goodspec'>
                           <span class="shopname">{{item.name}}:</span>
                            <span class="detalrule firstcheck">{{item.value}}</span>
                        <!--     <span class="detalrule">红色</span> -->
                        </template>
                         

                        </div>
                     <div class="compute" flex="main:justify-content cross:center">
                           <div v-touch:tap="addreducetimes('reduce')" class="reduce"><i class="fa fa-minus" aria-hidden="true"></i>
                                  </div>
                           <input type="number" v-on:keyup="wirteNumber" name="" v-model="buytimes">
                           <div v-touch:tap="addreducetimes('add')" class="add"><i class="fa fa-plus" aria-hidden="true"></i>
                              </div>
                           <span v-touch:tap="confirmShoping" class="topcount">确定</span>
                         </div>
                 
                 </div>
                  </div>
              
     <!--  弹窗 -->
  
 
  </div>
</template>

<script>

import Swiper    from 'assets/js/swiper'
import {myMixin}    from '../../mixin'
// import {addOrderLists} from '../../vuex/actions'
import {IP,

    ApiGoosdInfo,
    ApiGoodsSpec, //商品规格
    ApiMcommentPage,
    ApiaddIntoCart, //加入清单
    ApicollectGoods,
    ApicancelCollect
     
    }    from '../../api'

import { Indicator,Toast } from 'mint-ui';
export default {
  components: {
       
  },
    mixins: [myMixin],

  data () {
    return {
          ip:IP,
         isDetail:false,
         isCollection:true,//是否收藏
         isShopSize:false,//是否显示商品规则弹窗
         buytimes:1,//商城购买次数
         scrollcontent:null,//滚动实例
         isnow:false,//立即购买
         id:0,//商品id
         goodspec:[],//商品规格
         shopid:0,//又一个商品id
         infodata:{
          commentCount:0,
          inventory:0,
          image:[],
          title:'',
          solecount:'',
          price:0,
          iscollect:0,
         

         },//商品详情
         html:null,
         comments:[],//商品评论

       }
  },
 // vuex:{
 //  actions:{
 //    addOrderLists
 //  }
 // },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this

     vm.scrollInance()//实例化滚动
     
     vm.id = vm.$route.query.id
      vm.shopid = vm.$route.query.shopid
     vm.getShopInfo()//加载商品数据
     vm.getCommentData()//商品评论
     vm.getGoodSpec()//商品规格

       
       
     
  
     
     

      transition.next()
    },
    activate(transition) {
  
      transition.next()
    },
    deactivate(transition) {
       this.isDetail = false,
      transition.next()
    }
  },
  methods:{
    changeCollection(){//改变收藏状态
      let vm =this
        if (vm.infodata.iscollect==0) {
          vm.axios.post(ApicollectGoods,{gid:vm.infodata.id}).then((response)=>{
          if (response.data.retcode==1) {
            vm.infodata.iscollect=1
            Toast({message:'收藏成功'})
          }
        },(response)=>{})

        }else if(vm.infodata.iscollect==1){
              vm.axios.post(ApicancelCollect,{gids:vm.infodata.id}).then((response)=>{
              if (response.data.retcode==1) {
                vm.infodata.iscollect=0
                Toast({message:'取消收藏成功'})
              }
        },(response)=>{})

        }

    },
    hiddenWraper(){//隐藏规则选择框

      this.isShopSize = false
      this.buytimes = 1
    },
    wirteNumber(){
       let vm = this
       
    
        vm.buytimes = Number(vm.buytimes)

        if (vm.buytimes<=0) {
          vm.buytimes=1
        }else if(vm.buytimes>=vm.infodata.inventory){
            vm.buytimes = vm.infodata.inventory
        }

  
    },
    addreducetimes(str){

       
          let vm =this 
            if (str=='reduce') {
              if (vm.buytimes<=1) return
              vm.buytimes--
            }else if(str=='add'){
             
                  if (vm.buytimes>=vm.infodata.inventory) {
                    Toast({message:`商品仅剩${vm.infodata.inventory}件`})
                    return
                  }
                  vm.buytimes++
              


          
          }

    },
    confirmShoping(){//规格参数选定确认——>添加购物车
        let vm =this,
              option = {}
              option.buycount = vm.buytimes
              option.shopid= vm.id
               option.shoptype= 2
              option.sid= " "
              option.standard= "黑色"
              option.discount=" "
              
              vm.axios.post(ApiaddIntoCart,option).then(function(response){
                let data = response.data
                if (data.retcode==1) {
                 vm.hiddenWraper()
                 Toast({message:'添加成功',duration:2000})


               vm.enterPayOrder()

              

                }else{
                  Toast({message:data.retmsg})
                }
              },function(response){})
     

    },
    addShopingCar(str){//显示规则参数选定弹窗
      let vm = this
          if (str == 'isnow') {
            vm.isnow = true
          }else{
            vm.isnow = false
          }
         
        this.isShopSize = true
    

    },
    enterPayOrder(){//商品立即支付 添加进入购物车
        let vm = this

        if (vm.isnow == true) {
          
            setTimeout(function(){
                 vm.$router.replace({name:"myorders",params:{id:4}})
            },2000)
        

         }else{

         }


     
  
    

    },
    getGoodSpec(){
      let vm =this
      vm.axios.post(ApiGoodsSpec,{id:vm.id}).then(function(response){
          if (response.data.retcode == 1) {

            let data = response.data.data.goodsList[0]
           
            vm.goodspec = data?data.options:[]
          }
      },function(response){})
    },
    getShopInfo(){//商品详情
          let vm =this 
          vm.axios.post(ApiGoosdInfo,{id:vm.id}).then(function(response){
            let data = response.data
            if (data.retcode==1) {
              vm.infodata = data.data
              let html = data.data.content.split('<body>')[1]
               html = html.split('</body>')[0]
               vm.html = html

               vm.$nextTick(function(){
                vm.zsWiperImg()//图片实例化
               })


            }

          },function(response){})
    },
    getCommentData(){//商品评价列表
      let vm =this
      vm.axios.post(ApiMcommentPage,{
        shopid:vm.id,
        page:1,
        rows:100}).then(function(response){
          let data =response.data
          if (data.retcode==1) {
            vm.comments = data.rows||[]
           
          }
        },function(response){})

    },
     zsWiperImg(){//g滚动窗口
             let swiper = new Swiper(this.$els.imgswiper,{
              pagination: '.swiper-pagination',
              slidesPerView: 1,
              paginationClickable: true,
              // freeMode:true,
              spaceBetween: 30,
              loop:true,
                    });
     },
    scrollInance(){//滚动实例化
      let vm =this

      if (vm.scrollcontent) {
        vm.scrollcontent.refresh()
      }else{
        vm.$nextTick(function(){
          vm.scrollcontent = vm.addiscroll('contentwraper')
        })
        
      }

    },
    //商品标题切换
    shopTab(){
      this.isDetail = !this.isDetail

    },
 

    
    

  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/style.scss";
  @import '../../assets/css/swiper.css' ;  

  .home{
       // background:#080A0F;
       background:$color-primary;
       width: 100%;
       height: 100%;
       padding-left: px2rem(70);
       padding-bottom:px2rem(60);
       color: #ffffff;
       .shopwrapper{
        width: 100%;
        height: 100%;
        .shop-left{
            width: 40%;
            height: 100%;
           
             padding:px2rem(15) px2rem(7.5) px2rem(15) px2rem(15);
            background-clip:content-box;
            .swiper-container{
              width: 90%;
              height: 50%;
             
            }
          .title{
            margin-top: px2rem(10);
            line-height: px2rem(50);
            height: px2rem(50);
            background:$color-deepblue;
            padding:0 px2rem(10);
            color: $color-cheapccc;
             @include font-dpr(13px);
             .fa-collection{
                 @include font-dpr(18px);
              
             }
             .collection{
              color:$color-orange;
             }
          }
          .shop-details{
            min-height: 30%;
            width: 100%;
            background:#10121A;
            padding:px2rem(10) px2rem(10);
               .shop-name{
                  min-height: 40%;
                  h1{
                    @include font-dpr(14px);
                    color:#FFFFFF;
                  }
                  small{
                    color: $color-lightblue;

                  }
                }
                .shop-count{
                  height: 40%;
                 span{
                  color: $color-deccc;
                 }
                 .price{
                  color: $color-orange;
                  @include font-dpr(16px);
                 }

                }

          }
         
        }
        .shop-right{
            position:relative;
              width: 60%;
              height: 100%;
              padding:px2rem(15) px2rem(15) px2rem(15) px2rem(7.5);

               background:#10121A;
              background-clip:content-box;
              nav{
                height: px2rem(42);
                span{
                  width: 50%;
                  height: 100%;
                  line-height: px2rem(42);
                  text-align: center;
                  background:$color-deepblue;
                  @include font-dpr(14px);
                  &.navcheck{
                  color:$color-deeporange;
                   background:#10121A;
                  }
                }
                
              }
              .footer{
                position:fixed;
                z-index: 10;
                width: 54.8%;
                height: px2rem(60);
                right: 0;
                bottom:px2rem(66);
                background:blue;
                padding:0 px2rem(10);
                 background:$color-deepblue;
               
                span{
                  @include font-dpr(12px);
                  color:$color-cheapccc;
                }
                .addbg{
                  display: inline-block;
                  width: px2rem(25);
                  height: px2rem(25);
                  background:url(../../assets/images/shopings/addshoping@3x.png);
                  background-size:cover;
                  margin-right: px2rem(10);

                }
                .addshop{
                  letter-spacing: px2rem(2);
                }
                .buy{
                  width: px2rem(120);
                  span{
                    display: inline-block;
                    width: 100%;
                    height: px2rem(40);
                    line-height: px2rem(40);
                    text-align: center;
                    background:$color-orange;
                    color:#000;
                    letter-spacing: px2rem(1);
                  }
                }
              }
              .contentwraper{
                position: absolute;
                z-index: 1;
                top: px2rem(60);
                bottom: 0px;
                left: px2rem(7);
                width: 100%;
             
                overflow: hidden;

              }
                .content{
                    width: 100%;
                    // min-height: 100%;
                    position: absolute;
                    z-index: 1;
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                   
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
                   
                   
                   
                    .assess{
                        width: 100%;
                        height: 100%;
                       
                        padding:px2rem(10);
                        .nocomments{
                          width: 100%;
                          height: 100%;
                          text-align: center;
                        }
                        
                        .assess-item{
                          position: relative;


                          .portrait{
                          
                              width: px2rem(80);
                              height: px2rem(80);
                               border-radius: 50%;
                               overflow: hidden;                         
                             
                          }
                          .comment{
                            .com-top{
                              height: px2rem(35);
                              line-height: px2rem(35);
                             

                              span{
                                color:$color-zibai;
                                 @include font-dpr(14px);
                              }
                              
                            }
                            .com-content{
                              @include font-dpr(14px);
                              color:#FFFFFF;

                            }

                          }

                        }
                    }
              }
         
        }
       }
      
           //弹窗
       .zs-container{
                        position:fixed;
                        width: 100%;
                        height: 100%;
                        left:0;
                        right: 0;
                        top: 0;
                        bottom:0;
                         background-color:hsla(0%,0%,0%,.8); 
                        z-index: 11;
                        transition: all .5s ease-in .1s;
                         
                        .wrap-message{
                                width: 50%;
                                height: 45%;
                                background:#202533;
                                position:absolute;
                                z-index: 12;
                                top: 50%;
                                left: 50%;
                                -webkit-transform: translate(-50%, -50%);
                                transform:translate(-50%,-50%);
                               
                                max-width:px2rem(400);
                                @include font-dpr(14px);
                                i.closeicon{
                                  background:url(../../assets/images/closeicon@3x.png) no-repeat;
                                  background-size:cover;
                                  width: px2rem(20);
                                  height: px2rem(20);
                                  display: inline-block;
                                }
                               
                                justify-content: space-around;
                                .close{
                                  text-align: right;
                                  width: 100%;
                                  padding-top:px2rem(5);
                                 padding-right:px2rem(20);
                                 margin-bottom: px2rem(-50);
                                }
                                .detalitem{
                                    width: 90%;
                                    text-align: left;
                                    color:$color-zibai;
                                    @include font-dpr(12px);
                                    .shopname{
                                      color: $color-deccc;
                                      // flex:none;
                                    }
                                     .detalrules{
                                      display: inline-block;
                                      padding:px2rem(2) px2rem(8);
                                   
                                      color:$color-cheapccc;
                                     
                                      
                                    }
                                    .detalrule{
                                      display: inline-block;
                                      padding:px2rem(2) px2rem(8);
                                      background: $color-deccc;
                                       color:#000;
                                       @include font-dpr(12px);
                                       border-radius:px2rem(5);
                                    }
                                    .firstcheck{
                                     
                                     background:$color-lightblue;
                                    
                                    }
                                }
                                .compute{
                                    width: 90%;
                                    height: px2rem(50);
                                    line-height: px2rem(50);

                                  i{
                                    color:$color-deepblue;
                                  }
                                    .reduce,.add{
                                      width: px2rem(60);
                                      height: 100%;
                                      background:#505D80;
                                      text-align: center;
                                      flex:0 0 auto;
                                    }
                                    input{
                                      height: px2rem(50);
                                      width: px2rem(60);
                                      background:$color-primary;
                                      color:$color-orange;
                                      border:none;
                                      text-align: center;
                                      flex:none;
                                    }
                                    .topcount{
                                      color:$color-deepblue;
                                       background:$color-deeporange;
                                       height: px2rem(50);
                                      line-height: px2rem(50);
                                      width: px2rem(200);
                                      text-align: center;
                                      margin-left: px2rem(4);
                                      @include font-dpr(16px);
                                      margin-left: px2rem(30);


                                    }
                                }

                          }
                 }
                 //弹窗
    
     
  }
  
</style>
