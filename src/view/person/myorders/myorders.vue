<template>
  <div class="myorder" flex="dir:top cross:center">
   
           <!--  顶部NAV -->
           <div class="myordernav" >
              
                    <nav flex='dir:left main:justify cross:center'>
                      <div v-for='item in cidlists' :class='["nav-item", curcid==item.id?"nav-active":""]'>
                        <span v-touch:tap='changeCidGoods(item)'>{{item.name}}</span>
                      </div>
                    </nav>
           
                
           </div>

          <div class="shop-orders">
         <!--  购物车全选bar -->
              <div v-if='isOrder==false' class="shopingfooter" flex="main:justify cross:center">
                            <div class="shopfootleft" v-touch:tap='checkAllshop()' >
                                  <span>全选</span>
                                  <i :class=['fa','fa-check-circle',totalcheched?'fontcolor':'']  aria-hidden="true"></i>
                              </div>

                            <div class="shopfootright" flex="main:justify cross:center"><div>合计:<span class="totappay">{{totappay}}通币</span></div> 
                            <div v-touch:tap="beginBalance()" class="beginbalance">结算</div></div>
                          </div>
        <!--  购物车全选bar -->
              <div id="wrapper" v-el:inscroll> 
                <div id="scroller">
                <template v-if='isOrder==true'>
                    <!-- 订单 -->
                  <div class="order-item" v-for="object in lists">
                    <div class="header" flex="main:justify cross:center">
                      <span class="title">订单号：{{object.ordernumber}}</span>

                      <span v-if='object.orderstatus==0' class="orangecolor" v-touch:tap='calceOrder(object,object.orders[0].id)'>取消订单</span>
                      <span  v-if='object.orderstatus==1' class="orangecolor">未发货</span>
                      <span  v-if='object.orderstatus==4' class="orangecolor">已发货</span>
                    </div>
                    <div class="goods">
                      <div class="good" flex="dir:left box:first" v-for="item in object.orders">
                        <div class="imgwrapper">
                           <img :src='ip + item.cover'>
                        </div>
                        <div class="good-right" flex="dir:top main:justify">
                          <div class="name-top">
                            <p class="title">{{item.goodsname}}</p>
                            <p class="subtitle">颜色：{{item.standard}}</p>
                          </div>
                          <div class="price" flex='main:justify'>
                            <span>{{item.paycount|numberinteger}}通币x{{item.buycount}}</span>
                            <p>共:<span class="indspan fontcolor">{{item.paycount*item.buycount|numberinteger}}</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 订单 -->
                   <!--  订单底部 -->
                   <div class="toolbar" flex="main:justify cross:center">
                     <div class="toobarleft" >
                     <span v-touch:tap="enterSwitch(object,0)">{{buttontext[object.orderstatus].first}}</span>

                     <span v-touch:tap="enterSwitch(object,1)" v-if='buttontext[object.orderstatus].second'>{{buttontext[object.orderstatus].second}}</span>
                    

                     </div>
                     <div class="toobarright">合计：<span>{{totalmoney(object.orders)|numberinteger}}</span></div>
                   </div>
                   <!-- 订单底部 -->
                  </div>
                </template>
                <template v-if='isOrder==false'><!-- //购物车 -->
                  <div class="shoppings" >
                    <header flex='main:justify'><span>通币商城</span> <span v-touch:tap='shopingsEditr' class="editrspan">{{isDetele?'取消':'编辑'}}</span></header>
                    <div class="shoping border1px setbottomborder" flex="dir:left box:first" v-for='item in shoplist'>
                        <div class="imgwrapper">
                           <img :src='ip + item.shopimg'>
                        </div>
                         <div class="shoping-middle" flex="dir:top main:justify">
                            <div class="name-top">
                              <p class="title">{{item.shopname}}</p>
                              <p class="subtitle">颜色：{{item.standard}}</p>

                            </div>
                            <div class="price" flex='main:justify'>
                              <span>{{item.price|numberinteger}}通币</span>
                             
                            </div>
                         </div>
                         <div class="shoping-right" flex="main:right cross:center">
                          <div class="countbar" flex="cross:center">
                                <span v-touch:tap = 'reduceBuycount($index)'>-</span>
                                <span class="counts">{{item.buycount}}</span>
                                <span v-touch:tap = 'addBuycount($index)'>+</span>
                                 <i v-touch:tap='checkshoping($index,item)' :class=['fa','fa-check-circle',item.check?'fontcolor':'']  aria-hidden="true"></i>
                              </div>
                          <div v-show='isDetele' class="delbutton" flex='main:center cross:center' v-touch:tap='DeleteShops(item)'>删除</div>
                         </div>
                    </div>
                 
                  </div>
              
                </template>
              
                  <div class="without-shop-bg" flex="dir:top main:center cross:center" v-if="without">
                  <img src="../../../assets/images/nogoods.png">
                  <span>没有订单，空空如也</span>
                    
                  </div>
                </div>
              </div>
          </div>

     

  </div>
</template>

<script>

import Swiper    from 'assets/js/swiper'
import {myMixin}    from '../../../mixin'
import {IP,ApiqueryPostInfo,Apiconfir,ApicanceOrder,Apimyordes,ApibalanceOrder,ApiCategory,ApiSortGoods,apideleteCarts,ApiqueryCartList} from '../../../api'
import { setShopLists} from '../../../vuex/actions'
import {Toast,Indicator,MessageBox } from 'mint-ui'
export default {
    mixins: [myMixin],
  components: {
  
  },
  vuex: {
      actions: {
        setShopLists
      },
      getters: {
       
      }
  },
  data () {
    return {
      ip:IP,
      without:false,//是否显示背景
       // buttontext:['立即付款','提醒发货','评价','再次购买','查看物流'],
       buttontext:[
                    {"first":'立即付款',"second":''},
                    {"first":'提醒发货',"second":''},
                    {"first":'评价',"second":'退货/售后'},
                    {"first":'再次购买',"second":''},
                    {"first":'查看物流',"second":'确认收货'}
                  ],
       isOrder:true,
       isDetele:false,//购物车是否显示删除按钮
       shoplist:[],//购物车数据
       iscountpay:false,//是否是待支付 继续支付
       // shopitems:[],//购物车结算商品
      cidlists:[{name:"全部订单",id:0},
                {name:"待支付",id:1},
                {name:"待收货",id:2},
                {name:"待评价",id:3},
                {name:"购物车",id:4}],//分类信息
      curcid:0,//当前分类
      swperance:null,//滚动实例
      instancescroll:null,//上拉实例
      lists:[],//商品数据
      option:{//请求分类商品参数
        page:1,
        rows:100,
        categoryid:1
      },
      page:1,
      total:1,
      listsoption:{//订单列表
        page:1,
        rows:5,
        orderstatus:0,
      }
    
  }},
  computed:{
    totappay:function(){//购物车选中花费
      let sum = 0
         this.shoplist.forEach(function(item){
            if (item.check) {
              sum += item.buycount*item.price
            }
          })

          return sum.toFixed(2)
    },
    totalcheched:function(){//购物车是否全部选中
        let isTrue = this.shoplist.every(function(item){
          return item.check
        })
        // console.log(totalcheched)
      return isTrue
    },
    shopitems:function(){
          
         let items = this.shoplist.filter(function(item){
             return item.check
          })
         
        return items
    },
   
  },

  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      vm.lists = []
      vm.curcid = vm.$route.params.id
      vm.isDetele = false

      vm.changeCidGoods(vm.cidlists[vm.curcid])

     
     
    

   
    
     
        


      transition.next()
    },
    activate(transition) {
  
      transition.next()
    },
    deactivate(transition) {

      // this.instancescroll.destroy()
      transition.next()
    }
  },
  methods:{
    calceOrder(obj,id){//取消订单
       let vm =this
       
        vm.axios.post(ApicanceOrder,{ordercode:obj.ordernumber,id:id}).then((response)=>{
          if (response.data.retcode==1) {
            Toast({
              message:"取消订单成功",
              duration:1000
            })
               vm.lists.$remove(obj)

          }
        },(response)=>{})
    },
    beginBalance(items){//购物车结算
      console.log(items,'240')
      let vm = this
      let option={
            mobile:localStorage.getItem('zsmobile') != null ? localStorage.getItem('zsmobile') : "",
            shoptype:2,
            shopid:"",
            buycount:0,
            paycount:0,
          };
          if (vm.shopitems.length==0&&items.length==0) {

            Toast({message:'请选择商品'})
            return
          }
          Indicator.open('结算中...')
 

     this.axios.post(ApibalanceOrder,option).then((response)=>{
                  let data =response.data
                  if (data.retcode == 1) {
                      Indicator.close()
                      Toast({
                           message:"结算成功",
                           duration:500

                          })
                      if (items) {
                         vm.setShopLists(items)  
                      }else{
                         vm.setShopLists(vm.shopitems)
                      }
                       setTimeout(function(){
                         vm.$router.replace({name:'payorder',query:{token:data.data.token,integral:data.data.money,ispayon:vm.iscountpay}})

                       },500)
                      
                  }else{
                              Indicator.close()
                              Toast({
                              message:"结算失败",
                              duration:500})
                              clearInterval(vm.timer)
                  }
     },(response)=>{
                  Indicator.close()
                  Toast({
                  message:"结算失败",
                  duration:500})
                  clearInterval(vm.timer)
     })











        

    },
    reduceBuycount(index){//购物车商品减

       if (this.shoplist[index].buycount-1<1) return
            this.shoplist[index].buycount--

    },
    addBuycount(index){//购物车商品加

       if (this.shoplist[index].buycount+1>this.shoplist[index].inventory){
              Toast({message:'库存不足',
                duration:2000})

            }
            this.shoplist[index].buycount++
           

    },
    DeleteShops(item){//删除清单商品
        let vm =this
        vm.axios.post(apideleteCarts,{ids:item.id}).then((response)=>{
            if (response.data.retcode==1) {
                 vm.shoplist.$remove(item)
                 vm.updataScroll()//updata滚动
                 Toast({
                  message:'删除清单成功',
                  duration:2000,
                 })
            }

        },(response)=>{})

    },
    shopingsEditr(){//购物车编辑按钮
      console.log('djjdd')

      this.isDetele = !this.isDetele

    },
    checkAllshop(){//购物车全选
     
      let vm = this
      if (vm.totalcheched) {
             vm.shoplist.forEach(function(item){
                  item.check = false
                })
           }else{
                 vm.shoplist.forEach(function(item){
                  item.check = true
                })

           }
     

    },
    checkshoping(index,item){//购物车选中商品
          let vm = this
                  // if (item.isonsale==0) {
                  //   Toast({message:"商品已下架"})
                  //   return

                  // } 


                  vm.shoplist[index].check=!vm.shoplist[index].check
                  // if (item.check) {
                  //    vm.shopitems.push(item)
                  //  }else{
                  //   vm.shopitems.$remove(item)
                  //  }
                  //  console.log(vm.shopitems)
                  // var everyResult = vm.lists.every(function(item,index){
                  //   return item.check==true

                  // })
                  // if (everyResult) {
                  //   vm.checkall = true
                  // }else{
                  //   vm.checkall =false
                  // }
                

    },
    loadShopingData(){//获取购物车数据
      let vm = this
      
     
        vm.axios.post(ApiqueryCartList,{}).then((response)=>{
              if(response.data.retcode==1){
                 let data = response.data.data.mshopList;

                 data.forEach(function(item,index){
                  item.check=false
                 })

                
             
                  vm.shoplist = vm.shoplist.concat(data)
                     if (vm.shoplist.length >=1 ) {
                             vm.$nextTick(function(){
                                               
                                vm.updataScroll()
                       
                               })

                           }else{

                               vm.without = true
                           }
           
                    


              }
             },(response)=>{})



    },
    totalmoney(order){//订单总价
   
      let sum  = 0
      for (let i = 0; i < order.length; i++) {     
          sum = sum + order[i].paycount * order[i].buycount
      }  
      return sum   
    },
    updataScroll(){//更新滑动
      let vm = this
      if (vm.instancescroll) {

        vm.instancescroll.refresh()
      }else{
         vm.instancescroll = vm.addiscroll("inscroll",vm.loadOrderListData)
      }
      
    },
    enterSwitch(object,index){//处理选择
      let vm = this
      switch(object.orderstatus){
        case 0:
        vm.iscountpay = true //待支付标示
       vm.beginBalance(object.orders)
    
        break;
         case 1:
            Toast({message:"已提醒后台"})
        break;
         case 2:
        console.log("2")
        if (index==0) {
          vm.$router.go({name:'shoprated',query:object.orders[0]})
          console.log("评价")
        }else if(index==1){
          console.log("退货售后")
        }
        break;
         case 3:
        console.log("3")
        break;
          case 4:
        console.log("4")
          if (index==0) {
            Indicator.open('查询中...')
            vm.viewLogistics(object)//查看物流
            }else if(index==1){

              MessageBox.confirm('<p style="text-align:center">请确定您已收到该商品在确认收货！<p>','确认收货').then(action => {
                  vm.corfirmGoods(object)//确认收货
            },action =>{

            });
             
            }
       
        break;
        default:
        console.log('出错')

      }


    },
    viewLogistics(object){//查看物流
      let vm =this
 
      vm.axios.get(ApiqueryPostInfo,{params:{ordercode:object.ordernumber}}).then((response)=>{
          if (response.data.retcode==1) {
            let data = response.data.data[0]
            Indicator.close()
             MessageBox({
              title: '',
              message: `<p class='fontcolor'>快递类型：<span>${data.sendexpress}</span></p>
                        <p class='fontcolor'>快递单号：<span>${data.sendcode}</span></p>
                        <p class='fontcolor'>收货人：<span>${data.namePhone}</span></p>
                        <p class='fontcolor'>收货地址：<span>${data.address}</span></p>`,
              showCancelButton: false
            });
          }
      },(response)=>{
         Indicator.close()
      })


    },
    corfirmGoods(object){//确认收货
                let vm =this
                console.log(object.orders[0].id)
             vm.axios.post(Apiconfir,{'ordercode':object.ordernumber,"id":object.orders[0].id}).then((response)=>{
               if (response.data.retcode == 1) {
              
                    vm.lists.$remove(object)
                    vm.updataScroll()
 
               
               }

             },(response)=>{

             })
    },
    //进入商品详情
    enterDetails(item){

        this.$router.go({name:'shopDetails',query:{id:item.id}})   
     },
    // tab切换
    changeCidGoods(item){
       let vm = this
      vm.curcid = item.id
      vm.instancescroll = null
      vm.page = 1
      vm.lists = []


      if (item.id==4) {
        vm.isOrder = false
        vm.shoplist=[]
        vm.without = false
        vm.loadShopingData()//加载购物车数据
       
      }else{
        vm.isOrder = true
        vm.listsoption.orderstatus = item.id
        vm.without = false
        vm.loadOrderListData()//加载分类数据

      }
     

     
     


    },
//列表滚动
    swperanceFun(){
      let vm = this
     

    },

   
    //加载详细数据
    loadSortOrders(){
      let vm =this
      Indicator.open('加载中...')
     vm.option.categoryid = vm.curcid

      vm.axios.post(ApiSortGoods,vm.option).then(function(response){
        let data = response.data
        if (data.retcode==1) {
         
          vm.lists = data.data.rows
          vm.$nextTick(function(){
             vm.swperanceFun()
          })
         
        }else{
           Toast({message:response.data.retmsg})
        }
         Indicator.close()

      },function(response){
         Indicator.close()
        Toast({message:response.data.retmsg})
      })
    },
          //确定订单状态
      cofireorderstatus(items){
       
          //unpay为真是都没有支付

            let unpay = items.some(function(item,index,array){
                return item.orderstatus=='未支付'

              })
              //isend为true是已发货 为false为未发货
               let issend = items.some(function(item,index,array){
                return item.orderstatus=='已发货'

              })
                //isallsend为true是全部已发货 为false为未发货
               let isallsend = items.every(function(item,index,array){
                return item.orderstatus=='已发货'

              })
               //isreceive为true是所有都签收 为false 有的没有签收
                 let isreceive = items.every(function(item,index,array){
                return item.orderstatus=='已签收'

              })
                 //isiscomment为true是所有都签收 为false 有的没有签收
                 let isiscomment = items.some(function(item,index,array){
                return item.iscomment==0

              })
                if (unpay) {

                  return 0 //'未支付'
                }else if(!unpay&&!issend&&!isreceive){
                  return 1 //'未发货'

                }
                  else{
                         if (isreceive&&isiscomment) {
                           return 2 //'已签收未评论'
                        }else if(isreceive&&!isiscomment){
                           return 3 //'已签收已评论'

                        }else{

                          return 4 //'已发货'
                        }
                }



      },
          //调整数组
      adjustarray(obj){
         let zlist=[],
         vm =this
          for(let key in obj){
              let item = {
                "ordernumber" : key,//订单编号
                "orders" :obj[key]//数组
              }  
             // let itemc = Array.from(item.orders)
             //  console.log(typeof itemc,'??')         
             item.orderstatus = vm.cofireorderstatus(obj[key])
            zlist.push(item)
             
            }
            

          return zlist
      },
    loadOrderListData(){//加载订单列表
      let vm = this
      vm.isOrder = true
      vm.listsoption.page = vm.page
      vm.axios.post(Apimyordes,vm.listsoption).then((response)=>{
          if (response.data.retcode == 1) {
            let data = response.data.data
            vm.total = response.data.data.total
            vm.lists = vm.lists.concat(vm.adjustarray(data.rows[0])) 
            if (vm.lists.length >=1 ) {
               vm.$nextTick(function(){
                                 
                  vm.updataScroll()
         
                 })
               vm.without = false
             }else{

                 vm.without = true
             }
           
         
              

          }
      },(response)=>{})

    },
  

      

  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/style.scss";
  @import '../../../assets/css/swiper.css' ;  

  .myorder{
         background:#090C12;
         padding-left: px2rem(70);
         padding-bottom: px2rem(60);
         // position:relative;
           height: 100%;
         color:$color-cheapccc;
          text-align: center;
           .myordernav{
                height:px2rem(60);
                width: 80%;
                position:relative;
                text-align: center;
                background:#10131A;
                @include font-dpr(12px);
                nav{
                  width: 100%;
                  height: 100%;
                  .nav-item{
                    width: 18%;
                    height: px2rem(33);
                    line-height: px2rem(33);

                    &.nav-active{
                      color:$color-orange;
                      background:$color-deepblue;
                    }
                  }
                }               
           }
           .shop-orders{
              position:relative;
              width: 80%;
              height: 90%;
              .shopingfooter{//购物车选中条
                          
                          width: 100%;
                          height: px2rem(50);
                          position:absolute;
                          bottom:0px;
                          left:0px;
                          right: 0px;
                          padding:0 px2rem(10);
                          z-index: 10;
                          background:#181B26;
                          .shopfootleft{
                            .fa-check-circle{
                              @include font-dpr(16px);
                            }
                          }
                          .shopfootright{
                            width: px2rem(300);
                            .totappay{
                              display: inline-block;
                              color:$color-orange;
                              text-indent: px2rem(10);
                            }
                            .beginbalance{
                              width: px2rem(120);
                              background:$color-orange;
                              height: px2rem(35);
                              line-height: px2rem(35);
                              color:#000;
                              @include font-dpr(12px);
                            }
                          }
                 }
            
                #wrapper{
                  position: absolute;
                  z-index: 1;
                  top: 0px;
                  left: 0;
                  right: 0;
                 bottom:0;
                   background: transparent;
                  overflow: hidden;
                  #scroller{
                      position: absolute;
                      z-index: 1;
                      -webkit-tap-highlight-color: rgba(0,0,0,0);
                      width: 100%;
                      min-height:100%; 
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
                      background: transparent;
                      .without-shop-bg{
                        width: 100%;
                        position:absolute;
                        top:0;
                        left:0;
                        right: 0;
                        bottom: 0;
                        img{
                          width: px2rem(120);
                         height: px2rem(120);
                        }
                        span{
                         display: inline-block;                        
                          margin-top: px2rem(20);
                         @include font-dpr(14px);
                         color:white;                         
                        }
                      }
                      .toolbar{
                          width: 100%;
                          padding:0 px2rem(20);
                          height: px2rem(40);
                          .toobarleft{
                             
                              padding:px2rem(5) px2rem(10);
                              color:#000000;
                             
                              border-radius: px2rem(3);
                              span{
                                display: inline-block;

                                margin-right: px2rem(15);
                                padding:px2rem(5);
                                 background:$color-orange;
                                  @include font-dpr(12px);
                                  letter-spacing: px2rem(1);
                                  border-radius:5px;
                              }
                          }
                          .toobarright{
                            span{
                              color:$color-orange;
                              @include font-dpr(12px);
                            }
                          }

                      }
                      .shoppings{
                       
                        margin-bottom: px2rem(60);
                          header{
                                height: px2rem(40);
                                line-height: px2rem(40); 
                                padding:0 px2rem(10); 
                                @include font-dpr(12px);
                                .editrspan{
                                  color:$color-orange;
                                }     
                             }
                          .shoping{
                            padding:px2rem(10);
                            .imgwrapper{
                                width: px2rem(85);
                                height: px2rem(85);
                                background:#ccc;
                            }
                            .shoping-middle{
                                    // text-indent: px2rem(8);
                                    padding-top:px2rem(5);
                                    .name-top{
                                      p{
                                        text-align: left;
                                      }
                                      .title{
                                        color:#FFFFFF;
                                        @include font-dpr(10px);
                                        letter-spacing:px2rem(1);

                                      }
                                      .subtitle{
                                        margin-top: px2rem(5);
                                        color:$color-lightblue;
                                        @include font-dpr(10px)

                                        ;
                                      }
                                    }
                              }
                              .shoping-right{

                                span{
                                  display: inline-block;
                                  width: px2rem(30);
                                  background:#4E5C7E;
                                  height: px2rem(30);
                                    line-height: px2rem(30);
                                      text-align: center;
                                }
                                .counts{
                                 color:$color-orange;
                                 background:#08090D;
                                 width: px2rem(50);
                               
                                }
                                .delbutton{
                                  width: px2rem(50);
                                  background:#4E5C7E;
                                  min-height: px2rem(80);

                                }
                                .countbar{
                                  .fa-check-circle{
                                    @include font-dpr(18px);
                                    margin:0 px2rem(25);
                                  }
                                }
                              }
                          }

                      }
                      .order-item{
                        background:#10131A;
                        margin-bottom: px2rem(13);
                          .header {
                              background:$color-deepblue;
                              height: px2rem(42);
                             padding:0 px2rem(10);
                             .title{
                               letter-spacing: px2rem(1);
                             }
                             
                          }
                             
                          .goods{
                             padding:px2rem(12) px2rem(13);
                              .good{
                                padding-bottom:px2rem(10);
                                  .imgwrapper{
                                    width: px2rem(85);
                                    height: px2rem(85);
                                    background:#ccc;
                                  }
                                  .good-right{
                                    text-indent: px2rem(8);
                                    padding-top:px2rem(5);
                                    .name-top{
                                      p{
                                        text-align: left;
                                      }
                                      .title{
                                        color:#FFFFFF;
                                        @include font-dpr(12px);
                                        letter-spacing:px2rem(1);

                                      }
                                      .subtitle{
                                        margin-top: px2rem(5);
                                        color:$color-lightblue;
                                         // color:#505E80;
                                        @include font-dpr(11px)

                                        ;
                                      }
                                    }
                                    .price{
                                      .indspan{
                                        margin-left: px2rem(6);
                                      }
                                    }
                                  }

                              }
                          }

                      }
                  }
                }
           }

                  
                            
                         

        
     
  }
  
</style>
