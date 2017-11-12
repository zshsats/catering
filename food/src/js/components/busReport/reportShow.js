/**
 * Created by zsh on 2017/4/9.
 */
module.exports = function (ngModule) {
    ngModule.component('reportShow', {
        templateUrl:"components/busReport/reportShow.html",
        controller: ['factoryFun','ajaxService',function (factoryFun,ajaxService) {
            var $ctrl = this;
            $ctrl.reportInfo = {};
            $ctrl.selected=0;
            $ctrl.dates=[
                {name:'日',value:0},
                {name:'周',value:1},
                {name:'月',value:2},
            ];
            var now = new Date();
            var secents = now.getTime();
            $ctrl.year = now.getFullYear();
            var month = now.getMonth();
            $ctrl.monthDay = month + 1;
            $ctrl.weekDay = getWeekNumber(now);
            $ctrl.reportInfo.start =new Date(secents);
            $ctrl.reportInfo.end= new Date(secents);
            $ctrl.reportInfo.startDate =factoryFun.unixToDatestring(secents);
            $ctrl.reportInfo.endDate= factoryFun.unixToDatestring(secents);
            reporstPost();
            $ctrl.selectDate=function (value,item) {
                this.selected=item.value;
                switch (value) {
                    case 0:
                        $ctrl.selected=0;
                        secents = now.getTime();
                        dayCom();
                        break;
                    case 1:
                        $ctrl.selected=1;
                        secents = now.getTime();
                        weekCom();
                        break;
                    case 2:
                        $ctrl.selected=2;
                        secents = now.getTime();
                        monthCom();
                }

            }
            $ctrl.last=function () {
                changDtae('-');
            }
            $ctrl.foot=function () {
                changDtae('+');
            }

            function changDtae(f) {
                switch ($ctrl.selected) {
                    case 0:
                        dayCom(f);
                        break;
                    case 1:
                        weekCom(f);
                        break;
                    case 2:
                        monthCom(f);
                }
            }

            function getWeekNumber(now) {
                var year = now.getFullYear();
                var days=Math.ceil((now.getTime()- new Date(year, 0, 1).getTime())/86400000);
                var firstDay = new Date(year, 0, 1).getDay() || 7;
                var week = null;
                if (firstDay == 1) {
                    week = Math.ceil(days / 7);
                }else{
                    days -=(7-firstDay+1);
                    week = Math.ceil(days / 7);
                }
                return week;
            }
            this.day=function () {
                var sec=$ctrl.reportInfo.start.getTime();
                $ctrl.reportInfo.startDate = factoryFun.unixToDatestring(sec);
                $ctrl.reportInfo.endDate = factoryFun.unixToDatestring(sec);
                reporstPost();
                console.log($ctrl.reportInfo.startDate);
                console.log($ctrl.reportInfo.endDate);
            }
            var dayCom=function (f) {
                $ctrl.reportResult=null;
                if($ctrl.reportInfo.start){
                    var secents=$ctrl.reportInfo.start.getTime();
                    var days = new Date(secents).getDate();
                }
                if(f=='-'){
                    secents = new Date(secents).setDate(days-1);
                }
                if(f=='+'){
                    secents = new Date(secents).setDate(days+1);
                }
                $ctrl.reportInfo.start=new Date(secents);
                $ctrl.reportInfo.startDate = factoryFun.unixToDatestring(secents);
                $ctrl.reportInfo.endDate = factoryFun.unixToDatestring(secents);
                reporstPost();
                console.log($ctrl.reportInfo.startDate);
                console.log($ctrl.reportInfo.endDate);
            }
            var weekCom = function (f) {
                $ctrl.reportResult=null;
                var days = new Date(secents).getDate();
                var week = new Date(secents).getDay();
                if (f == '-') {
                    secents = new Date(secents).setDate(days - 6 - week);
                }else if (f == '+') {
                    secents = new Date(secents).setDate(days + 8 - week);
                }else{
                    secents= new Date(secents).setDate(days -6-week);
                }
                $ctrl.year = new Date(secents).getFullYear();
                $ctrl.weekDay = getWeekNumber(new Date(factoryFun.unixToDatestring(secents)));
                $ctrl.reportInfo.startDate = factoryFun.unixToDatestring(secents);
                $ctrl.reportInfo.endDate = factoryFun.unixToDatestring(secents + 6 * 24 * 60 * 60 * 1000);
                reporstPost();
                console.log($ctrl.reportInfo.startDate);
                console.log($ctrl.reportInfo.endDate);
            }
            var monthCom = function (f) {
                $ctrl.reportResult=null;
                month = new Date(secents).getMonth();
                if (f == '-') {
                    secents = new Date(secents).setMonth(month - 1);
                }else if (f == '+') {
                    secents = new Date(secents).setMonth(month + 1);
                }
                secents = new Date(secents).setDate(1);
                $ctrl.monthDay = new Date(secents).getMonth() + 1;
                $ctrl.year = new Date(secents).getFullYear();
                console.log(new Date($ctrl.year,$ctrl.monthDay,0).getDate());
                var endSecents=(new Date($ctrl.year,$ctrl.monthDay,0).getDate()-1)* 24 * 60 * 60 * 1000+parseInt(secents);
                $ctrl.reportInfo.startDate = factoryFun.unixToDatestring(secents);
                $ctrl.reportInfo.endDate = factoryFun.unixToDatestring(endSecents);
                reporstPost();
                console.log($ctrl.reportInfo.startDate);
                console.log($ctrl.reportInfo.endDate);
            }

            function reporstPost() {
                var send= {start:$ctrl.reportInfo.startDate,end:$ctrl.reportInfo.endDate}
                ajaxService.ajaxPost('Order/dateFind',send).then(function (result) {
                    $ctrl.reportResult=result;
                    console.log(result);
                }.bind(this));
            }




        }]

    })

}