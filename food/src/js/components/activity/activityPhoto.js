/**
 * Created by zsh on 2017/5/14.
 */
module.exports = function (ngModule) {
    ngModule.component('activityPhoto', {
        templateUrl:"components/activity/activityPhoto.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun',function (hintInfo,ajaxService,serviceFun) {
            this.bannerInfo={
                photoUrl:null
            };
            serviceFun.setCtrl(this);
            this.refresh=function () {
                ajaxService.ajaxPost('create/findBanner',{}).then(function (result) {
                    this.resultBack=result;
                }.bind(this));
            };
            this.refresh();
            this.addBanner=function () {
                ajaxService.ajaxPost('create/addBanner',this.bannerInfo).then(function (result) {
                    this.bannerInfo={};
                     serviceFun.brush(this);
                }.bind(this));
            }
            this.delBanner=function (item) {
                ajaxService.ajaxPost('create/delBanner',{id:item.id}).then(function (result) {
                    serviceFun.brush(this);
                }.bind(this));
            }
        }]

    })

}