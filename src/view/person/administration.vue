<template>
  <div class="home">
      <div class="srapper" flex="dir:left">
      <!-- 左边wraper -->
            <div class="writem">
              <div id="wrapper" v-el:wrpone>
                  <div id="scroller">

                  <template v-if="!isAddtion"><!-- //收货地址管理 -->
                       <header flex="main:justify">
                    <span class="fa-circle-organbg">收货地址管理</span>
                    <span class="fa-circle-organbg" v-touch:tap="addstration">添加</span>
                  </header>
                  <div v-for="item in lists" class="aditem">
                    <div class="top  border1px setbottomborder" flex="main:justify">
                      <span>{{item.recvName}}</span>
                      <span>{{item.recvMobile}}</span>
                    </div>
                    <div class="middle  border1px setbottomborder" >
                      <p><span>地址:</span>{{item.areastr}}</p>
                    </div>
                    <div class="bottom" flex="main:justify">
                      <div v-touch:tap="setDefalutArea(item)" class="left"><span>设为默认</span>
                          <i v-if="item.isDefault==1" class="fa fa-check-circle  fa-circle-organbg" aria-hidden="true"></i>
                          <i v-else class="fa fa-circle-thin" aria-hidden="true"></i>

                      </div>
                      <span v-touch:tap="deleteAddress(item)"  class="fa-circle-organbg">删除</span>
                    </div>
                  </div>
                  </template><!-- //收货地址管理 -->

                  <template v-if="isAddtion"><!-- //添加收货地址管理 -->
                    <header class="header">添加收货地址</header>
                    <div class="seitem border1px setbottomborder" flex='dir:left'><span class="name">收货人：</span><input v-model='name' class="value" placeholder="收货人姓名" type="text" name=""></div>
                    <div class="seitem border1px setbottomborder" flex='dir:left'><span class="name">手机号：</span><input class="value" type="tel" maxlength="11" v-model='mobile' placeholder="请输入手机号" name=""></div>
                    <div v-touch:tap="secletarea(0)" flex='dir:left' class="seitem border1px setbottomborder"><span class="name">省份：</span><input class="value" v-model='province' type="text" placeholder="请选择地址省份" name=""></div>
                    <div v-touch:tap="secletarea(1)" flex='dir:left' class="seitem border1px setbottomborder"><span class="name">城市：</span><input class="value" type="text" v-model='city' placeholder="请选择地址城市" name=""></div>
                    <div v-touch:tap="secletarea(2)" flex='dir:left' class="seitem border1px setbottomborder"><span class="name">区域：</span><input class="value" v-model='district' placeholder="请选择地址区域" type="text" name=""></div>
                    <div class="beizhu border1px setbottomborder">
                      <p>详细地址:</p>
                      <textarea v-model='textmesg' placeholder="请输入地址详细信息"></textarea>
                    </div>
                     <div v-touch:tap="setDefalut" class="defalut" flex="main:justify cross:center">
                      <span>设为默认</span>
                      <i  v-if="addreqata.isDefault==1" class="fa fa-check-circle  fa-circle-organbg" aria-hidden="true"></i>
                       <i v-else class="fa fa-circle-thin" aria-hidden="true"></i>
                    </div>
                    <div class="cofspan">
                      <span v-touch:tap='addAdress'>添加</span>

                    </div>

                      <!--  //弹窗 -->
                     <section v-show="showseclt">
                      
                          <div id="wrapper" v-el:srcoll>  
                          <div id= "scroller"> 
                                  <div v-touch:tap='getcode(item)' v-for="item in cdplists" class="adr-item border1px setbottomborder">
                                       
                                       <p>{{item.name}}</p> 
                                      
                                  </div>
                           
                            </div>
                          </div>
                         
                     </section>
                      <!--  //弹窗 -->
                    

                  </template><!-- //添加收货地址管理 -->
               
             
                  
             
                          

                           
                            
                             

                        
                      </div>
                    
                  </div>
              </div>
            </div>
      
  
  
 
  </div>
</template>

<script>

import Swiper    from '../../assets/js/swiper'
import {myMixin}    from '../../mixin'
import { IP ,Apiaddrsave,Apidefault,Apigetareals,Apiaddrlist,appkey,appid,Apidel} from '../../api'
import { Indicator,Toast  } from 'mint-ui';
import md5 from 'md5'

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
      srcollone:null,
      srcolltwo:null,
      isAddtion:false,
      name:"ddddd",
      lists:[],//用户收货地址
      showseclt:false,//地区选择显示
      cdplists:[],//弹窗显示地区列表
      curindex:0,//
      srcollel:null,//省市列表滚动
      procites:null,//all省市区对比列表
      province:'',//省
      city:'',//城市
      district:'',//地区
      firstcode:'',
      secondcode:'',



      option:{//跨域公共请求参数
        reqData:'',
        sign:'',
        signType:0,//0=MD5
      },
      addreqata:{//添加地址请求数据
            recvName : "",   // 收货人姓名
            recvMobile:"",
            detailAddr:"",
            isDefault:0,
           
            province:"",
            city:"",
            district:"",

      },
      listsdata:{//收货地址列表请求参数
     
        pageNo:1,
        pageSize:10,
        userId:'',
      },
      defaultdata:{
        id:0,
        userId:''
      },
      //添加地址参数
      name:"",
      mobile:null,
      textmesg:"",


   
    }
  },

  computed:{
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      vm.isAddtion =false//默认显示地址列表
       // vm.procites = vm.getProvice()
        vm.getProvice()

      

     
        // vm.srcollone = vm.addiscroll("wrpone")
        //  vm.srcolltwo = vm.addiscroll("srcoll")
       
      
   
    
  
     

     

 
       
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
    //添加地址
    addRessaread(){
      let vm =this
      vm.addreqata.recvName = vm.name
      vm.addreqata.recvMobile=vm.mobile
      vm.addreqata.detailAddr = vm.textmesg
      vm.addreqata.userId = localStorage.getItem('zsuserid')
     // vm.option.reqData = JSON.stringify(vm.addreqata)
     // vm.addreqata.
     //  vm.option.sign = vm.markSignString(vm.addreqata)
      // vm.option.iscross = true
    Object.assign(vm.option,vm.addreqata)


      vm.axios.post(Apiaddrsave,vm.option).then((response)=>{
        if (response.data.retcode==1) {
          Toast({message:'地址添加成功'})
          vm.isAddtion =false
           window.location.reload()
        }


      },(response)=>{})

    },
   
    //拿到code
    getcode(item){
      let vm =this
      if (vm.curindex==0) {

        vm.province = item.name
        vm.addreqata.province = item.id
         vm.firstcode = item.code
         
              vm.city=""
              vm.district =""
        
      }else if(vm.curindex==1){
        vm.city = item.name
         vm.secondcode = item.code
         vm.addreqata.city = item.id
          vm.district =""
      }else if(vm.curindex==2){
        console.log(item.name)
          vm.district = item.name
          vm.addreqata.district = item.id
      }
          
         

      vm.showseclt =false
    },
    //更新省份选择控件
updateScroll(){
  let vm =this

   // if (vm.srcolltwo) {
   //  console.log('272',vm.srcolltwo)

   //              vm.srcolltwo.refresh()
   //             }else{
                vm.$nextTick(function(){
                      vm.srcolltwo = vm.addiscroll("srcoll")
                      
              
                   })
               // }


},
    //选择地区
    secletarea(index){
       let vm=this
        if ((!vm.province)&&index==1) {
          Toast({
            message:"请先选择省份",
            duration:1000,

          })
          return
        }else if((!vm.city)&&index==2){
           Toast({
            message:"请先选择城市",
            duration:1000,
          })
          return

        }


      


       if (index==0) {    
            vm.curindex = 0
            vm.cdplists = vm.procites.province
            // console.log(vm.procites)
               vm.showseclt = true
               vm.updateScroll()

              
              
            
   
       }else if(index==1){
            vm.curindex = 1
            let code = this.firstcode
            
        
            vm.cdplists = vm.procites.city.filter(function(item,index){
                return (item.p_code==code)
            })

           
             vm.showseclt = true
               vm.updateScroll()



       }else if(index==2){
              let code = this.secondcode
             
              vm.cdplists = vm.procites.district.filter(function(item,index){
                return (item.p_code==code)
              })
              
              vm.curindex =2
                vm.showseclt = true
                  vm.updateScroll()

       }


    },
    //添加地址
    addAdress(){
      let vm =this,
      pattern =/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      if (!pattern.test(vm.mobile)) {
          Toast({message:'请输入正确的手机号码'})
          return
      }
      
      if (!vm.mobile||!vm.name||!vm.textmesg||!vm.province) {

        Toast({message:'请检查输入是否为空'})
        return
      }






      vm.addRessaread()


    },

    //保存省市区数据

    getProvice(){
      let vm =this
      let curdata = localStorage.getItem('zspdcitys')
      
    
        //console.log(curdata,'getprovice','380')
      if (!!curdata) {
         //console.log('382')
       vm.procites = JSON.parse(curdata)
      

        vm.getPersonList()
        
       
        // console.log(vm.procites,'383')
        

        }else{
        
        vm.getAreaLists()
        
        
          

            
            
           
        }
    },
    //跨域请求生成sign
    markSignString(option){
       let sign = ''
             Object.keys(option).sort().forEach(function( value,index,array){
             
              
                        sign +=`${value}=${option[value]}&`
                        if (index==array.length-1) {
                        
                          sign+=appkey
                          // sign = sign.slice(0,sign.length-1)
                         
                            sign = md5(sign)
                           

                          }
                      }) 

             return sign 
    },
    //地址设置默认与否设置默认
    setDefalut(){
   
      if (this.addreqata.isDefault == 1) {
        this.addreqata.isDefault=0
      }else{

        this.addreqata.isDefault =1;
      }
      
    },
    //添加地址
    addstration(){
      this.isAddtion = true 

    },
    //获取省市区列表
    getAreaLists(){
      let vm = this
         
         // vm.option.iscross = true
    
          vm.axios.get(Apigetareals,vm.option).then((response)=>{
    
            if (response.data.retcode == 1) {
              localStorage.setItem("zspdcitys",JSON.stringify(response.data.data))
              vm.procites = response.data.data
              console.log(vm.procites)
               vm.getPersonList()
            
            }
          

          }).catch((response)=>{

            Toast({message:"失败",
              duration:20000})
          })
    },
    //拼接用户地址
     makeneeddata(data){
      
              let vm=this
               let arrs=[]
             
                  console.log(vm.procites,'471')
                    data.forEach(function(item,index){
                              let data = vm.procites
                            
                             
                              let faitem = item
                               faitem.areastr = ""
                              
                               let curitem = data.province.find(function(item){
                                    return (item.id==faitem.province)
                                })
                               
                                 if (curitem) {
                                 faitem.areastr +=curitem.name 
                                 
                                 }
                                 let curitem1 = data.city.find(function(item){
                                    return (item.id==faitem.city)
                                })
                               
                                 if (curitem1) {

                                 faitem.areastr +=curitem1.name
                                 
                                 }
                                 let curitem2 = data.district.find(function(item){
                                    return (item.id==faitem.district)
                                })
                               
                                 if (curitem2) {

                                 faitem.areastr +=curitem2.name
                                 
                                 }
                          if (faitem.areastr) {
                              faitem.areastr +=faitem.detailAddr
                            arrs.push(faitem);
                            
                          }
                     }) 

                      vm.lists = arrs;

                      let pingstr=''
                      vm.lists.forEach(function(item){
                      
                       
                        let itemstr = JSON.stringify(item)
                         pingstr = pingstr + '&'+itemstr 

                      })
                      localStorage.setItem('arealists',pingstr)

                      // console.log(str)
                      // console.log(str.split('&'))
                      // let arrss = str.split('&')
                      // console.log(JSON.parse(arrss[1]))



                    // localStorage.setItem('arealist',)
                  

                        vm.$nextTick(function(){
                          if (vm.srcollone) {
                            vm.srcollone.refresh()
                          }else{
                            vm.srcollone = vm.addiscroll("wrpone")
                          }

                             
                        })

                   
              },
    //用户收货地址列表
    getPersonList(){
      let vm =this 
      vm.listsdata.userId = localStorage.getItem('zsuserid')
      // vm.listsdata.userId = '1216'

      // vm.option.reqData = JSON.stringify(vm.listsdata)

      // vm.option.sign = vm.markSignString(vm.listsdata)
  

      vm.axios.get(Apiaddrlist,vm.option).then((response)=>{
         
        if (response.data.retcode ==1) {
    

          vm.makeneeddata(response.data.data.addrList)

        }else{
          Toast({message:response.data.msg})
        }

      },(response)=>{

      })







    },
    //设置默认收货地址
    setDefalutArea(item){
      let vm =this 
      if (item.isDefault==1) return
      vm.defaultdata.id = item.id
      vm.defaultdata.userId = localStorage.getItem('zsuserid')
      // vm.option.sign = vm.markSignString(vm.defaultdata)
      // vm.option.reqData = JSON.stringify(vm.defaultdata)
          Object.assign(vm.option,vm.defaultdata)
      // vm.option.iscross =true

      vm.axios.post(Apidefault,vm.option).then((response)=>{
        if (response.data.retcode==1) {
             vm.lists.forEach(function(value){
                                    value.isDefault =0
                                  })
                                  item.isDefault=1
              Toast({
                message:"默认地址设置成功"
              })
        }else{

          Toast({message:response.data.msg})
        }

      }).catch((response)=>{
        Toast({message:'出现错误'})

      })
    },
    //删除收货地址
    deleteAddress(item){
        let vm =this
        vm.defaultdata.id = item.id
        vm.defaultdata.userId = localStorage.getItem('zsuserid')
        // vm.option.sign = vm.markSignString(vm.defaultdata)
        // vm.option.reqData = JSON.stringify(vm.defaultdata)
         Object.assign(vm.option,vm.defaultdata)
        // vm.option.iscross =true
        vm.axios.post(Apidel,vm.option).then((response)=>{
          if (response.data.retcode==1) {
            vm.lists.$remove(item)
            Toast({message:'删除成功'})
          }
        }).catch({})


    }
 
        

      

  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/style.scss";
  @import '../../assets/css/swiper.css' ;  

  .home{
       background:$color-primary;
       padding-left: px2rem(70);
     .adr-item{
        p{
          width: 100%;
          color:#fff;
          height: px2rem(50);
          line-height: px2rem(50);
          text-indent: px2rem(10);
          background:$color-zise;
          @include font-dpr(16px);
        }
     } 

         .srapper{
            // width: px2rem(780);
            // height: 100px;
             position:absolute;
             top: 0;
             left: px2rem(70);
             bottom:px2rem(60);
             right: 0;
              .writem{
                width:42%;
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
                    padding:px2rem(12);
                    color:#999999;
                    header{
                      width: 100%;
                       background:$color-zise;
                       height: px2rem(50);
                       line-height: px2rem(50);
                       padding:0 px2rem(10);
                       span{
                         @include font-dpr(14px);
                       }
                       
                    }
                    .aditem{
                        background:#10121A;
                        padding:0 px2rem(10);
                        .top{
                          height: px2rem(50);
                          line-height: px2rem(50);
                          color:#fff;
                          @include font-dpr(13px);
                        }
                        .middle{
                          padding:px2rem(10) 0;
                          min-height: px2rem(50);
                          line-height: px2rem(25);
                           @include font-dpr(13px);
                           p{
                            color:#fff;
                           }
                           span{
                             color:#999999;
                            margin-right: px2rem(10);
                           }
                        }
                        .bottom{
                            height: px2rem(50);
                            line-height: px2rem(50);
                             @include font-dpr(14px);
                             span{
                               @include font-dpr(14px);
                             }
                             .left{
                              span{
                                margin-right: px2rem(10)
                              }
                              i{
                                @include font-dpr(18px);
                              }
                             }
                        }
                    }
                  .header{
                        @include font-dpr(14px);
                        color:#fff;
                        letter-spacing: px2rem(3);
                      }
                    .seitem{
                      

                        height: px2rem(40);
                        line-height: px2rem(40);
                        background:#10121A;
                        padding:0 px2rem(10);
                        .value{
                          // display: inline-block;
                          color:#FFFFFF!important;
                          background:#10121A;
                          border:none;
                          @include font-dpr(14px);
                         
                          
                        }

                    }
                    .beizhu{
                       background:#10121A;
                        padding:0 px2rem(10);
                        p{
                          @include font-dpr(14px);
                          height: px2rem(25);
                          line-height: px2rem(25);
                        }
                        textarea{

                           background:#10121A;
                          border:none;
                          width: 100%;
                          min-height: px2rem(40);
                          @include font-dpr(14px);
                          color:#fff;
                        }

                    }
                      :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                          color:$color-cheapccc; opacity:1; 
                      }

                      ::-moz-placeholder { /* Mozilla Firefox 19+ */
                            color:$color-cheapccc; opacity:1; 
                      }

                      input:-ms-input-placeholder{
                            color:$color-cheapccc; opacity:1; 
                      }

                      input::-webkit-input-placeholder{
                            color:$color-cheapccc; opacity:1; 
                      }
                          textarea:-ms-textarea-placeholder{
                            color:$color-cheapccc; opacity:1; 
                      }

                      textarea::-webkit-textarea-placeholder{
                            color:$color-cheapccc; opacity:1; 
                      }
                    .defalut{
                        background:#10121A;
                        padding:0 px2rem(10);
                        height: px2rem(50);
                        line-height: px2rem(50);
                        i{
                          @include font-dpr(16px);
                        }

                    }
                    .cofspan{
                      height: px2rem(40);
                      line-height: px2rem(40);
                      text-align: center;
                      margin-top: px2rem(10);
                      span{
                        display: inline-block;
                        width: px2rem(140);
                        background:$color-orange;
                        color: $color-primary;
                        @include font-dpr(14px);
                        letter-spacing: px2rem(5);

                      }
                    }

         
                 
                 
                  
                }
      


         }
    
     
  }
  
</style>
