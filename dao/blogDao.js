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

//2.根据页数查询博客
function queryBlogByPage(page,pageSize,success) {
    let sql = 'select * from blog order by id desc limit ?,?;';//根据博客主键id倒叙查询,并根据页数限制查询数量
    let params = [page * pageSize,pageSize];
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

//3.查询博客总数
function queryBlogCount(success) {
    let sql = 'select count(1) as count from blog;';
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

//4.根据博客id查询详情
function queryBlogById(blogId,success) {
    let sql = 'select * from blog where id = ?;';
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

//5.地图页面查询博客列表
function getAllBlog(success) {
    let sql = 'select * from blog order by id desc;';
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
    "editBlog": editBlog,
    "queryBlogByPage":queryBlogByPage,
    "queryBlogCount":queryBlogCount,
    "queryBlogById": queryBlogById,
    "getAllBlog": getAllBlog
}