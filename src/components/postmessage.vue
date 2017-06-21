<template>
  <div class="home">
      <div class="srapper">
        <header class="header" flex="dir:left main:justify cross:center"><span>发布帖子</span><span v-touch:tap='canclerate' class="cancle">取消</span>
        </header>
        <div class="posttile">
          <input type="text" name="postname" v-model='textitle' placeholder="请输入帖子标题（3-15字）">
        </div>
         <textarea v-model="content" class=" textarearate border1px setarrborder" placeholder="请写下帖子正文(15-1000字)"></textarea>
      <div class="footer" flex="main:justify cross:center">
        <div class="footerleft">
           <form id="uploadForm" enctype="multipart/form-data">  
                  <input type="file" name="file"  accept="image/*"  enctype="multipart/form-data" @change="changeimg($event)"/>
                  <span class="limntspan">(已选择{{len}}张 最多可选择6张)</span>
                                            </form>    
        </div>
        <div class="footerright"><span v-touch:tap="postMessageimg">发布帖子</span></div>
      </div>

      </div>
  
 
  </div>
</template>

<script>


import {myMixin}    from '../mixin'
import {IP,ApicommPost }    from '../api'

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
      list:[],
      len:0,
      formdata:null,
      files:[],//图片列表
      option:{
        'coterieid':'',
        title:'',
        content:'',
        images:''
      },
      content:'',
      textitle:'',
     
     
        

       }
  },
  computed:{
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      vm.list = []
      
       vm.len = 0




     
     

      transition.next()
    },
    activate(transition) {
  
      transition.next()
    },
    deactivate(transition) {
     this.formData = null
      transition.next()
    }
  },
  methods:{
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
    postMessageimg(){
                            let vm = this
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
                     
                    vm.formData.append('coterieid',localStorage.getItem('zsuserid')) 
                    vm.formData.append('title',vm.textitle) 
                    vm.formData.append('content',vm.content) 
                     instance.post(ApicommPost, vm.formData).then((response) => {
                   
                          if (response.data.retcode == 1) {
                            
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

    },
    //图片上传
            // uploadImg(e){
          
            //  let vm =this 
            //  console.log(vm.list[0])    
            
            //   lrz(e.target.files[0])
            //       .then(function (rst) {
                    
                  
            //           var instance = vm.axios.create({
                    
                       
            //             headers: {'Content-Type':'multipart/form-data; boundary=----WebKitFormBoundary0lIZqBLj6cezDOPz',
            //               'mid':localStorage.getItem('zsmid'),
            //                'token' :localStorage.getItem('zstoken'),
            //               'userid': localStorage.getItem('zsuserid'),                   
            //               'ver' : 1.0,
            //              'sblx' : 3,
            //               'appid' : '4d029789cf1d4e0facee1da3391fd8b6',
            //               'sdkToken' :localStorage.getItem('zstoken'),
            //              'deviceid' :1}
            //           });
            //           // for (let i = 1; i <vm.list.length-1; i++) {
            //           //        rst.formData.append('title',vm.textitle) 
            //           //    }
                     
            //          rst.formData.append('coterieid',localStorage.getItem('zsuserid')) 
            //            rst.formData.append('title',vm.textitle) 
            //              rst.formData.append('content',vm.content) 
            //          instance.post(ApicommPost, rst.formData).then((response) => {
                   
            //               if (response.data.retcode == 1) {
            //                  // vm.slpersondata.portrait = response.data.data.path + response.data.data.filename
            //                  Indicator.close()
            //                  Toast({
            //                   message:'上传成功',
            //                   duration:500
            //                  })
            //               }
            //           }, (response) => {
            //                  Indicator.close()
            //               Toast({
            //                   message:'上传失败',
            //                   duration:500
            //                  })
            //           });
            //       })
                
            // },
    canclerate(){//取消
        window.history.go(-1)
    },
    //商品评价
      // saveMessage(){
      //                 let vm =this,
      //                   lengths = 0,
      //                   textlength = 0;
      //                   // vm.textitle = vm.textitle.replace(/\s/g, "")
      //                   // vm.content = vm.content.replace(/\s/g, "")
      //                   textlength = vm.textitle.length
      //                  lengths = vm.content.length
                       
      //                   if (lengths<15||lengths>100) {
      //                     Toast({message:'请检查正文字体个数'})
      //                     return 
      //                   }

      //                     if (textlength<3||textlength>15) {
      //                     Toast({message:'请检查标题字体个数'})
      //                     return 
      //                   }
      //                 Indicator.open("帖子发布中...")

      //                  vm.option.coterieid = localStorage.getItem('zsuserid')
      //                 vm.option.title = vm.textitle
      //                 vm.option.content = vm.content
      //                 console.log(vm.list[0])
      //                 vm.option.images = vm.list[0]
      //                 vm.axios.post(ApicommPost,vm.option).then((response)=>{
      //                   if (response.data.retcode == 1) {
      //                     Indicator.close()
      //                     Toast({message:"发帖成功"})

      //                        setTimeout(function(){
      //                           vm.$router.go({name:"myposts"})
      //                        },500)
      //                   }

      //                 },(response)=>{
      //                    Indicator.close()
      //                     Toast({message:"发帖失败"})
      //                 })
      //             },
   
    
    

  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/style.scss";
  @import '../assets/css/swiper.css' ;  

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
             .posttile{
              width: 100%;
              height: 10%;

              text-align: left;
              padding-left:px2rem(20);
              color:$color-zibai;
              @include font-dpr(15px);
                background:$color-deepblue;
                input{
                  width: 100%;
                  height: 100%;
                  background:transparent;
                  border:none;
                  color: inherit;


                }
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
               
                height: 15%;
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
