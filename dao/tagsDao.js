let dbutil = require('./dbutil');

//1.查询标签
function queryTag(tag,success) {
    let sql = 'select * from tags where tag = ?;';
    let params = [tag];
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

//2.插入标签
function insertTag(tag,cTime,uTime,success) {
    let sql = 'insert into tags (`tag`,`ctime`,`utime`) values(?,?,?);';
    let params = [tag,cTime,uTime];
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
    "queryTag": queryTag,
    "insertTag": insertTag
}