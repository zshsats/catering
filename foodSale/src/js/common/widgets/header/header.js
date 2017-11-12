/**
 * Created by zsh on 2017/4/29.
 */
module.exports = function (ngModule) {
    var header=require('./header.html');
    ngModule.component('myHeader', {
        template:header,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun',function (hintInfo,ajaxService,serviceFun) {
            this.myDish=function () {
                serviceFun.goWhere('home');
            }
            this.myOrder=function () {
                serviceFun.goWhere('order');
            }
            this.myAct=function () {
                serviceFun.goWhere('activity');
            }
            this.myNews=function () {
                serviceFun.goWhere('news');
            }
            this.myShop=function () {
                serviceFun.goWhere('shop');
            }
            this.exit=function () {
                sessionStorage.removeItem('state');
                serviceFun.goWhere('login');
            }
        }]

    })

}