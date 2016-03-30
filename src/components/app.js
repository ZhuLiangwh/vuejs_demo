
import api from '../common/utils/api.js'

const a_URL = api.API_URL + '/auth/turbot_admin/menu/list?uid=1'

export default {
    getData() {
        var data = $.ajax({
            url: a_URL,
            type: 'GET'
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

        console.log(data);
    }
    
    
    
}