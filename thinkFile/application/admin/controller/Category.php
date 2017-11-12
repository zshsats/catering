<?php
/**
 * Created by PhpStorm.
 * User: zsh
 * Date: 2017/4/8
 * Time: 13:38
 */
namespace app\admin\controller;
use think\Controller;
use app\common\Commen;
use app\admin\model\Category as Categorys;
use app\admin\model\Cache;
Class Category extends Controller{
    public function findCategory(){
        $comFun=new Commen();
        $cat=new Categorys();
        $data=$comFun->ajaxBack();
        if($data==null){
            if( $backData=$cat->all()){
                return json(array(
                    'data'=>$backData,
                    'result'=>1
                ));
            }
        }else{
            return json(array(
                'data'=>'',
                'result'=>-1
            ));
        }
        exit();
    }
    public function addCategory(){
        $comFun=new Commen();
        $cat=new Categorys();
        $data=$comFun->ajaxBack('name');
        if($data!=null){
            $cat->data([
                'name'=>$data,
            ]);
            if($cat->save()){
                return json(array(
                    'data'=>'',
                    'result'=>1
                ));
            }else{
                return json(array(
                    'data'=>'',
                    'result'=>-1
                ));
            }

        }
        exit();
    }
    public function delCategory(){
        $comFun=new Commen();
        $data=$comFun->ajaxBack('id');
        $cat=Categorys::get($data);
        if(!empty($data)){
            if($cat->delete()){
                return json(array(
                    'data'=>'',
                    'result'=>1
                ));
            }else{
                return json(array(
                    'data'=>'',
                    'result'=>-1
                ));
            }

        }
        exit();
    }
}