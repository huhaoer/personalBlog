let path = new Map();
let commentDao = require('../dao/commentDao');//引入commentDao
let url = require('url');
let timeUtil = require('../util/nowTimeUtil');//获取当前时间
let responseUtil = require('../util/responseUtil');//返回数据方法
let captcha = require('svg-captcha');//下载验证码功能包

//1.添加一条评论
function addComment(request,response) {
    let { blogId,parent,parentName,cName,cEmail,cContent } = url.parse(request.url,true).query;
    blogId = parseInt(blogId);
    parent = parseInt(parent);
    commentDao.insertComment(blogId,parent,parentName,cName,cContent,cEmail,timeUtil.getNowTime(),timeUtil.getNowTime(),function (result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(responseUtil.writeResponse("success","评论成功",null));
        response.end();
    })
}
path.set('/addComment',addComment);

//2.获取验证码
function getRandomCode(request,response) {
    //配置参数
    // size: 4 // 验证码长度
    // ignoreChars: '0o1i' // 验证码字符中排除 0o1i
    // noise: 1 // 干扰线条的数量
    // color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    // background: '#cc9966' // 验证码图片背景颜色
    let img = captcha.create({
        size: 4,
        ignoreChars: '0o1i',
        noise: 2,
        color: true,
        background: '#d2cbcb',
        width: 100,
        height: 34,
        fontSize: 50
    })
    response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    response.write(responseUtil.writeResponse("success","OK",img));
    response.end();
}
path.set('/getRandomCode',getRandomCode);

//3.查看评论的数量
function queryBlogCountByBlogId(request,response) {
    let { bid } = url.parse(request.url,true).query;
    bid = parseInt(bid);
    commentDao.queryBlogCountByBlogId(bid,function (result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(responseUtil.writeResponse("success","查询成功",result));
        response.end();
    })
}
path.set('/queryBlogCountByBlogId',queryBlogCountByBlogId);

//4.查看博客评论的列表
function queryBlogListByBlogId(request,response) {
    let { bid } = url.parse(request.url,true).query;
    bid = parseInt(bid);
    commentDao.queryBlogListByBlogId(bid,function (result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(responseUtil.writeResponse("success","查询成功",result));
        response.end();
    })
}
path.set('/queryBlogListByBlogId',queryBlogListByBlogId);


module.exports.path = path;