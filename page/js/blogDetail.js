/**
 *  博客详情
 **/
let blogDetail = new Vue({
    el: '#blog_detail',
    data: {
        blogMes:{},//博客数据对象
        author: 'layoung',//作者,默认都为layoung
    },
    computed:{
        //获取当前博客id
        getBlogId() {
            let hrefStr = location.search;
            let searchParams = hrefStr.indexOf('?') > -1 ? hrefStr.split('?')[1].split('&') : "";//判断参数是否带? 然后拆分取后面的参数字段
            if (searchParams == "") {
                return;//没有携带参数  直接返回
            }
            let bid;//博客id
            for(let i = 0; i < searchParams.length; i ++) {
                if (searchParams[i].split('=')[0] == "bid") {
                    try {
                        bid = searchParams[i].split('=')[1];//根据url 获取传递的bid值
                    }catch(e) {
                        console.log(e)
                    }

                }
            }
            return bid;//返回bid
        }
    },
    created() {
        this.getBlogDetail(this.getBlogId)
    },
    methods: {
        async getBlogDetail(bid) {
            let detailMes = await axios({
                method: 'get',
                url: '/queryBlogById?bid=' + bid
            });
            this.blogMes = detailMes.data.data[0]
        }
    }
})

/**
 *  博客评论
 **/
let sendComment = new Vue({
    el: '#send_comment',
    data: {
        commentName: '',//评论昵称
        commentEmail: '',//邮箱
        commentContent: '',//内容
        commentCode: '',//验证码
        codeImg: '',//验证码svg矢量图
        codeText: '',//正确的验证码信息
    },
    computed: {
        //获取当前博客id
        getBlogId() {
            let hrefStr = location.search;
            let searchParams = hrefStr.indexOf('?') > -1 ? hrefStr.split('?')[1].split('&') : "";//判断参数是否带? 然后拆分取后面的参数字段
            if (searchParams == "") {
                return;//没有携带参数  直接返回
            }
            let bid;//博客id
            for(let i = 0; i < searchParams.length; i ++) {
                if (searchParams[i].split('=')[0] == "bid") {
                    try {
                        bid = searchParams[i].split('=')[1];//根据url 获取传递的bid值
                    }catch(e) {
                        console.log(e)
                    }

                }
            }
            return bid;//返回bid
        },

        //获取关于博客评论的信息
        getBlogComment() {
            let parent = this.$refs.reply.value;//获取他的回复对象,-1为评论当前博客并不是回复
            let cName = this.commentName;//昵称
            let cEmail = this.commentEmail;//邮箱
            let cContent = this.commentContent;//评论
            return {
                parent,
                cName,
                cEmail,
                cContent
            }
        },

        // 获取随机验证码
        getRandomCode() {
            return function () {
                axios({
                    method: 'get',
                    url: '/getRandomCode'
                })
                    .then(res => {
                        if (res.data.data.data) {//svg存在
                            this.codeImg = res.data.data.data;
                            this.codeText = res.data.data.text;
                            return {
                                codeImg:res.data.data.data,
                                codeText:res.data.data.text
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    },
    mounted() {
        this.getRandomCode();//初识加载验证码
    },
    methods: {
        //点击提交评论
        handleComment() {
            let blogId = this.getBlogId;//获取博客Id
            let {parent,cName,cEmail,cContent} = this.getBlogComment;//解构上传的参数
            //昵称不能为空
            if (cName == "") {
                alert('用户昵称不能为空');
                this.commentName = "";
                this.commentEmail = "";
                this.commentContent = "";
                this.commentCode = "";
                return
            }
            //验证码不能为空或者错误
            if (this.commentCode == "" || this.commentCode != this.codeText ) {
                alert('验证码有误');
                return
            }
            axios({
                method: 'get',
                url: `/addComment?blogId=${blogId}&parent=${parent}&cName=${cName}&cEmail=${cEmail}&cContent=${cContent}`
            })
                .then(res => {
                    console.log(res)
                    alert(res.data.msg)
                })
                .catch(err => {
                    console.log(err)
                })
            this.commentName = "";
            this.commentEmail = "";
            this.commentContent = "";
            this.commentCode = "";
        },

        //点击切换验证码
        changeSvg() {
            console.log(1)
            this.getRandomCode()
        }
    }
})