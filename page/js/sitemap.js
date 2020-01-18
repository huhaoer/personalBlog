
//博客地图
let mapArticle = new Vue({
    el: '#map_article',
    data: {
        blogList: [],//博客文章列表
    },
    computed: {

    },
    created() {
        axios({
            method: 'get',
            url: '/getAllBlog'
        })
            .then(res => {
                // console.log(res,'allblog')
                if (res.data.data.length > 0)  {
                    res.data.data.map(item => {
                        item.link = "http://localhost:18459/blogDetail.html?bid=" + item.id;//添加链接 跳转到详情页面
                    })
                    this.blogList = res.data.data
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

})