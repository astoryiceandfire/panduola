<template>
	<!-- <div v-if='!isdevelopment' style='margin-left:200px;padding-top:100px'>
			<input type="text" v-model="msg">
			<input type="text" v-model="paw">
			<span v-touch:tap='numberLogin' style='color:red;background:#ffffff'>登陆</span>
	</div> -->

<div style="display:none"></div>
</template>
<script>
import {Toast,Indicator} from 'mint-ui';
import {ApiTokenLogin,ApiPostLogin,ApiappStart} from '../api'
import md5 from 'md5'
export default {

		data: function() {
			return {
				msg: "15690868587",
				paw: "1234567",	
				isdevelopment:true,			
			
			}
		},
	
		route:{
			data(transition){
				
				
				if (process.env.NODE_ENV =='development') {
					 this.devGetToken()
					// this.numberLogin()
					//this.isdevelopment=false
					
					
				}else{
					// Indicator.open("登陆中...")
					this.gettoken()
				}
				
				

				

 				transition.next()
			},
			activate(transition) {
				transition.next()
			 },
		    deactivate(transition) {
		     
		      transition.next()
		    }
		},
		ready() {
			
		},
		components: {
		
		},
		methods: {
			 GetRequest() {
						var url = location.href; //获取url中"?"符后的字串
						
						if (url.indexOf('token')==-1) {
							Toast({
							  message: '链接有误',
							  duration: 500
							});
							 return 
							 //url = '?mobile=15915492120&token=71fd69c1352dae203d3d51ea11b8f501&sblx=1&deviceId=863732035519200'
						}else{
						
						}

						  Indicator.open("登录中...")

						url = url.substring(url.lastIndexOf("?"),url.length)
						var theRequest = {};
						if (url.indexOf("?") != -1) {
						var str = url.substr(1);
						var strs = str.split("&");
						for(var i = 0; i < strs.length; i ++) {
						theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
							}
						}
						
						return theRequest
				} ,
				devGetToken(data){
						var u = navigator.userAgent;
					let vm =this;						
					 let datas  = {
					 		//token:'e7a51c1e-599a-4fa2-adb7-20587153b6d2',
					 		token:'9ffc45d9-2d4f-4ee7-a906-0758fe79982f',
					 		mobile:'15915492120'
					 		

					 	}

								
					localStorage.setItem('zssblx',datas.sblx||1) 
					localStorage.setItem('zssdktoken',datas.token)
					localStorage.setItem('zsmobile',datas.mobile||666666)
					localStorage.setItem('zsdeviceid',datas.deviceId||1)
					

					 this.tokenLogin()
				},
			gettoken(data){
					var u = navigator.userAgent;
					let vm =this;						
					 let datas  = vm.GetRequest()

								
					localStorage.setItem('zssblx',datas.sblx||1) 
					localStorage.setItem('zssdktoken',datas.token)
					localStorage.setItem('zsmobile',datas.mobile||666666)
					localStorage.setItem('zsdeviceid',datas.deviceId||1)
					

					 this.tokenLogin()
			},
			//账号登陆
			numberLogin(){
				let vm =this
				let paw = md5(`0ef818eefcd00d17625c3b585716168b&${this.paw}`);
				// Indicator.open("登录中...")

				vm.axios.post(ApiPostLogin,{
						name: this.msg,
						password: paw,
						vercode: "666666"
					}).then((response)=>{
						if(response.data.retcode == 1) {
							Indicator.close()
							Toast({
							  message: '登录成功',
							  duration: 500
							});
							
							let data = response.data.data							
							localStorage.setItem("zsmid", data.mid);
							localStorage.setItem("zstoken", data.token);
							localStorage.setItem("zsmobile", data.mobile);
							localStorage.setItem("zsuserid", data.userId);
							localStorage.setItem("zsportrait", data.portrait);
							localStorage.setItem("zsnickname", data.nickname);
							localStorage.setItem('zsgameCoin',100)//
							localStorage.setItem('mobile',data.mobile)
							}


				}).catch((response)=>{})

			},

			appStart(){
					let vm = this,
					option = {};
					option.deviceid =localStorage.getItem('zsdeviceid')||1
					option.sblx=localStorage.getItem('zssblx')||1
					option.mid=localStorage.getItem('zsmid') || " "
					vm.axios.post(ApiappStart,option).then((res)=>{})

			},
			tokenLogin() {

				let vm=this;
				Indicator.open("登录中...")
				vm.axios.post(ApiTokenLogin, {}).then((response) => {
					
						if(response.data.retcode == 1) {
							
							let data = response.data.data
						
							localStorage.setItem("zsmid", data.mid);
							localStorage.setItem("zstoken", data.token);
							localStorage.setItem("zsmobile", data.mobile);
							localStorage.setItem("zsuserid", data.userId);
							localStorage.setItem("zsportrait", data.portrait);
							localStorage.setItem("zsnickname", data.nickname);
							localStorage.setItem("zscoinName", data.coinName);
							localStorage.setItem("zsintegral", data.integral);
							//登陆
							
							Indicator.close()
							Toast({
							  message: '登录成功',
							  duration: 2000
							});
							vm.appStart()
							
							var timer =  setTimeout(function(){
								timer = null

									vm.$router.replace({
									name:"activity",
									query:{isCur:0}
								})

							},500)

							
						}else{
							Indicator.close()
							Toast({
								  message: response.data.retmsg,
								  duration: 2000
								});
						}

					}).catch((response)=>{
						Indicator.close()
							Toast({
								  message: '登录出错',
								  duration: 2000
								});
					})
			}
		}

	}
</script>