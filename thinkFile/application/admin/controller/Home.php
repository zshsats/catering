<?php
namespace app\admin\controller;
use think\Controller;
use app\common\Commen;
use app\admin\model\Admin;
use app\admin\model\Cache;
class Home extends Controller{
    public function index(){

    }
    public function findTime(){
        $comFun=new Commen();
        $admin=new Admin();
        $cache=Cache::get(1);
        $data=$comFun->ajaxBack();
        if($data==null){
            $ld=$admin->where('shopId',$cache->shopId)->find();
                return json(array(
                    'data'=>$ld,
                    'result'=>1
                ));

        }else{
            return json(array(
                'data'=>'',
                'result'=>-1
            ));
        }

    }
    public function upload()
    {
// 获取表单上传文件
        $req = Request::instance();
        if (var_export($req->isAjax(), true)) {
            $file = $req->file('file');
            if (empty($file)) {
                $this->error('请选择上传文件');
            }
            $info = $file->move('./public/images');
            if ($info) {
                return json(array(
                    'data'=>$info->getRealPath() ,
                    'result'=>1
                ));
            } else {
                $this->error($file->getError());
            }
        }
    }
}
