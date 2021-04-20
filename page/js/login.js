const params = new URLSearchParams();

const Vm = new Vue({
    el: '#wrapper',
    data: {
        loginID: '',
        loginPwd: ''
    },
    methods: {
        submit() {
            params.append('loginID', this.loginID);
            params.append('loginPwd', this.loginPwd);
            axios({
                method: 'post',
                url: 'http://localhost:1721/api/user/login', params
            }).then(res => {
                // console.log(res.data.data == '');
                if (res.data.data != '') {
                    alert('登录成功')
                    window.history.go(-1)
                    return;
                }
                alert('该用户不存在，请检查后重试！')
            })
        }
    },
    cratede() {

    }
})