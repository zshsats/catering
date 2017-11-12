/**
 * Created by zsh on 2017/5/9.
 */
module.exports = function (ngModule) {
    ngModule.component('dishInfo', {
        templateUrl:"components/home/dishInfo.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','$state','serviceFun',function (hintInfo,ajaxService,$state,serviceFun) {
            if(serviceFun.getDate()){
               this.dishInfo=angular.copy(serviceFun.getDate());
               console.log(serviceFun.getDate());
            }
            this.lookDish=function (id) {
                hintInfo.hint({commont:'dishDetail',size:'lg',param:id}).then(function (result) {
                    console.log(result);
                });
            }
            this.save=function () {
                ajaxService.ajaxPost('order/addOrder',this.dishInfo).then(function (result) {
                    serviceFun.skip('order');
                });
            }

        }]

    })

}