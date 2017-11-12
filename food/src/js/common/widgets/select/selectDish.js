/**
 * Created by zsh on 2017/4/29.
 */
module.exports = function (ngModule) {
    var dish=require('./selectDish.html');
    ngModule.component('selectDish', {
        template:dish,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo', 'ajaxService', 'serviceFun', function (hintInfo, ajaxService, serviceFun) {
            this.selectDish=[];
            this.selects=[];
            this.count=0;
            ajaxService.ajaxPost('business/findDish').then(function (result) {
                this.dishes=result;
            }.bind(this));
            //全选分类的菜品
            this.selectCal=function (ary,items){
                if(items.checked){
                    this.selects[ary]=[];
                    items.dishlst.forEach(function (item) {
                        this.count+=1;
                        this.selects[ary].push(item)
                    }.bind(this))
                }else{
                    this.selects[ary]=[];
                }

            }
            this.save=function () {
               this.selects.forEach(function (item) {
                  item.forEach(function (unit) {
                      this.selectDish.push(unit);
                  }.bind(this))
               }.bind(this));
                this.close({$value:this.selectDish});
            }
        }]
    })
}