
<template>
	<div class="pay">
		<header-box title="购买结果"></header-box>
	</div>
		
		
</template>
<script>
import HeaderBox from './headerl.vue';
// import { savepayend} from '../../vuex/actions'
import {IP,ApiqPayResult,appkey,appid} from '../api'
// import {getstoretype} from '../../vuex/getters'

import {Toast,Indicator} from 'mint-ui'



	export default{
		name: 'querypayresult',
		components: {
			HeaderBox
		},
		 vuex: {
          
          getters: {
           
            // type:getstoretype
          
          },
          actions:{
           
          }
      },
		route:{
			 data(transition) {
              let vm = this 
              Indicator.open("结果查询中")
             vm.Time = setInterval(function(){
              	vm.queryresult()
              },2000)

		             setTimeout(function(){
		             	clearInterval(vm.Time)
		             	Indicator.close()
		             	Toast({
		             		message:"订单处理未通过",
		             		duration:1000,
		             	})
		             },60000)
           
              transition.next()
            },
		},
		data(){
			return{
				Time:{},
				
				Resultoption:{//支付结果查询参数
					type:"",
					ordercode:"",
					mobile:"",
					userId:""

				}
			}
		},
		methods:{
			//获取sdk传来的token值
					 queryString(name) {
						var result = location.href.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
					     if(result == null || result.length < 1){
					         return "";
					     }
					     return result[1];
					},
					queryresult(){

						let vm =this
						

						// vm.Resultoption.type = localStorage.getItem("type")||2;
						vm.Resultoption.type = vm.queryString('showtype')
						// console.log(vm.type,vm.Resultoption.type,)
						vm.Resultoption.ordercode = vm.queryString('ordercode')
						vm.Resultoption.mobile = vm.queryString('mobile')
						vm.Resultoption.userId = vm.queryString('userId')
					

								vm.axios.post(ApiqPayResult,vm.Resultoption).then((response)=>{
									
									if (response.data.retcode == 1) {

										Indicator.close()

										Toast({
										message:"购买成功",
										duration:1000})
										clearInterval(vm.Time)

									setTimeout(function(){
											vm.$router.replace({
												name:'myorders',
												params:{id:2 },
												
											})
											},1200)

									



									}else if(response.data.retcode ==2){
										Indicator.open("支付中")

									 }
									 //else{
									// 	Toast({
									// 	message:"支付失败",
									// 	duration:1000})
									// 	Indicator.close()
									// 	clearInterval(vm.Time)
									// 	// setTimeout(function(){
									// 	// 	vm.$router.replace({
									// 	// 		name:'Home',
									// 	// 		params:{id:2 },
												
									// 	// 	})
									// 	// 	},1200)

									// }




								},(response)=>{})
					}
		}

	}
				
</script>

<style lang="scss" scoped>
@import "../assets/scss/style.scss";
.pay{
	background:#080A0F;
	// color:red;
}

	
</style>