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
use app\admin\model\User;
use app\admin\model\Cache;
Class Clert extends Controller{
    public function findClert(){
        $comFun=new Commen();
        $user=new User();
        $cache=Cache::get(1);
        $data=$comFun->ajaxBack();
        if($data==null){
            $dataInfo=$user->where('shop_id',$cache->shopId)->select();
            return json(array(
                'data'=>$dataInfo ,
                'result'=>1
            ));

        }
    }
    public function idFind(){
        $comFun=new Commen();
        $user=new User();
        $data=$comFun->ajaxBack();
        if($data!=null){
            $user=User::get($data);
            return json(array(
                'data'=>$user ,
                'result'=>1
            ));

        }
    }
    public function addClert(){
        $comFun=new Commen();
        $user=new User();
        $cache=Cache::get(1);
        $data=$comFun->ajaxBack();
        $user->photoUrl=$cache->imgUrl;
        if($data!=null){
            $user->id=$data['id'];
            $user->name=$data['name'];
            $user->shop_id=$cache->shopId;
            $user->pwd=$data['pwd'];
            $user->mobile=$data['mobile'];
            $user->position=$data['position'];
            $user->sex='女士';
            $user->age=$data['age'];
            $user->photoUrl=$cache->imgUrl;
            $user->info=$data['info'];
            $user->power='2';
            if($user->save()){
                return json(array(
                    'data'=>'' ,
                    'result'=>1
                ));
            }
        }
    }
    public function upClert(){
        $comFun=new Commen();
        $user=new User();
        $cache=Cache::get(1);
        $data=$comFun->ajaxBack();
        if($data!=null){
            $upUser['name']=$data['name'];
            $upUser['shop_id']=$cache->shopId;
            $upUser['pwd']=$data['pwd'];
            $upUser['mobile']=$data['mobile'];
            $upUser['position']=$data['position'];
            $upUser['sex']='女士';
            $upUser['age']=$data['age'];
            $user->photoUrl=$cache->imgUrl;
            if($data['photoUrl']){
                $user->photoUrl=$data['photoUrl'];
            }
            $upUser['info']=$data['info'];
            if($user->save($upUser,['id'=>$data['id']])){

                return json(array(
                    'data'=>$data['id'] ,
                    'result'=>1
                ));
            }
        }
    }
    public function delClert(){
        $comFun=new Commen();
        $user=new User();
        $data=$comFun->ajaxBack('id');
        if($data!=null){
            if(User::destroy(['id'=>$data])){
                return json(array(
                    'data'=>'' ,
                    'result'=>1
                ));
            }
        }
    }
}