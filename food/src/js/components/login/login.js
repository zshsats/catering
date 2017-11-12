/**
 * Created by zsh on 2017/4/9.
 */
module.exports = function (ngModule) {
    ngModule.component('login', {
        templateUrl:"components/login/login.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['$state','$stateParams',function ($state,$stateParams) {
               if(this.selected!=1){
                   this.selected=1;
                   $state.go('login.shopLogin');
               }
               if($stateParams.id=='2'){
                   this.selected=2;
                   $state.go('login.empLogin');
               }
               this.select=function (item) {
                   if(item==1){
                       this.selected=1;
                       $state.go('login.shopLogin');
                   }
                   if(item==2){
                       this.selected=2;
                       $state.go('login.empLogin');
                   }
               }
               this.login=function () {
                   $state.go('home.myHome');
               }

        }]

    })

}