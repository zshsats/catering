/**
 * Created by zsh on 2017/3/23.
 */

module.exports = function (ngModule) {
    ngModule.component('dish', {
        templateUrl:"components/dish/dish.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun',function (hintInfo,ajaxService,serviceFun) {
            serviceFun.setCtrl(this);
            this.selected=true;
            this.refresh=function () {
                ajaxService.ajaxPost('Category/findCategory',{}).then(function (result) {
                    this.categorys=result;
                }.bind(this));
                ajaxService.ajaxPost('dish/findDish',{}).then(function (result) {
                    this.dishes=result;

                }.bind(this));
            }
            this.refresh();
            this.selectCat=function (index,cat) {
                this.selected=index;
                this.dishes=[];
                ajaxService.ajaxPost('dish/findDish',{id:cat.id}).then(function (result) {
                    this.dishes=result;
                }.bind(this));


            };
            this.selectAll=function () {
                this.selected=true;
                ajaxService.ajaxPost('dish/findDish',{}).then(function (result) {
                    this.dishes=result;
                }.bind(this));
            }
            this.newAdd=function () {
                hintInfo.hint({commont:'newDish',size:'lg',param:null}).then(function (result) {

                });
            }
            this.reviseDish=function (dishId) {
                hintInfo.hint({commont:'newDish',size:'lg',param:dishId});
            }
        }]

    })

}