
import {Apisingledata} from './api'
import IScroll    from './assets/js/iscroll'
// import {getisLogin} from './vuex/getters'
export const myMixin = {
	
			methods:{
					loadsldata:function(){
							let vm =this

							let promise = new Promise(function(resolve,reject){
								vm.axios.post(Apisingledata,{}).then((response)=>{
									if (response.data.retcode==1) {
										
										 		resolve(response.data.data)
										 	}else{
										 		reject(response.data.retmsg)
										 	}	

							})
							})

						return promise
					},
					addiscroll(el,FUNCSTRING){
									let vm  = this,
										
						             	srcollEl = vm.$els[el];

						             	let instance=null;

						          
						            
						            // vm.$nextTick(() =>{
						          instance = new IScroll(srcollEl, { 
						                mouseWheel: true,
						                preventDefault: true,
						                scrollbars: false,
						                fadeScrollbars: true,
						                click: true ,
						                bounce :true,
						                momentum:true,
						               
						            });
						            //滚动完毕  
								          instance.on('scrollEnd',function(){  
								         
								              let _this = this
								              if(this.y == 0 ){
								               
								                  instance.refresh()
								              }else if( _this.y <= _this.maxScrollY){
								                  vm.page ++
								                 
								                  if (vm.page <= vm.total  ) {
								                  	if (typeof FUNCSTRING == 'function') {
								                  			 FUNCSTRING()

								                  	}else{
								                  		
								                  	
								                  	}
								                  	 
								                   
								                    
								                  }
								                  
								                  instance.refresh()
								              }
								              
								          }) 

								          instance.on('scrollStart',function(){  
								            
								              let _this = this
								              if(_this.y >= 0 ){
								                  vm.pullDown = true
								                  instance.refresh()
								              }else if( _this.y ==  _this.maxScrollY){
								                  vm.pullUp = true
								                  instance.refresh()
								              }
								          })


						              
						                 vm.banTouchmove()

						              return instance
						             

						            // })
 								
						          
						           
				              
				             
						},
						 preventDefault(e){ 
					        e.preventDefault(); 
					      }, 
					      banTouchmove(){
					      	
					        document.addEventListener('touchmove', this.preventDefault, { passive: false }) 
					      },
					      restoreTouchmove(){
					        document.removeEventListener('touchmove', this.preventDefault, false)
					      }
   
							
			}
}