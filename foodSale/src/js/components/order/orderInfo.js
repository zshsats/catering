/**
 * Created by zsh on 2017/5/9.
 */
module.exports = function (ngModule) {
    ngModule.component('orderInfo', {
        templateUrl:"components/order/orderInfo.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun',function (hintInfo,ajaxService,serviceFun) {
            this.orderInfo=this.resolve.param;
            this.orderOver=[];


            this.save=function () {
                var num=null;
                if(this.orderOver.length==this.orderInfo.length){
                    this.orderOver.forEach(function (item) {
                        num=item.code;
                    })
                    this.close({$value:{n:num}});
                }else{
                    hintInfo.hint({size:'',type:'ok',val:'你的菜品没有做完请继续'});
                }

            }
        }]

    })

}