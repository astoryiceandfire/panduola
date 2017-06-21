<template>
  <div class="home">
      <div class="mywrapper" flex="main:center">
        <div class="main">
               
                  <!--  replybox   -->

                      <div class="replybox">
                        <input v-el:cinput @focus="getfocus" @blur='leavefocus'  type="text" name="comment" placeholder="快来评论一下吧~" v-model='comment'> <span v-touch:tap='sendcomment'>发送</span>
                        </div>
                   <!--    replybox      -->   
              <div id="wrapper" v-el:wrpone>
                  <div id="scroller">
                     <div class="header">
                       <div class="title">{{detaildata.title}}</div>
                       <div class="userbox" flex="dir:left cross:center" >
                       <template v-if='detaildata.mid!=0'>
                         <div class="userimg"><img :src="ip+detaildata.portrait"></div>
                         <span>作者：{{detaildata.nickname}}</span>
                         <span class="user-level" :style="{background:`url('${ip + detaildata.levelImage}')`}" v-text="detaildata.level"></span>
                          <span class="user-title" v-text="detaildata.titleName"></span>
                         
                       </template>
                       <template v-if='detaildata.mid==0'>
                          <div class="userimg"><img src="../../assets/images/ic_launcher.png"></div>
                         <span class="username">作者：潘多拉</span>
                         <span class="posttitle">{{detaildata.posttime}} </span>
                       </template>
                         
                        
                       </div>
                     </div>
                     
                      <div class="contentbox border1px setbottomborder" >

                       {{{detaildata.content}}}
                     </div>
                     <div class="contentimg" flex="dir:top cross:top">
                       <div class="imgitem" v-for='image in detaildata.images'>
                          <img :src="ip + image">
                        
                          </div>
                     </div>
                     <div class="commlistbox" >
                       <div class="commlistheader" flex="main:justify cross:center">
                         <div class="header-left">最新评论</div>
                         <div class="header-right">
                           <!-- <span @click.stop='envypost(lists)'><i class="iconfont icon-down" :class="[lists.isenvy==1 ?'lightli':'']"></i> <em v-text="lists.envycount"></em></span> -->
                           <span class="thumbs" v-touch:tap="checkItem(detaildata)">
                             <i class="fa fa-thumbs-o-up isenvy" :class="[detaildata.isenvy==1?'isenvy':'']" aria-hidden="true"></i>
                             {{detaildata.envycount}}
                           </span>
                         用户评论（{{totalcount}}条评论）</div>
                       </div>
                       <div v-for="item in commlist" class="commlistitem border1px setbottomborder" flex="dir:left" >
                         <div class="commimg"><img :src="ip + item.portrait" alt="" ></div>
                         <div class="commain">
                           <div class="commusername" flex="cross:center">
                             <span class="username">{{item.nickname}}</span>
                              <span class="user-level" :style="{background:`url('${ip + item.levelImage}')`}" v-text="item.level"></span>
                              <span class="user-title" v-text="item.titleName"></span>
                             <span class="commtime">{{item.addtime }}</span>
                             <span class="commtime" v-text="$index +1 + 'F'"></span>
                           </div>
                           <div class="commcentent">{{item.content}}</div>
                         </div>
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
import {IP,ApiPostInfo,Apiqcomment,ApireplyPost,ApienvyPost}    from '../../api'

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
        scrollinance:null,
       
        commlist:[],//评论列表
        id:0, 
       
        totalcount:0,//总共多少条   
        comment:'', 
        detaildata: {},    // 数据
            page:1,
            total:0,
            searchoption : {      // 查询参数
                  postid:"",
                
                  rows:10,
              },

        }

  },

  computed:{
   
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
      vm.id = vm.$route.params.id
      vm.scrollinance =  vm.addiscroll("wrpone",vm.queryCommentLis);
      vm.GetPostDetali()//加载详情
      vm.queryCommentLis()//加载评论
      vm.page = 1

     

      transition.next()
    },
    activate(transition) {
  
      transition.next()
    },
    deactivate(transition) {
     this.detaildata = {}
     this.commlist = []

      transition.next()
    }
  },
  methods:{
    checkItem(item){//点赞帖子
     
      let vm =this

          let reqdata={
            postid:item.id,
            isenvy:item.isenvy==1?0:1

          }
          vm.axios.post(ApienvyPost,reqdata).then((response)=>{
            if (response.data.retcode==1) {
              if (reqdata.isenvy==0) {
                item.isenvy=0
                 item.envycount-=1
              }else{
                item.isenvy=1
                item.envycount+=1
              }

              Toast({
                message:response.data.retmsg,
                duration:500
              })
              

            }
          },(response)=>{})

          

    },
    
  //评论框

    //发送评论
    sendcomment(){
      let vm=this
      let id = vm.id
      let content= vm.trim(vm.comment)
     
      if (content=='') {
        Toast({
          message:'评论不能为空'
        })
        return 
      }
      Indicator.open('评论发送中...')
      vm.axios.post(ApireplyPost,{'postid':id,'content':content}).then((response)=>{
        if (response.data.retcode==1) {
          vm.comment=""
          Indicator.close()

          Toast({
            message:"发表成功"
          })
           vm.commlist=[]
          vm.queryCommentLis()

        }
         Indicator.close()

      },(response)=>{
         Indicator.close()
      })

    },
    //评论框得到焦点
      getfocus(){
            let vm =this
           
         },
    //评论框失去焦点
      leavefocus(){
            let vm =this
            vm.$els.cinput.blur()
           
      },
      trim(str){ 
        return str.replace(/(^\s*)|(\s*$)/g, ""); 
    },
  //评论框上
    upDateScroll(){
      let vm =this
     
      if (vm.scrollinance) {

       vm.scrollinance.refresh()
      }else{
        vm.scrollinance =  vm.addiscroll("wrpone",vm.queryCommentLis);

      }   
    },
    // 获取数据
    GetPostDetali() {
      let vm = this
      vm.axios.post(ApiPostInfo,{ id: vm.id })
      .then((response) => {
        if(response.data.retcode == 1){
            let jsonData = response.data.data
            let html = jsonData.content
          

            try{
               html = html.split('<body>')[1]
               html = html.split('</body>')[0]
               jsonData.content = html
            }catch(err){
               //在此处理错误
            }
            
            vm.detaildata = jsonData

            // vm.queryCommentLis()
        }
      }, (response) => {
          console.log(response)
      })
    },
        //查询主贴回复
    queryCommentLis(){
      let vm =this
     
      vm.searchoption.postid=vm.id;
      vm.searchoption.page = vm.page
                    

        vm.axios.post(Apiqcomment,vm.searchoption).then((response)=>{
        if (response.data.retcode==1) {
            vm.totalcount = response.data.data.records
          vm.commlist = vm.commlist.concat(response.data.data.rows) 
          vm.total = response.data.data.total
                    vm.$nextTick(function(){
                                 
                                   vm.upDateScroll()
                                })
        
          
             }

            },(response)=>{})

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
                width: 95%;
                 // replybox
                      .replybox{
                            position:fixed;
                            z-index: 2;
                            bottom:0px;
                            right:20%;
                            width: 60%;
                            transition: all .3s ease-in .1s;
                            background-color:transparent ;
                            height: px2rem(60);
                            line-height: px2rem(60);
                            text-align: center;
                          input{
                            width: 80%;
                            background:#3A3941;
                            height: px2rem(55);
                            border:none;
                            color: #fff;
                          }
                          span{
                            display: inline-block;
                            color: #ffffff;
                            width: 20%;
                            height: px2rem(55);
                            line-height: px2rem(55);
                            background:#f96731;
                            text-align: center;
                            margin-left:px2rem(-8);
                            
                            border-radius:0 px2rem(5) px2rem(5) 0;
                          }

                  }
                      // replybox
              
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
                     color:white;
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
                        .title{
                            @include font-dpr(20px);
                            // height: px2rem(60);
                            line-height: px2rem(60);
                            color:#8AB9FF;
                            letter-spacing: px2rem(2);
                        }
                        .userbox{
                          color:$color-cheapccc;
                          @include font-dpr(11px);
                          .userimg{
                            width:px2rem(30);
                            height: px2rem(30);
                            background:#cccccc;
                            border-radius:50%;
                          }
                          .user-level{
                            display: inline-block;
                            width: px2rem(55);
                            height: px2rem(25);
                            background-size: 100% 100% !important;
                            background-repeat: no-repeat !important;
                            color: #fff;
                            text-align: right;
                            padding-right: px2rem(10);
                            background-color:#66C960;
                            border-radius:px2rem(5);
                          }
                          .user-title{
                                display: inline-block;
                                padding: px2rem(4) px2rem(5);
                                background: #f96731;
                                color:#fff;
                                border-radius:px2rem(4);
                                @include font-dpr(10px);
                              }
                          .username{
                            padding:0 px2rem(10);
                          }
                        }


                      }

                      .contentbox{
                         padding:px2rem(15) 0;
                          background:#0F1219;
                          color:$color-ccc;

                      }
                      .contentimg{
                          background:#0F1219;
                          padding:0 30px;
                          img{
                            max-width: 80%;
                          }
                      }

                      .commlistbox{
                        .commlistheader{
                              height: px2rem(60);
                              @include font-dpr(12px);
                              border-bottom:1px solid $color-deeporange;
                              letter-spacing: px2rem(1);
                              .header-left{
                                color:$color-deeporange;
                                 @include font-dpr(12px);
                              }
                              .header-right{
                                color:$color-cheapccc;
                                 @include font-dpr(12px);
                                 .thumbs{
                                  .isenvy{
                                      color:$color-deeporange;
                                  }

                                 }
                              }

                          }
                          .commlistitem{
                            padding:px2rem(10);
                            .commimg{
                              width: px2rem(40);
                              height: px2rem(40);
                              margin-right:px2rem(10);
                              background:#ccc;
                              border-radius:50%;

                            }
                            .commain{
                              .commusername{
                                .username{
                                    color:#8AB9FF;
                                    @include font-dpr(12px);
                                }
                                .user-level{
                                   display: inline-block;
                                    width: px2rem(55);
                                    height: px2rem(25);

                                    background-size: 100% 100% !important;
                                    background-repeat: no-repeat !important;
                                    color: #fff;
                                    text-align: right;
                                    padding-right: px2rem(10);
                                    background-color:#66C960;
                                    border-radius:px2rem(5);
                                }
                                .user-title{
                                   display: inline-block;
                                    padding: px2rem(4) px2rem(5);
                                    background: #f96731;
                                    color:#fff;
                                    border-radius:px2rem(4);
                                    @include font-dpr(10px);
                                }
                                .commtime{
                                  color:$color-cheapccc;
                                   @include font-dpr(12px);
                                   padding-left:px2rem(10);
                                }
                              }
                              .commcentent{
                                padding:0 px2rem(10);
                                @include font-dpr(12px);
                                color:$color-white;
                                letter-spacing: px2rem(1);

                              }

                            }

                          }
                      }
                    }
            }
                       

    
     }
  }
  
</style>
