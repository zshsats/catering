/**
 * Created by zsh on 2017/5/9.
 */
module.exports = function (ngModule) {
    ngModule.component('activityDish', {
        templateUrl:"components/activity/activityDish.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun',function (hintInfo,ajaxService,serviceFun) {
            this.selectDish=[];
            this.total=0;
            this.actPrice=0;
            this.actInfo=this.resolve.param.lists;
            this.actInfo.forEach(function (item) {
                this.total+=parseInt(item.salePrice);
            }.bind(this));
            this.save=function () {
                var sendDish={
                    lists:this.selectDish,
                    full:this.resolve.param.full,
                    cut:this.resolve.param.cut,
                    actPrice:this.actPrice,
                    type:1 //满减
                }
                this.close({$value:sendDish});
            }
            this.select=function (value,checked) {
                if (checked) {
                    this.actPrice+=value.salePrice*value.num;
                    value.disale=true;
                    if(this.actPrice>=this.resolve.param.full){
                        this.actPrice-=this.resolve.param.cut;
                        this.content='你所买的菜品达到满'+this.resolve.param.full+'减'+this.resolve.param.cut+'你需要付'+ this.actPrice+'元。'
                    }
                }else{
                    this.actPrice-=value.salePrice*value.num;
                    value.disale=false;
                }
                console.log( this.actPrice);
            }.bind(this)
            this.changTotal=function (dishs) {
                this.total=0;
                dishs.forEach(function (item) {
                    if(item.num){
                        this.total+=parseInt(item.salePrice)*parseInt(item.num);
                    }
                }.bind(this));
            }.bind(this);

        }]

    })

}