<?php
/**
 * Created by PhpStorm.
 * User: zsh
 * Date: 2017/4/24
 * Time: 20:04
 */
namespace app\admin\controller;
use think\Controller;
use app\common\Commen;
use app\admin\model\Create as Creats;
use app\admin\model\Dish;
use app\admin\model\Activity;
use app\admin\model\Cache;
use app\admin\model\Photo;
Class Create extends Controller{
    public function createDiscount(){
        $comFun = new Commen();
        $act = new Creats();
        $activity = new Activity();
        $data = $comFun->ajaxBack();
        $act->data($data);
//        $now=date ( "Y-m-d H:i:s" );
        $now = time();
        if ($data != null) {
            if ($act->save()) {
                $activity->id = $act->id;
                $activity->name = $act->name;
                $activity->type = '满减';
                $activity->startDate = $act->startDate;
                $activity->endDate = $act->endDate;
                $st = strtotime($activity->startDate);
                $end = strtotime($activity->endDate);
                if ($now < $st) {
                    $activity->state = '未开始';
                } else if ($now > $end) {
                    $activity->state = '已到期';
                } else {
                    $activity->state = '进行中';
                }
                $activity->save();
                return json(array(
                    'data' => $st,
                    'result' => 1
                ));
            }
        }
    }
//    修改活动
    public function upCreate(){
        $comFun = new Commen();
        $act = new Creats();
        $activity = new Activity();
        $data = $comFun->ajaxBack();
//        $now=date ( "Y-m-d H:i:s" );
        $now = time();
        $actData=array();
        $upData=array();
        if ($data!=null) {

            $actData['full'] = $data['full'];
            $actData['cut']= $data['cut'];
            $actData['name'] = $data['name'];
            $actData['startDate'] = $data['startDate'];
            $actData['endDate']= $data['endDate'];
            $actData['lists']= $data['lists'];
            $actData['itemAll']= $data['itemAll'];
            if ($act->save($actData,['id'=>$data['id']])) {
                $upData['id'] = $data['id'];
                $upData['name']= $data['name'];
                $upData['type']= '满减';
                $upData['startDate'] = $data['startDate'];
                $upData['endDate']= $data['endDate'];
                $st = strtotime($upData['startDate']);
                $end = strtotime($upData['endDate']);
                if ($now < $st) {
                    $upData['state']= '未开始';
                } else if ($now > $end) {
                    $upData['state'] = '已到期';
                } else {
                    $upData['state'] = '进行中';
                }
                if($activity->save($upData,['id'=>$data['id']])){
                    return json(array(
                        'data' => $data,
                        'result' => 1
                    ));
                }


            }
        }

    }
    public function findActivity(){
        $comFun = new Commen();
        $activity = new Activity();
        $now = time();
        $data = $comFun->ajaxBack();
        if ($data == null) {
            if ($backData=$activity->all()) {
               foreach ($backData as $ls){
                   $st = strtotime($ls->startDate);
                   $end = strtotime($ls->endDate);
                   if ($now < $st) {
                       $ls->state = '未开始';
                   } else if ($now > $end) {
                       $ls->state = '已到期';
                   } else {
                       $ls->state = '进行中';
                   }
               }
                return json(array(
                    'data' => $backData,
                    'result' => 1
                ));
            }
        }

    }
//    根据id查询活动
    public function idActicity(){
        $comFun = new Commen();
        $idCreate= new Creats();
        $dish=new Dish();
        $data = $comFun->ajaxBack('id');
        if ($data != null) {
            if ($backData=$idCreate->get($data)) {
                if($backData['itemAll']=='0'){
                    $dishs=explode('|',$backData['lists']);
                    $showLists=Dish::all($dishs);
                    $backData['lists']=$showLists;
                }
                return json(array(
                    'data' =>$backData,
                    'result' => 1
                ));
            }
        }

    }
//    查看参与活动的菜品
    public function findSelect(){
        $comFun = new Commen();
        $act = new Creats();
        $data = $comFun->ajaxBack();
        if ($data == null) {
            $lists=$act->all();
            foreach ($lists as $list){
                $dishs=explode("|",$list['lists']);
                $showLists=Dish::all($dishs);
                $list['lists']=$showLists;
            }
            return json(array(
                'data' => $lists,
                'result' => 1
            ));


        }

    }
    public function delActivity(){
        $comFun = new Commen();
        $act = new Creats();
        $activity = new Activity();
        $data = $comFun->ajaxBack();
        if($data!=null){
            Creats::destroy(['id'=>$data['id']]);
            Activity::destroy(['id',$data['id']]);
            return json(array(
                'data' => '',
                'result' => 1
            ));
        }
    }
    public function addBanner(){
        $comFun = new Commen();
        $data = $comFun->ajaxBack();
        $cache=Cache::get(1);
        $photo=new Photo($data);
        $photo->photoUrl=$cache->imgUrl;
        if($data!=null){
            if($photo->save()){
                $cache->imgUrl=null;
                return json(array(
                    'data' => '',
                    'result' => 1
                ));
            }

        }
    }

    public function findBanner(){
        $comFun = new Commen();
        $data = $comFun->ajaxBack();
        if ($data == null) {
            $backData=Photo::all();
            return json(array(
                'data' => $backData,
                'result' => 1
            ));


        }

    }
    public function delBanner(){
        $comFun = new Commen();
        $data = $comFun->ajaxBack();
        if($data!=null){
            Photo::destroy(['id'=>$data['id']]);
            return json(array(
                'data' => '',
                'result' => 1
            ));
        }
    }
}