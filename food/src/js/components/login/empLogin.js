/**
 * Created by zsh on 2017/4/11.
 */
module.exports = function (ngModule) {
    ngModule.component('empLogin', {
        templateUrl:"components/login/empLogin.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['ajaxService','$state',function (ajaxService,$state) {
            this.loginInfo={};
            if(localStorage.getItem('check2')=='true'){
                this.check2=true;
                this.loginInfo.shop_id=localStorage.getItem('shop_id');
                this.loginInfo.pwd=localStorage.getItem('pwd2');
                this.loginInfo.id=localStorage.getItem('id');
            }
            this.login=function () {
                if(this.check2){
                    localStorage.setItem('check2',this.check2);
                    localStorage.setItem('shop_id',this.loginInfo.shop_id);
                    localStorage.setItem('id',this.loginInfo.id);
                    localStorage.setItem('pwd2',this.loginInfo.pwd);
                }else{
                    localStorage.removeItem('check2');
                    localStorage.removeItem('shop_id');
                    localStorage.removeItem('pwd');
                    localStorage.removeItem('id');
                }
                ajaxService.ajaxPost('login/empLogin',this.loginInfo).then(function (result) {
                    window.location='http://localhost:1008/#/home'
                });

            }
            //清空输入框的值
            this.clearInput=function (value) {
                if(value.shop_id){
                    value.shop_id=null;
                }
                if(value.id){
                    value.id=null;
                }
                if(value.pwd){
                    value.pwd=null;
                }
            }

            this.regist=function () {
                $state.go('regist');
            }
        }]

    })

}