<?php
/**
 * Created by PhpStorm.
 * User: zsh
 * Date: 2017/4/8
 * Time: 0:29
 */
namespace app\admin\controller;
use think\Controller;
use app\common\Commen;
use app\admin\model\Dish as Dishes;
use app\admin\model\Cache;
use think\Request;
Class Dish extends Controller{
//    查询所有菜品
    public function findDish(){
        $comFun=new Commen();
        $dish=new Dishes();
        $data=$comFun->ajaxBack();
        if($data!=null){
            if( $backData=$dish->all([
                  'category_id'=>$data['id'],
            ])){
                return json(array(
                    'data'=>$backData,
                    'result'=>1
                ));
            }else{
                return json(array(
                    'data'=>'该分类下没有菜品，请添加菜品',
                    'result'=>-1
                ));
            }
        }else{
            $backData=$dish->all();
            return json(array(
                'data'=>$backData,
                'result'=>1
            ));
        }
        exit();
    }
//  新增
    public function addDish(){
        $comFun=new Commen();
        $data=$comFun->ajaxBack();
        $cache=Cache::get(1);
        $dish=new Dishes($data);
        $dish->photoUrl=$cache->imgUrl;
        if(!empty($data)){
            if($dish->save()){
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
//    根据id查询菜品
    public function idFind(){
        $comFun=new Commen();
        $idDish=new Dishes();
        $data=$comFun->ajaxBack('id');
        if(!empty($data)){
            if($idDish->where('id',$data)->find()){
                $backData=$idDish->where('id',$data)->find();
                return json(array(
                    'data'=>$backData,
                    'result'=>1
                ));
            }else{
                return json(array(
                    'data'=>'',
                    'result'=>-1
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
//    修改数据
    public function upDish(){
        $comFun=new Commen();
        $data=$comFun->ajaxBack();
        $dish=new Dishes();
        $cache=Cache::get(1);
       if($data!=null){
           $backDate['id']=$data['id'];
           $backDate['name']=$data['name'];
           $backDate['standPrice']=$data['standPrice'];
           $backDate['salePrice']=$data['salePrice'];
           $backDate['category_id']=$data['category_id'];
           $backDate['info']=$data['info'];
           $backDate['unit']=$data['unit'];
           if($cache->imgUrl){
               $backDate['photoUrl']=$cache->imgUrl;
           }
           if($data['photoUrl']){
               $cache->imgUrl=$data['photoUrl'];
           }
           if ($dish->save($backDate,['id' => $data['id']])) {
               return json(array(
                   'data' =>$backDate,
                   'result' => 1
               ));
           }
       } else {
           return json(array(
               'data' => '请填写完整参数！',
               'result' => -1
           ));
       }


        exit();
    }
    public function delDish(){
        $comFun=new Commen();
        $data=$comFun->ajaxBack('id');
        $dish=Dishes::get($data);
        if(!empty($data)){
            if($dish->delete()){
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