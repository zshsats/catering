<?php
/**
 * Created by PhpStorm.
 * User: zsh
 * Date: 2017/4/6
 * Time: 8:51
 */
namespace app\common;
use think\Request;
class Commen{
    public function ajaxBack($name=null){
        $req=Request::instance();
        if(var_export($req->isAjax(), true)){
            $data=$req->param();
            if(empty($data)){
                return $data;
            }else{
                $data=$req->param($name);
                return $data;
            }

        }
    }
    public function upload(){
// 获取表单上传文件
        $req = Request::instance();
        if (var_export($req->isAjax(), true)) {
            $file = $req->file('file');
            if (empty($file)) {
                return '请选择上传的图片';
            }
            $info = $file->move('./public/images');
            if ($info) {
                $num=strpos($info->getRealPath(),'public');
                $trl=substr($info->getRealPath(),$num);
                $urlAry=explode("\\",$trl);
                $s=implode('/',$urlAry);
                return 'http://localhost/thinkFile/'.$s;
            } else {
                return $file->getError();
            }
        }
    }

}