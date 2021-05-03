const cookie = window.document.cookie;

function getDate(date) {
    return new Date(date).toLocaleDateString().replace(/\//g, '-')
}

new Vue({
    el:'#user',
    data:{
        isLogin:'',
    },
    methods:{
        logout(){
            const isLogout = confirm('确定要退出登录吗？');
            if(isLogout){
                window.location = 'http://localhost:1721/login.html'
            }
        },
        login(){
            window.location = 'http://localhost:1721/login.html'
        }
    },
    created(){
        if(cookie){
            const index = cookie.indexOf('=')
            const id = cookie.slice(index+1)
            axios({
                method:'get',
                url:'http://127.0.0.1:1721/api/user/getById',
                params:{
                    id,
                }
            }).then(res=>{
                this.isLogin = res.data.data
            })
        }
    }
})

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
        pagintionData: {
            newLimit: 6,
            newTotal: 1,
            currentPage: 1,
        },
        goodArtList: [],
        newArtList: [],
        latestList: [],
        jingList: [],
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
        nextChange(val) {
            axios.get('http://127.0.0.1:1721/api/article/getBytag', {
                params: {
                    tag:'后端',
                    page: val,
                    limit: this.pagintionData.newLimit
                }
            }).then(article => {
                const arrData = article.data.data.datas;
                this.newArtList = arrData
            });
        },
        prevChange(val) {
            axios.get('http://127.0.0.1:1721/api/article/getBytag', {
                params: {
                    tag:'后端',
                    page: val,
                    limit: this.pagintionData.newLimit
                }
            }).then(article => {
                const arrData = article.data.data.datas;
                this.newArtList = arrData
            });
        },
        currentChange(val) {
            axios.get('http://127.0.0.1:1721/api/article/getBytag', {
                params: {
                    tag:'后端',
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
        axios.get('http://127.0.0.1:1721/api/article/getByTag', {
            params: {
                tag: '后端', limit: this.pagintionData.newLimit
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
        axios.get('http://127.0.0.1:1721/api/article/getBytag',{
            params:{
                tag:'后端'
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

