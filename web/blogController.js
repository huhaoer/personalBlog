let path = new Map();
let blogDao = require('../dao/blogDao');//引入blogDao
let tagsDao = require('../dao/tagsDao');//引入tagsDao
let tagBlogMappingDao = require('../dao/tagBlogMappingDao');//引入tagBlogMappingDao映射
let url = require('url');//解析request参数
let timeUtil = require('../util/nowTimeUtil');//获取当前时间
let responseUtil = require('../util/responseUtil');//返回数据方法

//1.编辑博客
function editBlog(request,response) {
    let params = url.parse(request.url,true).query;
    let title = params.title;//文章标题
    let tags = params.tags.replace(/\s+/g,"").replace(/，/g,",");//先去掉空格,再用英文逗号替换中文逗号

    request.on("data",function(data) {
        let content = data.toString();//文章内容
        //插入一条博客
        blogDao.editBlog(title,content,0,tags,timeUtil.getNowTime(),timeUtil.getNowTime(),function(result) {
            response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            response.write(responseUtil.writeResponse("success","添加成功",null));
            response.end();

            let blogId = result.insertId;//用插入博客的返回结果的insertId当作博客id
            let tagsList = tags.split(',');//tags数组
            for (let i = 0;i < tagsList.length;i ++) {
                if (tagsList[i] == "") {
                    continue;
                }
                queryTag(tagsList[i],blogId);//插入一条博客后,查看标签是否存在
            }

        })
    })
}

//2.查询编辑博客时标签是否存在
function queryTag(tag,blogId) {
    tagsDao.queryTag(tag,function (result) {
        //tag表中没有该tag,新增一条tag
        if (result == null || result.length == 0) {
            insertTag(tag,blogId);
        }else{//tag表中有该tag,新增一条tag和blog映射关系
            insertTagBlogMapping(result[0].id,blogId)//使用查询成功的结果的id值为tag的id值
        }
    })
}
//3.新增加一条tag到tags表中
function insertTag(tag,blogId) {
    tagsDao.insertTag(tag,timeUtil.getNowTime(),timeUtil.getNowTime(),function(result) {
        // 创建标签后在插入一条tag和blog的映射关系
        insertTagBlogMapping(result.insertId,blogId)//使用插入成功的insertId作为tagId
    })
}

//4.新增加一条tag和blog映射关系的数据
function insertTagBlogMapping(tagId,blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId,blogId,timeUtil.getNowTime(),timeUtil.getNowTime(),function(result) {})
}

path.set("/editBlog",editBlog);
module.exports.path = path;