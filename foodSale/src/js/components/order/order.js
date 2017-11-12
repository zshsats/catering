/**
 * Created by zsh on 2017/4/28.
 */
module.exports = function (ngModule) {
    ngModule.component('order', {
        templateUrl:"components/order/order.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun',function (hintInfo,ajaxService,serviceFun) {
            serviceFun.setCtrl(this);
            this.refresh=function () {
                ajaxService.ajaxPost('order/findOrder',{}).then(function (result) {
                    this.orders=result;
                }.bind(this));
            }
            this.refresh();
            this.delOrder=function (item) {
                hintInfo.hint({size:'sm',type:'ok',val:'是否要删除此订单？'}).then(function (result) {
                    ajaxService.ajaxPost('order/delOrder',{id:item.id,code:item.code}).then(function (result) {
                        serviceFun.brush(this);
                    }.bind(this));
                }.bind(this));
            }
            this.goOrder=function (code) {
                ajaxService.ajaxPost('order/orderInfo',{id:code}).then(function (result) {
                    hintInfo.hint({commont:'orderInfo',size:'lg',param:result}).then(function (result) {
                        this.orders.forEach(function (item) {
                            if(item.code==result.n){
                                item.state='已做';
                                ajaxService.ajaxPost('order/upTotal',item).then(function (result) {
                                   serviceFun.brush(this);
                                }.bind(this));
                            }

                        }.bind(this));

                    }.bind(this));
                }.bind(this));
            }
        }]

    })

}