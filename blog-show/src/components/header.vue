<template>
    <div class="header">
        <img src="../assets/logo.png" alt="hhu-blog-logo">
        <h1>hhu博客</h1>
        <el-button type="primary" class="addBtn" @click="addBlog"> 写文章 </el-button>
        
        <el-avatar class="avatar"> {{ userInfo.username }} </el-avatar>
        <el-button type="text" class="editBtn" @click="exit" v-show="showEdit">退出登录</el-button>
    </div>
</template>

<script>
import service from "../config/http";

export default {
    data() {
        return {
            userInfo: {
                username: ''
            },
            showEdit: false
        }
    },
    mounted() {
        // this.getUserName()
        this.login()
    },
    methods: {
        // getUserName() {
        //     service({
        //         method: 'get',
        //         url: '/user/getUsername',
        //     }).then((res) => {
        //         console.log(res);
        //     })
        // },
        login() {
            let token = localStorage.getItem('phoneNumber')
            console.log(token);
            if(!token){
                this.userInfo.username = '未登录'
                this.showEdit = false
            } else {
                this.showEdit = true
                service({
                    method: 'get',
                    url: '/user/getUsername',
                    params:{
                        login_user_phone: token
                    }
                }).then((res)=> {
                    console.log('afasdaf',res);
                    this.userInfo.username = res.data.data
                    this.$store.commit('setUsername', res.data.data)
                })
            }
        },
        // 写文章按钮点击,跳转到文章编辑页面
        addBlog() {
            // 登录后才可以写文章
            // 进行登录鉴权
            if(localStorage.getItem('phoneNumber')){
                this.$router.push({name: 'blogedit'})
            } else {
                this.$router.push({name: 'login'})
            }
        },
        exit() {
            console.log('退出登录按钮');
            // 清空token
            localStorage.setItem("phoneNumber", '')
            this.$router.push({name: 'login'})
        }
    }
}
</script>

<style>
    .header{
        position: relative;
        display: flex;
        height: 60px;
        line-height: 60px;
    }
    .header h1{
        margin: 0 ;
        margin-left: 10px;
    }
    .header img {
        height: 50px;
        margin-top: 5px;
    }
    .editBtn {
        position: absolute;
        top: 10px;
        right: 20px;
    }
    .avatar {
        position: absolute;
        top: 10px;
        right: 100px;
    }
    .addBtn{
        position: absolute;
        top: 10px;
        right: 435px;
        height: 40px;
        width: 100px;
    }

</style>