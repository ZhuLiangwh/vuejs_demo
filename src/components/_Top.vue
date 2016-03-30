<template>
	<nav class="top-nav">
		<div class="container">
			<div class="nav-wrapper">
				<a href="">Dolphin Logo</a>
				<ul class="right top_nav">
					<li v-for="nav in navData">
						<a v-link="{name:nav.value}" @click="todo(nav.value)">{{nav.display_value}}</a>
					</li>
				
					<li><a @click="logout()" class="log-out-btn">Log out</a></li>
				</ul>
			</div>
		</div>
	</nav>
</template>
<script>
import auth from '../auth/login.js'
import menu from '../auth/menu.js'
export default {
	data: function() {
		return {
			navData: []
		}
	},
	ready: function() {
		var _this = this;
		auth.getTopNav().then(function(data) {
			_this.navData = data.data.navigate;
		});
		
	},
	methods: {
		logout: function() {
			auth.exit('login');
		},
		todo : function(v){
			this.$dispatch('topvue',v);
			// console.log(v);
			// this.$parent.$refs.leftnav.bbb(v)
		}
	}
}
</script>
<style>
	.v-link-active{background-color:rgba(0,0,0,0.1)}
	nav.top-nav{height: auto;}
	nav .nav-wrapper{padding:0 3%;}
</style>