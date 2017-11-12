/**
 * Created by zsh on 2017/5/13.
 */
module.exports = function (ngModule) {
    ngModule.component('acticle', {
        templateUrl:"components/news/acticle.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun',function (hintInfo,ajaxService,serviceFun) {
            if(serviceFun.getDate()){
                this.acticle=serviceFun.getDate();
                document.getElementById('countent').innerHTML =this.acticle.content;
            }
        }]

    })

 }