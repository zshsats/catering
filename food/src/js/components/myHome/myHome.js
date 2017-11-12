/**
 * Created by zsh on 2017/2/28.
 */
// var hl=require('./components/myHome/myHome.html');
module.exports = function (ngModule) {
    ngModule.component('myHome', {
        templateUrl:"components/myHome/myHome.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','FileUploader','$scope',
            function (hintInfo,ajaxService,FileUploader,$scope) {
                ajaxService.ajaxPost('home/findTime', {}).then(function (result) {
                    this.startDate = new Date(result.startDate).getTime();
                    this.newDate = new Date().getTime();
                    this.endDate = new Date(result.endDate).getTime();
                    this.days = (parseInt(this.newDate) - parseInt(this.startDate)) / (24 * 60 * 60 * 1000);
                    this.time = (parseInt(this.endDate) - parseInt(this.newDate)) / (24 * 60 * 60 * 1000);
                }.bind(this));
                ajaxService.ajaxPost('Order/findInfo', {}).then(function (result) {
                     this.totalInfo=result;
                }.bind(this));










            }
        ]

    })

}