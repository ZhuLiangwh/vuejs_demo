<template>

		<ul v-if="menus.length > 0">
			<li v-for="item in menus" class="{{'lvl_' + $index}}">
				<a v-link="{name:item.model}" class="waves-effect waves-teal">{{item.display}}</a>
				<submenu :menus=item.items  :class="{{'lvl_'+ $index +'_' + $index}}"></submenu>
			</li>
		</ul>

	
</template>
<script>
import menu from '../auth/menu.js'
export default {
	name:'submenu',
	props:['menus']// data recursion
	
}

</script>
<style>
	.sideWrap{
		box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
		left: 0;
    	position: fixed;
        width: 240px;

	    top: 64px;
	    margin: 0;
	    height: 100%;
	    height: calc(100% + 60px);
	    height: -moz-calc(100%);
	    padding-bottom: 60px;
	    z-index: 999;
	    overflow-y: auto;
	    will-change: left;
	}
	.sideWrap li{
		float: none;
	    padding: 0 15px;
	    line-height: 44px;
	}
	.sideWrap li a{
		font-size: 13px;
	    line-height: 44px;
	    height: 44px;
	    display: block;
	        color:#444;
	}
</style>
