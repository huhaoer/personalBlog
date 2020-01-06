// 右侧标签公共部分基础js

// 随机标签云
let randomTag = new Vue({
    el: '#random_tag',
    data: {
        tags: [
            'nginx',
            '游戏',
            'mac',
            '五笔',
            '分页css+div',
            'php',
            'telnet',
            'wordpress',
            '模拟航天飞机',
            '模拟飞行',
            'vagrant',
            '摄像头',
            '树莓派',
            'E6',
            '独立博客',
            'GirlDCS黑鲨',
            'C++',
            '数据结构'
        ]
    },
    computed: {
        getRandomColor() {
            return function () {
                let red = Math.random() * 255;
                let green = Math.random() * 255;
                let blue = Math.random() * 255;
                return `rgb(${red},${green},${blue})`
            }
        },
        getRandomFont() {
            return function () {
                let size = Math.random() * 20 + 10;
                return `${size}px`
            }
        },
    },
    created() {

    }
})

// 最近热门
let newHot = new Vue({
    el: '#new_hot',
    data: {
        titleList:[
            {
                title: '这是一个连接,哈哈哈哈',
                link: 'http://www.baidu.com'
            },
            {
                title: '这是一个连接,哈哈哈哈',
                link: 'http://www.baidu.com'
            },
            {
                title: '这是一个连接,哈哈哈哈',
                link: 'http://www.baidu.com'
            },
            {
                title: '这是一个连接,哈哈哈哈',
                link: 'http://www.baidu.com'
            },
            {
                title: '这是一个连接,哈哈哈哈',
                link: 'http://www.baidu.com'
            },
            {
                title: '这是一个连接,哈哈哈哈',
                link: 'http://www.baidu.com'
            },
        ]
    }
})

// 最新评论
let newComment = new Vue({
    el: '#new_comment',
    data: {
        commentList: [
            {
                name: '胡豪',
                date: '2020-1-5',
                comment: '非常感谢，百度了很久都没解决'
            },
            {
                name: '胡豪',
                date: '2020-1-5',
                comment: '非常感谢，百度了很久都没解决'
            },
            {
                name: '胡豪',
                date: '2020-1-5',
                comment: '非常感谢，百度了很久都没解决'
            },
            {
                name: '胡豪',
                date: '2020-1-5',
                comment: '非常感谢，百度了很久都没解决'
            },
            {
                name: '胡豪',
                date: '2020-1-5',
                comment: '非常感谢，百度了很久都没解决'
            }
        ]
    }
})