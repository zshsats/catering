/**
 * Created by zsh on 2017/4/28.
 */
module.exports = function (ngModule) {
    ngModule.component('home', {
        templateUrl:"components/home/home.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun','$state',function (hintInfo,ajaxService,serviceFun,$state) {
            this.selectDish=[];
            this.total=0;
            this.orderDish=[];
            var sendDate=serviceFun.getDate();

             //菜品的查询
            this.init=function () {
                ajaxService.ajaxPost('business/findDish').then(function (result) {
                    this.dishes=result;
                    if(sendDate && sendDate.state!=1){
                        this.actDish=serviceFun.getDate();
                        this.selectDish=findSelect(this.dishes,this.actDish.lists);
                        this.orderDish=angular.copy(this.actDish.lists);
                        this.total=this.actDish.actPrice;
                    }
                    if(sendDate.state==1){
                        if(sendDate.state==1){
                            hintInfo.hint({size:'sm',type:'ok',val:'全场满'+sendDate.full+'减'+sendDate.cut+'赶快行动吧！'});

                        }
                    }
                }.bind(this));
            };
            this.init();
            //计算总价
            this.changTotal=function (dishs) {
                this.total=0;
                  dishs.forEach(function (item) {
                      if(item.num){
                          this.total+=parseInt(item.salePrice)*parseInt(item.num);
                      }
                  }.bind(this));
            }.bind(this);
            //价格动态变化
            this.select=function (value,checked) {
                if (checked) {
                    this.total+=value.salePrice;
                    value.num=1;
                    this.orderDish.push(value);
                }else{
                    this.total-=value.salePrice;
                    _.remove(this.orderDish,function (item) {
                        return item.id==value.id;
                    }.bind(this));
                }
            }.bind(this)
            this.delDish=function (list,lists) {
                lists=_.pull(lists,list);
                _.remove(this.selectDish,function (item) {
                        return item.id==list.id;
                }.bind(this));
            }
            //结算
            this.getMony=function () {
                var ac=0;
                if(sendDate){
                    if(sendDate.state==1){
                        if(this.total>sendDate.full){
                            this.total=parseInt(this.total-sendDate.cut);
                            ac=sendDate.cut;
                            hintInfo.hint({size:'sm',type:'ok',val:"已经为你优惠"+sendDate.cut+'你实际应付：'+ this.total+'元'});
                        }
                    }
                }
                var send={};
                if(this.actDish){
                    send={
                        seat:this.codeId,
                        getPrice:parseInt(this.total),
                        actPrice:this.actDish.actPrice,
                        orderDish:this.orderDish
                    }
                }else{
                    send={
                        seat:this.codeId,
                        getPrice: this.total,
                        actPrice:ac,
                        orderDish:this.orderDish
                    }
                }
                if(!this.codeId){
                    hintInfo.hint({size:'sm',type:'ok',val:'请输入正确的座位编号？'});
                }else{
                    this.orderDish.forEach(function (item) {
                        item.codeId=this.codeId;
                    }.bind(this));
                    hintInfo.hint({commont:'pay',size:'lg',param:send});

                }
            }
            //展示菜品详情
            this.goDetail=function (unit) {

                hintInfo.hint({commont:'dishDetail',size:'lg',param:unit});
            }
            //取消订单
            this.disOrder=function () {
                this.orderDish=[];
                this.selectDish=[];
                this.total=0;
            }
            //匹配活动的菜品
             function findSelect(dishes,actdish) {
                var selected=[];
                console.log(actdish);
                 dishes.forEach(function (item) {
                     item.dishlst.forEach(function (unit) {
                         actdish.forEach(function (dis) {
                             if(dis.id==unit.id){
                                 selected.push(unit);
                             }
                         });
                     });
                 });
                 return selected;
             }
        }]

    })

}