<?php
/**
 * Created by PhpStorm.
 * User: zsh
 * Date: 2017/4/13
 * Time: 21:12
 */
namespace app\admin\model;
use think\Model;
Class User extends Model{
//    protected function initialize(){
//        parent::initialize();
//    }
//    protected $insert = ['status' => 1];
    public function clert(){
        return $this->hasOne('Clert','user_id','id');
    }
}