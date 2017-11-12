/**
 * Created by zsh on 2017/5/20.
 */
module.exports = function (ngModule) {
    ngModule.component('newList', {
        templateUrl:"components/shopInfo/newList.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun',function (hintInfo,ajaxService,serviceFun) {
            this.refresh=function () {
                ajaxService.ajaxPost('advertiser/findNews',{}).then(function (result) {
                    this.newsInfo=result;
                }.bind(this));
            }
            this.refresh();
            this.del=function (code) {

                hintInfo.hint({size:'sm',type:'ok',val:'确认是否删除？'}).then(function () {
                    ajaxService.ajaxPost('Advertiser/delNews',{id:code}).then(function (result) {
                        serviceFun.brush(this);
                    }.bind(this));
                }.bind(this));

            }

        }]

    })

}