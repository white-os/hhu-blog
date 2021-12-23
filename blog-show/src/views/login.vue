<template>
    <div>
        <img src="../assets/logo.png" alt="hhu-blog-logo">
        <div class="l-content">
            <h3>用户登录</h3>
            <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px" class="elform">
                <el-form-item label="手机号" prop="phoneNumber">
                    <el-input v-model="loginForm.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="password">
                    <el-input v-model="loginForm.password" type="password" style="width: 375px"></el-input>
                    <el-button type="text" style="margin-left: 30px" @click="validBtn">获取验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100px; margin-left:-60px; margin-top: 10px" type="primary" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="text" size="mini" style="margin-left: -70px;" @click="registerBtn">还没有账号，立刻注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import service from '../config/http.js'

export default {
    data() {
        return {
            loginForm: {
                phoneNumber: '',
                password: '',
            },
            rules: {
                phoneNumber: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        ...mapMutations(['changeLogin']),
        submitForm(formName) {
            let _this = this
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    service({
                        method: 'post',
                        url: '/user/loginByVCode',
                        data: {
                            phone: this.loginForm.phoneNumber,
                            validateCode: this.loginForm.password
                        }
                    }).then((res) => {
                        console.log(res);
                        console.log(document.cookie);
                        localStorage.setItem('phoneNumber',res.data.data)
                        // _this.userToken = 'Bearer' + res.data.data.body.token;
                        // 将用户token保存到vuex
                        // _this.changeLogin({
                        //     Authorization: _this.userToken,
                        // });
                        this.$router.push({ name: 'userinfomanage' })
                        // 这里要换成message
                        alert('登录成功')
                        this.$router.go(0)
                    }).catch((err) => {
                        alert('错误')
                        console.log(err);
                    })
                } else {
                    console.log('输入不规范');
                    return false
                }
            })
        },
        validBtn() {
            console.log('点击发送验证码');
            service({
                method: 'get',
                url: '/user/sendVCode4Login',
                params: {
                    phone: this.loginForm.phoneNumber
                }
            }).then((res) => {
                console.log(res);
            })
        },
        registerBtn() {
            console.log('点击注册按钮，跳转到注册页面');
            this.$router.push({name: 'register'})
        }
    }
}
</script>

<style>
    .elform{
        max-width: 500px;
        margin: 0 auto;
    }
    .l-content {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        height: 350px;
        width: 600px;
        background-color: rgba(255, 255, 255, 0.945);
        margin: 100px auto;
        text-align: center;
    }
    .l-content h3{
        padding-top: 30px;
        padding-bottom: 30px;
    }

</style>