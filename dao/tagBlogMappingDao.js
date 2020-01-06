let dbutil = require('./dbutil');

//1.插入一条tag和blog的映射数据
function insertTagBlogMapping(tagId,blogId,cTime,uTime,success) {
    let sql = 'insert into tag_blog_mapping (`tag_id`,`blog_id`,`ctime`,`utime`) values(?,?,?,?);';
    let params = [tagId,blogId,cTime,uTime];
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
    "insertTagBlogMapping": insertTagBlogMapping,
}