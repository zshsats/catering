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
require('./common/widgets/slider/slider.js')(ngModule);
require('./common/widgets/header/header.js')(ngModule);
require('./common/widgets/model/model.js')(ngModule);
require('./common/widgets/upload/uploadImg.js')(ngModule);
require('./common/widgets/select/selectDish.js')(ngModule);
/*普通组件*/
require('./components/myHome/myHome.js')(ngModule);
require('./components/dish/dish.js')(ngModule);
require('./components/shopInfo/shopInfo.js')(ngModule);
require('./components/dish/newDish.js')(ngModule);
require('./components/shopInfo/reviseInfo.js')(ngModule);
require('./components/dish/category.js')(ngModule);
require('./components/dish/unitDish.js')(ngModule);
require('./components/shopInfo/shopNews')(ngModule);
require('./components/shopInfo/clerk.js')(ngModule);
require('./components/shopInfo/preview.js')(ngModule);
require('./components/busReport/reportShow.js')(ngModule);
require('./components/login/login.js')(ngModule);
require('./components/login/empLogin.js')(ngModule);
require('./components/login/shopLogin.js')(ngModule);
require('./components/login/regist.js')(ngModule);
require('./components/shopInfo/newClert.js')(ngModule);
require('./components/shopInfo/newList.js')(ngModule);
require('./components/activity/library.js')(ngModule);
require('./components/activity/activityList.js')(ngModule);
require('./components/activity/create.js')(ngModule);
require('./components/activity/activityPhoto.js')(ngModule);

/*样式*/
require('../less/main.less');

ngModule.run(['$rootScope',function ($rootScope) {
    $rootScope.$on('$stateChangeStart',function (event,toState,toParams,fromState,fromParams) {
          if(toState.name.indexOf('home')>=0){
              $rootScope.homeState=true;
          }else{
              $rootScope.homeState=false;
          }

    })
}])