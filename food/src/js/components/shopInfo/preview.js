/**
 * Created by zsh on 2017/4/1.
 */
module.exports = function (ngModule) {
    ngModule.component('preview', {
        templateUrl:"components/shopInfo/preview.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: [function () {
            this.diss=function () {
                this.close();
            }

            document.getElementById('previewHtml').innerHTML =this.resolve.param;
        }]

    })

}