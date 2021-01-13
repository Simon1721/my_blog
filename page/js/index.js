function getDate(date) {
    return new Date(date).toLocaleDateString().replace(/\//g, '-')
}

const Vm_article = new Vue({
    el: '#article',
    data: {
        hotArtList: [],

    },
    created() {
        axios.get('http://127.0.0.1:1721/api/article/get').then(article => {
            const tempData = article.data.data.datas;
            tempData.forEach(item => {
                item.publishDate = getDate(item.publishDate)
            })
            this.hotArtList = tempData;
        });

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
        left: 0,
        jingLeft: 0,
        transition:`all 1s cubic-bezier(0.25,0.1,0.25,1)`,
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
        changePage(type) {
            if (type === 'prev') {
                if (this.left == 300 * this.goodList.length / 2 || this.left == 0) {
                    return
                }
                this.left += 300;
            } else {
                if (this.left == -300 * this.goodList.length / 2) {
                    return
                }
                this.left -= 300;
            }
        },
        nextChange(val) {
            axios.get('http://127.0.0.1:1721/api/article/get', {
                params: {
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
                    page: val,
                    limit: this.pagintionData.newLimit
                }
            }).then(article => {
                const arrData = article.data.data.datas;
                this.newArtList = arrData
            });
        },
        // swiper() {
        //     this.timer = setInterval(() => {
        //         if (this.jingLeft == -4760) {
        //             this.transition = 'none'
        //             this.jingLeft = 0;
        //         } else {
        //             this.transition = 'all 1s cubic-bezier(0.25,0.1,0.25,1)'
        //             this.jingLeft -= 1190
        //         }
        //     }, 3000)
        // }
    },
    computed: {
        goodList() {
            return this.goodArtList.slice(0, 8)
        }
    },
    created() {
        // this.$nextTick(() => {
        //     this.swiper()
        // })
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
                tag: '前端框架',
                limit: 4
            }
        }).then(article => {
            const tempData = article.data.data.datas;
            tempData.forEach(item => {
                item.publishDate = getDate(item.publishDate)
            })
            this.jingList = tempData;
            this.jingList.push(this.jingList[0])
        });
        axios.get('http://127.0.0.1:1721/api/article/get', { params: { limit: this.pagintionData.newLimit } }).then(article => {
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
        axios.get('http://127.0.0.1:1721/api/article/getAll').then(article => {
            const arrData = article.data.data;
            this.pagintionData.newTotal = arrData.length
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

