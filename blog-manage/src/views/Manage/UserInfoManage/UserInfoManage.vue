<template>
    <div class="m-container">
        <h1>用户信息管理</h1>
        <el-table :data="tableData" border class="user-table">
            <el-table-column
                label="ID"
                prop="id"
                width="180">
            </el-table-column>
            <el-table-column
                label="用户名"
                prop="username"
                width="180">
            </el-table-column>
            <el-table-column
                label="手机号"
                prop="phone">
            </el-table-column>
            <el-table-column
                label="性别"
                prop="sex">
            </el-table-column>
            <el-table-column
                label="用户状态"
                prop="statusText">
                <template slot-scope="scope">
                    <el-tag type="primary">{{ scope.row.statusText }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="200px">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger"  @click="handleDelete(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-dialog title="编辑用户" :visible="dialogFormVisible" center>
            <el-form :model="userForm">
                <el-form-item label="用户状态" label-width="120px">
                    <el-select v-model="userForm.status">
                        <el-option label="启用" value="0"></el-option>
                        <el-option label="禁止评论" value="1"></el-option>
                        <el-option label="禁止发贴" value="2"></el-option>
                        <el-option label="封号" value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button @click="confirm" type="primary">确认</el-button>
                </div>
        </el-dialog>
    </div>
</template>

<script>
import service from "../../../config/http";

export default {
    inject: ['reload'],
    data() {
        return {
            dialogFormVisible: false,
            tableData: [],
            userForm: {},
            currentId: '',  // 当前点击用户ID
            currentIndex: '', // 当前点击用户索引
        }
    },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        // 渲染列表页面
        getUserInfo() {
            service({
                method: 'post',
                url: '/user/findUsersByCondition',
                data: {
                    queryString: '',
                    page: 1,
                    size: 10
                }
            }).then((res) => {
                // 将数据渲染到tableData
                console.log(res.data.rows);
                this.tableData = []
                res.data.rows.forEach( item => {
                    let statusText = ''
                    switch(item.status){
                        case 0 : statusText = '启用'; break;
                        case 1 : statusText = '禁止评论'; break;
                        case 2 : statusText = '禁止发贴'; break;
                        case 3 : statusText = '封号'; break;
                    }
                    this.tableData.push({
                        id: item.id,
                        sex: item.sex,
                        username: item.username,
                        phone: item.phone,
                        status: item.status,
                        statusText: statusText
                    })
                })
            })
        },
        // 编辑按钮 
        handleEdit(index, row) {
            // 需要跳转到用户信息页面,并传用户id来回显用户信息
            this.dialogFormVisible = true
            this.currentId = row.id
            this.currentIndex = index
            console.log('编辑按钮点击的行索引为', this.currentIndex, '编辑按钮点击的行对象ID为', this.currentId);
        },
        // 删除按钮
        handleDelete(val) {
            // 传用户 index 或 id 调用后端删除接口
            console.log('点击行数', val);
            service.delete('/user/' + val).then((res)=> {
                console.log(res);
            })
            this.reload()
        },
        // 提交用户表单修改
        confirm() {
            // 传用户信息 params 调用后端接口传数据到数据库
            this.dialogFormVisible = false
            console.log('点击确认按钮，当前提交的status是', this.userForm.status);
            service({
                method: 'post',
                url: '/user/editStatus',
                params: {
                    id: + this.currentId,
                    status: + this.userForm.status
                }
            }).then((res) => {
                console.log('修改用户状态成功', res);
                console.log(this.userForm.status);
                this.tableData[this.currentIndex].status = this.userForm.status
                // 提交新的用户后,重新渲染列表页
                let statusText = ''
                switch(this.userForm.status){
                    case 0 : statusText = '启用'; break;
                    case 1 : statusText = '禁止评论'; break;
                    case 2 : statusText = '禁止发贴'; break;
                    case 3 : statusText = '封号'; break;
                }
                this.tableData[this.currentIndex].statusText = statusText
            })
        },
    }
}
</script>

<style scoped>
.m-container h1 {
    margin-top: -10px;
    margin-bottom: 20px;
}
</style>