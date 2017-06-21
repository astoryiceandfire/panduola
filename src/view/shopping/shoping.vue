<template>
  <div class="shoping">
   
           <!--  右面的滚动 -->
           <div class="shopingnav">            
                    <nav flex='dir:left main:center cross:center'>
                      <div v-for='item in cidlists' v-touch:tap='changeCidGoods(item)' :class='["nav-item", curcid==item.cid?"nav-active":""]'>
                        <span >{{item.name}}</span>
                      </div>                   
                    </nav>               
           </div>    
                 <div class="shopswiper">
                   <!--  //没有商品时候 -->
                    <div class="noactivity" flex="dir:top main:center cross:center" v-if="noactivity">
                      <img src="../../assets/images/noshoping.png">
                      <span>暂时还没有记录</span>
                    </div>
                  <!--  //没有商品的时候 -->
                        <div class="swiper-container" v-el:activeswiper>
                                <div class="swiper-wrapper">
                                <div class="swiper-slide" flex='dir:top main:left cross:top' v-for="item in lists" v-touch:tap='enterDetails(item)'>
                               
                                    <div class="sw_img">
                                      <img :src="ip + item.cover">
                                    </div>
                                    <div class="shop-middle">
                                      <p class="shop-title">{{item.title}}</p>
                                    <p class="shop-describe">{{item.subhead}}</p>
                                    </div>
                                    
                                    <div class="shop-bottom" flex='main:justify'><p>￥:<span class="shop-price">{{item.price}}通币</span></p> <span>已销{{item.solecount}}笔</span></div>                            
                                  </div>
                              </div>
                          
                         </div>
                   </div>
              <!--  右面的滚动 -->
              <!-- 兑换确认 -->
              <div class="wrap-confirm" v-if = 'isExConfirm'>
                 <div class="wrap-content" flex="dir:top">
                 <div class="ex-heade" flex="dir:top box:last">
                    <img class="eximg" :src="ip + exshop.cover" alt="">
                    <div class="shopdetail">
                      <h1 class="">{{exshop.title}}</h1>
                      <small class="">{{exshop.subhead}}</small>
                    </div>
                 </div>
                  <div class="wrap-footer">
                      <button v-touch:tap='exchangeConfirm'>兑换</button>
                      <button v-touch:tap='exchangeCalcl'>取消</button>
                  </div>
                   
                 </div>
              </div>
              <!-- 兑换确认 -->

                  <!--  弹窗 -->
                   <div v-if="isExchange"  class="zs-container">
                      <div  class="wrap-message" flex="dir:top cross:center">
                        <div class="exchange-item">
                            <span class="item-up">请输入兑换码</span>
                            <div class="item-content" flex="main:justify">
                              <input type="text" v-model= 'exChangeCode' class="item-input item-input-first"  >
                              <div class="exquestion" flex="dir:center cross:center">
                             <!--  <img src="../../assets/images/exchange.png" alt=""> -->
                              </div>
                            </div>
                        </div>

                        <div class="exchange-item">
                           <span class="item-up">请输入验证码</span>
                            <div class="item-content" flex="main:justify">
                              <input type="text"  v-model= 'vercode' class="item-input item-input-second">
                              <div class="verifdiv" v-el:verifdivs v-touch:tap='getImageCode'>
                              <img :src="imgurl"/>
                              </div>
                            </div>
                        </div>
                        <div class="exchange-item">
                          <div class="exchange-button" v-touch:tap='exchangePost'>使用</div>
                        </div>
              
                         

                        </div>
                 
                 
                 </div>
                  </div>
              
           <!--  弹窗 -->

  
 
  </div>
</template>

<script>

import Swiper    from '../../assets/js/swiper'
import IScroll    from '../../assets/js/iscroll'
import {IP,
        ApiCategory,
        ApiSortGoods,
        ApigetImageCode,
        ApiexchangePro,
        ApiconfimExchange,

        } from '../../api'
import {Toast,Indicator,MessageBox} from 'mint-ui'
export default {
  components: {
  
  },
  vuex: {
      actions: {
      
      },
      getters: {
       
      }
  },
  data () {
    return {
      isExchange:false,//是否显示兑换
      vercode:'',
      exChangeCode:'',
      imgurl:'',
      isExConfirm:false,
      rate :3000,
      lastdate :Date.now() - 3000,
      codesrc:'',
      exshop:'',
     exchangecodes:[
                      '3DpblSEcdcyBFL9d',
                      'Aakb6TKuuk9V0TEq',
                      'QU1FpZWSZrykBwzG',
                      'gi3YPeNxFS3sFoZX',
                      'j43EPJ1kAXMo2AkU',
                      '6cLvYJLIvc9EuXcR',
                      'Of1H6fyqXgcaO5fU',
                      '2xpCQKu2Z2r0iViF',
                      'n0vWkRcGjVtNI4Zc',
                      'pHOVfCNHco3xbC5V',
                      'nNssP2RUyZBr332H',
                      'twe9iPGLyEM4V7pa',
                      'ZIfOna9b4GqlG2Ll',
                      'U68hXcWlveJoUKeo',
                      '1Ppi1Y6zPuRNotaL',

                      ],
      ip:IP,
      count:20,
      cidlists:[],//分类信息
      curcid:1,//当前分类
      noactivity:false,
      swperance:null,//滚动实例
      lists:[],//商品数据
      shopgoodId:'',
      option:{//请求分类商品参数
        page:1,
        rows:100,
        categoryid:1
      }
    
  }},
  computed:{
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      
      vm.lists = []
      vm.swperance = null
      vm.loadSortGoods()
      vm.loadCid()


      transition.next()
    },
    activate(transition) {
  
      transition.next()
    },
    deactivate(transition) {
        this.isExchange = false
      this.noactivity = false
      if (typeof this.swperance == 'object') {
         this.swperance=null
      }
   
      transition.next()
    }
  },
  methods:{
    exchangeConfirm(){
      let option = {},
      vm = this;
      option.exChangeCode = vm.exChangeCode
      option.goodId = vm.shopgoodId
      vm.axios.post(ApiconfimExchange,option).then(function(res){
        let data = res.data
        if (data.retcode==1) {
                 vm.goodId = ''
                vm.isExConfirm = false
                vm.isExchange = true
         vm.$router.go({name:'activeNotes',params:{id:2}})
        }else{
           Toast({message:data.retmsg})

        }

      })

    },
    exchangeCalcl(){
      this.goodId = ''
      this.isExConfirm = false
       this.isExchange = true

    },
    exchangePost(){//发送兑换码请求
      let vm =this,
      option = {}
      option.vercode = vm.vercode
      //option.exChangeCode = vm.exchangecodes[Math.ceil(Math.random()*20)]
      option.exChangeCode = vm.exChangeCode
     Indicator.open('兑换中...')

      vm.axios.post(ApiexchangePro,option).then(function(response){
        let data = response.data
        if (data.retcode==1) {
          vm.exshop = data.data.good
          vm.shopgoodId = data.data.good.id
          if(vm.exshop){
            vm.isExchange = false
            vm.isExConfirm = true
          }
            // if (data.data.isSysCoins ==0) {//兑换商品
            //   MessageBox('兑换成功', `恭喜获得${data.data.proName}`);
            // }else if(data.data.isSysCoins ==1){//兑换通币
            //    MessageBox('兑换成功', `恭喜获得${data.data.sysCoins}通币`);
            // }

            Indicator.close()
        }else{
             Indicator.close()
              vm.getImageCode()
              vm.vercode = ''
             Toast({message:response.data.retmsg})
          }
         
        
      },function(response){
        Indicator.close()
        
         Toast({message:response.data.retmsg})
      })

    },
    getImageCode(){//获取验证码
        let vm = this;

           

            if (Date.now() - vm.lastdate >= vm.rate) {
             
              vm.lastdate = Date.now()
            }else{
             
              return 
            }
      
        vm.axios.get(ApigetImageCode,{}).then(function(response){

 
          
          if (response.data.retcode==1) {
           
              vm.imgurl = `data:image/jpeg;base64,${response.data.data.code}`
               
            
             
          }else{
           
            Toast({message:response.data.retmsg})
          }
       
           
        },function(response){
          
        })
    },
    //进入商品详情
    enterDetails(item){
      
        this.$router.go({name:'shopDetails',query:{id:item.id,shopid:item.shopid}})   
     },
    // tab切换
    changeCidGoods(item){
     


      let vm = this
      vm.noactivity = false
      vm.swperance = null
      vm.lists = []
      
      if (item.cid== 6) {
        vm.isExchange = true
         vm.curcid = item.cid
        vm.getImageCode()//获取验证码
       
       
        
        
      }else{
         vm.isExchange = false
        vm.curcid = item.cid
         vm.loadSortGoods()//加载分类数据
      }
     
    },
//列表滚动
    swperanceFun(){
      let vm = this
      if (vm.swperance) {
        vm.swperance.update()
      }else{
        vm.swperance = new Swiper(this.$els.activeswiper, {
             
              slidesPerView: 3,
              paginationClickable: true,
              spaceBetween: 30,
              loop:false
                    });

      }

    },

    loadCid(){//获取分页数据
      let vm =this
      vm.axios.post(ApiCategory,{type:1}).then(function(response){
        let data = response.data
        if (data.retcode==1) {
          vm.cidlists = data.data.categories
          vm.cidlists.push({cid:6,
                            name:'兑换专区',
                          })
        }

      },function(response){})
    },
    //加载详细数据
    loadSortGoods(){
      let vm =this
      Indicator.open('加载中...')
     vm.option.categoryid = vm.curcid

      vm.axios.post(ApiSortGoods,vm.option).then(function(response){
        let data = response.data
        
        if (data.retcode==1) {
         
          vm.lists = data.data.rows
          if (vm.lists.length ==0) {
            vm.noactivity = true
          }else{
               vm.$nextTick(function(){
                     vm.swperanceFun()
                  })

          }
         
         
        }else{
           Toast({message:response.data.retmsg})
        }
         Indicator.close()

      },function(response){
         Indicator.close()
        Toast({message:response.data.retmsg})
      })
    },
  

      

  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/style.scss";
  @import '../../assets/css/swiper.css' ;  


  .shoping{
               //弹窗
       .wrap-confirm{

          .wrap-content{
          width: 40%;
          height: 58%;
          background:#080A0F;
          position:absolute;
          z-index: 13;
          top: 50%;
          left: 54%;
          -webkit-transform: translate(-50%, -50%);
          transform:translate(-50%,-50%);
          @include font-dpr(14px);  
          .ex-heade{
              flex-grow:1;
              height: 100%;
              .eximg{
                 width: 100%;
                 height: 70%;     
              }
              .shopdetail{
                width: 50%;  
                padding-top: px2rem(10);
                background:#10121A;
                 h1{
                    @include font-dpr(14px);
                    color:#FFFFFF;
                    width: 80%;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                  }
                  small{
                    color: $color-lightblue;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;

                  }

              }
          }
          .wrap-footer{
             height: px2rem(60);
             text-align: center;
             button{
              width: px2rem(60);
              height: px2rem(40);
              margin-left: px2rem(30);
              margin-right: px2rem(30);
              box-shadow:none;
              border:none;     
              background:$color-orange;
              color:#000;
               @include font-dpr(14px);
              letter-spacing: px2rem(1);
                 
             }
          }
        }                           
        // justify-content: space-around;
        }
             
       .zs-container{

                         
                        .wrap-message{
                                width: 70%;
                                height: 58%;
                                background:#202533;
                                position:absolute;
                                z-index: 12;
                                top: 50%;
                                left: 54%;
                                -webkit-transform: translate(-50%, -50%);
                                transform:translate(-50%,-50%);
                                // max-width:px2rem(400);
                                @include font-dpr(14px);                             
                               justify-content: space-around;
                               .exchange-item{
                                  line-height: px2rem(40);
                                  width: 55%;

                                  .item-up{
                                    color:$color-orange;
                                    @include font-dpr(15px);
                                    font-weight: bold;
                                    letter-spacing: px2rem(2);
                                  }
                                  .exquestion{
                                    margin-left: px2rem(-40);
                                    width: px2rem(40);
                                    padding:px2rem(10);
                                    // img{
                                    //   width: px2rem(20);
                                    //   height: px2rem(20);
                                    // }
                                    text-align: center;
                                  }
                                  .item-input{
                                    background:$color-zise;
                                    border:none;
                                    color:$color-lightblue;
                                  }
                                  .item-input-first{
                                    width: 100%;
                                    height: px2rem(55);
                                  }
                                   .item-input-second{
                                    width: 70%;
                                  }
                                  .verifdiv{
                                    width: 40%;
                                    height: px2rem(55);
                                    background:#ccc;
                                    @include font-dpr(20px);
                                    color:#ffffff;
                                    font-weight:bold;
                                    letter-spacing: px2rem(3);
                                   
                                   
                                  }
                                  .exchange-button{
                                    width: 100%;
                                    height: 100%;
                                    color:#000000;
                                    text-align: center;
                                    background:$color-orange;
                                    @include font-dpr(14px);
                                  }
  

                               }
                               
                              
                                

                          }
                 }
                 //弹窗
    
         background:#090C12;
         padding-left: px2rem(70);
         position:relative;
         color:$color-cheapccc;
           .shopingnav{
                height: px2rem(60);
                width: 100%;
                position:relative;
                text-align: center;
                @include font-dpr(12px);
                nav{
                  width: 100%;
                  height: 100%;
                  .nav-item{
                    width: 15%;
                    height: px2rem(40);
                    line-height: px2rem(40);

                    &.nav-active{
                      color:$color-orange;
                      background:$color-deepblue;
                    }
                  }

                }               
               

           }
           .shopswiper{
            position:absolute;
            // width: 100%;
            left: px2rem(70);
            top: px2rem(60);
            right: 0;
            bottom:px2rem(60);
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

              

                .swiper-container {
                                      width: 100%;
                                     height: 100%;
                                  }
                                  .swiper-slide {
                                    background:$color-deepblue;
                                   
                                    .sw_img{
                                      width: 100%;
                                      height: 75%;
                                    }
                                    .shop-middle{
                                      width: 100%;
                                      .shop-title{
                                        text-align: left;
                                        @include font-dpr(13px);
                                        color: $color-white;
                                        height: px2rem(30);
                                        line-height: px2rem(30);
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                      }
                                      .shop-describe{
                                         text-align: left;
                                        @include font-dpr(12px);
                                        color:$color-lightblue;
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                      }
                                     
                                        }
                                        .shop-bottom{
                                          width: 100%;
                                          .shop-price{
                                            color:$color-orange;
                                            @include font-dpr(10px);
                                          }
                                        }
                                    }
                                    


           }

                  
                            
                         

        
     
  }
  
</style>
