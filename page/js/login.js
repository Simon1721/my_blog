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
                if (res.data.data != '') {
                    alert('登录成功')
                    window.history.go(-1)
                    return;
                }
                alert('账号或密码错误，请检查后重试。若您没有账号，请注册后重试！')
            })
        }
    }
})