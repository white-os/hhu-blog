<template>
    <div>
        <el-backtop></el-backtop>
        <Header></Header>
        <div class="divider"></div>
        <div class="block">
            <el-timeline class="m-content" style="width: 900px">
                <el-timeline-item :timestamp="item.datetime" placement="top" :key="item.id" v-for="item in tableData">
                    <router-link :to="{ name: 'blogitem', params: { id: item.id } }">
                        <el-card>
                            <h4>{{ item.title }}</h4>
                            <p>{{ item.content.slice(0,50) }}</p>
                        </el-card>    
                    </router-link>
                </el-timeline-item>
            </el-timeline>
            <el-card class="m-intr">
                <div slot="header">
                    <span>站长推荐</span>
                </div>
                <ul>
                    <li v-for="list in introduceList" :key="list.id">
                        {{ list.title }}
                    </li>
                </ul>
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
            tableData: [],
            introduceList: []
        }
    },
    mounted() {
        // console.log(document.cookie);
        this.getBlogList()
    },
    methods: {
        getBlogList() {
            // 获取博客列表信息
            service({
                method: 'post',
                url: '/article/query',
                data: {
                    querySting: '',
                    classify: '',
                    page: 1,
                    size: 10
                }
            }).then((res) => {
                console.log(res);
                console.log(res.data.rows);
                this.tableData = []
                res.data.rows.forEach( item => {
                    this.tableData.push({
                        title: item.title,
                        username: item.username,
                        classifyName: item.classifyName,
                        datetime: item.datetime.slice(0,10),
                        view: item.view,
                        content: item.content,
                        id: item.id,
                        uid: item.uid
                    })
                    this.introduceList.push({
                        title: item.title,
                        id: item.id
                    })
                })
            })
        },

    }

}
</script>

<style scoped>
    .block{
        display: flex;
        max-width: 1200px;
        margin: 0 auto;
    }
    .divider{
        height: 1px;
        width: auto;
        background-color: black;
        margin-top: 5px;
        margin-bottom: 20px;
    }
    .m-intr{
        width: 300PX;
        height: 400px;
        margin-left: 30px;
        margin-top: 20px
    }

</style>