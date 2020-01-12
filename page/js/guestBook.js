/**
 *  发表博客评论
 **/
let sendComment = new Vue({
    el: '#send_comment',
    data: {
        commentName: localStorage.getItem('user_name') || '',//评论昵称
        commentEmail: localStorage.getItem('user_email') || '',//邮箱
        commentContent: '',//内容
        commentCode: '',//验证码
        codeImg: '',//验证码svg矢量图
        codeText: '',//正确的验证码信息
    },
    computed: {
        //获取当前博客id
        getBlogId() {
            let bid = -2;//博客id 留言页面默认为-2
            return bid;//返回bid
        },

        //获取关于博客评论的信息
        getBlogComment() {
            let parent = this.$refs.reply.value;//获取他的回复对象,-1为评论当前博客并不是回复
            let parentName = this.$refs.reply_name.value;//获取他的回复对象的名字,value为0时没有回复对象
            let cName = this.commentName;//昵称
            let cEmail = this.commentEmail;//邮箱
            let cContent = this.commentContent;//评论
            return {
                parent,
                parentName,
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
        this.getRandomCode();//初始加载验证码
    },
    methods: {
        //点击提交评论
        handleComment() {
            let blogId = this.getBlogId;//获取博客Id
            let {parent,parentName,cName,cEmail,cContent} = this.getBlogComment;//解构上传的参数
            //昵称不能为空
            if (cName == "") {
                alert('用户昵称不能为空');
                return
            }
            //验证码不能为空或者错误
            if (this.commentCode == "" || this.commentCode != this.codeText ) {
                this.commentCode = "";
                alert('验证码有误');
                return
            }
            axios({
                method: 'get',
                url: `/addComment?blogId=${blogId}&parent=${parent}&parentName=${parentName}&cName=${cName}&cEmail=${cEmail}&cContent=${cContent}`
            })
                .then(res => {
                    console.log(res)
                    alert(res.data.msg)
                })
                .catch(err => {
                    console.log(err)
                })
            localStorage.setItem('user_name',this.commentName);
            localStorage.setItem('user_email',this.commentEmail);
            this.commentName = "";
            this.commentEmail = "";
            this.commentContent = "";
            this.commentCode = "";
        },

        //点击切换验证码
        changeSvg() {
            console.log(1)
            this.getRandomCode()
        },

        //重新编辑博客
        rewriteComment() {
            this.commentName = ""
            this.commentEmail = ""
            this.commentContent = ""
            this.commentCode = ""
        }
    }
})

/**
 *  博客评论列表
 * */
let blogComments = new Vue({
    el: '#blog_comments',
    data: {
        total: '',//评论总数
        commentsList: [],//评论列表
    },
    computed:{
        //获取当前博客id
        getBlogId() {
            let bid = -2;//博客id 留言页面默认为-2
            return bid;//返回bid
        },
    },
    created() {
        this.getCommentCount(this.getBlogId)
        this.getNowComment(this.getBlogId)
    },
    methods: {
        //发送请求查看当前博客评论
        getNowComment(bid) {
            axios({
                method: 'get',
                url: '/queryBlogListByBlogId?bid=' + bid
            })
                .then(res => {
                    this.commentsList = res.data.data;
                    this.commentsList.length > 0 && this.commentsList.forEach(item => {
                        if (item.parent > -1) {//id大于-1代表是回复评论
                            item.options = '回复@' + item.parent_name
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        },

        //点击回复评论
        replay(id,name) {
            document.getElementById('comment_reply').value = id//回复评论的话 将parent的值变为当前评论的id
            document.getElementById('comment_reply_name').value = name//回复评论的话 将parent_name的值变为当前评论者的name
            location.href = '#send_comment'
        },

        //查看评论数量
        getCommentCount(bid) {
            axios({
                method: 'get',
                url: '/queryBlogCountByBlogId?bid=' + bid
            })
                .then(res => {
                    this.total = res.data.data[0].count
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
})