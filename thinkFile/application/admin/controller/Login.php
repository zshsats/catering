<?php
/**
 * Created by PhpStorm.
 * User: zsh
 * Date: 2017/4/11
 * Time: 21:33
 */
namespace app\admin\controller;
use app\admin\controller\Factory;
use app\common\Commen;
use app\admin\model\Shop;
use app\admin\model\User;
use app\admin\model\Cache;
Class Login extends Factory{
    public function shopLogin(){
        $comFun=new Commen();
        $shop=new Shop();
        $cache=new Cache();
        $data=$comFun->ajaxBack();
        if($data!=null){
            $ld=$shop->where('id',$data['id'])->find();
            if($ld->pwd==$data['pwd']&&$ld->mobile==$data['mobile']) {
                $cache->save(['shopId'=>$data['id']],['id'=>0]);
                return json(array(
                    'data'=>$ld,
                    'result'=>1
                ));
            }else {
                return json(array(
                    'data' => '你的账号或密码有误，请重新输入！',
                    'result' => 1
                ));
            }
        }else{
            return json(array(
                'data'=>'请输入账号密码！',
                'result'=>-1
            ));
        }

    }
    public function empLogin(){
        $comFun=new Commen();
        $user=new User();
        $data=$comFun->ajaxBack();
        if($data!=null){
            $ld=$user->where('id',$data['id'])->find();
            if($ld->pwd==$data['pwd']&&$ld->shop_id==$data['shop_id']) {
                return json(array(
                    'data' =>'',
                    'result'=>1
                ));
            }else {
                return json(array(
                    'data' => '账号密码输入错误',
                    'result' => -1
                ));
            }
        }else{
            return json(array(
                'data'=>'请填写数据',
                'result'=>-1
            ));
        }

    }
}