/**
 * Created by zsh on 2017/5/9.
 */
module.exports = function (ngModule) {
    ngModule.component('dishDetail', {
        templateUrl:"components/home/dishDetail.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','$state','serviceFun',function (hintInfo,ajaxService,$state,serviceFun) {
            console.log(this.resolve.param);
            this.detail=this.resolve.param;

        }]

    })

}