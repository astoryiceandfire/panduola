import './assets/css/reset.css'       //样式重置
// import './assets/css/font-awesome.css'   //iconfont字体

import './assets/js/flexible.js'     //flexible
require('./assets/upload/lrz.bundle.js')


import Vue from 'vue'
import AppVue from './App'
import VueRouter    from 'vue-router'
import axios from 'axios'
import VueTouch     from 'vue-touch'
import VueValidator  from 'vue-validator'
import VueResource  from 'vue-resource'
import RouterMap    from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/scss/common.scss'    //公用样式
import 'flex.css'
import { timeToNow, jsonFormat,dateFormat ,numberinteger,xtrim} from './filters';
import { appkey,appid} from './api'
var querystring = require('querystring');

const App = Vue.extend(AppVue)
Vue.use(VueValidator)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueTouch)
Vue.use(MintUI)
Vue.filter('timeToNow', timeToNow);
Vue.filter('dateFormat', dateFormat);
Vue.filter('numberinteger', numberinteger);
Vue.filter('xtrim', xtrim);

//获取sdk传来的token值
function queryString(name) {
	var result = location.href.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
     if(result == null || result.length < 1){
         return "";
     }
     return result[1];
}


axios.interceptors.request.use(function(config){
       var mid = localStorage.getItem('zsmid') || ""
    var token = localStorage.getItem('zstoken') || ""
    var userid = localStorage.getItem('zsuserid') || ""
    var sdktoken = localStorage.getItem('zssdktoken')|| ""
    var sblx = localStorage.getItem('zssblx')||1
    var deviceid = localStorage.getItem('zsdeviceid')||1
   var mobile = localStorage.getItem('zsmobile')||666666


if (config.method == 'get') {
     
                  config.headers['mid'] = mid
                  config.headers['token'] = token
                  config.headers['userid'] = userid
                  config.emulateJSON = true
                  config.headers['ver'] = 1.0
                  config.headers['sblx'] = sblx
                  config.headers['appid'] = '4d029789cf1d4e0facee1da3391fd8b6'
                  config.headers['sdkToken'] = sdktoken
                  config.headers['deviceid']= deviceid
                    config.headers['mobile']= mobile
               
}else{


      if (config.data.iscross) {
              delete config.data.iscross
             

          }else{ 
            
                  config.headers['mid'] = mid
                  config.headers['token'] = token
                  config.headers['userid'] = userid
                  config.emulateJSON = true
                  config.headers['ver'] = 1.0
                  config.headers['sblx'] = sblx
                  config.headers['appid'] = '4d029789cf1d4e0facee1da3391fd8b6'
                  config.headers['sdkToken'] = sdktoken
                  config.headers['deviceid']= deviceid
                   config.headers['mobile']= mobile


          }
          
        
          config.data = querystring.stringify(config.data)

}
   

     

  return config
})
// axios.interceptors.response.use(function(response){
//        if( response.headers('token') ) {
//       auth.actions.setToken( response.headers('token') );
//     }
//     if( response.data.retcode == 401 ) {
//       if( response.data.retmsg == '没有操作权限,请先登陆' ) {
//         console.log('RETRY', response)
//         localStorage.removeItem('mid')
//         localStorage.removeItem('token')
//       }
//       else {
//         console.log('Whoops, an unknown error occured.');
//       }
//     }

//   return response
// })

Vue.prototype.axios = axios


/* eslint-disable no-new */

// new Vue({
//   el: 'body',
//   components: { App }
// })

const router = new VueRouter({
    hashbang: true,
    history: false,
     saveScrollPosition: true,
    transitionOnLoad: true,
    linkActiveClass: 'link-active'
});


RouterMap(router)
router.start(App, '#app')
