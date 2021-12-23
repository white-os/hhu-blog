<template>
  <div>
        <img src="../assets/logo.png" alt="hhu-blog-logo">
        <div class="r-content">
            <h3>用户注册</h3>
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phoneNumber">
                    <el-input v-model="form.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.sex"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="vcode">
                    <el-input v-model="form.vcode" style="width: 375px"></el-input>
                    <el-button type="text" style="margin-left: 30px" @click="validBtn">获取验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100px; margin-left: -50px;" @click="submit">注册</el-button>
                </el-form-item>
            </el-form>

        </div>
  </div>
</template>

<script>import service from "../config/http";

export default {
    data() {
        return {
            form: {
                username: '',
                phoneNumber: '',
                sex: '',
                password: '',
                vcode: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                phoneNumber: [
                    { required: true, message: '请输入手机号', trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur'}
                ],
                vcode: [
                    { required: true, message: '请输入验证码', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        validBtn() {
            console.log('点击发送验证码');
            service({
                method: 'get',
                url: '/user/sendVCode4Register',
                params: {
                    phone: this.form.phoneNumber
                }
            }).then((res) => {
                console.log(res);
            })
        },
        // 提交注册请求
        submit() {
            service({
                method: 'post',
                url: '/user/register',
                params: {
                    validateCode: this.form.vcode
                },
                data: {
                    username: this.form.username,
                    password: this.form.password,
                    sex: this.form.sex,
                    phone: this.form.phoneNumber
                }
            }).then((res)=> {
                console.log(res);
                if(res.data.flag){
                    this.$router.push({ name: 'login' });
                    this.$router.go(0)
                }
            })

        }
    }

}
</script>

<style>
    .el-form{
        max-width: 560px;

    }
    .r-content{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        height: 450px;
        width: 600px;
        background-color: rgba(255, 255, 255, 0.945);
        margin: 100px auto;
        text-align: center;
    }
    .r-content h3{
        padding-top: 20px;

    }

</style>