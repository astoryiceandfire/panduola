<template>
  <div class="home">
      <div class="srapper">
        <header class="header" flex="dir:left main:justify cross:center"><span>发布晒单</span><span v-touch:tap='canclerate' class="cancle">取消</span>
        </header>
        <div class="posttile">
          <h1 class="shopname" flex="cross:center main:justify">
                <span>商品：{{getitem.shopname}}</span><span>第{{getitem.shopperiods}}期</span>
                </h1>
        </div>
         <textarea v-model="content" class=" textarearate border1px setarrborder" placeholder="请写下对商品的感受(15-1000字)"></textarea>
      <div class="footer" flex="main:justify cross:center">
        <div class="footerleft"></div>
        <div class="footerright"><span v-touch:tap="saveMessage">发布晒单</span></div>
      </div>

      </div>
  
 
  </div>
</template>

<script>


import {myMixin}    from '../../mixin'
import {IP,ApiaddShowAward }    from '../../api'

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
      option:{
        shopid:0,
        title:'',
        imgage:'',
        content:'',
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
      vm.getitem = vm.$route.query
      console.log(vm.getitem)





     
     

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
    //商品评价
      saveMessage(){
                      let vm =this,
                        lengths = 0,
                        textlength = 0;
                        // vm.textitle = vm.textitle.replace(/\s/g, "")
                        // vm.content = vm.content.replace(/\s/g, "")
                      
                       lengths = vm.content.length
                       
                        if (lengths<15||lengths>100) {
                          Toast({message:'请检查正文字体个数'})
                          return 
                        }

                      
                      Indicator.open("晒单发布中...")

                      vm.option.shopid = vm.getitem.shopid  
                      vm.option.title = vm.getitem.shopname
                      vm.option.content = vm.content
                      vm.axios.post(ApiaddShowAward,vm.option).then((response)=>{
                        if (response.data.retcode == 1) {
                          Indicator.close()
                          Toast({message:"晒单成功"})

                             setTimeout(function(){
                                vm.$router.go({name:"myposts"})
                             },500)
                        }

                      },(response)=>{
                         Indicator.close()
                          Toast({message:"晒单失败"})
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
             .posttile{
              width: 100%;
              height: 10%;

              text-align: left;
              padding:0 px2rem(20);
              color:$color-zibai;
              @include font-dpr(15px);
                background:$color-deepblue;
                .shopname{
                    width: 100%;
                    // height: px2rem(60);
                    height: 100%;

                    text-align: left;
                    // padding-left:px2rem(20);
                    color:$color-zibai;
                    @include font-dpr(15px);
                      background:$color-deepblue;
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
