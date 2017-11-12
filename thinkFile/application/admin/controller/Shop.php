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
use app\admin\model\Cache;
use app\admin\model\Admin;
use app\admin\model\Info;
Class Shop extends Controller{
//    查询店铺信息
    public function findInfo(){
        $comFun=new Commen();
        $info=new Info();
        $cache=Cache::get(1);
        $data=$comFun->ajaxBack();

        if($data==null){
            $infoData=Info::get(['code'=>$cache->shopId]);

            return json(array(
                'data'=>$infoData,
                'result'=>1
            ));

        }else{
            return json(array(
                'data'=>'',
                'result'=>-1
            ));
        }
        exit();
    }

//    修改数据
    public function upInfo(){
        $comFun=new Commen();
        $data=$comFun->ajaxBack();
        $cache=Cache::get(1);
        $info=new Info();
        if($data!=null){
            $backData['code']= $data['code'];
            $backData['startDate']= $data['startDate'];
            $backData['endDate']= $data['endDate'];
            $backData['name']= $data['name'];
            $backData['mobile']= $data['mobile'];
            $backData['type']= $data['type'];
            $backData['startTime']= $data['startTime'];
            $backData['endTime']= $data['endTime'];
            $backData['province']= $data['province'];
            $backData['city']= $data['city'];
            $backData['cityId']= $data['cityId'];
            $backData['address']= $data['address'];
            $backData['info']= $data['info'];
            $backData['admin']= $data['admin'];
            $backData['photoUrl']= $cache->imgUrl;

            if($info->save($backData,['code'=>$cache->shopId])){
                return json(array(
                    'data'=>$cache,
                    'result'=>1
                ));
            }else{
                return json(array(
                    'data'=>$data,
                    'result'=>-1
                ));
            };
        }else{
            return json(array(
                'data'=>'',
                'result'=>-1
            ));
        }
        exit();
    }
}
