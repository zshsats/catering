/**
 * Created by zsh on 2017/2/28.
 */
module.exports = function (ngModule){
    ngModule.config(['$stateProvider','$urlRouterProvider','$locationProvider','$compileProvider','$httpProvider','$qProvider',function($stateProvider,$urlRouterProvider,$locationProvider,$compileProvider,$httpProvider,$qProvider){
        $compileProvider.preAssignBindingsEnabled(true);
        $qProvider.errorOnUnhandledRejections(false);
        $locationProvider.hashPrefix('').html5Mode(false);
        $httpProvider.interceptors.push('httpInterceptor');
        // $urlRouterProvider.otherwise('/login') ;
        $stateProvider
            .state('home',{
                url: "/home",
                template: '<slider></slider><div ui-view class="main-count"></div>'
            })
            .state('home.myHome',{
                url: "/myHome",
                template: '<my-home></my-home>'
            })
            .state('home.dish',{
                url: "/dish",
                template: '<dish></dish>'
            })
            .state('home.category',{
                url: "/category",
                template: '<category></category>'
            })
            .state('home.unitDish',{
                url: "/unitDish",
                template: '<unit-dish></unit-dish>'
            })
            .state('home.shopInfo',{
                url: "/shopInfo",
                template: '<shop-info></shop-info>'
            })
            .state('home.payWay',{
                url: "/payWay",
                template: '<pay-way></pay-way>'
            })
            .state('home.shopNews',{
                url: "/shopNews",
                template: '<shop-news></shop-news>'
            })
            .state('home.clerk',{
                url: "/clerk",
                template: '<clerk></clerk>'
            })
            .state('home.reportShow',{
                url: "/reportShow",
                template: '<report-show></report-show>'
            })
            .state('login',{
                url: "/login:id",
                template: '<login></login>'
            })
            .state('login.empLogin',{
                url: "/empLogin",
                template: '<emp-login></emp-login>'
            })
            .state('login.shopLogin',{
                url: "/shopLogin",
                template: '<shop-login></shop-login>'
            })
            .state('regist',{
                url: "/regist",
                template: '<regist></regist>'
            })
            .state('home.newTake',{
                url: "/newTake",
                template: '<new-take></new-take>'
            })
            .state('home.newList',{
                url: "/newList",
                template: '<new-List></new-List>'
            })
            .state('home.activityList',{
                url: "/activityList",
                template: '<activity-list></activity-list>'
            })
            .state('home.library',{
                url: "/library",
                template: '<library></library>'
            })
            .state('home.create',{
                url: "/create/:id",
                template: '<create></create>'
            })
            .state('home.activityPhoto',{
                url: "/activityPhoto",
                template: '<activity-photo></activity-photo>'
            })

    }]);
}

