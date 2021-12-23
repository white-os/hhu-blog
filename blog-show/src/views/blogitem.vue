<template>
    <div>
        <el-backtop></el-backtop>
        <Header></Header>
        <div class="main">
            <el-row>
                <el-col :span="15" class="m-content">
                    <el-card>
                        <div class="title">
                            <h2> {{ blog.title }} </h2>
                            <div class="intr">
                                <span>作者:</span><span>{{ blog.username }}</span>&nbsp;
                                <span style="font-weight:900 ">  |  </span>&nbsp;
                                <span>时间:</span><span>{{ blog.time }}</span>
                                <span style="font-weight:900 ">  |  </span>&nbsp;
                                <span>标签: </span><el-tag size="mini">{{ blog.tag }}</el-tag>
                            </div>
                        </div>
                        <el-divider></el-divider>
                        <div v-html="blog.content"></div>
                    </el-card>
                </el-col>
                <el-col :span="7" class="m-slide">
                    <el-card header="作者相关">
                        <div style="margin-bottom: 10px">姓名: {{ this.author.name }}</div>
                        <div style="margin-bottom: 10px">性别: {{ this.author.sex }}</div>
                        <div style="margin-bottom: 10px">电话: {{ this.author.phone }}</div>
                    </el-card>
                </el-col>
            </el-row>
            <el-card style="width: 750px;margin-top: 15px">
                <h4>评论</h4>
                <el-input
                    v-model="comment"
                    placeholder="输入评论（enter发送）"
                    @keyup.enter.native="keyEnter"
                ></el-input>
                <div>
                    <h4>热门评论</h4>
                    <div :key="comment.id" v-for="comment in comments" class="c-item">
                        <el-avatar> user </el-avatar>
                        <div style="margin-left: 15px">
                            <span class="c-user">{{ comment.name }}</span>&nbsp;
                            <span class="c-datetime"> <span> | </span> &nbsp; {{ comment.datetime }}</span>
                            <div class="c-content">{{ comment.content }}</div>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import Header from '../components/header.vue'
import service from '../config/http'

export default {
    components: { Header },
    data() {
        return {
            blog: {
                title: 'title111111',
                username: 'username11111',
                time: '2021-12-20',
                tag: 'tag111111111',
                content: 'content111111111111',
            },
            author: {

            },
            // 评论内容
            comment: '',
            // 评论信息列表
            comments: [
                {
                    id: '1',
                    username: 'username1',
                    content: 'content1'
                },
                {
                    id: '2',
                    username: 'username1',
                    content: 'content1'
                }
                ]
        }
    },
    mounted() {
        this.getBlogItem()
    },
    methods: {
        getBlogItem() {
            //获取博客详细信息渲染页面
            service({
                method: 'get',
                url: '/article/' + this.$route.params.id,
            }).then((res) => {
                console.log('获取博客详细信息返回',res);
                this.blog.title = res.data.title
                this.blog.username = res.data.user.username
                this.blog.time = res.data.datetime.slice(0,10)
                this.blog.tag = res.data.classify.name
                this.blog.content = res.data.content
                this.blog.id = res.data.id
                this.author.name = res.data.user.username
                this.author.sex = res.data.user.sex
                this.author.phone = res.data.user.phone
                this.comments = []
                res.data.comments.forEach( item => {
                    this.comments.push({
                        name: item.user.username,
                        content: item.comment,
                        datetime: item.datetime ? item.datetime.slice(0,10) : ''
                    })
                })                
            })
        },
        keyEnter() {
            // 发送数据给后台，要携带当前页面的博客id之类的信息
            let token = localStorage.getItem('phoneNumber')
            service({
                method: 'post',
                url: '/user/makeComment',
                params: {
                    login_user_phone: token
                },
                data: {
                    comment: this.comment,
                    datetime: new Date().getTime(),
                    article_id: this.blog.id,
                }                
            }).then((res) => {
                console.log(res);
                // this.comments.push({
                //     username: this.$store.state.userInfo.username,
                //     content: this.comment
                // })
            })
            console.log('摁下了回车键');
            this.comment = ''
        }
    }
}
</script>

<style>
    .main{
        width: 1200px;
        margin: 0 auto;
    }
    .m-slide{
        margin-left: 30px;
    }
    .intr{
        font-size: 15px;
        color: #666;
    }
    .intrItem{
        margin-bottom: 10px;
    }
    .c-item{
        display: flex;
        padding: 5px;
        margin-bottom: 20px;
    }
    .c-datetime {
        color: rgba(150, 150, 150);
        font-size: 15px;
    }
    .c-content {
        color: rgba(150, 150, 150);
        margin-top: 5px;
    }

</style>