/**
 * Created by zsh on 2017/3/23.
 */
module.exports = function (ngModule) {
    ngModule.component('shopInfo', {
        templateUrl:"components/shopInfo/shopInfo.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','factoryFun','$filter','serviceFun',function (hintInfo,ajaxService,factoryFun,$filter,serviceFun) {
            this.shopInfo={};
            //实例化高德地图
            serviceFun.setCtrl(this);
            var map = new AMap.Map("container", {
                resizeEnable: true
            });
            //使用地图左侧的条形工具
            map.plugin(["AMap.ToolBar"], function() {
                map.addControl(new AMap.ToolBar());
            });
            if(location.href.indexOf('&guide=1')!==-1){
                map.setStatus({scrollWheel:false})
            }
            //请求后台数据,并处理
            this.refresh=function () {
                ajaxService.ajaxPost('shop/findInfo',{}).then(function (result) {
                    this.shopInfo=result;
                    this.shopInfo.startDate=$filter('date')(new Date(this.shopInfo.startDate),'yyyy-MM-dd');
                    this.shopInfo.endDate=$filter('date')(new Date(this.shopInfo.endDate),'yyyy-MM-dd');
                    this.shopInfo.startTime=result.startTime.substring(11);
                    this.shopInfo.endTime=result.endTime.substring(11);
                    var m=0;
                    for(var key in result){
                        if(!result[key]){
                            m++
                        }

                    }
                    this.num=Math.round((12-m)/12*100);
                    //配置高德地图的参数
                    AMap.service(["AMap.PlaceSearch"], function() {
                        var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                            pageSize: 5,
                            pageIndex: 1,
                            map: map,
                            panel: "panel"
                        });
                        //关键字查询
                       console.log(this.shopInfo.cityId);
                        placeSearch.setCity(this.shopInfo.cityId);
                        placeSearch.search(this.shopInfo.address, function(status, result) {

                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }
            this.refresh();
            this.resiveInfo=function () {
                hintInfo.hint({commont:'reviseInfo',size:'lg',param:this.shopInfo.id}).then(function (result) {

                }.bind(this));
            }



;
        }]

    })

}