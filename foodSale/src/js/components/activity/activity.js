/**
 * Created by zsh on 2017/4/29.
 */
module.exports = function (ngModule) {
    ngModule.component('activity', {
        templateUrl:"components/activity/activity.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','$state','serviceFun',function (hintInfo,ajaxService,$state,serviceFun) {
            //图片轮播的配置
            this.myInterval = 5000;
            this.noWrapSlides = false;
            this.active = 0;
            //查看参与活动的菜品
            ajaxService.ajaxPost('create/findSelect',{}).then(function (result) {
                result.forEach(function (item) {
                    item.state=false;
                    if(new Date(item.endDate).getTime()>new Date().getTime()){
                        item.state=true;
                    }
                    item.startDate=item.startDate.substring(0,10);
                    item.endDate=item.endDate.substring(0,10);

                })
                this.dishes=result;
            }.bind(this));
            //查看banner图数据
            ajaxService.ajaxPost('create/findBanner',{}).then(function (result) {
                this.slides=result;
                var currIndex = 0;
                function assignNewIndexesToSlides(indexes) {
                    for (var i = 0, l = this.slides.length; i < l; i++) {
                        this.slides[i].num = indexes.pop();
                    }
                }
                // http://stackoverflow.com/questions/962802#962890

            }.bind(this));

            function generateIndexesArray() {
                var indexes = [];
                for (var i = 0; i < currIndex; ++i) {
                    indexes[i] = i;
                }
                return shuffle(indexes);
            }
            function shuffle(array) {
                var tmp, current, top = array.length;

                if (top) {
                    while (--top) {
                        current = Math.floor(Math.random() * (top + 1));
                        tmp = array[current];
                        array[current] = array[top];
                        array[top] = tmp;
                    }
                }

                return array;
            }
            //模块调转传递参数
            this.goAct=function (dishes) {
                if(dishes.lists.length==0){
                    var send={
                        full:dishes.full,
                        cut:dishes.cut,
                        state:1
                    }
                    serviceFun.goState('home',send);
                }else{
                    hintInfo.hint({commont:'activityDish',size:'lg',param:dishes}).then(function (result) {
                        serviceFun.goState('home',result);
                    });
                }

            }

        }]

    })

}