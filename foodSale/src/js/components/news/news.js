/**
 * Created by zsh on 2017/5/8.
 */
module.exports = function (ngModule) {
    ngModule.component('news', {
        templateUrl:"components/news/news.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun',function (hintInfo,ajaxService,serviceFun) {
            ajaxService.ajaxPost('advertiser/findNews',{}).then(function (result) {
                this.newsInfo=result;
            }.bind(this));
            this.goActicle=function (code) {
                ajaxService.ajaxPost('advertiser/idFind',{id:code}).then(function (result) {
                    serviceFun.goState('acticle',result);
                }.bind(this));
            }
        }]

    })

}