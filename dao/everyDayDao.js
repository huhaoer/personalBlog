let dbutil = require('./dbutil');

//1.编辑每日一句 数据库插入数据
function editEveryDay(content,cTime,success) {
    let sql = 'insert into every_day (`content`,`ctime`) values(?,?);';
    let params = [content,cTime];
    let connection = dbutil.createConnection();
    connection.connect();//连接
    connection.query(sql,params,function(error,result) {
        if (error == null) {
            success(result)
        }else{
            throw error
        }
    })
    connection.end();
}
//2.查询每日一句 查询数据库数据
function queryEveryDay(success) {
    let sql = 'select * from every_day order by id desc limit 1;';//根据id降序查找1条,相当于查询最新一条
    let params = [];
    let connection = dbutil.createConnection();
    connection.connect();//连接
    connection.query(sql,params,function(error,result) {
        if (error == null) {
            success(result)
        }else{
            throw error
        }
    })
    connection.end();
}

module.exports = {
    "editEveryDay": editEveryDay,
    "queryEveryDay": queryEveryDay
}