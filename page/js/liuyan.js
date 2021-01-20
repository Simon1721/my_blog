const E = window.wangEditor;
new Vue({
    el: '#container',
    data: {
        editor: null,
        goodArtList: [],
        latestList: [],
        liuyanList: [],
        replyContent: '',
        replyList: [],
        imglist: [
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1454112772,3551117385&fm=26&gp=0.jpg',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2284371541,2908510499&fm=26&gp=0.jpg',
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=226547533,2294898914&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2880386374,3113509207&fm=15&gp=0.jpg',
            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2899174962,3626239562&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2299614506,588028401&fm=26&gp=0.jpg',
        ]
    },
    mounted() {
        //创建富文本框实例和配置
        this.editor = new E(`#editor`)
        this.editor.config.excludeMenus = [
            'table',
            'splitLine',
            'backColor',
            'todo',
            'link',
            'video'
        ];
        this.editor.config.uploadImgShowBase64 = true;
        this.editor.config.placeholder = '想和我说什么悄悄话呢';
        this.editor.config.height = 200
        this.editor.create();
    },
    beforeDestroy() {
        // 销毁编辑器
        this.editor.destroy()
        this.editor = null
    },
    created() {
        //欢迎来到我的博客字体颜色随机变换
        setInterval(() => {
            this.$refs.wlecome.style.color = `rgb(${this.getRandom()},${this.getRandom()},${this.getRandom()})`
        }, 2500)

        //初始化数据
        axios.get('http://127.0.0.1:1721/api/article/getByTag', {
            params: {
                tag: '后端',
                limit: 9
            }
        }).then(article => {
            this.goodArtList = article.data.data.datas;
        });
        axios.get('http://127.0.0.1:1721/api/article/get', {
            params: {
                page: 2
            }
        }).then(article => {
            const tempData = article.data.data.datas;
            tempData.forEach(item => {
                item.publishDate = this.getDate(item.publishDate)
            })
            this.latestList = tempData;
        });
        axios({
            method: 'get',
            url: 'http://127.0.0.1:1721/api/liuyan/get',
            params: {
                parentId: -1
            }
        }).then(liuyans => {
            const tempData = liuyans.data.data;
            tempData.forEach(item => {
                item.publishDate = this.getCommentTime(item.publishDate)
            })
            this.liuyanList = tempData.reverse();
            for (let i = 0; i < this.liuyanList.length; i++) {
                let temp = [];
                axios.get('http://127.0.0.1:1721/api/liuyan/get', {
                    params: {
                        parentId: this.liuyanList[i].id
                    }
                }).then(res => {
                    temp = res.data.data ? res.data.data : []
                    temp.forEach(item => {
                        item.publishDate = this.getCommentTime(item.publishDate)
                    })
                    this.replyList.push(temp.reverse())
                })
            }
        })
    },
    methods: {
        //辅助函数
        getDate(date) {
            return new Date(date).toLocaleDateString().replace(/\//g, '-')
        },
        getCommentTime(date) {
            const time = +new Date() - date
            if (time < 30 * 60 * 1000) {
                const minute = Math.floor(time / 1000 / 60)
                if (minute < 1) {
                    return `刚刚`
                }
                return `${minute}分钟前`
            } else if (time > 30 * 60 * 1000 && time <= 60 * 60 * 1000) {
                return `半小时前`
            } else if (time > 60 * 60 * 1000 && time <= 24 * 60 * 60 * 1000) {
                const hour = Math.floor(time / 1000 / 60 / 60)
                return `${hour}小时前`
            } else if (time > 24 * 60 * 60 * 1000 && time <= 30 * 24 * 60 * 60 * 1000) {
                const day = Math.floor(time / 1000 / 60 / 60 / 24)
                return `${day}天前`
            } else if (time > 30 * 24 * 60 * 60 * 1000 && time <= 360 * 24 * 60 * 60 * 1000) {
                const month = Math.floor(time / 1000 / 60 / 60 / 24 / 30)
                return `${month}月前`
            } else {
                return this.getDate(date)
            }
        },
        getRandom() {
            return Math.floor(Math.random() * 205 + 50)
        },

        //发表留言事件处理函数
        submitLiuyan() {
            const text = this.editor.txt.html()
            if (!text) {
                alert('亲，你还没有填写留言内容哦~');
                return;
            }
            axios({
                method: 'post',
                url: 'http://127.0.0.1:1721/api/liuyan/add',
                data: {
                    parentId: -1,
                    name: 'Blue rain',
                    content: text,
                    publishDate: +new Date(),
                    imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1517417813,2367413112&fm=26&gp=0.jpg',
                }
            }).then(() => {
                axios({
                    method: 'get',
                    url: 'http://127.0.0.1:1721/api/liuyan/get',
                    params: {
                        parentId: -1
                    }
                }).then(liuyans => {
                    const tempData = liuyans.data.data;
                    tempData.forEach(item => {
                        item.publishDate = this.getCommentTime(item.publishDate)
                    })
                    this.liuyanList = tempData.reverse();
                    this.editor.txt.clear()
                })
            })
        },

        //回复留言按钮事件处理函数
        reply(index) {
            $('.liuyan-list').children().eq(index).find('.reply-box').css({ display: 'block' });
            $('.liuyan-list').children().eq(index).find('.reply-box').find('input').focus()
        },

        //提交回复事件处理函数
        submitReply(index, parentId) {
            if (!this.replyContent) {
                alert('亲，还没有填写回复内容哦~');
                return;
            }
            axios({
                method: 'post',
                url: 'http://127.0.0.1:1721/api/liuyan/add',
                data: {
                    parentId,
                    name: 'Blue rain',
                    imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1517417813,2367413112&fm=26&gp=0.jpg',
                    content: this.replyContent,
                    publishDate: +new Date(),
                }
            }).then(() => {
                axios.get('http://127.0.0.1:1721/api/liuyan/get', {
                    params: {
                        parentId,
                    }
                }
                ).then(reply => {
                    this.replyList[index] = reply.data.data;
                    this.replyContent = '',
                    $('.liuyan-list').children(index).find('.reply-box').css({ display: 'none' });
                })
            })
        },

        //取消回复事件处理函数
        cancelReply(index) {
            $('.liuyan-list').children(index).find('.reply-box').css({ display: 'none' });
        }
    },
})

new Vue({
    el: '#footer',
    data: {
        footerlist: [],
        goodList: []
    },
    created() {
        //初始化数据
        axios.get('http://127.0.0.1:1721/api/article/get', { params: { limit: 2 } }).then(article => {
            const tempData = article.data.data.datas;
            tempData.forEach(item => {
                item.publishDate = this.getDate(item.publishDate)
            })
            this.footerlist = tempData;
        })
        axios.get('http://127.0.0.1:1721/api/article/getBytag', { params: { tag: '算法', limit: 9 } }).then(article => {
            this.goodList = article.data.data.datas;
        })
    },
    methods:{
        getDate(date) {
            return new Date(date).toLocaleDateString().replace(/\//g, '-')
        },
    }
});
