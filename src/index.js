import Vue from 'vue'
import App from './components/App.vue'
import Login from './auth/Login.vue'
import A from './views/a/A.vue'
import B from './views/b/B.vue'


// ad
import Adpush from './views/adpush/Adpush.vue'
import Ad from './views/ad/ad.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(VueRouter)
import auth from './auth/login'

export var router = new VueRouter()

router.map({
    '/login': {
        name: 'login',
        component: Login
    },
    '/turbot_admin': {
        name: 'turbot_admin',
        component: App,
        subRoutes: {
            '/turbotservice': {
                name: 'turbotservice',
                component: A,
                subRoutes:{
                    '/adpush': {
                        name: 'adpush',
                        component: Adpush
                    },
                    '/ad': {
                        name: 'ad',
                        component: Ad
                    },             
                    '/adsource': {
                        name: 'adsource',
                        component: A
                    },
                    '/adpos': {
                        name: 'adpos',
                        component: A
                    }
                }    
            },
            '/turbotstatistics': {
                name: 'turbotstatistics',
                component: A,
                subRoutes:{
                    '/adpostat': {
                        name: 'adpostat',
                        component: A
                    },
                    '/adsrcstat': {
                        name: 'adsrcstat',
                        component: A
                    } 
                }  
            },
            '/turbotportrait': {
                name: 'turbotportrait',
                component: A,
                subRoutes:{
                    '/usertag': {
                        name: 'usertag',
                        component: A
                    }
                }  
            },
            '/staticresource': {
                name: 'staticresource',
                component: A,
                subRoutes:{
                    '/icon': {
                        name: 'icon',
                        component: A
                    }
                }  
            },
            '/aosrule': {
                name: 'aosrule',
                component: A,
                subRoutes:{
                    '/aosruledata': {
                        name: 'aosruledata',
                        component: A
                    },
                    '/aospackage': {
                        name: 'aospackage',
                        component: A
                    },
                    '/aosoperator': {
                        name: 'aosoperator',
                        component: A
                    },
                    '/aossource': {
                        name: 'aossource',
                        component: A
                    },
                    '/aoslocale': {
                        name: 'aoslocale',
                        component: A
                    }
                }  
            }
        }
    },
    '/provision_services': {
        name: 'provision_services',
        component: App
    },
    '/auth': {
        name: 'auth',
        component: App
    },
    '/pushadmin': {
        name: 'pushadmin',
        component: App
    },
    '/webopadmin': {
        name: 'webopadmin',
        component: App
    },
    '/homeadmin': {
        name: 'homeadmin',
        component: App
    },
    '/square_console': {
        name: 'square_console',
        component: App
    },
    '/ios_console': {
        name: 'ios_console',
        component: App
    }

});

router.beforeEach(function(transition) {
    var auth = transition.to.path;
    if (!sessionStorage.user_session && auth !== '/login') {
        router.go('/login');
    } else {
        transition.next();
    }
});

router.redirect({
    '*': '/turbot_admin'
})

router.start(app, '#app')




