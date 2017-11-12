/**
 * Created by zsh on 2017/4/13.
 */
module.exports = function (ngModule) {
    ngModule.component('regist', {
        templateUrl:"components/login/regist.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['ajaxService','$state',function (ajaxService,$state) {
            this.registInfo={};
            //时间格式设置
            this.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1,
                showWeeks: false
            };
            var formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            this.format = formats[0];
            //注册函数
            this.regist=function () {

                ajaxService.ajaxPost('regist/adminRegist',this.registInfo).then(function (result) {
                     $state.go('login.shopLogin');
                });
            }
            this.login=function () {
                $state.go('login.shopLogin');
            };
            this.clearInput=function (value) {
                if(value.shopId){
                    value.shopId=null;
                }
                if(value.pwd){
                    value.pwd=null;
                }
            }
        }]

    })

}