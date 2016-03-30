import api from '../../common/utils/api.js'

var LIST_URL= api.API_URL + '/turbot_admin/ad/list?';
export default {

		listData(params){
			var data = $.ajax({
	            url: LIST_URL + params,
	            type: 'GET'
	        }).done(function(){
	        	console.log('done');
	        })

	        return data;
		}


}
