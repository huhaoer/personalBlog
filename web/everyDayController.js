let path = new Map();//默认controller文件导出的map对象
let everyDayDao = require('../dao/everyDayDao');//引入dao层数据库方法
let timeUtil = require('../util/nowTimeUtil');//获取当前时间
let responseUtil = require('../util/responseUtil');//返回数据方法
//1.编辑每日一句
function editEveryDay(request,response) {
    //post方式 监听data事件获取参数
    request.on('data',function(data) {
        let content = data.toString().trim();
        everyDayDao.editEveryDay(content,timeUtil.getNowTime(),function(result) {
            response.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
            response.write(responseUtil.writeResponse("success","添加成功"),null);
            response.end();
        })

    })
}
path.set('/editEveryDay',editEveryDay)

// 2.查询每日一句
function queryEveryDay(request,response) {
    everyDayDao.queryEveryDay(function(result){
        response.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
        response.write(responseUtil.writeResponse("success","查询成功",result));
        response.end()
    })
}
path.set('/queryEveryDay',queryEveryDay)

module.exports.path = path;