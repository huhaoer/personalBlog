
// 每日一句
let everyDay = new Vue({
    el: '#every_day',
    data: {
        content: '我是每日一句的内容',
        author: 'layoung'
    },
    created() {
        // ajax数据请求 获取每日一句的信息
        axios({
            method: 'get',
            url: '/queryEveryDay'
        }).then(res => {
            //axios会多封装一层
            everyDay.content = res.data.data[0].content
        }).catch(err => {
            console.log(err)
        })

    }
})

// 博客文章
let articleList = new Vue({
    el: '#article_list',
    data: {
        page: 1,//当前查看的页数
        pageSize: 5,//每一页的数量
        count: null,//博客总数
        articleList: [],//文章列表数组
    },
    computed: {
        //计算属性中根据page和pageSize请求数据
        getPage() {
            return function (page,pageSize) {
                axios({
                    method: 'get',
                    url: '/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize
                })
                    .then(res => {
                        //对返回的列表处理,添加link属性
                        let data = res.data.data
                        if (data.length == 0) {
                            return
                        }
                        data.forEach(item => {
                            item["link"] = "http://localhost:18459/blogDetail.html?bid=" + item.id;//对link地址进行拼接
                        })
                        this.articleList = data;//获取当页博客列表
                        console.log(this.articleList)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },

    },
    created() {
        this.getPage(this.page,this.pageSize);
        this.getCount();
    },
    methods: {
        pageChange(p) {
            this.page = p;
            this.getPage(this.page,this.pageSize)
        },
        getCount() {
            //查询博客总数
            axios({
                method: 'get',
                url: '/queryBlogCount'
            })
                .then(res => {
                    articleList.count = res.data.data[0].count;//初始化count
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
})
