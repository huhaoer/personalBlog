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
        articleList: [//文章列表数组
            {
                title: "最近的状态",
                content: "使用php内置的hexdec函数在把超大的十六进制转换到十进制整型表示时，结果值如果超出平台整型的最大值时，可能会丢失精度，比如 0xFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF 在Python中，使用int(‘FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF’, 16)计算结果是1157920892103562487564203452140208927662503539",
                date: "2019-06-24",
                views: "2,624",
                tag: "hexdec huuhu",
                link: "http://www.baidu.com"
            },
            {
                title: "最近的状态",
                content: "使用php内置的hexdec函数在把超大的十六进制转换到十进制整型表示时，结果值如果超出平台整型的最大值时，可能会丢失精度，比如 0xFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF 在Python中，使用int(‘FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF’, 16)计算结果是1157920892103562487564203452140208927662503539",
                date: "2019-06-24",
                views: "2,624",
                tag: "hexdec huuhu",
                link: ""
            },
            {
                title: "最近的状态",
                content: "使用php内置的hexdec函数在把超大的十六进制转换到十进制整型表示时，结果值如果超出平台整型的最大值时，可能会丢失精度，比如 0xFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF 在Python中，使用int(‘FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF’, 16)计算结果是1157920892103562487564203452140208927662503539",
                date: "2019-06-24",
                views: "2,624",
                tag: "hexdec huuhu",
                link: ""
            },
            {
                title: "最近的状态",
                content: "使用php内置的hexdec函数在把超大的十六进制转换到十进制整型表示时，结果值如果超出平台整型的最大值时，可能会丢失精度，比如 0xFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF 在Python中，使用int(‘FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF’, 16)计算结果是1157920892103562487564203452140208927662503539",
                date: "2019-06-24",
                views: "2,624",
                tag: "hexdec huuhu",
                link: ""
            },
        ]
    }
})