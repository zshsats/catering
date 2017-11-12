/**
 * Created by zsh on 2017/4/11.
 */
module.exports = function (ngModule) {
    ngModule.component('shopLogin', {
        templateUrl:"components/login/shopLogin.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['ajaxService','$state',function (ajaxService,$state) {
            this.loginInfo={};
            if(localStorage.getItem('check1')=='true'){
                this.check1=true;
                this.loginInfo.shopId=localStorage.getItem('shopId');
                this.loginInfo.pwd=localStorage.getItem('pwd');
            }
            //登录
            this.login=function () {
                //记住密码
                if(this.check1){
                      localStorage.setItem('check1',this.check1);
                      localStorage.setItem('shopId',this.loginInfo.shopId);
                      localStorage.setItem('pwd',this.loginInfo.pwd);
                }else{
                    localStorage.setItem('check1',false);
                    localStorage.removeItem('shopId');
                    localStorage.removeItem('pwd');
                }
                ajaxService.ajaxPost('regist/shopLogin',this.loginInfo).then(function (result) {
                    sessionStorage.setItem("shop","2");
                    $state.go('home.myHome');
                });

            }
            //跳转到注册页面
            this.regist=function () {
                $state.go('regist');
            }
            //清空输入框的值
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