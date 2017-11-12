/**
 * Created by zsh on 2017/4/16.
 */
module.exports = function (ngModule) {
    ngModule.component('empRegist', {
        templateUrl:"components/login/empRegist.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun','$state',function (hintInfo,ajaxService,serviceFun,$state) {
            this.registInfo={};
            this.registInfo.startDate=new Date().getTime();
            this.regist=function () {
                console.log(this.registInfo);
                ajaxService.ajaxPost('regist/registEmp',this.registInfo).then(function (result) {
                    $state.go('login.empLogin');
                });
            }
        }]

    })

}