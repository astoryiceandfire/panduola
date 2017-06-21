<template>
  <div class="home">
      <div class="srapper" flex="dir:left">
      <!-- 左边wraper -->
            <div class="writem">
              <div id="wrapper" v-el:wrpone>
                  <div id="scroller" flex="dir:top main:justify">
                  <!-- //昵称 -->
                      <div class="person_up border1px setbottomborder" flex="cross:center">
                        
                                <div class="person_up_cell " flex="dir:left cross:center">
                                  <div class="left_img">
                                   
                                    <form id="uploadForm" enctype="multipart/form-data">  
                                        <input type="file" name="file"  accept="image/*"  enctype="multipart/form-data" @change="uploadImg($event)"/>
                                            </form>    
                                    <img v-if='slpersondata.portrait' :src="ip + slpersondata.portrait">
                                    <img v-else src="../../assets/images/default.png">

                                  </div>
                                  <div class="cell-middle" flex="dir:top main:justify">
                                    <div v-touch:tap="changeNickname" class="right_name">{{slpersondata.nickname}}</div>
                                    <div class="cell-lvv" flex="dir:left box:first cross:center">
                                          <span class="cell-lv">LV{{slpersondata.level}}</span>
                                          <p class="cell-rate">
                                              <span>{{slpersondata.exp +'/' + slpersondata.expnext}}</span>
                                              <i class="rate-v" :style="{'width':slpersondata.exp/slpersondata.expnext *100 +'%'}">
                                               
                                              </i>
                                            </p>
                                        </div>
                                  </div>
                                  
                                </div>
                               
                      </div>
                     <!--  余额 -->
                     <div class="balance" flex="dir:top main:center">
                        
                              <p class="top">余额(通币)</p>
                              <p class="down">{{slpersondata.integral|numberinteger}}</p>
                           
                        
                     </div>
                    <!--  我的订单 -->
                        <div class="person_down" flex="dir:top ">
                            <div class="cell-item" flex="main:justify cross:center">
                              <div class="cell-left">
                                <span>我的订单</span>
                              </div>
                              <div class="cell-right" v-touch:tap="enterOrder(0)">
                                 <span>全部订单 <i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
                              </div>

                                 
                            </div>
                           
                          <div class="do_items" flex="cross:center">

                          <div v-for="item in aclist" v-touch:tap="enterOrder($index + 1)" class="do_item" flex="dir:top cross:center">
                            <span v-if='item.uncount' class='do_item-clire'>{{item.uncount}}</span>
                             <i :class=['fa',item.imgi,'fa-2x'] aria-hidden="true"></i> 
                              <span>{{item.title}}</span>
                          </div>
                  
                          
                      </div> 
                    <!--  我的游戏 -->
                   
                        <!--   <div class="cell-item" flex=" cross:center">
                              <div class="cell-left">
                                <span>我的游戏</span>
                              </div>          
                            </div> -->
                           
<!-- 
                          <div class="mygame" flex="main:justify cross:center">
                            <div class="ga_left" flex="cross:center">
                                  <div class="icon"><img src="../../assets/images/aiwan.png"></div>
                                 
                            </div>
                            <div class="ga_middle">
                                  <div class="top">
                                      <span>1{{othername}}=1通币</span>
                                      </div>
                                  <div class="bottom">
                                    当前{{othername}}：<span>{{gamecoin}}</span>{{othername}}
                                  </div>
                            </div>
                            <div v-touch:tap='showChangeContainer' class="ga_right"><span>兑换通币</span></div>
                          </div>
                        
                   -->
                   
                              
                          

                           
                            
                             

                        
                      </div>
                    
                  </div>
              </div>
            </div>
            <!-- 左边wraper -->
            
           <!--  右面的滚动 -->
           <div class="writem1">
              <div id="wrapper1" v-el:wrptwo>
                <div id="scroller1">
                <section class="wr_top">
                  <mt-cell title="中奖记录"  v-touch:tap="enterRcord(0)" is-link></mt-cell>
                  <mt-cell title="活动记录"   v-touch:tap="enterRcord(1)" is-link></mt-cell>
                   <mt-cell title="兑换记录"   v-touch:tap="enterRcord(2)" is-link></mt-cell>
                  <mt-cell v-touch:tap="enterMycollection" title="我的收藏"  is-link></mt-cell>
                   <mt-cell v-touch:tap="enterAdministration" title="收货地址"  is-link></mt-cell>
                     <mt-cell v-touch:tap="enterPaycard" title="通付卡管理"  is-link></mt-cell>
                     <mt-cell v-touch:tap="enterrcode" title="订单明细"  is-link></mt-cell>
                     <mt-cell v-touch:tap="enterRuls" title="常见问题"  is-link></mt-cell>

                </section>
               <!--  <section class="wr_bottom">
                  <h1 class="zs-border-left">账号信息</h1>
                   <mt-cell title="手机号"  is-link>绑定手机号码</mt-cell>
                    <mt-cell title="安全设置"  is-link></mt-cell>
                     <mt-cell title="通付卡管理"  is-link></mt-cell>
                      
                  
                </section> -->
                  
                </div>
              </div>
            </div>

              <!--  右面的滚动 -->

      </div>
       <!--  兑换弹窗 -->
                         <div v-if="isHidden"  class="zs-container"> 


                             <div v-if="changeshow" class="wrap-message" flex="dir:top cross:center">
                                 <div class="close">
                                      <i v-touch:tap="hiddenWraper" class="closeicon" aria-hidden="true"></i>
                                      </div>
                                 <p class="title">兑换通币</p>
                                 <p class="subtitle">可兑换通币：<span>{{gamecoin}}</span>通币</p>
                                 <div class="compute" flex="main:justify-content cross:center">
                                    
                                       <input type="number" name="" placeholder="输入兑换通币数量" v-model="changecount">
                                      
                                       <span v-touch:tap="getTopTimes" class="topcount">最大</span>
                                     </div>
                                 <div v-touch:tap="changeBill" class="atonce">
                                    <span>兑换通币</span>
                                    </div>              
                             </div>
                           <!--   兑换成功 -->
                             <div v-if="changsuccess" class="wrap-message" flex="dir:top cross:center">
                                 <div class="close">
                                      <i v-touch:tap="hiddenWraper" class="closeicon" aria-hidden="true"></i>
                                      </div>
                                 <p class="title">兑换成功</p>
                                 <p class="subtitle"><span class="fontcolor">{{changecount}}</span>{{othername}}>><span class="fontcolor">{{changecount}}</span>通币</p>
                                
                                 <div v-touch:tap="closeSuccess" class="atonce">
                                    <span>确定</span>
                                    </div>              
                             </div>
                            <!--  兑换成功 -->
                          </div>

                   <!--  兑换弹窗 -->
  
 
  </div>
</template>

<script>

import Swiper    from '../../assets/js/swiper'
import {myMixin}    from '../../mixin'
import {IP,API_URL,ApiUploadImg,Apiupnickname,ApiZuanShi,Apimyshopmessage,appid,ApiZuanShiCheck}    from '../../api'
import md5 from 'md5'
import {Toast,Indicator,MessageBox} from 'mint-ui'


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
      
   
     aclist:[{title:"待支付",imgi:"fa-credit-card",uncount:0},
             {title:"待收货",imgi:"fa-truck",uncount:0},
             {title:"待评价",imgi:" fa-pencil-square-o",uncount:0},
              {title:"购物车",imgi:"fa-shopping-cart",uncount:0}],
              gamecoin:'0',
              othername:'',
             slpersondata:{
              integral:'0',
              exp:0,
              expnext:0,
              id:0,
              frame:'',
              ishas:0,
              level:1,
              mobile:'',
              tid:0,
              titlename:'',
              uid:0,
              unread:0,
              portrait:'',
              levelImage:'',
             },//个人数据，
             isHidden:false,//兑换弹窗
             changecount:1,//兑换数量
             changeshow:true,//
             changsuccess:false,//兑换成功显示
             orderNum:'',//兑换钻石订单
             timer:null,//查询结果定时器
             timerout:null,//查询30定时器
             //upload
             accept: 'image/*',
              size: 1024 * 1024 * 10,
              multiple: true,
              extensions: 'gif,jpg,png',
              // extensions: ['gif','jpg','png'],
              // extensions: /\.(gif|png|jpg)$/i,
              files: [],
              upload: {},
              drop: true,
              auto: false,
             //upload

        }

  },

  computed:{
   
  },

  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this


      vm.gamecoin = localStorage.getItem('zsgameCoin')?localStorage.getItem('zsgameCoin'):0
      // vm.gamecoin = 1000
      vm.othername = localStorage.getItem('zscoinName')
       vm.changecount=1
     
       vm.loadSlperson()//加载个人数据
      vm.getshopmessage()//查看我的消息
     
      setTimeout(function(){
        
        
          vm.addiscroll("wrptwo")
      },100)
       
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
    enterPaycard(){//进入通付卡管理
      this.$router.go({name:'mangercard'})

    },
         //图片上传
            uploadImg(e){
              console.log('进入图片上传1')
                
              let vm = this
              lrz(e.target.files[0])
                  .then(function (rst) {
                   
                    Indicator.open("图片上传中")
                      var instance = vm.axios.create({
                    
                       
                        headers: {'Content-Type':'multipart/form-data; boundary=----WebKitFormBoundary0lIZqBLj6cezDOPz',
                          'mid':localStorage.getItem('zsmid'),
                           'token' :localStorage.getItem('zstoken'),
                          'userid': localStorage.getItem('zsuserid'),                   
                          'ver' : 1.0,
                         'sblx' : 3,
                          'appid' : '4d029789cf1d4e0facee1da3391fd8b6',
                          'sdkToken' :localStorage.getItem('zstoken'),
                         'deviceid' :1}
                      });
                     
                     instance.post(ApiUploadImg, rst.formData).then((response) => {
                   
                          if (response.data.retcode == 1) {
                             vm.slpersondata.portrait = response.data.data.path + response.data.data.filename
                             Indicator.close()
                             Toast({
                              message:'上传成功',
                              duration:500
                             })
                          }
                      }, (response) => {
                             Indicator.close()
                          Toast({
                              message:'上传失败',
                              duration:500
                             })
                      });
                  })
                
            },
    changeNickname(){//改变昵称
      let vm = this
      MessageBox.prompt('修改昵称').then(({ value, action }) => {
        if (!value||value.length<4||value.length>12) {
          Toast({message:'4-12个字符 中文英文数字结合'})
          return 
        }else{

           vm.updaeName(value)
        }
           
            },()=>{});

    },
    updaeName(value){//发送昵称改变请求
      let vm = this
      Indicator.open('请求中....')
      vm.axios.post(Apiupnickname,{nickname:value}).then((response)=>{

            if (response.data.retcode==1) {
                vm.slpersondata.nickname = value
              Toast({message:'修改成功'})
            }else{
              Toast({message:response.data.msg})
            }
            Indicator.close()
      },(response)=>{
        Indicator.close()
      })


    },
    getshopmessage(){//查询实时消息

      let  vm = this
      vm.axios.post(Apimyshopmessage,{}).then(function(response){
          if (response.data.retcode == 1) {
            let data = response.data.data

             vm.aclist[0].uncount = data.unpay
             vm.aclist[1].uncount = data.unget
             vm.aclist[2].uncount = data.uncomment
             vm.aclist[3].uncount = data.cartNum
          }
      },function(){})
    },
    enterrcode(){//订单明细
       this.$router.go({name:'billrcode'})
    },
    enterMycollection(){//我的收藏
      this.$router.go({name:'mycollection'})
    },
    enterOrder(index){//进入订单
    
      this.$router.go({name:"myorders",params:{id:index }})
    },
    //进入常见问题
    enterRuls(){
      this.$router.go({name:"ruls"})
    },
    //最大兑换量
    getTopTimes(){
      this.changecount = this.gamecoin

    },
    //检查兑换通币
    changeBill(){
      let vm=this
      if (Number(vm.changecount)<=0||Number(vm.changecount)>Number(vm.gamecoin)) {
        
        Toast({message:'请输入正确的兑换数目'})
        return
      }


      vm.exChangeTongBi()

    },
    //兑换申请请求SDK
        exChangeTongBi(){//兑换钻石
          let vm=this,
          sign = '',
          option={};
          option.userId = localStorage.getItem('zsuserid') 
           option.mobile = localStorage.getItem('zsmobile') 

            // option.money =parseFloat(40.0).toFixed(1)  //需要兑换申请钻石数
            option.money =parseFloat(vm.changecount).toFixed(1)  //需要兑换申请钻石数
            
            option.appId = appid
          
              Object.keys(option).sort().forEach(function( value,index,array){
              
                        sign +=`${value}=${option[value]}&`
                        if (index==array.length-1) {
                        
                         
                          sign = sign.slice(0,sign.length-1)
                         
                            sign = md5(sign)
                           

                          }
                      }) 
                  
                  option.iscross = true //跨域
                  option.sign = sign; 

         
              // Toast({message:"进入兑换申请"})

          vm.axios.post(ApiZuanShi,option).then((response)=>{
           
            if (response.data.success==1) {
                  vm.changeshow=false
                  Indicator.open('兑换订单处理中...')
                  vm.orderNum = response.data.data.orderNum
                  vm.postMobile(response.data.data)//客户端发起请求

                  
            }else{
              // Toast({message:"兑换申请失败"})
               Toast({message:response.data.msg})
            }


            
            
          

          },function(response){
              Toast({message:"申请失败"})
          })


        },
        //向客户端发起兑换请求
        postMobile(data){
          let vm =this
           // Toast({message:"2进入向客户端发起兑换申请的方法"})
            var u = navigator.userAgent;
          if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
           // Toast({message:"2发起app客户端兑换申请"})
              window.Logic.showMsg(0x4,JSON.stringify(data));
          } else if (u.indexOf('iPhone') > -1) {//苹果手机
          window.webkit.messageHandlers.deliver.postMessage(JSON.stringify(data));
            
          } else if (u.indexOf('Windows Phone') > -1) {//winphone手机

        }
       vm.timer = setInterval(function(){
          vm.checkChangeBIll()
        },2000)
       vm.timerout =  setTimeout(function(){
          clearInterval(vm.timer) 
       },30000)
      


       
        },
        //查询通币兑换是否成功
        checkChangeBIll(){
          
           let vm =this


        vm.axios.post(ApiZuanShiCheck,{orderNum:vm.orderNum,iscross:true}).then(function(response){
          if (response.data.data.status==1) {



            
              clearInterval(vm.timer) 
              clearTimeout(vm.timerout)
                Indicator.close()
                 vm.changeshow = false
                vm.changsuccess =true
            vm.gamecoin = Number(vm.gamecoin)-Number(vm.changecount)
           localStorage.setItem('zsgameCoin',vm.gamecoin)
          
           let data = Number(vm.slpersondata.integral) + Number(vm.changecount)
           vm.slpersondata.integral= Number(data).toFixed(2)
           
        

          }else{

          }
          
        },function(){})
         

        },
        //兑换成功之后关闭
        closeSuccess(){
          let vm =this
          vm.changsuccess =false
          vm.hiddenWraper()
          // vm.changecount=0


        },
    //关闭弹窗
    hiddenWraper(){
      this.isHidden=false

    },
    //兑换通币显示
    showChangeContainer(){
      this.isHidden =true
      this.changeshow =true
    },
    //加载个人数据
     loadSlperson(){
            let promise = this.loadsldata()
            let vm = this

            promise.then(function(data){
                vm.slpersondata = data
            },function(data){
              Toast({message:data})
            })

     },
       
          //中奖纪录 参加记录
          enterRcord(index){
            this.$router.go({
              name:"activeNotes",
              params:{id:index}
            })

          },
          //收货地址
          enterAdministration(){
            let vm = this
            vm.$router.go({
              name:"administration"

            })
          },

      

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
              .writem{
                width:42%;
                position:relative;
               

              }
              .writem1{
                width: 58%;
                 position:relative;
                 

              }
                #wrapper,#wrapper1 {
                  position: absolute;
                  z-index: 1;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  background: $color-primary;
                  overflow: hidden;
                }

               
                #scroller{
                   background:$color-primary;
              
                    height: 100%;
                    width: 100%;
                    padding:0 px2rem(10);

                     .mint-cell{
                         background:$color-deepblue;
                         color:$color-cheapccc;
                      }

                    .person_up{
                     
                       height: 25%;;
                       width: 100%;
                       margin-bottom: 1px;
                      

                         .left_img{
                              width: px2rem(60);
                              height: px2rem(60);
                              margin:0 px2rem(20);
                              border-radius: 50%;
                              overflow: hidden;
                              background:#ccc;
                                 position:relative;
                                 img{
                                  
                                 }
                              #uploadForm{
                                    position:relative;
                                    width: px2rem(60);
                                  
                                  }
                                  #uploadForm input{
                                           position:absolute;
                                            top:0;
                                            right:0;
                                            width:100%;
                                            height:80px;
                                            background:red;
                                            opacity: 0;
                                            z-index: 11;
                                         }
                             
                              
                          }
                          .person_up_cell{
                            height: 100%;
                             width: 100%;

                             background:$color-deepblue;
                             .cell-middle{
                              min-width: px2rem(160);
                              height: 55%;
                                .right_name{
                                  color: $color-cheapccc;
                                  @include font-dpr(12px);
                                  white-space: nowrap;
                                  overflow: hidden;
                                  text-overflow: ellipsis;
                                 
                                 }
                                 .cell-lvv{
                                   
                                    .cell-lv{
                                      color:$color-orange;
                                      @include font-dpr(12px);
                                      margin-right: px2rem(10);
                                    }
                                    .cell-rate{
                                      position:relative;
                                      z-index: 1;
                                      width: px2rem(150);
                                      height: px2rem(18);
                                      background:$color-primary;
                                        span{
                                          position:absolute;
                                          left:50%;

                                          transform:translatex(-50%);
                                          color:$color-zibai;
                                          @include font-dpr(10px);
                                          z-index: 10;
                                        }
                                       

                                        .rate-v{
                                          position:absolute;
                                          top:0;
                                          left:0;
                                          width: 50%;
                                          background:$color-deeporange;
                                          z-index: 5;
                                            height: 100%;
                                        }
                                       
                                    }
                                 }
                             }
                               
                          }

                    }
                    .balance{
                            height: 14%;;
                             background:$color-deepblue;
                           
                              padding-left:px2rem(10);
                                    .top{
                                      color:#3F4966;
                                      @include font-dpr(10px);
                                    }
                                    .down{
                                      color:$color-deeporange;
                                      @include font-dpr(15px);
                                      
                                    }
                          
                            
                    }
                  .person_down{

                    height: 60%;

                    .cell-item{
                      padding:0 px2rem(10);
                      color: #4D5055;
                      background:$color-zise;
                      height: px2rem(50);


                    }
                  }
                    .do_items{
                           
                            background:#10121A;
                           padding:px2rem(10) 0;
                            webkit-justify-content: space-around;
                             justify-content: space-around;
                       .do_item{
                        position:relative;
                       overflow: visible;
                          i{
                            color:$color-icon;
                             @include font-dpr(18px);
                          }
                          span{
                              color:$color-white;
                              display: inline-block;
                              height: px2rem(30);
                              line-height: px2rem(30);
                              @include font-dpr(10px);
                          }

                       }
                       span.do_item-clire{
                         
                          position:absolute;
                          display: inline-block;
                          right: px2rem(-5);
                          top:px2rem(-4);
                          width: px2rem(18);
                          height: px2rem(18);
                          text-align: center;
                          line-height: px2rem(18);
                          border-radius:50%;
                          background:#BF1600;
                          box-shadow:0 0 1px 2px white; 
                          @include font-dpr(6px);
                          z-index: 1000;
                       }
                    }
                    //我的游戏
                    .mygame{
                      height: px2rem(100);
                    
                          .ga_left{


                              .icon{
                                width: px2rem(50);
                                height: px2rem(50);
                              }

                          }
                          .ga_middle{
                            // flex-grow: 0;
                                  .top{
                                    color:#3F4966;
                                        @include font-dpr(12px);

                                  }
                                  .bottom{
                                        color:$color-white;
                                        @include font-dpr(12px);
                                        span{
                                          color:$color-deeporange;

                                        }
                                         white-space: nowrap;

                                  }
                          }
                          .ga_right{
                            span{
                              display: inline-block;
                              color:black;
                              background:$color-deeporange;
                              white-space: nowrap;
                              height: px2rem(30);
                              line-height: px2rem(30);
                              @include font-dpr(10px);
                              border-radius: px2rem(4);
                            }
                          }

                    }

     





                   
                  
                }
                #scroller1{
                   background:$color-primary;
                  padding:px2rem(12);
                  padding-left:0px;

                   .mint-cell{
                         background:$color-deepblue;
                         color:$color-cheapccc;
                        

                      }

                  //最新揭晓
                    section.wr_top{
                      
                     

                     
                              h1{
                                margin-top: px2rem(10);
                                height: px2rem(30);
                              
                                 @include font-dpr(14px);
                              }
                             
                        }
                    //热门活动
                    section.wr_bottom{
                           
                            h1{
                              height: px2rem(50);
                              line-height: px2rem(50);
                              @include font-dpr(12px);
                              color:$color-cheapccc;
                              letter-spacing: px2rem(3);
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
                         // opacity:0.5; filter: alpha(opacity=30);
                          background-color:hsla(0%,0%,0%,.8); 
                        z-index: 11;
                         
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
                                  padding-top:px2rem(10);
                                 padding-right:px2rem(20);
                                 margin-bottom: px2rem(-20);
                                }
                                .title{
                                  text-align: center;
                                  color:$color-zibai;
                                  @include font-dpr(20px);
                                }
                                .subtitle{

                                  color:$color-cheapccc;
                                  span{
                                    color: $color-orange;
                                  }
                                }
                                .compute{
                                    width: 80%;
                                    height: px2rem(50);
                                    line-height: px2rem(50);

                                    i{
                                      
                                    }
                                    .reduce,.add{
                                      width: px2rem(100);
                                      height: 100%;
                                      background:#505D80;
                                      text-align: center;
                                    }
                                    input{
                                      height: px2rem(50);
                                    
                                      background:$color-primary;
                                      color:$color-orange;
                                      border:none;
                                      text-align: center;
                                    }
                                    .topcount{
                                      color:$color-deepblue;
                                       background:#505D80;
                                       height: px2rem(50);
                                      line-height: px2rem(50);
                                      width: px2rem(100);
                                      text-align: center;
                                      margin-left: px2rem(4);
                                      @include font-dpr(16px);
                                    }
                                }
                                .atonce{
                                  text-align: center;
                                  width: 80%;
                                  span{
                                    display: inline-block;
                                    height: px2rem(50);
                                    line-height: px2rem(50);
                                    width: 100%;
                                    background:$color-orange;
                                  }
                                }

                          }
                 }
                 //弹窗

    
     
  }
  
</style>
