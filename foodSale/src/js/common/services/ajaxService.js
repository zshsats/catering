/**
 * Created by zsh on 2017/3/24.
 */
module.exports=function (ngModule) {
    ngModule.factory('httpInterceptor',['$q',function ($q) {
        var path='http://localhost/thinkFile/admin.php/admin/';
        return {
            request:function (config) {
                if(config.method === 'POST'){
                    config.url=path+config.url;
                }
                return config || $q.when(config);
            },
            requestError:function (rejection) {
                return $q.reject(rejection);
            },
            response:function (response){
                if (response.data.result ===-1) {
                    return $q.reject(response);
                }
                return response || $q.when(response);
            },
            responseError:function (response) {
                return $q.reject(response);
            }
        }
    }]);
    ngModule.service("ajaxService", ['$http', '$q','hintInfo',function ($http,$q,hintInfo) {
        return{
            ajaxPost:function (ajaxUrl,reqData) {
                var delay = $q.defer();
                $http.post(ajaxUrl,reqData).then(function(result){

                    delay.resolve(result.data.data);
                },function (result) {
                    if(result.data){
                        hintInfo.hint({size:'sm',type:'ok',val:result.data.data});
                    }else {
                        hintInfo.hint({size:'sm',type:'ok',val:'服务器出问题了，请稍后访问！'});
                    }
                });
                return delay.promise;
            }
        }
    }]);
}