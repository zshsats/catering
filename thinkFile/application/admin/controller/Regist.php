<?php
/**
 * Created by PhpStorm.
 * User: zsh
 * Date: 2017/4/13
 * Time: 21:13
 */
namespace app\admin\controller;
use think\Controller;
use app\common\Commen;
use app\admin\model\Admin;
use app\admin\model\Cache;
use app\admin\model\Info;
Class Regist extends Controller{
    public function adminRegist(){
        $comFun=new Commen();
        $data=$comFun->ajaxBack();
        $admin=new Admin();
        $cache=new Cache();
        $info=new Info();
        if($data!=null){
            $admin->shopId=$data['shopId'];
            $admin->pwd=$data['pwd'];
            $admin->startDate=$data['startDate'];
            $admin->endDate=$data['endDate'];
            $admin->power='1';
           if($admin->save()){
               $cache->save(['shopId'=>$data['shopId']],['id'=>1]);
               $info->startDate=$admin['startDate'];
               $info->endDate=$admin['endDate'];
               $info->code=$admin['shopId'];
               $info->save();
               return json(array(
                   'data'=>'',
                   'result'=>1
               ));
           }
        }
        exit();
    }
    public function shopLogin(){
        $comFun=new Commen();
        $login=new Admin();
        $cache=new Cache();
        $data=$comFun->ajaxBack();
        if($data!=null){
            if($ld=$login->where('shopId',$data['shopId'])->find()){
                if($ld->pwd==$data['pwd']) {
                    $cache->save(['shopId'=>$data['shopId']],['id'=>1]);
                    return json(array(
                        'data'=>$ld,
                        'result'=>1
                    ));
                }else {
                    return json(array(
                        'data' => '你输入的密码有误，请从新输入！',
                        'result' => -1
                    ));
                }
            }else{
                return json(array(
                    'data' => '你输入的账号不存在！',
                    'result' => -1
                ));
            }
        }else{
            return json(array(
                'data'=>'请输入账号密码！',
                'result'=>-1
            ));
        }
        exit();
    }
    public function registEmp(){
        $comFun=new Commen();
        $data=$comFun->ajaxBack();
        $user=new User();
        if($data!=null){
            $user->id=$data['code'];
            $user->pwd=$data['empPwd'];
            $user->power=$data['power'];
            $user->shop_id=$data['id'];
            if($user->save()){
                return json(array(
                    'data'=>'',
                    'result'=>1
                ));
            }
        }
        exit();
    }


}