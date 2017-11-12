/**
 * Created by zsh on 2017/4/1.
 */
module.exports = function (ngModule) {
    ngModule.component('shopNews', {
        templateUrl:"components/shopInfo/shopNews.html",
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ['hintInfo','ajaxService','serviceFun',function (hintInfo,ajaxService,serviceFun) {
            this.content=null;
            var myEditor=null;
            //调用百度文本编辑器的函数
            this.ready = function(editor){
                myEditor=editor;
                //获得编辑器的对象
                var oDiv=document.getElementById("widthoff");
                //配置后台的地址
                var ue = UE.getEditor('.ueditor',{
                    serverUrl :'http://localhost/phpFile/public/ueditor/php/controller.php'
                });
            };
            //配置编辑器的参数
            this.config={
               content : '<p>请编辑店铺新闻</p>',
               //是否聚焦 focus默认为false  
               focus : true,
               //首行缩进距离,默认是2em  
               indentValue:'2em',
               //初始化编辑器宽度,默认1000  
               initialFrameWidth:'100%',
               //初始化编辑器高度,默认320  
               initialFrameHeight:'500',
               //编辑器初始化结束后,编辑区域是否是只读的，默认是false  
               readonly : false ,
               //启用自动保存  
               enableAutoSave: false,
               //自动保存间隔时间， 单位ms  
               saveInterval: 500,
               //是否开启初始化时即全屏，默认关闭  
               fullscreen : false,
               //图片操作的浮层开关，默认打开  
               imagePopup:true,
               //提交到后台的数据是否包含整个html字符串
           }
            //获得编辑器的内容
            var look=null;
            this.formLook=function () {
                look=myEditor.getContent();
                hintInfo.hint({commont:'preview',size:'lg',param:look});
            }
            this.save=function () {
                this.newsInfo.content=myEditor.getContent();
                ajaxService.ajaxPost('advertiser/addNews',this.newsInfo).then(function (result) {
                    this.newsInfo={};
                    myEditor.setContent('')
                    serviceFun.brush(this);
                }.bind(this));
            }

        }]

    })

}