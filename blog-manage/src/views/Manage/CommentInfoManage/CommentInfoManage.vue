<template>
    <div class="m-container">
        <!-- 评论信息管理：只有删评权限，展示完整的评论信息点击跳转到对应文章 -->
        <h1>评论信息管理</h1>
        <el-table 
            :data="tableData" 
            border 
            highlight-current-row 
            @current-change="handleCurrentChange">
            <el-table-column
                label="评论文章标题"
                prop="title"
            ></el-table-column>
            <el-table-column
                label="评论人"
                prop="username"
            ></el-table-column>
            <el-table-column
                label="时间"
                prop="datetime"
            ></el-table-column>
            <el-table-column
                label="评论内容"
                prop="comment"
            ></el-table-column>
            <el-table-column 
                label="操作"
                width="200px">
                <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="deleteComment(scope.row)">删除评论</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import service from "../../../config/http";

export default {
    inject: ['reload'],
    data() {
        return {
            tableData: []
        }
    },
    mounted() {
        this.getCommentInfo()
    },
    methods: {
        getCommentInfo() {
            service({
                method:'post',
                url: '/comment/findCommentsByAIdUId',
                data: {
                    user_id: null,
                    article_id: null,
                    page: 1,
                    size: 10
                }
            }).then((res) => {
                console.log(res.data.rows);
                // 将评论信息显示
                this.tableData = []
                res.data.rows.forEach( item => {
                    this.tableData.push({
                        title: item.article_title,
                        username: item.user.username,
                        comment: item.comment,
                        datetime: item.datetime ? item.datetime.slice(0,10) : '',
                        user_id: item.user_id,
                        id: item.id                     
                    })
                })
            })
        },
        deleteComment(val) {
            console.log('当前删除行数为', val);
            service.delete('/comment/' + val.id).then((res) => {
                console.log(res);
            })
            // this.getCommentInfo()
            this.reload()
        },
        handleCurrentChange(val) {
            this.currentRow = val;
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