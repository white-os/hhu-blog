<template>
    <div class="m-container">
        <!-- 博客信息管理只有一个功能那就是删除，展示信息有博客标题，作者，描述，标签。 点击跳转到对应博客 -->
        <h1>博客信息管理</h1>
        <el-table 
            :data="tableData" 
            border 
            highlight-current-row 
            @current-change="handleCurrentChange">
            <el-table-column
                label="博客标题"
                prop="title"
            ></el-table-column>
            <el-table-column
                label="作者"
                prop="username"
            ></el-table-column>
            <el-table-column
                label="时间"
                prop="datetime"
            ></el-table-column>
            <el-table-column
                label="简介"
                prop="content"
            ></el-table-column>
            <el-table-column
                label="标签"
                prop="classifyName"
            ></el-table-column>
            <el-table-column 
                label="操作"
                width="200px">
                <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="deleteBlog(scope.row)">删除博客</el-button>
                </template>
            </el-table-column>
        </el-table>
        
    </div>
</template>

<script>
import service from '../../../config/http.js'
import axios from 'axios'

export default {
    data() {
        return {
            tableData: []
        }
    },
    mounted() {
        this.getBlogInfo();
    },
    methods: {
        async getBlogInfo() {
            await service({
                method: 'post',
                url: '/article/query',
                data: {
                    queryString:'',
                    classify: '',
                    page: 1,
                    size: 10
                }
            }).then((res) => {
                console.log(res.data.rows);
                this.tableData = []
                res.data.rows.forEach( item => {
                    this.tableData.push({
                        title: item.title,
                        username: item.username,
                        datetime: item.datetime ? item.datetime.slice(0,10) : '',
                        content: item.content,
                        classifyName: item.classifyName,
                        id: item.id,
                        uid: item.uid,
                        views: item.views
                    })
                })
            })
        },
        // 删除博客信息
        async deleteBlog(row) {
            console.log('删除当前行', row);
            await service.delete('/article/' + row.id).then((res)=>{
                console.log(res);
            })
            this.$router.go(0);
            // this.reload()
        },
        handleCurrentChange(val) {
            this.currentRow = val
        }
    }
}
</script>

<style scoped>
.m-container h1 {
    margin-top: -10px;
    margin-bottom: 20px;
}

</style>