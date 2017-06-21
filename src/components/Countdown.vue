<!-- 倒计时组件 -->
<template>
	<span>{{time}}</span>
</template>

<script>
	import {
		countFormat
	} from '../filters'
	export default {
		data() {
				return {
					time: "",
					dow:'',
					rt: 0, //remainTime 倒计时剩余毫秒数，用来返回给父组件
					counter: 0
				}
			},
			props: ["endtime", "starttime", "servertime","formattime"],
			methods: {
				formate(time) {
					if(time >= 0) {
					
						 let ms = parseInt(time)%1000
						 let s = parseInt(time)/1000
						 let m = 0
						 let h = 0
						 let d = 0
						 if (s>60) {
						 	m = parseInt(s/60)
						 	s = parseInt(s%60)
						 	if (m>60) {
						 		h = parseInt(m/60)
						 		m = parseInt(m%60)
						 		
						 	}
						 }


						h=countFormat(h)  
						 m=countFormat(m)  
						 s=countFormat(s) 
						
						 ms = countFormat(ms)

						if(this.formattime=='hh:mm:ss'){
							return h + ":" + m + ":" + s;
						}else if(this.formattime=='mm:ss:ms'){
							return m + "\'" + s + "\"" + ms;
						}else if(this.formattime=='hh'){
							
							if (h==0) {
								return m +'m'
							}

							return h + 'h';
						}else if(this.formattime=='hh:mm'){
							return h + ":" + m 

						}
						else if(this.formattime=='mm'){
							// return h + ":" + m + ":" + s;
							return m;
						}else if(this.formattime=='ss'){
							return s;
						}else if(this.formattime=='ms'){
							return ms;
						}
					} else {
//						return '正在计算中...';
						return '';
					}
				}
			},
			computed: {
				"time": function() {
					let t = (this.endtime - this.dow);
					this.rt = t;
					if(t >= 0) {
						return this.formate(t);
					} else {
						clearTimeout(this.counter)
						//将倒计时剩余毫秒数传递给父组件
						this.$dispatch('remainTime', this.rt)
//						return '正在计算中...';
						return '';
					}
				}
			},
			ready() {
				let self = this;
				let timer = setInterval(function() {
					self.counter = setInterval(function() {
						if(self.servertime){
						self.servertime =self.servertime +10;
							self.dow = self.servertime 
						}else{
							self.dow=new Date().getTime();
						}
						clearInterval(timer);
						
					}, 10);
				}, 10)
			}
	}
</script>