function getDate(date) {
    return new Date(date).toLocaleDateString().replace(/\//g, '-')
}

const query = window.location.search
const index = query.indexOf('=')
const keyword = decodeURIComponent(query.slice(index + 1)); //decodeURIComponent() 解码url中的中文字符
document.querySelector('title').innerHTML = keyword + ' 的搜索结果';
document.querySelector('#search-input').setAttribute('placeholder',keyword);

new Vue({
    el:'#search',
    data:{
        searchKeyword:'',
        link:'',
    },
    methods:{
        search(){
            window.location.search = '?wd=' + this.searchKeyword
        }
    }

})

const Vm_container = new Vue({
    el: '#container',
    data: {
        pagintionData: {
            newLimit: 6,
            newTotal: 1,
            currentPage: 1,
        },
        goodArtList: [],
        newArtList: [],
        latestList: [],
        imglist: [
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1454112772,3551117385&fm=26&gp=0.jpg',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2284371541,2908510499&fm=26&gp=0.jpg',
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=226547533,2294898914&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2880386374,3113509207&fm=15&gp=0.jpg',
            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2899174962,3626239562&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2299614506,588028401&fm=26&gp=0.jpg',
        ],
        notFound:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1577371945,1270849504&fm=26&gp=0.jpg'
    },
    methods: {
        nextChange(val) {
            axios.get('http://127.0.0.1:1721/api/article/get', {
                params: {
                    keyword,
                    page: val,
                    limit: this.pagintionData.newLimit
                }
            }).then(article => {
                const arrData = article.data.data.datas;
                this.newArtList = arrData
            });
        },
        prevChange(val) {
            axios.get('http://127.0.0.1:1721/api/article/get', {
                params: {
                    keyword,
                    page: val,
                    limit: this.pagintionData.newLimit
                }
            }).then(article => {
                const arrData = article.data.data.datas;
                this.newArtList = arrData
            });
        },
        currentChange(val) {
            axios.get('http://127.0.0.1:1721/api/article/get', {
                params: {
                    keyword,
                    page: val,
                    limit: this.pagintionData.newLimit
                }
            }).then(article => {
                const arrData = article.data.data.datas;
                this.newArtList = arrData
            });
        },
    },
    created() {
        axios.get('http://127.0.0.1:1721/api/article/getByTag', {
            params: {
                tag: '后端',
                limit: 9
            }
        }).then(article => {
            const tempData = article.data.data.datas;
            tempData.forEach(item => {
                item.publishDate = getDate(item.publishDate)
            })
            this.goodArtList = tempData;
        });
        axios.get('http://127.0.0.1:1721/api/article/get', { 
            params: { 
                keyword,
                limit: this.pagintionData.newLimit 
            } 
        }).then(article => {
            const arrData = article.data.data.datas;
            this.newArtList = arrData
        });
        axios.get('http://127.0.0.1:1721/api/article/get', {
            params: {
                page: 3
            }
        }).then(article => {
            const tempData = article.data.data.datas;
            tempData.forEach(item => {
                item.publishDate = getDate(item.publishDate)
            })
            this.latestList = tempData;
        });
        axios.get('http://127.0.0.1:1721/api/article/get',{
            params:{
                keyword,
            }
        }).then(article => {
            const arrData = article.data.data;
            this.pagintionData.newTotal = arrData.total
        })
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
        axios.get('http://127.0.0.1:1721/api/article/getByTag', { params: { tag: '算法', limit: 9 } }).then(article => {
            this.goodList = article.data.data.datas;
        })
    }
});

