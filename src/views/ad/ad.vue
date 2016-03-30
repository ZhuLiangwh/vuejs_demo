<template>  
	<input type="text" v-model="searchQuery">
	<paginaiton id="my-table"></pagination>
	<grid id="my-table" rows="{{gridData}}" columns="{{gridColumns}}" filter-key="{{searchQuery}}" per-page="20"></grid>

</template> 
<script>
import Vue from 'vue'
import ad from '../ad/ad.js'

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
			self.totalNum = Math.round(self.total / 20); //设置总页数

			 setTimeout(function(){
	            // 初始化    
	            self.items.forEach(x => {
	                Vue.set(self.checked, x.id, false)
	            })
	        },100);
		});

		// 监听是否选中
        self.$watch('checked', function(){            
            var checked = self
            	.items
            	.map(x=>x.id)
            	.reduce(function(result, id){
                	return result && Boolean(self.checked[id]);
            	}, true);
            
            console.log('checkedAll ' , checked);
            this.checkedAll = checked;
        }, { deep: true });

		
	},
	methods: {
		//全选
		checkAll: function(e){
			var checked = e.target.checked;
			console.log(checked);

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
                return this.curNum = 1;
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

