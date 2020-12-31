// const Vue = require('vue.js');
// const axios = require('axios').default


const Vm_article = new Vue({
    el: '#article',
    data: {
        hotArtList: [],

    },
    methods: {

    },
    computeds: {

    },
    created() {
        axios.get('http://localhost:1721/api/article/get').then(article => {
            this.hotArtList = article.data.data.datas;
        });

    }
})

const Vm_container = new Vue({
    el: '#container',
    data: {
        goodArtList: [],
        left: 0
    },
    methods: {
        changePage(type) {
            console.log('aaa');
            if (type === 'prev') {
                if (this.left == 300 * this.goodArtList.length / 2 || this.left == 0) {
                    return
                }
                this.left += 300;
            } else {
                if (this.left == -300 * this.goodArtList.length / 2) {
                    return
                }
                this.left -= 300;
            }
        }
    },
    created() {
        axios.get('http://localhost:1721/api/article/getByTag', {
            params: {
                tag: '好物推荐',
                limit: 8
            }
        }).then(article => {
            console.log(article.data.data.datas);
            this.goodArtList = article.data.data.datas;
        })
    }
})