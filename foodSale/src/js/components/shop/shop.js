/**
 * Created by zsh on 2017/5/15.
 */
module.exports = function (ngModule) {
    ngModule.component('shop', {
        templateUrl:"components/shop/shop.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService',function (hintInfo,ajaxService) {
            this.shopInfo={};
            //请求后台数据,并处理
            ajaxService.ajaxPost('shop/findInfo',{}).then(function (result) {
                this.shopInfo=angular.copy(result);
                console.log(result);
                this.shopInfo.startDate=result.startDate.substring(0,10);
                this.shopInfo.endDate=result.endDate.substring(0,10);
                this.shopInfo.startTime=result.startTime.substring(11);
                this.shopInfo.endTime=result.endTime.substring(11);

            }.bind(this));

        }]

    })

}