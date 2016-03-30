<template>  
	<header>
		<topnav v-ref:topnav></topnav>    
		<div class="sideWrap">
			<leftnav v-ref:leftnav :menus=menus></leftnav>
		</div>
	</header>
	<main>
		<router-view></router-view> 
	</main>

</template>
<script>

import menu from '../auth/menu.js'
export default {
	data:function(){
		return {
			menus:[]
		}
	},
	ready:function(){
		var _this = this;

		menu.getLeftData('turbot_admin').then(function(data) {
			_this.menus = data.data.menu;
		});

		this.$on('topvue',function(v){
			menu.getLeftData(v).then(function(data) {
			 	_this.menus = data.data.menu;
			})
		})
	},
  components:{
      "topnav":require('./_Top.vue'),
      "leftnav":require('./_Left.vue')
  }

}
</script>
<style>
	header, main, footer {
	     padding-left: 0; 
	}
	.container{max-width: 100%;width:100%;}
	main{
		    padding-left: 240px;
	}
</style>