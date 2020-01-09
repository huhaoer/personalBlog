let dbutil = require('./dbutil');

//1.添加评论
function insertComment(blogId,parent,userName,comments,email,cTime,uTime,success) {
    let sql = 'insert into comments (`blog_id`,`parent`,`user_name`,`comments`,`email`,`ctime`,`utime`) values(?,?,?,?,?,?,?);';
    let params = [blogId,parent,userName,comments,email,cTime,uTime];
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
    "insertComment": insertComment,
}