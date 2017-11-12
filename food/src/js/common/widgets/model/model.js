/**
 * Created by zsh on 2017/3/24.
 */
module.exports=function (ngModule) {
    ngModule.factory('hintInfo',['$uibModal','$q',function ($uibModal,$q) {
        var model=require('./model.html');
        return {
            hint:function (info) {
                var deferred = $q.defer();
                var modalInstance=null;
                if(info.commont){
                    modalInstance= $uibModal.open({
                        component:info.commont,
                        size: info.size,
                        resolve: {
                            param: function () {
                                return info.param;
                            }
                        }
                    });
                }else{
                    modalInstance = $uibModal.open({
                        template:model,
                        controller: 'infoMsg',
                        size: info.size,
                        backdrop:true,
                        resolve: {
                            param: function () {
                                return info;
                            }
                        }
                    });
                }
                modalInstance.result.then(function (info) {
                    deferred.resolve(info);
                }, function (reason) {
                    deferred.reject(reason);

                });
                return deferred.promise;
            }
        }
    }]);
    ngModule.controller('infoMsg',['$scope','param','$timeout','$uibModalInstance',function ($scope,param,$timeout,$uibModalInstance) {
        $scope.info=param;
        $scope.show=true;
        if($scope.info.type=='ok'){
            if($scope.info.val){
                $scope.content=$scope.info.val;
            }
        }
        if($scope.info.todo){
            $uibModalInstance.close();
        }
        $scope.ok=function () {
            $uibModalInstance.close();
        }
        $scope.dis=function () {
            $uibModalInstance.dismiss({type:'dis'});
        }
        if($scope.info.type=='back'){
            $scope.show=false;
            if($scope.info.val){
                $scope.content=$scope.info.val;
            }
            $timeout(function () {
                $uibModalInstance.dismiss({type:'dis'});
            },1000);
        }


    }])
}