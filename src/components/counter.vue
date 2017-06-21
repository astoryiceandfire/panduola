<!-- 倒计时组件 -->
<template>
	<span class="timecolor">{{time}}</span>
</template>

<script>
import { countFormat } from '../filters'
import Vue from 'vue'
export default{
	data(){
		return {
			time:"",
			starttime:0,//打开页面获取的开始时间
			now:0,		//当前时间
			rt:0,		//remainTime 倒计时剩余毫秒数，用来返回给父组件
			counter:0
		}
	},
	props:["downtime","formattime","item"],
	methods:{
		formate(time){
			
		  if (time >= 0) {
			  
			
			 let s = parseInt(time)
			 let m = 0
			 let h = 0
			 let d = 0
			 if (s>60) {
			 	m = parseInt(s/60)
			 	s = parseInt(s%60)
			 	if (m>60) {
			 		h = parseInt(m/60)
			 		m = parseInt(m%60)
			 		if (h>24) {
			 			d =parseInt(h/24)
			 			h =parseInt(h%24)
			 		}
			 	}
			 }
			 h=countFormat(h)  
			 m=countFormat(m)  
			 s=countFormat(s) 
			 d=countFormat(d) 

			 if (d>=1) {
			 	 return d + ':' + h+":"+m+":"+s;
			 	}
			 	

			 	switch(this.formattime){
			 		case "mmss":
			 		return m +':'+ s
			 		break;
			 		default:

			 	}


             return  h+":"+m+":"+s;
		   }else{
		   	 Vue.set(this.item,'Begin',true)//待测试
		   	 return '00:00:00';
		   }
		}
	},
	computed:{
		"time":function(){
			//时间差=
			let t=this.downtime;
			// console.log(this.time,'hdhdh')
			// console.log(this.item)


			this.rt=t;
			if(t>=0){
				return this.formate(t);
			}else{
				clearTimeout(this.counter)
				
				//将倒计时剩余毫秒数传递给父组件
				this.$dispatch('remainTime', this.rt)
				return '00:00:00';	
			}
		}
	},
	ready(){
		let self=this;
	
		setTimeout(function(){

			self.counter=setInterval(function(){

			self.downtime--;
			
		},1000);

		},500)
		
	}
}
</script>
<style lang="scss" scoped>
  @import "../assets/scss/style.scss";
	.timecolor{
		color: #FBBD02;
		 @include font-dpr(10px);
		 overflow: hidden;
		 white-space: nowrap;
	}
</style>