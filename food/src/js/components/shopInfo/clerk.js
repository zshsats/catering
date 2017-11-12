/**
 * Created by zsh on 2017/4/1.
 */
module.exports = function (ngModule) {
    ngModule.component('clerk', {
        templateUrl:"components/shopInfo/clerk.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['ajaxService','serviceFun','hintInfo',function (ajaxService,serviceFun,hintInfo) {
            serviceFun.setCtrl(this);
            this.refresh=function () {
                ajaxService.ajaxPost('clert/findClert',{}).then(function (result) {
                    this.clers=result;
                }.bind(this));
            };
            this.refresh();
            this.newClert=function () {
                hintInfo.hint({commont:'newClert',size:'lg',param:null});
            }
            this.goClert=function (id) {
                hintInfo.hint({commont:'newClert',size:'lg',param:id});
            }
            this.del=function (id) {
                ajaxService.ajaxPost('clert/delClert',{id:id}).then(function (result) {
                    serviceFun.brush(this);
                }.bind(this));
            }
        }]

    })

}