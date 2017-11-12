/**
 * Created by zsh on 2017/3/31.
 */
module.exports = function (ngModule) {
    ngModule.component('category', {
        templateUrl:"components/dish/category.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['ajaxService','serviceFun',function (ajaxService,serviceFun) {
            this.categorys=[];
            this.refresh=function () {
                ajaxService.ajaxPost('Category/findCategory',{}).then(function (result) {
                    this.categorys=result;
                }.bind(this));
            }
            this.refresh();
            this.addCate=function () {
                if(this.cateName){
                    ajaxService.ajaxPost('Category/addCategory',{name:this.cateName}).then(function (result) {
                        serviceFun.brush(this);
                    }.bind(this));

                }
            }
            this.delCate=function (item) {
                ajaxService.ajaxPost('Category/delCategory',{id:item.id}).then(function (result) {
                    serviceFun.brush(this);
                }.bind(this));
            }

            this.diss=function () {
                this.close();
            }

        }]

    })

}