/**
 * Created by zsh on 2017/4/17.
 */
module.exports = function (ngModule) {
    ngModule.component('library', {
        templateUrl:"components/activity/library.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun',function (hintInfo,ajaxService,serviceFun) {
            this.creatActivity=function () {
                serviceFun.goShow('create');
            }
        }]

    })

}
