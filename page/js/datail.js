let id = 0;

function getDate(date) {
    return new Date(date).toLocaleDateString().replace(/\//g, '-')
}

function getCommentTime(date) {
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
        return getDate(date)
    }
}

new Vue({
    el:'#search',
    data:{
        searchKeyword:'',
        link:'',
    },
    methods:{
        search(){
            this.link = '/search.html?wd=' + this.searchKeyword
        }
    }

})

const Vm_container = new Vue({
    el: '#container',
    data: {
        searchKeyword:'',
        link:'',
        timer: null,
        title: '',
        commentText: '',
        replyName: '',
        replyIsShow: true,
        placeholder: '请输入您要发表的评论',
        textareafocus: false,
        commentNum: 0,
        commentList: [],
        currentArticle: {},
        goodArtList: [],
        latestList: [],
        imglist: [
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1454112772,3551117385&fm=26&gp=0.jpg',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2284371541,2908510499&fm=26&gp=0.jpg',
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=226547533,2294898914&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2880386374,3113509207&fm=15&gp=0.jpg',
            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2899174962,3626239562&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2299614506,588028401&fm=26&gp=0.jpg',
        ]
    },
    methods: {
        search(){
            this.link = '/search.html?wd=' + this.searchKeyword
        },
        publishComment() {
            if (!this.commentText) {
                alert(`${type}内容不能为空`);
                return;
            }
            const type = this.$refs.submit.innerHTML;
            axios({
                method: 'post',
                url: 'http://127.0.0.1:1721/api/comment/add',
                data: {
                    parentId: id,
                    parentName: type == '发布' ? 'Blue rain' : 'Blue rain 回复 ' + this.replyName,
                    publishDate: +new Date(),
                    ArticleId: id,
                    content: this.commentText,
                    imgurl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg'
                }
            }).then(() => {
                alert(`${type}评论成功`)
                this.commentText = '';
                axios.get('http://127.0.0.1:1721/api/comment/get', {
                    params: {
                        parentId: id
                    }
                }).then(comments => {
                    const newComments = comments.data.data;
                    newComments.forEach(item => {
                        item.publishDate = getCommentTime(item.publishDate)
                    })
                    this.commentList = newComments.reverse()
                    this.commentNum = this.commentList.length
                });
            })
        },
        reply(replyName) {
            this.replyName = replyName
            this.placeholder = '请输入回复' + replyName + '的内容';
            this.$nextTick((x) => {   //正确写法
                this.$refs.textarea.focus();
                this.$refs.commentbox.style.display = 'none';
                this.$refs.submit.innerHTML = '回复';
                this.$refs.cancel.style.display = 'inline-block'
            })
        },
        cancelReply() {
            this.$refs.commentbox.style.display = 'block';
            this.$refs.submit.innerHTML = '发布';
            this.$refs.cancel.style.display = 'none'
            this.placeholder = '请输入您要要发表的评论';
        },
    },
    created() {
        const query = window.location.search
        const index = query.indexOf('=')
        id = query.toString().substring(index + 1);
        axios.get('http://127.0.0.1:1721/api/article/getById', {
            params: {
                id,
            }
        }).then(article => {
            const tempData = article.data.data;
            tempData.publishDate = getDate(tempData.publishDate)
            this.currentArticle = tempData;
            const titleDom = document.querySelector('title')
            titleDom.innerHTML = tempData.name;
        });
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
                item.publishDate = getDate(item.publishDate)
            })
            this.latestList = tempData;
        });
        axios.get('http://127.0.0.1:1721/api/comment/get', {
            params: {
                parentId: id
            }
        }).then(comments => {
            const newComments = comments.data.data;
            newComments.forEach(item => {
                item.publishDate = getCommentTime(item.publishDate)
            })
            this.commentList = newComments.reverse()
            this.commentNum = this.commentList.length
        });
    }
})

const Vm_footer = new Vue({
    el: '#footer',
    data: {
        footerlist: [],
        goodList: []
    },
    created() {
        axios.get('http://127.0.0.1:1721/api/article/get', { params: { limit: 2 } }).then(article => {
            const tempData = article.data.data.datas;
            tempData.forEach(item => {
                item.publishDate = getDate(item.publishDate)
            })
            this.footerlist = tempData;
        })
        axios.get('http://127.0.0.1:1721/api/article/getBytag', { params: { tag: '算法', limit: 9 } }).then(article => {
            this.goodList = article.data.data.datas;
        })
    }
});
