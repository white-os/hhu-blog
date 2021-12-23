<template>
    <el-container>
        <el-header>
            <img src="../../assets/logo.png" alt="hhu-blog-logo">
            <h1>HHU博客管理端</h1>  
            <el-avatar icon="el-icon-user-solid" class="avatar"></el-avatar>
            <el-button type="text" class="editBtn" @click="edit">退出登录</el-button>
        </el-header>
        <div class="divider"></div>
        <el-container>
            <el-aside width="260px">
                <el-menu
                    default-active="1"
                    @select="menuSelect"
                >
                    <el-menu-item index="userinfomanage">
                        <i class="el-icon-user"></i>
                        <span slot="title">用户信息管理</span>
                    </el-menu-item>
                    <el-menu-item index="bloginfomanage">
                        <i class="el-icon-document"></i>
                        <span slot="title">博客信息管理</span>
                    </el-menu-item>
                    <el-menu-item index="commentinfomanage">
                        <i class="el-icon-chat-square"></i>
                        <span slot="title">评论信息管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view v-if="isRouterAlive"/>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name: 'manage',
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isRouterAlive: true
        }
    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(function() {
                this.isRouterAlive = true
            })
        },
        menuSelect(index) {
            console.log('当前选中menu', index);
            // 这样操作就要求命名和path是相同的
            this.$router.push({ name: index }).catch(err => { err })
        },
        edit() {
            // 退出登录，清空token，跳转到登录页面
            console.log('退出登录');

            this.$router.push('/login')
        }
    }
}
</script>

<style>

    .divider{
        height: 1px;
        width:auto;
        background-color: black;
        margin: 10px 0;
    }
   .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 800px;
    border-right: 1px solid rgba(220,223,230);
  }
  
  
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-header{
      display: flex;
      line-height: 60px;
      position: relative;
  }

  .el-header img{
      height: 50px;
      margin-top: 7px;
  }

  .el-header h1{
      margin: 0 20px;
  }
  .el-aside {
      height: 800px;
  }

  .el-header .editBtn{
      position: absolute;
      top: 20px;
      right: 20px;
  }
  .el-header .avatar {
      position: absolute;
      top: 20px;
      right: 100px;
  }
</style>