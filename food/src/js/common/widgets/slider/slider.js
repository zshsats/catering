/**
 * Created by zsh on 2017/3/16.
 */
module.exports = function (ngModule) {
    var slider=require('./slider.html');
    ngModule.component('slider', {
        template:slider,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['serviceFun','$state',
            function (serviceFun,$state) {
                this.showMenu=[];
                this.menu=[
                   {
                       id:1,
                       name:'首页',
                       icon:'icon-shouye',
                       menuList:[],
                       stateUrl:'myHome',
                       state:false
                   },
                   {
                       id:2,
                       name:'菜品管理',
                       icon:'icon-dining',
                       menuList:[
                           {
                               id:21,
                               name:'菜品',
                               stateUrl:'dish',
                               state:false
                           },
                           {
                               id:21,
                               name:'分类',
                               stateUrl:'category',
                               state:false
                           },
                           {
                               id:22,
                               name:'单位',
                               stateUrl:'unitDish',
                               state:false
                           }
                       ],
                       stateUrl:'dish',
                       state:false
                   },
                    {
                        id:6,
                        name:'营业报表',
                        icon:'icon-fangwenliang',
                        menuList:[
                            {
                                id:61,
                                name:'营业分析',
                                stateUrl:'reportShow',
                                state:false
                            }
                        ],
                        stateUrl:'busReport',
                        state:false,
                    },
                    {
                        id: 8,
                        name: '活动管理',
                        icon:'icon-wodeyouhuiquan',
                        menuList:[
                            {
                                id:81,
                                name:'活动列表',
                                stateUrl:'activityList',
                                state:false
                            },
                            {
                                id:82,
                                name:'方案库',
                                stateUrl:'library',
                                state:false
                            },
                            {
                                id:83,
                                name:'活动图片',
                                stateUrl:'activityPhoto',
                                state:false
                            }
                        ],
                        state: false
                    },
                   {
                       id:1,
                       name:'店铺设置',
                       icon:'icon-shezhi',
                       menuList:[
                           {
                               id:11,
                               name:'店铺信息',
                               stateUrl:'shopInfo',
                               state:false
                           },
                           {
                               id:15,
                               name:'店员管理',
                               stateUrl:'clerk',
                               state:false
                           },
                           {
                               id:13,
                               name:'新闻编辑',
                               stateUrl:'shopNews',
                               state:false
                           },
                           {
                               id:16,
                               name:'新闻列表',
                               stateUrl:'newList',
                               state:false
                           }
                       ],
                       stateUrl:'shop',
                       state:false
                   }

               ]
                this.goState=function (item) {
                    if(item.state){
                        item.state=false;

                    }else{
                        this.menu.forEach(function (m) {
                            m.state=false;
                        })
                        item.state=true;
                    }

                   if(item.state && item.menuList.length==0){
                       serviceFun.goWhere(item.stateUrl);
                   }

                };
                this.go=function (unit,item) {
                    unit.state=true;
                    if(item.state && unit.state){
                        serviceFun.goWhere(unit.stateUrl);
                    }
                }
                this.goBack=function () {
                    sessionStorage.removeItem('shopState');
                    $state.go('login');
                }

            }
        ]

    })
}