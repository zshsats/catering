/**
 * Created by zsh on 2017/3/31.
 */
module.exports = function (ngModule) {
    ngModule.component('unitDish', {
        templateUrl:"components/dish/unitDish.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['ajaxService','serviceFun',function (ajaxService,serviceFun) {
            this.units=[];
            this.refresh=function () {
                ajaxService.ajaxPost('Unit/findUnit',{}).then(function (result) {
                    this.units=result;
                }.bind(this));
            }
            this.refresh();
            this.addUnit=function () {
                if(this.unitName){
                    ajaxService.ajaxPost('Unit/addUnit',{unit:this.unitName}).then(function (result) {
                        serviceFun.brush(this);
                    }.bind(this));

                }
            }
            this.delUnit=function (item) {
                ajaxService.ajaxPost('Unit/delUnit',{id:item.id}).then(function (result) {
                    serviceFun.brush(this);
                }.bind(this));
            }
            this.diss=function () {
                this.close();
            }

        }]

    })

}