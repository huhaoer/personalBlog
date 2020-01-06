let dbutil = require('./dbutil');

//1.编辑博客
function editBlog(title,content,views,tags,cTime,uTime,success) {
    let sql = 'insert into blog (`title`,`content`,`views`,`tags`,`ctime`,`utime`) values(?,?,?,?,?,?);';
    let params = [title,content,views,tags,cTime,uTime];
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
    "editBlog": editBlog,
}