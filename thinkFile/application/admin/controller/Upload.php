<?php
/**
 * Created by PhpStorm.
 * User: zsh
 * Date: 2017/5/4
 * Time: 0:05
 */
namespace app\admin\controller;
use think\Controller;
use app\common\Commen;
use app\admin\model\Cache;
class Upload extends Controller{
    public function upImg(){
        $comFun=new Commen();
        $cache=new Cache();
        $url=$comFun->upload();
        $cache->save(['imgUrl'=>$url],['id'=>1]);
    }
}