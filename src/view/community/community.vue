<template>
  <div class="home">
      <div class="srapper" flex="dir:left">
      <!-- 左边wraper -->
            <div class="writem">
              <div id="wrapper" v-el:wrpone>
                  <div id="scroller">
                      <div class="home_up">
                        <img :src="ip+banner.img">
                       
                      </div>
                      <div class="home_middle" flex="cross:center">

                          <div v-touch:tap="enterlist($index)" v-for="item in aclist" class="mi_item" flex="dir:top cross:center">
                             <i :class=['fa',item.imgi,'fa-2x'] aria-hidden="true"></i> 
                              <span>{{item.title}}</span>
                          </div>
                  
                          
                      </div>
                      <div class="home_down">
                            <mt-cell title="最新公告" >
                                  <i slot="icon" class="fa fa-volume-up" aria-hidden="true"></i>
                                  <!-- <span>更多 <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                                    </span> -->
                            </mt-cell>
                            <template v-for="item in adverlist">
                                 <div class="do_item" flex="cross:center">
                                 <div class="do_item_top" flex="dir:top cross:center"> 
                                   <span class="do_icon" flex="cross:center main:center">
                                      <!-- <i slot="icon" class="fa fa-star-o fa-2x" aria-hidden="true"></i> -->
                                      <img :src="ip + item.icon">
                                      </span>
                                   <span class="acspan">{{item.title}}</span>
                                   </div>
                                 <p class="adv_p" v-html="item.content"></p>
                            </div>
                              
                            </template>

                           
                            
                             

                        
                      </div>
                    
                  </div>
              </div> 
            </div>
            <!-- 左边wraper -->
            
           <!--  右面的滚动 -->
           <div class="writem1">
             <div class="postwrap">
                 <div class="postmesagee" v-touch:tap="enterPostMessage">
                      <img src="../../assets/images/post.png">
                    </div>
             </div>
             
              <div id="wrapper1" v-el:wrptwo>
                <div id="scroller1">
            
              <!--   <section class="wr_bottom">
                  -->
                  <div  v-for="item in lists" class="notes" flex="dir:top">

                  <div class="header">
                    <span v-if="item.mid==0" class="mark" >官方</span><span class="note-name">{{item.title}} </span>
                  </div>

                  <div class="content" v-touch:tap="enterPostDetail(item)">
                    <p>{{{item.content.slice(0,item.content.indexOf('\<\/p\>')+4)}}}</p>
                  </div>

                  <div class="footer" flex="main:justify">
                    <div class="foot-left">
                    <span class="type-mark">{{marks[item.coterieid]}}</span>
                        <span v-if="item.nickname">用户{{item.nickname}}</span>
                        <span class="user-mark"> {{item.posttime*1000|dateFormat 'yyyy-MM-dd hh:mm:ss'}}</span>
                          </div>
                    <div class="foot-right">
                      <span class="comment">
                          <i class="fa fa-thumbs-o-up corange" aria-hidden="true"></i>{{item.envycount}}
                              </span>
                              <span class="comment"><i class="fa fa-comments corange" aria-hidden="true"></i>
                                {{item.commentcount}}</span>
                    </div>
                  </div>

              

      </div>
  
 
  </div>
</template>

<script>

import Swiper    from '../../assets/js/swiper'
import {myMixin}    from '../../mixin'
import {IP,ApiAllCoterie,ApiAdvertList,ApiPostList}    from '../../api'
import counter from "../../components/counter.vue";
import { Indicator,Toast } from 'mint-ui';
export default {
  components: {
        counter
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
           aclist:[{title:"热门帖子",imgi:"fa-comments-o"},
                   {title:"用户晒单",imgi:"fa-picture-o"},
                   {title:"与我相关",imgi:"fa-commenting-o"}],
            slideList:{A:{img:""}},
            adverlist:[],//公告
            ip:IP,
            insscroll:null,
            marks:['','#热门话题#','#活动交流#','#游戏交流#','#硬件交流#','#电台交流#','#周边社区交流#'],
            insscrolltwo:null,
            lists : [],    // 数据
            page:1,
            total:0,
            searchoption : {      // 查询参数
                   page : 1,   // 查询页数
                  total : 0,   // 查询总页数
                   rows : 5,  // 查询显示的数目
                    hid : 0,  
                  istop : '',
                 isbest : ''
              },
          
            banner:{}

       }
  },
  computed:{
   
  },
  ready(){


 
  },
  route: {
    data(transition) {
      let vm = this
       vm.getBanner()//顶部图片
       vm.getAdverList()//公告信息
       vm.Getdata()//查询主贴
      vm.insscroll = vm.addiscroll("wrpone")       
      vm.insscrolltwo = vm.addiscroll("wrptwo",vm.Getdata)

      Indicator.open("加载中...")
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
    enterPostMessage(){//发布帖子
      this.$router.go({name:'postmessage'})

    },
    enterPostDetail(item){//进入详情
          this.$router.go({name:"postdetail",params:{id:item.id}})
    },
    getBanner(){//获取图片
      let vm = this
      vm.axios.post(ApiAllCoterie,{type:3}).then((response)=>{
        if (response.data.retcode == 1) {
            vm.banner = response.data.data.banner
        }
      },(response)=>{})
    },

      Getdata(){//查询主贴
        let vm = this
        vm.searchoption.page = vm.page
        vm.searchoption.total = vm.total
        vm.axios.post(ApiPostList,vm.searchoption).then((response)=>{
          if (response.data.retcode  == 1) {
            vm.total = response.data.data.page.total
            Indicator.close()
          
            vm.lists = vm.lists.concat(response.data.data.page.rows)
                      vm.$nextTick(function(){
                                 
                                   vm.insscrolltwo.refresh()
                                })

          }
        },(response)=>{})

      },
    //公告信息
           getAdverList(){
               let vm =this
                  vm.axios.post(ApiAdvertList,{showArea:3}).then((response)=>{
                          if(response.data.retcode == 1) {
                                let jsonData = response.data.data.adverts;
                                vm.adverlist = jsonData
                                vm.$nextTick(function(){
                                 
                                   vm.insscroll.refresh()
                                })
                                

                        
                        }
                  }).catch((response)=>{

                  })

           },

  


          //进入热门帖子 用户晒单 与我相关界面
          enterlist(index){
            let vm = this
           if (index==0) {
                vm.$router.go({
                name:"hottopic",
                params:{id:0}
              
              })
            
           }else if(index==1){
                vm.$router.go({
                name:"shareorder"
              
              })
           }else if(index==2){
            
              vm.$router.go({
                name:"myposts"
              
              })
           }


           


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
            // width: px2rem(780);
            // height: 100px;
             position:absolute;
             top: 0;
             left: px2rem(70);
             bottom:px2rem(60);
             right: 0;
              .writem{
                width:40%;
                position:relative;
               

               

              }
              .writem1{
                width: 60%;
                 position:relative;
                 .postwrap{

                  position:absolute;
                  z-index: 100;
                  right: px2rem(20);
                  bottom:px2rem(20);
                  height: px2rem(50);
                  .postmesagee{
                    width: px2rem(50);
                    height: px2rem(50);
                  }
                 }
                 
               
                 

              }
                #wrapper,#wrapper1 {
                  position: absolute;
                  z-index: 1;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  
                  overflow: hidden;
                    background:$color-primary;
                  
                }

               
                #scroller{
                  background:$color-primary;
                  padding:px2rem(12);
                  padding-left:0px;
                    .home_up{
                       height: px2rem(150);
                       background:$color-deepblue;

                    }
                    .home_middle{
                      height: px2rem(80);
                      background:$color-deepblue;
                       margin-top: px2rem(10);
                        -webkit-justify-content: space-around; 
                        justify-content: space-around;


                      i{
                        color: $color-orange;
                      }
                      span{
                        color: $color-white;
                      }
                     
                       
                     

                    }
                    .home_down{
                          a{
                            background:$color-primary;
                            color:$color-white;
                            
                            @include font-dpr(14px);
                            i{
                              color:$color-orange;
                            }
                          
                          }
                        .do_item{
                          margin-bottom: px2rem(10);
                          width: 100%;

                            .do_item_top{
                                    background:$color-primary;
                                     height: px2rem(90);//why???
                                     width: 30%;//why???

                                     webkit-justify-content: space-around;
                                     justify-content: space-around;
                                    
                                    

                                     .do_icon{
                                      display: inline-block;
                                    width: px2rem(45);
                                    height: px2rem(45);
                                    background:#ccc;
                                    border-radius:50%;
                                  }
                                  span.acspan{
                                    white-space: nowrap;
                                    color:$color-white;
                                  }

                            }
                            p{
                              height: px2rem(90);
                              max-height: px2rem(90);
                              // max-width: px2rem(500);
                              width:70%;
                              padding:px2rem(10) px2rem(10);
                              background:$color-deepblue;
                              color: $color-cheapccc;
                              @include font-dpr(10px);
                              overflow: hidden;

                            }

                            

                        }
                    }
                  
                }
                #scroller1{
                  //最新揭晓
                    background:$color-primary;
                    padding:px2rem(12);
                    padding-left:0px;
                  .notes{
                    width:100%;
                    padding:px2rem(10);
                    background:#0F1219;
                    color:$color-cheapccc;
                    .header{
                      .mark{
                        display: inline-block;
                        height: px2rem(22);
                        line-height: px2rem(22);
                        padding:0 px2rem(5);
                        @include font-dpr(11px);
                        border-radius:5px;
                        color:#000000;
                        background:$color-deeporange;

                      }
                      .note-name{
                       
                        @include font-dpr(14px);
                        color:$color-zibai;
                        font-weight: bold;
                        letter-spacing: px2rem(1);
                       padding-left: px2rem(10);
                      }
                      
                    }
                    .content{
                      p{
                        letter-spacing: px2rem(2);
                        line-height: px2rem(22);
                        @include font-dpr(11px);
                        padding:px2rem(10) 0;
                        color:#787B82;

                      }

                    }
                    .footer{
                      background:#181C27;
                      height: px2rem(40);
                      line-height: px2rem(40);
                      .foot-left{
                        .type-mark{
                          color:#7791C4;
                          @include font-dpr(10px);
                        }
                        .user-mark{
                          @include font-dpr(10px);
                          padding-left:px2rem(10);
                        }
                      }
                      .foot-right{
                        .comment{
                         padding-right:px2rem(12);
                        }
                        .corange{
                          color:$color-deeporange;
                          @include font-dpr(14px);
                        }

                      }

                    }
                  }
                   
                  
                         
                  
                }



         }
    
     
  }
  
</style>
