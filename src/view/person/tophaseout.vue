<template>

  
  <div class="shoping">
         <div class="outHeader">往期揭晓</div>
                 <div class="shopswiper">
                 
                        <div class="swiper-container" v-el:activeswiper>
                                <div class="swiper-wrapper">                          
                                <div class="swiper-slide" flex='dir:top main:left cross:top' v-for="item in dataType" >
                                  <div class="time"> 揭晓时间 :&nbsp;<span>{{item.publishtime*1000|dateFormat 'yyyy-MM-dd hh:mm:ss'}}</span></div>
                               
                                    <div class="sw_img">
                                      <p class="winner">获奖者</p>
                                      <!--<img :src="ip + item.cover">-->
                                      <div class="sw_icon"><img :src="ip + item.wuser.portrait" alt=""></div>

                                      
                                      <div class="userName"><img src="../../assets/images/获奖icon@3x.png" alt=""><span>{{item.wuser.mid}}</span></div>
                                    </div>
                                  
                                      
                                        <ul class="userMsg">
                                        <li>用户ID: <span style = color:white>{{item.wuser.mid}}</span></li>
                                        <li>总参人数: <span>{{item.wuser.buycount}}人次</span></li>
                                        <li style = border-bottom:none>幸运号码: <span>{{item.wuser.bingocode}}</span></li>
                                      </ul>                                                                                       
                                  </div>
                              </div>
                          
                         </div>
                   </div>
                <!--右面的滚动 -->
  </div>
</template>

<script>

import Swiper    from '../../assets/js/swiper'
import IScroll    from '../../assets/js/iscroll'
import {IP,ApiCategory,ApiSortGoods,ApiPassIshopList} from '../../api'
import {Toast,Indicator} from 'mint-ui'

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
      ip:IP,
      cidlists:[],//分类信息
      curcid:1,//当前分类
      noactivity:false,
      id:'',
      swperance:null,//滚动实例
      lists:[],//商品数据
      option:{//请求分类商品参数
        page:1,
        rows:100,
        categoryid:1
      },
      dataType:[],//往期揭晓数据

      
    
  }},
  computed:{
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      vm.id = vm.$route.params.id
      vm.lists = []
      vm.swperance = null
      vm.rows = []
      vm.loadSortGoods()
      vm.loadCid()
      vm.topHaseOut()
    
      transition.next()
    },
    activate(transition) {
  
      transition.next()
    },
    deactivate(transition) {
      this.noactivity = false
      if (typeof this.swperance == 'object') {
         this.swperance.destroy()
      }
   
      transition.next()
    }
  },
  methods:{
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
      vm.curcid = item.cid
      vm.loadSortGoods()//加载分类数据
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
    //往期揭晓
    topHaseOut(){
      let vm = this;
      vm.axios.post(ApiPassIshopList,{page:1,rows:30,sid:vm.id}).then((response)=>{
     
     if (response.data.retcode==1) {
      if (response.data.data.rows.length==0) {
        Toast({message:'暂无往期'})
        return
      }

          vm.dataType = response.data.data.rows
        
        vm.dataType.forEach(function(item){
                 item.wuser = JSON.parse(item.wuser)
           
        })
        // var a = document.querySelector(".swiper-slide")
          vm.$nextTick(function(){
                     vm.swperanceFun()
                  })
     }else{
           Toast({message:'请求出错'})
     }
      
       
        
      })
     
    
    },


  }
}

</script>

<style lang="scss" scoped>
  @import "../../assets/scss/style.scss";
  @import '../../assets/css/swiper.css' ;  

  
  .time {
    width: 100%;
    height: px2rem(30);
    line-height: px2rem(30);
    /*font-weight: bold;*/
    background: $color-lhblack;
    @include font-dpr(12px);
    padding : 0 px2rem(10) 0 px2rem(10);
    text-align : left;
    
  }

  .outHeader {
    @include font-dpr(16px);
    font-weight : 700;
    color: $color-zibai;
    margin-top: 10px;
  }

  .winner {
    padding: px2rem(16) 0 px2rem(16) 0;
    @include font-dpr(14px);
    color : $color-zibai;
  }

  .sw_icon {
    width: px2rem(65);
    height : px2rem(65);
    border-radius : 50%;
    /*background: $color-green;*/
    margin : 0 auto;
    border:none;
  }

  .userName {
    margin-top: px2rem(15);
    @include font-dpr(14px);
    color : $color-zibai;
    text-align:center;

  }

  .userName > img {
    width: px2rem(17);
    height: px2rem(22);
    vertical-align: middle;
    margin-right: px2rem(10)
  }



  .userName > span {
    text-align: center;

  }

  
  
  .userMsg {
    width: 100%;
    padding : 0 px2rem(10) 0 px2rem(10);
    margin-top: px2rem(10);
    
  }

  .userMsg > li {
    width: 100%;
    height: px2rem(30);
    line-height: px2rem(30);
    display: block;
    border-bottom: 1px solid $color-invalid;
    
    @include font-dpr(12px);
    text-align : left;
  }
  .userMsg > li > span {
    /*display: inline-block;*/
    float: right;
    color: $color-valid;
  }






  .shoping{
         background:#090C12;
         padding-left: px2rem(70);
         margin-left: px2rem(30);
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
                                    margin-top: 4%;
                                    width: 100%;
                                     height: 75%;
                          
                                  }
                                  .swiper-slide {
                                    background:$color-deepblue;
                                    
                                  
                                    .sw_img{
                                      width: 100%;
                                      height: 55%;
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
