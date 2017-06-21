<template>
  <div class="home">
      <div class="mywrapper" flex="main:center">
        <div class="main">
               <div class="posttap" flex="main:center cross:center">
                 <div v-for="item in titlelist" v-touch:tap="selectTitle($index)" class="tapitem" :class="[$index==activeindex?'tapitem-active':'']">{{item.name}}</div>
               
               </div>
               <div class="nodata" v-if="shownodata" flex="main:center cross:center">
                 <div class="content">
                   <span>您还没有发不过帖子</span>
                 </div>
               </div>

              <div id="wrapper" v-el:wrpone>
                  <div id="scroller">
                      <template v-if="activeindex==1">
                          <shorder-item :lists='lists'></shorder-item>
                      </template>

                       <template v-if="activeindex==0">  
                          <!-- item-->                      
                      <div class="collitem border1px setbottomborder" flex="dir:top" v-for="item in lists">
                            <div class="header">
                                <span v-if="item.mid==0" class="mark" >官方</span><span class="note-name">{{item.title}} </span>
                              </div>

                              <div class="content">
                                <p v-touch:tap="centerPostDetail(item)">{{{item.content.slice(0,item.content.indexOf('\<\/p\>')+4)}}}</p>
                              </div>

                              <div class="footer" flex="main:justify">
                                <div class="foot-left">
                               <!--  <span class="type-mark">{{marks[item.coterieid]}}</span> -->
                               <!--  <span class="type-mark">热门话题</span> -->
                                    <span class="user-name" v-if="item.nickname">  用户: {{item.nickname}}</span>
                                    <span v-if="item.level">(LV{{item.level}})</span>
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
                         <!-- item--> 
                  </template>
                  </div>
                  </div>
        </div>

     </div>
    </div>
</template>

<script>


import {myMixin}    from '../../mixin'
import {IP,ApiPostList,ApiAllShowData}    from '../../api'
import ShorderItem from '../../components/shorderitem'
import {Toast,Indicator} from 'mint-ui'

export default {
  components: {
      ShorderItem
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
        shownodata:false,//是否显示提示没有数据
        scrollinance:null,
        titlelist:[{"name":"我的帖子",tip:0},{"name":"我的晒单",tip:1}],
      
        activeindex:"0",
        lists : [],    // 数据
            page:1,
            total:1,
            searchoption : {      // 查询参数
                   page : 1,   // 查询页数
                  // total : 1,   // 查询总页数
                   rows : 5,  // 查询显示的数目
                    hid : 0,  
                 //  istop : '',
                 // isbest : '',
                 // coterieid:1,
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
      vm.scrollinance =  vm.addiscroll("wrpone",vm.Getdata);
      Indicator.open("加载中...")
      vm.Getdata()

      transition.next()
    },
    activate(transition) {
  
      transition.next()
    },
    deactivate(transition) {
     this.lists = []

      transition.next()
    }
  },
  methods:{
    
    
    centerPostDetail(item){//进入帖子详情
     
      this.$router.go({name:"postdetail",params:{id:item.id}})

    },
    selectTitle(index){
      let vm = this
      this.activeindex = index
      this.page = 1
      this.total = 1
      this.shownodata = false
      this.scrollinance = null
      this.lists = []
      Indicator.open('加载中...')
      if (vm.activeindex==0) {
        vm.Getdata()//查看我的帖子
      }else if(vm.activeindex==1){
          vm.GetMydata()//查看我的晒单
      }
     
    },
  
    upDateScroll(){
      let vm =this
     
      if (vm.scrollinance) {
         vm.scrollinance.refresh()
      }else{
          if (vm.activeindex==0) {
               vm.scrollinance =  vm.addiscroll("wrpone",vm.Getdata);
          }else if(vm.activeindex==1){
             vm.scrollinance =  vm.addiscroll("wrpone",vm.GetMydata);
          }
         
      }

        
        
     
    },
      Getdata(){//查询我的帖子
        let vm = this
        vm.searchoption.page = vm.page
        // vm.searchoption.total = vm.total
        vm.searchoption.hid=localStorage.getItem('zsmid')
        vm.axios.post(ApiPostList,vm.searchoption).then((response)=>{
          if (response.data.retcode  == 1) {

            vm.total = response.data.data.page.total         
            vm.lists = vm.lists.concat(response.data.data.page.rows)
            Indicator.close()
                if (vm.lists.length>0) {
                            vm.$nextTick(function(){                           
                                       vm.upDateScroll()
                                    })
                }else{
                  vm.shownodata = true
                }
                     

          }
           Indicator.close()
        },(response)=>{

        })

      },
           GetMydata(){//查询我的晒单
        let vm = this
        vm.searchoption.page = vm.page
        // vm.searchoption.total = vm.total
        vm.searchoption.hid=localStorage.getItem('zsmid')
        vm.axios.post(ApiAllShowData,vm.searchoption).then((response)=>{
          if (response.data.retcode  == 1) {
           
             vm.total = response.data.data.total
          
            vm.lists = vm.lists.concat(response.data.data.rows)
            Indicator.close()
             
                if (vm.lists.length>0) {

                            vm.$nextTick(function(){                           
                                       vm.upDateScroll()
                                    })
                }else{
                  vm.shownodata = true
                }
                     

          }
           Indicator.close()
        },(response)=>{

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
                width: 75%;
                .nodata{
                    width: 100%;
                    height: 100%;
                    z-index: 100;
                   
                    background:transparent;
                    .content{
                      color:$color-white;
                      @include font-dpr(16px);
                      letter-spacing: px2rem(1);
                    }
                }
                .posttap{
                  height: px2rem(70);
                  width: 100%;
                  color: $color-cheapccc;
                 
                   position:absolute;
                   z-index: 100;
                  .tapitem{
                    height: px2rem(40);
                    line-height: px2rem(40);
                    width: px2rem(150);
                      // background:#181C27;
                      background:#10131A;
                      text-align: center;
                      &.tapitem-active{
                           background:#181C27;
                           color:$color-deeporange;
                      }

                  }

                }
              
               #wrapper{
                  position: absolute;
                  z-index: 1;
                  top: px2rem(70);
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


                      .headercenter{
                        width: 100%;
                        height: px2rem(50);
                        line-height: px2rem(50);
                        text-align: center;
                        letter-spacing: px2rem(2);
                         @include font-dpr(14px);
                         background:transparent;
                         color:white;
                      }
                     
                      .collitem{
                         padding:px2rem(15);
                          background:#0F1219;
                          color:#ccc;
                          // css
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
                        
                        .user-name{
                          padding:0 px2rem(10);
                          padding-right:0;
                          @include font-dpr(10px);
                          letter-spacing: px2rem(1);
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

                         //css
                          

                      }
                    }
            }
                       

    
     }
  }
  
</style>
