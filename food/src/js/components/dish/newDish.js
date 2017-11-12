
/**
 * Created by zsh on 2017/3/30.
 */
module.exports = function (ngModule) {
    ngModule.component('newDish', {
        templateUrl:"components/dish/newDish.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun','factoryFun',function (hintInfo,ajaxService,serviceFun,factoryFun) {
            this.newdish={
                photoUrl:''
            };
            //获得菜品分类数据
            ajaxService.ajaxPost('Category/findCategory',{}).then(function (result) {
                this.cats=result;
                this.newdish.category_id=result[0].id+'';
            }.bind(this));
            //获得菜品单位数据
            ajaxService.ajaxPost('Unit/findUnit',{}).then(function (result) {
                this.units=result;
                this.newdish.unit=result[0].unit;
            }.bind(this));
            //根据Id查询菜品
            if(this.resolve.param){
                ajaxService.ajaxPost('dish/idFind',{id:this.resolve.param}).then(function (result) {
                    this.newdish=result;
                    this.newdish.category_id=this.newdish.category_id+'';
                    console.log(this.newdish);
                }.bind(this));
            }
            //修改和新增菜品
            var dishUp=function(url) {
                this.newdish.category_id=parseInt(this.newdish.category_id);
                ajaxService.ajaxPost(url, this.newdish).then(function (result) {
                    serviceFun.goWhate('dish');
                }.bind(this));
            }.bind(this);
            this.save=function () {
                var ul='dish/addDish';
                if(this.resolve.param){
                    ul='dish/upDish';
                }
                dishUp(ul);
                serviceFun.goWhate('dish',this);

            }
            //删除菜品
            this.delDish=function () {
                hintInfo.hint({size:'sm',type:'ok',val:'确认是否删除？'}).then(function (result) {
                     ajaxService.ajaxPost('dish/delDish',{id:this.resolve.param}).then(function (result) {
                         serviceFun.goWhate('dish',this);
                    }.bind(this));

                }.bind(this));

            }
        }]

    })

}