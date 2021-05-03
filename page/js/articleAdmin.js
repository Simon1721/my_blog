const E = window.wangEditor;

$(document).ready(function () {
    $('.menu').find('li').click(function () {
        var index = $(this).index()
        $(this).addClass('active')
            .siblings().removeClass('active')
        $('.content').children().eq(index).show().siblings().hide()
    })
    $('.back').click(function(){
        window.history.go(-1)
    })
})

new Vue({
    el: '#publish',
    data: {
        editor: null,
        title: '',
        author: '',
        tag: '',
        imgurl: '',
        content: '',
    },
    beforeDestroy() {
        // 销毁编辑器
        this.editor.destroy()
        this.editor = null
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
        this.editor.config.placeholder = '请输入文章内容';
        this.editor.config.height = 500
        this.editor.create();
    },
    methods: {
        submit() {
            const text = this.editor.txt.html()
            const artObj = {
                name: this.title,
                imgurl: this.imgurl,
                author: this.author,
                tag: this.tag,
                publishDate: +new Date(),
                content: text
            }
            axios({
                method: 'post',
                url: 'http://localhost:1721/api/article/add',
                data: artObj
            }).then(res => {
                if (JSON.stringify(res.data.data) != "{}") {
                    alert('添加文章成功！')
                    this.title = '';
                    this.author = '';
                    this.tag = '';
                    this.imgurl = '';
                    this.content = '';
                    this.editor.txt.html('')
                    return;
                }
                alert('文章信息格式错误，请检查后重试！')
            })
        },
    }
})

new Vue({
    el: '#delete',
    data: {
        articleList: [],
    },
    created() {
        axios.get('http://localhost:1721/api/article/getAll').then(res => {
            const tempData = res.data.data;
            tempData.forEach(item => {
                item.publishDate = this.getDate(item.publishDate)
            })
            this.articleList = tempData;
        })
    },
    methods: {
        //辅助函数
        getDate(date) {
            return new Date(date).toLocaleDateString().replace(/\//g, '-')
        },
        remove(id) {
            const isTrue = confirm('确定要删除该文章吗？')
            if (isTrue) {
                axios.delete('http://localhost:1721/api/article/delete', {
                    params: {
                        id,
                    }
                }).then(res => {
                    if (res) {
                        axios.get('http://localhost:1721/api/article/getAll').then(res => {
                            const tempData = res.data.data;
                            tempData.forEach(item => {
                                item.publishDate = this.getDate(item.publishDate)
                            })
                            this.articleList = tempData;
                        })
                        alert('删除成功！')
                    }
                })
            }
        }
    }
})
