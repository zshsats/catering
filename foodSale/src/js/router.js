/**
 * Created by zsh on 2017/2/28.
 */
module.exports = function (ngModule){
    ngModule.config(['$stateProvider','$urlRouterProvider','$locationProvider','$compileProvider','$httpProvider','$qProvider',function($stateProvider,$urlRouterProvider,$locationProvider,$compileProvider,$httpProvider,$qProvider){
        $compileProvider.preAssignBindingsEnabled(true);
        $qProvider.errorOnUnhandledRejections(false);
        $locationProvider.hashPrefix('').html5Mode(false);
        $httpProvider.interceptors.push('httpInterceptor');
        $urlRouterProvider.otherwise('/login') ;
        $stateProvider
            .state('home',{
                url: "/home",
                template: '<home></home>'
            })
            .state('order',{
                url: "/order",
                template: '<order></order>'
            })
            .state('login',{
                url: "/login",
                template: '<login></login>'
            })
            .state('activity',{
                url: "/activity",
                template: '<activity></activity>'
            })
            .state('news',{
                url: "/news",
                template: '<news></news>'
            })
            .state('dishInfo',{
                url: "/dishInfo",
                template: '<dish-info></dish-info>'
            })
            .state('acticle',{
                url: "/acticle",
                template: '<acticle></acticle>'
            })
            .state('shop',{
                url: "/shop",
                template: '<shop></shop>'
            })

    }]);
}

