/**
 * Created by zsh on 2017/4/14.
 */
module.exports = function (ngModule) {
    ngModule.component('newClert', {
        templateUrl:"components/shopInfo/newClert.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun','$state',function (hintInfo,ajaxService,serviceFun,$state) {
            this.clertInfo={
                sex:'男士'
            };

            var url='clert/addClert';
            if(this.resolve.param){
                ajaxService.ajaxPost('clert/idFind',{id:this.resolve.param}).then(function (result) {
                   this.clertInfo=result;
                }.bind(this))
                url='clert/upClert';

            }
            this.addClert=function () {
                ajaxService.ajaxPost(url,this.clertInfo).then(function (result) {
                    serviceFun.goWhate('clerk',this);
                }.bind(this))
            }
            this.checkSex=function () {

                console.log(this.clertInfo.sex);
            }
        }]

    })

}