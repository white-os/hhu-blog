<template>
    <div>
        <img src="../../assets/logo.png" alt="hhu-blog-logo">
        <div class="l-content">
            <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px" class="elform">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100px; margin-left:120px; margin-top: 10px" type="primary" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import service from '../../config/http.js'

export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
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
                    console.log('已经输入，继续判断是否输入正确');
                    console.log(this);
                    // 在这里发请求后端判断是否用户名密码正确;如果正确，接收后端返回的token;将token存储到 store 和 localStorage;跳转路由
                    service({
                        method: 'post',
                        url: '/login',
                        data: _this.loginForm,
                    }).then((res) => {
                        console.log(res.data);
                        _this.userToken = 'Bearer' + res.data.data.body.token;
                        // 将用户token保存到vuex
                        _this.changeLogin({
                            Authorization: _this.userToken,
                        });
                        this.$router.push({ name: 'userinfomanage' })
                        // 这里要换成message
                        // alert('登录成功')
                    }).catch((err) => {
                        // alert('错误')
                        console.log(err);
                    })
                    setTimeout(()=> {
                        this.$router.push({ name: 'userinfomanage' })
                    },500)
                } else {
                    console.log('输入不规范');
                    return false
                }
            })
        },
    }
}
</script>

<style>
    .elform{
        max-width: 500px;
        margin: 0 auto;
        padding-top: 100px;
    }
    .l-content {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        height: 350px;
        width: 600px;
        background-color: rgba(255, 255, 255, 0.945);
        margin: 100px auto;
    }

</style>