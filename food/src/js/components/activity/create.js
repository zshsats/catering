/**
 * Created by zsh on 2017/4/17.
 */
module.exports = function (ngModule) {
    ngModule.component('create', {
        templateUrl:"components/activity/create.html",
        bindings: {
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','$stateParams','serviceFun',function (hintInfo,ajaxService,$stateParams,serviceFun) {
            this.actInfo={};
            var dishs=[];
            var num=$stateParams.id;
            this.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1,
                showWeeks: false
            };
            var formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            this.format = formats[0];
            if(num){
                   ajaxService.ajaxPost('create/idActicity',{id:num}).then(function (result) {
                       result.startDate=new Date(result.startDate);
                       result.endDate=new Date(result.endDate);
                       this.actInfo=result;
                       this.selectDishs=this.actInfo['lists'];
                   }.bind(this));
            }
            this.selectDish=function () {
                hintInfo.hint({commont:'selectDish',size:'lg',param:null}).then(function (result) {
                    this.selectDishs=result;
                    this.selectDishs.forEach(function (item) {
                        dishs.push(item.id);
                    });

                }.bind(this));
            }
            this.save=function () {
                if(dishs){
                    this.actInfo.lists=dishs.join('|');
                }
                var url='create/createDiscount';
                if(num){
                    this.actInfo.id=num;
                    url='create/upCreate';
                }
                ajaxService.ajaxPost(url,this.actInfo).then(function (result) {
                    serviceFun.goWhate('activityList',this);
                });
            }
            this.del=function () {
                ajaxService.ajaxPost('create/delActivity',{id:parseInt(num)}).then(function (result) {
                    serviceFun.goWhate('activityList',this);
                });

            }
        }]

    })

}