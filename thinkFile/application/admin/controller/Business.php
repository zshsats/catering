<?php
/**
 * Created by PhpStorm.
 * User: zsh
 * Date: 2017/4/28
 * Time: 16:15
 */
namespace app\admin\controller;
use think\Controller;
use app\common\Commen;
use app\admin\model\Dish as Dishes;
use app\admin\model\Category;
use app\admin\model\Cache;
Class Business extends Controller{
//    查询所有菜品
    public function findDish(){
        $comFun=new Commen();
        $dish=new Dishes();
        $cat=new Category();
        $data=$comFun->ajaxBack();
        if($data==null){
            $catData=$cat->all();
            for($i=0;$i<count($catData);$i++){
                $backData=$dish->all([
                    'category_id'=>$catData[$i]['id'],
                ]);
                $dishData[$i]=array(
                    'name'=>$catData[$i]['name'],
                    'dishlst'=>$backData
                );
            }
            return json(array(
                'data'=>$dishData,
                'result'=>1
            ));

        }else{
            $backData=$dish->all();
            return json(array(
                'data'=>$backData,
                'result'=>1
            ));
        }
        exit();
    }



}