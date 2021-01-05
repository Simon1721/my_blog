const Vm_container = new Vue({
    el: '#container',
    data: {
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
    created() {
        const query = window.location.search
        const index = query.indexOf('=')
        const id = query.toString().substring(index + 1);
        axios.get('http://localhost:1721/api/article/getById', {
            params: {
                id,
            }
        }).then(article => {
            const artData = article.data.data;
            this.currentArticle = artData;
        });
        axios.get('http://localhost:1721/api/article/getByTag', {
            params: {
                tag: '好物推荐',
                limit: 12
            }
        }).then(article => {
            this.goodArtList = article.data.data.datas;
        });
        axios.get('http://localhost:1721/api/article/get', {
            params: {
                page: 2
            }
        }).then(article => {
            const arrDate = article.data.data.datas;
            this.latestList = arrDate;
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
        axios.get('http://localhost:1721/api/article/get', { params: { limit: 2 } }).then(article => {
            this.footerlist = article.data.data.datas;
        })
        axios.get('http://localhost:1721/api/article/get', { params: { limit: 12 } }).then(article => {
            this.goodList = article.data.data.datas;
        })
    }
});