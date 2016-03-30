import {router} from '../index'
import createGuid from '../common/utils/guid';

import menu from '../auth/menu.js'

import api from '../common/utils/api.js'
var LOGIN_URL = api.API_URL + '/auth/login'


export default {
    data: function() {
        return {
            navData: []
        }
    },
    login(context, creds, redirect) {
        context.$http.post(LOGIN_URL, creds, (data) => {
            if (data.status != 0) {
                Materialize.toast(data.msg, 4000);
                return false;
            } else {
                var userid = data.data.uid || [];
                sessionStorage.user_session = JSON.stringify({"username":creds.user_name, "userid":userid, "sessionId":createGuid()});
                if (redirect) {
                    router.go({ name: redirect });
                }
 
            }

        }).error((err) => {
            context.error = err;
        })
    },
    //logout
    exit(redirect){
        if(redirect){
            sessionStorage.clear();
            router.go({ name: redirect });
        }
    },
    getTopNav(){
         return menu.getTopData();
    }
    
}