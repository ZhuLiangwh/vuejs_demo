<template>  
	<div class="main">
		<a class="waves-effect waves-light btn">添加广告</a>
		<table class="highlight">
			<thead>
				<tr>
					<th><input type="checkbox" id="checkall" v-model="checkedAll" @click="checkAll" /><label for="checkall"></label></th>
					<th>ID</th>
					<th>title</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in items">
					<td><input type="checkbox" id="{{$index}}" v-model="checked[item.id]"  /><label for="{{$index}}"></label></td>
					<td>{{item.id}}</td>
					<td>{{item.title}}</td>
					
					<td><a class="waves-effect waves-light btn">ViewDetail</a></td>
				</tr>
			</tbody>
		</table>
		<a class="waves-effect waves-light btn">从本地删除</a>
		<span>共<em v-text="total"></em>条数据</span>
		<ul class="pagination">
		    <li v-bind:class="[showFirst() ? 'disabled' : 'waves-effect' ] " @click="setPage(curNum-1)">
		    	<a><i class="material-icons">chevron_left</i></a>
		    </li>
		    <li v-for="n in totalNum" :class="{ active: n+1 == curNum }" @click="setPage(n+1)">
                <a class="waves-effect" v-text="n+1"></a>
            </li>
		    <li v-bind:class="[showLast() ? 'disabled':'waves-effect'] " @click="setPage(curNum+1)">
		    	<a>
		    		<i class="material-icons">chevron_right</i>
		    	</a>
		    </li>
		</ul>
	</div>
</template> 
<script>
import Vue from 'vue'
import ad from '../ad/ad.js'

var API_URL = 'http://172.16.7.101:8080';
export default {
	data: function(){
		return {
			 items: [],
			 checked: {},
			 total:0,
			 checkedAll: false,
			 totalNum: 0, //总页数
             curNum: 1 //当前页码

		}
	},
	ready: function() {
		var self = this;
		var params = 'index='+ self.curNum +'&limit=20';
		ad.listData(params).then(function(data){
			self.items = data.data.items;
			self.total = data.data.total;
			self.totalNum = Math.round(self.total / 20);
		});

        setTimeout(function(){
            // 初始化
            self.items.forEach(x => {
                Vue.set(self.checked, x.id, false)
            })
        },1000);

        // 监听是否选中
        self.$watch('checked', function(){            
            var checked = self
            	.items
            	.map(x=>x.id)
            	.reduce(function(result, id){
                	return result && Boolean(self.checked[id]);
            	}, true);
            
            // console.log('checkedAll ' , checked);
            this.checkedAll = checked;
        }, { deep: true });
		
	},
	methods: {
		//全选
		checkAll: function(e){
			var checked = e.target.checked;
			var ids = this.items.map(x=>x.id);
			ids.forEach(id=>{
				this.checked[id] = checked
			})
		},

		 //设置分页
        setPage: function(num) {
			var _this = this;
			// 分页请求
			if(num === 0 || num > _this.totalNum){
				
			}else{
				var params = 'index='+ num +'&limit=20';
				ad.listData(params).then(function(data){
	        		_this.items = data.data.items;
				});
			}

            //页码小于等于1
            if (num <= 1) {
                return this.curNum = 1 ;
            }
            //页码大于总页数
            if (num >= this.totalNum) {

                return this.curNum = this.totalNum;
            }
            //页码赋给当前页
            this.curNum = num;
        },
        //显示最后一页
        showLast: function(){
            if(this.curNum == this.totalNum || this.totalNum == 0){
                return true
            }
            return false
       },
       //显示第一页
       showFirst: function(){
            if(this.curNum == 1){
                return true
            }
           return false
       }

	}
}

</script>

<style>
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: local('Material Icons'), local('MaterialIcons-Regular'), url(http://fonts.gstatic.com/s/materialicons/v12/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

</style>

