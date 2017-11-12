/**
 * Created by zsh on 2017/3/24.
 */
module.exports=function (ngModule) {
    ngModule.factory('factoryFun',[function () {
        var savedData = null;
        var isLeapYear=function (year) {
            return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
        };
        var getMonthDays=function (year, month) {
            return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
        };
        return {
            set: function (data) {
                savedData = data;
            },
            get: function () {
                return savedData;
            },
            //计算时间是第几周
            getWeekNumber:function (now) {
                var year = now.getFullYear();
                var month = now.getMonth();
                var days = now.getDate();
                for (var i = 0; i < month; i++) {
                    days += getMonthDays(year, i);
                }
                var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
                var week = null;
                if (yearFirstDay==7) {
                    week = Math.ceil(days/yearFirstDay);
                }else {
                    days -= (7 - yearFirstDay -1);
                    week = Math.ceil(days / 7) + 1;
                }
                return week;
            },
            //时间戳转化成指定的格式的时间字符串
            unixToDatestring:function (unix) {
                var dateobj = new Date(unix);
                var year = dateobj.getFullYear();
                var month = dateobj.getMonth() + 1;
                var weekday = dateobj.getDate();

                if (month < 10) {
                    month = "0" + month;
                }
                if (weekday < 10) {
                    weekday = "0" + weekday;
                }
                return year + "-" + month + "-" + weekday;
            }
        }
    }]);
}