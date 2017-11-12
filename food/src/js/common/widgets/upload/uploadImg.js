/**
 * Created by zsh on 2017/4/10.
 */
module.exports = function (ngModule) {
    var upload=require('./uploadImg.html');
    ngModule.component('uploadImg', {
        template:upload,
        bindings: {
            up: '=',
            img:'=',
            height:'='

        },
        controller: ['FileUploader',function (FileUploader) {
             this.uploader =new FileUploader({
                 url:'http://localhost/thinkFile/admin.php/admin/upload/upImg',
                 queueLimit: 1
             });
            this.uploader.filters.push({
                name: 'imageFilter',
                fn: function(item, options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });

        }]

    })




}