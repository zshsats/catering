/**
 * Created by zsh on 2017/3/23.
 */
module.exports=function (ngModule) {
    ngModule.service('serviceFun',['$state','$http','$q','$rootScope','hintInfo',function ($state,$http,$q,$rootScope,hintInfo) {
          var savedData=null;
          var savedCtrl=null;
          var skip=function (stateUrl, param) {
            if ($rootScope.homeState) {
                if(param){
                    $state.go('home.' + stateUrl, {
                        id: param
                    });
                }else{
                    $state.go('home.' + stateUrl)
                }
            }
        };
          return {
              setDate: function (data) {
                  savedData = data;
              },
              getDate: function () {
                  return savedData;
              },
              setCtrl: function (data) {
                  savedCtrl = data;
              },
              getCtrl: function () {
                  return savedCtrl;
              },
              goWhere:function (stateUrl) {
                  savedData=null;
                  skip(stateUrl);
              },
              goShow:function(stateUrl, param){
                  skip(stateUrl, param);
              },
              brush:function (self) {
                  if(self){
                      hintInfo.hint({size:'',type:'back',val:'你的操作已经成功了'});
                      self.refresh();
                  }
              },
              goWhate:function (state,self) {
                  skip(state);
                  if(self){
                      this.getCtrl().refresh();
                      self.close();
                      hintInfo.hint({size:'',type:'back',val:'你的操作已经成功了'});
                  }

              }

          }
    }]);
}