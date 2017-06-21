var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
 //   API_URLP : '"http://testsdkapi.zeustel.com"',//测试服
 // API_URLPAY : '"http://testjfapi.zeustel.com"',//测试服
 // appid : '"d7547a1d89bf4c608352c6990edf0b5b"',//测试服
 //  API_IP  : '"http://115.29.5.34:8989/"'

})
