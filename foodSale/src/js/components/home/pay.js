/**
 * Created by zsh on 2017/5/17.
 */
module.exports = function (ngModule) {
    ngModule.component('pay', {
        templateUrl:"components/home/pay.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','$state','serviceFun',function (hintInfo,ajaxService,$state,serviceFun) {
            this.cash=false;
            this.payInfo=this.resolve.param;
            this.goTotal=function () {
                ajaxService.ajaxPost('order/addOrder',this.payInfo).then(function (result) {
                    serviceFun.goShow('order');
                    this.close();
                    hintInfo.hint({size:'',type:'back',val:'你的操作已经成功了'});
                }.bind(this));
            }
        }]

    })

}