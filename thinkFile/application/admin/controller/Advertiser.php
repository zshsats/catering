<?php
/**
 * Created by PhpStorm.
 * User: zsh
 * Date: 2017/5/8
 * Time: 0:37
 */
namespace app\admin\controller;
use think\Controller;
use app\common\Commen;
use app\admin\model\Cache;
use app\admin\model\News;
Class Advertiser extends Controller{
    public function addNews(){
        $comFun=new Commen();
        $new =new News();
        $data=$comFun->ajaxBack();
        $new->data($data);
        if($data!=null){
            $new->save();
            return json(array(
                'data'=>$data,
                'result'=>1
            ));
        }
    }
    public function findNews(){
        $comFun=new Commen();
        $data=$comFun->ajaxBack();
        if($data==null){
            $backData=News::all();
            return json(array(
                'data'=>$backData,
                'result'=>1
            ));
        }
    }
    public function idFind(){
        $comFun=new Commen();
        $data=$comFun->ajaxBack('id');
        if($data!=null){
            $backData=News::get($data);
            return json(array(
                'data'=>$backData,
                'result'=>1
            ));
        }
    }
    public function delNews(){
        $comFun=new Commen();
        $new=new News();
        $data=$comFun->ajaxBack();
        if($data!=null){
            if(News::destroy(['id'=>$data['id']])){
                return json(array(
                    'data'=>'',
                    'result'=>1
                ));
            }
        }
    }




}