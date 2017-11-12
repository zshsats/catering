<?php
/**
 * Created by PhpStorm.
 * User: zsh
 * Date: 2017/4/28
 * Time: 23:04
 */
namespace app\admin\controller;
use think\Controller;
use app\common\Commen;
use app\admin\model\Order as Orders;
use app\admin\model\Cache;
use app\admin\model\Total;
Class Order extends Controller{
//    新增订单
    public function addOrder(){
        $comFun=new Commen();
        $order=new Orders();
        $cache=new Cache();
        $total=new Total();
        $data=$comFun->ajaxBack();
        $lists=array();
        $codeOrder=time();
        $num=0;
        $sprice=0;
        $stprice=0;
        if($data!=null){
            foreach ($data['orderDish'] as $item){
                $dishes=array(
                    'code'=>$codeOrder,
                    'dish_id'=>$item['id'],
                    'name'=>$item['name'],
                    'standPrice'=>$item['standPrice'],
                    'salePrice'=>$item['salePrice'],
                    'photoUrl'=>$item['photoUrl'],
                     'codeId'=>$item['codeId'],
                    'num'=>$item['num'],
                    'time'=>intval($codeOrder)

                );
                $num+=$item['num'];
                $sprice+=$item['salePrice']*$item['num'];
                $stprice+=$item['standPrice']*$item['num'];
                array_push($lists,$dishes);
            }
            $order->saveAll($lists);
            $cache->save(['order'=>$codeOrder],['id'=>1]);
            $total->data([
                'code'=>$codeOrder,
                'seat'=>$data['seat'],
                'num'=>$num,
                'standPrice'=>$stprice,
                'salePrice'=>$sprice,
                'getPrice'=>$data['getPrice'],
                'actPrice'=>$data['actPrice'],
                'state'=>'未做',
                'time'=>intval($codeOrder)
            ]);
            $total->save();
            return json(array(
                'data'=>$codeOrder,
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
//  查询订单
    public function findOrder(){
        $comFun=new Commen();
        $total=new Total();
        $data=$comFun->ajaxBack();
        $date=date('Y-m-d',time());
        $start=strtotime($date);
        $end=$start+86400;
        if($data==null){
            $where['code']=array(
                array('EGT',$start),
                array('ELT',$end)
            );
           $backData=Total::where($where)->select();
            return json(array(
                'data'=>$backData,
                'result'=>1
            ));
        }
        exit();
    }
    public function upTotal(){
        $comFun=new Commen();
        $total=new Total();
        $data=$comFun->ajaxBack();
        if($data!=null){

          if($total->save($data,['id'=>$data['id']])){
              return json(array(
                  'data'=>'',
                  'result'=>1
              ));
          }

        }
        exit();
    }

//查询订单详情
    public function orderInfo(){
        $comFun=new Commen();
        $data=$comFun->ajaxBack('id');
        if($data!=null){
            $backData=Orders::all(['code'=>$data]);
            return json(array(
                'data'=>$backData,
                'result'=>1
            ));
        }
        exit();
    }

    public function delOrder(){
        $comFun=new Commen();
        $data=$comFun->ajaxBack();
        if($data!=null){
            if(Total::destroy(['id'=>$data['id']])){
                Orders::destroy(['code' =>$data['code'] ]);
                return json(array(
                    'data'=>'' ,
                    'result'=>1
                ));
            }
        }
        exit();
    }
    public function findInfo(){
        $comFun=new Commen();
        $data=$comFun->ajaxBack();
        $num=0;
        $salePrice=0;
        $actPrice=0;
        $count=0;
        if($data==null){
            $orderData=Total::all();
            $backData=null;
            foreach ($orderData as $item){
                $num+=$item['num'];
                $salePrice+=$item['getPrice'];
                $actPrice+=$item['actPrice'];
                $count++;
            }
            $backData=array(

               'num'=>$num,
               'salePrice'=>$salePrice,
               'actPrice'=>$actPrice,
               'count'=>$count

            );
            return json(array(
                'data'=>$backData,
                'result'=>1
            ));
        }
        exit();
    }
    public function dateFind(){
        $comFun=new Commen();
        $data=$comFun->ajaxBack();
        $num=0;
        $salePrice=0;
        $actPrice=0;
        $count=0;
        $getPrice=0;
        $timearray=null;
        if($data!=null){
            $s=null;
            $e=null;
            $startarray=explode("-",$data['start']);
            $endarray=explode("-",$data['end']);
            $s=strtotime(date($startarray[0].'-'.$startarray[1].'-'.$startarray[2].'00:00:00',time()));
            $e=strtotime(date($endarray[0].'-'.$endarray[1].'-'.$endarray[2].'00:00:00',time()))+86400;
            $where['code']=array(
                array('EGT',$s),
                array('ELT',$e)
            );
            $orderData=Total::where($where)->select();
            $backData=null;
            foreach ($orderData as $item){
                $num+=$item['num'];
                $salePrice+=$item['salePrice'];
                $getPrice+=$item['getPrice'];
                $actPrice+=$item['actPrice'];
                $count++;
            }
            $backData=array(
                'num'=>$num,
                'salePrice'=>$salePrice,
                'getPrice'=>$getPrice,
                'actPrice'=>$actPrice,
                'count'=>$count,
                'orderData'=>$orderData

            );
            return json(array(
                'data'=>$backData,
                'result'=>1
            ));
        }

        exit();
    }

}