/**
 * Created by zsh on 2017/3/30.
 */
module.exports = function (ngModule) {
    ngModule.component('reviseInfo', {
        templateUrl:"components/shopInfo/reviseInfo.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['constant','ajaxService','serviceFun',function (constant,ajaxService,serviceFun) {
            this.reviseInfo={};
            this.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1,
                showWeeks: false
            };
            var formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            this.format = formats[0];
            this.lists=angular.copy(constant.cityAry);
            this.reviseInfo.cityId='1852';
            ajaxService.ajaxPost('shop/findInfo',{}).then(function (result) {
                this.reviseInfo=result;
                this.reviseInfo.province=this.lists[0].province;
                this.reviseInfo.startDate=new Date(this.reviseInfo.startDate);
                this.reviseInfo.endDate=new Date(this.reviseInfo.endDate);
                this.lists.forEach(function (unit) {
                    if(this.reviseInfo.province==unit.province){
                        this.citys=unit.cityLists;
                        this.reviseInfo.city=this.citys[0].city;
                    }
                }.bind(this))
            }.bind(this));


            this.checkItem=function () {
                this.lists.forEach(function (unit) {
                    if(this.reviseInfo.province==unit.province){
                        this.citys=unit.cityLists;
                        if(this.citys.length==1){
                            this.reviseInfo.cityId=this.citys[0].code;
                            console.log(this.reviseInfo.cityId);
                        }
                        this.reviseInfo.city=this.citys[0].city;
                    }
                }.bind(this))
            }.bind(this)
            this.codeSelect=function () {
                 this.citys.forEach(function (item) {
                     console.log(item);
                     if(item.city==this.reviseInfo.city){
                         this.reviseInfo.cityId=item.code;
                         console.log(this.reviseInfo.cityId);

                     }
                 }.bind(this))
            }
            this.save=function () {
                ajaxService.ajaxPost('shop/upInfo',this.reviseInfo).then(function (result) {
                    serviceFun.goWhate('shopInfo',this);
                    this.close();
                }.bind(this));
            }

        }]

    })

}

