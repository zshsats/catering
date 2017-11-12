/**
 * Created by zsh on 2017/2/27.
 */
var ngModule = angular.module('app', ['ui.router', 'ui.bootstrap','ng.ueditor','angularFileUpload','checklist-model']);
require('./router')(ngModule);
/*指令*/
require('./common/services/constant.js')(ngModule);
require('./comDirective/directive.js')(ngModule);
/*服务*/
require('./common/services/serviceFun')(ngModule);
require('./common/services/ajaxService.js')(ngModule);
require('./common/services/factoryFun.js')(ngModule);
require('./common/services/factoryFun.js')(ngModule);
/*公共组件*/
require('./common/widgets/model/model.js')(ngModule);
require('./common/widgets/upload/uploadImg.js')(ngModule);
require('./common/widgets/header/header.js')(ngModule);
/*普通组件*/
require('./components/home/home.js')(ngModule);
require('./components/order/order.js')(ngModule);
require('./components/login/login.js')(ngModule);
require('./components/activity/activity.js')(ngModule);
require('./components/news/news.js')(ngModule);
require('./components/order/orderInfo.js')(ngModule);
require('./components/home/dishInfo.js')(ngModule);
require('./components/home/dishDetail.js')(ngModule);
require('./components/activity/activityDish.js')(ngModule);
require('./components/news/acticle.js')(ngModule);
require('./components/shop/shop.js')(ngModule);
require('./components/home/pay.js')(ngModule);
/*样式*/
require('../less/main.less');

ngModule.run(['$rootScope',function ($rootScope) {
    $rootScope.$on('$stateChangeStart',function (event,toState,toParams,fromState,fromParams) {
        $rootScope.menu=toState.name;
        var state=sessionStorage.getItem('state');

    })
}])