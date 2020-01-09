
let express = require('express');
let app = new express();
let globalConf = require('./config')//导入全局配置
let loader = require('./loader')//loader文件,map对象,包含请求名含方法
app.use(express.static(globalConf['page_path']));


app.post('/editEveryDay',loader.get('/editEveryDay'))//编辑每日一句
app.get('/queryEveryDay',loader.get('/queryEveryDay'))//查询每日一句

app.post('/editBlog',loader.get('/editBlog'))//编辑博客
app.get('/queryBlogByPage',loader.get('/queryBlogByPage'))//翻页查询博客
app.get('/queryBlogCount',loader.get('/queryBlogCount'))//查询博客总数
app.get('/queryBlogById',loader.get('/queryBlogById'))//根据博客id查询详情

app.get('/addComment',loader.get('/addComment'))//添加一条评论
app.get('/getRandomCode',loader.get('/getRandomCode'));//获取随机验证码

app.listen(globalConf['port'],function () {
    console.log('服务已启动')
})