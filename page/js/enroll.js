
new Vue({
    el: '#wrapper',
    data: {
        userName: '',
        headPortrait: '',
        loginID: '',
        loginPwd: '',
        confirmPassword: ''
    },
    methods: {
        submit() {
            const user = {
                name: this.userName,
                imgurl: this.headPortrait,
                loginID: this.loginID,
                loginPwd: this.loginPwd
            }
            if(this.userName == '' || this.headPortrait == '' || this.loginID == '' || this.loginPwd == ''){
                alert('信息每一项为必填项，不能为空')
                return;
            }
            if (this.loginPwd !== this.confirmPassword) {
                alert('两次密码输入不一致')
                return;
            }
            axios({
                method: 'post',
                url: 'http://localhost:1721/api/user/enroll',
                data: user,
            }).then(res => {
                if(JSON.stringify(res.data.data) != "{}"){
                    const istrue = confirm('注册成功！');
                    if(istrue){
                        window.location = 'http://localhost:1721'
                    }
                }
            })
        }
    }
})