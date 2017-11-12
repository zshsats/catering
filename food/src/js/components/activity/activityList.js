/**
 * Created by zsh on 2017/4/17.
 */
module.exports = function (ngModule) {
    ngModule.component('activityList', {
        templateUrl:"components/activity/activityList.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun','$state',function (hintInfo,ajaxService,serviceFun,$state) {
            serviceFun.setCtrl(this);
            this.refresh=function () {
                ajaxService.ajaxPost('create/findActivity',{}).then(function (result) {
                    result.forEach(function (item) {
                        item.startDate=item.startDate.substring(0,10);
                        item.endDate=item.endDate.substring(0,10);
                    })
                    this.acts=result;
                }.bind(this));
            }
            this.refresh();
            this.go=function (id) {
                serviceFun.goShow('create',id);
            }
            this.goLib=function () {
                serviceFun.goShow('library');
            }
        }]

    })

}