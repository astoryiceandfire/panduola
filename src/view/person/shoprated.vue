<template>
  <div class="home">
      <div class="srapper">
        <header class="header" flex="dir:left main:justify cross:center"><span>发布评论</span><span v-touch:tap='canclerate' class="cancle">取消</span>
        </header>
        <h1 class="shopname" flex="cross:center">商品：{{getitem.goodsname}}</h1>
         <textarea v-model="content" class=" textarearate border1px setarrborder" placeholder="请写下对宝贝的感受吧，对他人的帮助很大哦(15-100字)"></textarea>
      <div class="footer" flex="main:justify cross:center">
        <div class="footerleft">
            <form id="uploadForm" enctype="multipart/form-data">  
                  <input type="file" name="file"  accept="image/*"  enctype="multipart/form-data" @change="changeimg($event)"/>
                  <span class="limntspan">(已选择{{len}}张 最多可选择6张图片)</span>
                                            </form>    
        </div>
        <div class="footerright"><span v-touch:tap="saveMessage">发布评论</span></div>
      </div>

      </div>
  
 
  </div>
</template>

<script>


import {myMixin}    from '../../mixin'
import {IP,ApijudgeMshop}    from '../../api'

import { Indicator,Toast } from 'mint-ui';
export default {

    mixins: [myMixin],
  vuex: {
      actions: {
      
      },
      getters: {
       
      }
  },
  data () {
    return {
      insscroll:null,
      getitem :null,
      content:'',
      len:0,
      formdata:null,
     
     
        

       }
  },
  computed:{
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      vm.getitem = vm.$route.query
        vm.len = 0




     
     

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
    canclerate(){//取消
        window.history.go(-1)
    },
        changeimg(e){
      let vm = this

      if (vm.len>=6) {

        Toast({message:'最多可选择6张图片'})

        return
      }
    
      if (vm.formData) {
            lrz(e.target.files[0]).then((rst)=>{

               vm.formData.append(`file${vm.len}`,rst.file)
            })

       
      }else{
        vm.formData = new FormData()
         lrz(e.target.files[0]).then((rst)=>{
             
               vm.formData.append(`file${vm.len}`,rst.file)
            })
      }
        vm.len++



                
      
      
  

    },
    //商品评价
      saveMessage(){
                      let vm =this,
                      lengths = 0,
                         option={
                        nickname:"",
                        oid:0,
                        shopid:0,
                        rating:0,
                        image:"",
                        content:"",
                       };

                       option.nickname=vm.getitem.nickname;
                       option.oid = vm.getitem.id;
                       option.shopid=vm.getitem.goodsid;
                       option.rating=5;
                     
                       // vm.content = vm.content.replace(/\s/g, "")
                        option.content=vm.content;

                       lengths = vm.content.length
                       
                        if (lengths<15||lengths>100) {
                          Toast({message:'请检查字体个数'})
                          return 
                        }

                    Indicator.open("评价中...")
//评价
          
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
                         vm.formData.append('nickname', option.nickname) 
                          vm.formData.append('oid', option.oid) 
                           vm.formData.append('shopid', option.shopid) 
                            vm.formData.append('rating', 5) 
                             vm.formData.append('content', option.content) 
                          
                  
//评价





                      instance.post(ApijudgeMshop,vm.formData).then((response)=>{
                        if (response.data.retcode == 1) {
                          Indicator.close()
                          Toast({message:"评价成功"})

                             setTimeout(function(){
                                vm.$router.go({name:"myorders",params:{id:3 }})
                             },500)
                        }

                      },(response)=>{
                         Indicator.close()
                          Toast({message:"评价成功"})
                      })
                  },
   
    
    

  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/style.scss";
  @import '../../assets/css/swiper.css' ;  

  .home{
       background:$color-primary;
       padding-left: px2rem(70);

         .srapper{
             position:absolute;
             top: px2rem(20);
             left: px2rem(90);
             bottom:px2rem(60);
             right: px2rem(20);
             background:transparent;
             height: 100%;
             .header{
              width: 100%;
              height: 10%;
              color:white;
              @include font-dpr(14px);
              .cancle{
                color:$color-orange;
              }

             }
             .shopname{
              width: 100%;
              // height: px2rem(60);
              height: 10%;

              text-align: left;
              padding-left:px2rem(20);
              color:$color-zibai;
              @include font-dpr(15px);
                background:$color-deepblue;
             }
             .textarearate{
              width:100%;
              margin-top: px2rem(15);
              height: 40%;
              background:#181C27;
              padding:px2rem(10);
              @include font-dpr(14px);
              color:white;
              border:none;
             }
             .footer{
                width:100%;
                 .footerleft{
                  #uploadForm{
                    input{
                      width: px2rem(80);
                    }
                    .limntspan{
                    color:white;

                  }
                  }
                  
                }
               
                height: 15%;
                .footerright{
                  span{
                    display: inline-block;
                    width:px2rem(150);
                    height: px2rem(50);
                    line-height: px2rem(50);
                    background:$color-orange;
                    text-align: center;
                    @include font-dpr(14px);
                    letter-spacing: px2rem(1);
                  }
                }
             }
             

             
            }
     
  }
  
</style>
