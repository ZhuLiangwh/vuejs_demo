
import api from '../common/utils/api.js'

var topnav_URL = api.API_URL + '/auth/navigate/list?uid=1';

export default {
    getTopData() {
        var data = $.ajax({
            url: topnav_URL,
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

        return data;
    },
    getLeftData(leftLinkName) {
        console.log(leftLinkName);
        var data = $.ajax({
            url: api.API_URL + '/auth/'+leftLinkName+'/menu/list?uid=1',
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

        return data;
    }
    
    
    
}