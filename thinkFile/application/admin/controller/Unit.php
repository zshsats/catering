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
use app\admin\model\Unit as Units;
use app\admin\model\Cache;
Class Unit extends Controller{
    public function findUnit(){
        $comFun=new Commen();
        $unit=new Units();
        $data=$comFun->ajaxBack();
        if($data==null){
            if($backData=$unit->all()){
                return json(array(
                    'data'=>$backData,
                    'result'=>1
                ));
            }
        }else{
            return json(array(
                'data'=>'你选择正确的数据',
                'result'=>-1
            ));
        }
        exit();
    }
    public function addUnit(){
        $comFun=new Commen();
        $unit=new Units();
        $data=$comFun->ajaxBack('unit');
        if(!empty($data)){
            $unit->data([
                'unit'=>$data
            ]);
            if($unit->save()){
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
    public function delUnit(){
        $comFun=new Commen();
        $data=$comFun->ajaxBack('id');
        $unit=Units::get($data);
        if(!empty($data)){
            if($unit->delete()){
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