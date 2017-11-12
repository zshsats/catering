/**
 * Created by zsh on 2017/3/20.
 */
module.exports = function (ngModule){
    var header=require('./header.html');
    ngModule.component('header',{
        template:header,
        bindings: {
            title: '='
        },
        controller:[
            function () {

        }]
    })
}