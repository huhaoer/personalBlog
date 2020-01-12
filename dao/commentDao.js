let dbutil = require('./dbutil');

//1.添加评论
function insertComment(blogId,parent,parentName,userName,comments,email,cTime,uTime,success) {
    let sql = 'insert into comments (`blog_id`,`parent`,`parent_name`,`user_name`,`comments`,`email`,`ctime`,`utime`) values(?,?,?,?,?,?,?,?);';
    let params = [blogId,parent,parentName,userName,comments,email,cTime,uTime];
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

//2.查看评论数量
function queryBlogCountByBlogId(blogId,success) {
    let sql = 'select count(1) as count from comments where blog_id = ?;';
    let params = [blogId];
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

//3.查看博客评论列表
function queryBlogListByBlogId(blogId,success) {
    let sql = 'select * from comments where blog_id = ?;';
    let params = [blogId];
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
    "queryBlogCountByBlogId": queryBlogCountByBlogId,
    "queryBlogListByBlogId": queryBlogListByBlogId
}