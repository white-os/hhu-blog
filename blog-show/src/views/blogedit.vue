<template>
    <div class="md-container">
        <el-button class="subBtn" type="primary" @click="submit1">发布</el-button>
        <input class="t-input" placeholder="输入标题" v-model="title"/>
        <mavon-editor
            v-model="content"
            ref="editor"
            @imgAdd="$imgAdd"
            @change="change"
            style="min-height: 780px;"
        ></mavon-editor>

        <el-drawer 
            title="发布文章"
            :visible.sync="dialogVisible"
            direction="rtl">
            <div>
                <el-form :model="form">
                    <el-form-item label="文章标签" label-width="120px">
                        <el-select v-model="form.tags" placeholder="请选择文章标签">
                            <el-option label="Java编程" value="1"></el-option>
                            <el-option label="C++编程" value="2"></el-option>
                            <el-option label="前端开发" value="3"></el-option>
                            <el-option label="Python编程" value="4"></el-option>
                            <el-option label="人工智能" value="5"></el-option>
                            <el-option label="大数据" value="6"></el-option>
                            <el-option label="计算机基础" value="7"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="submit2" type="primary" style="margin-left: 120px; width: 150px">确定并发布</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import service from "../config/http";

export default {
    data() {
        return {
            dialogVisible: false,
            form: {},
            title: '',
            content: '',
            html: '',
            configs: {}
        }
    },
    methods: {
        $imgAdd() {
            let formdata = new FormData();
            formdata.append('file', $file)
            service({
                url:"",
                method: 'post',
                data: formdata,
                headers: { "Content-Type": "multipart/form-data"}
            }).then(url => {
                this.$ref.editor.$img2Url(pos, url)
            })
        },
        change(value, render) {
            // render为markdown解析结果
            this.html = render;
        },
        // 发布按钮
        submit1() {
            this.dialogVisible = true
        },
        // 确定并发布按钮
        submit2() {      
            service({
                method: 'post',
                url: '/user/publishArticle',
                params: {
                    login_user_phone: localStorage.getItem('phoneNumber')
                },
                data: {
                    title: this.title,
                    content: this.html,
                    classify_id: this.form.tags,
                    datetime: new Date().getTime(),
                }
            }).then((res) => {
                console.log(res);
                this.$router.push({ name: 'bloglist' });
                this.$router.go(0)
            })
        }

    }
}
</script>

<style>
    .t-input{
        height: 60px;
        width: 1500px;
        border: 0;
        font-size: 32px;
        outline: 0;
        padding-left: 20px;
    }
    .md-container{
        position: relative;
    }
    .subBtn{
        position: absolute;
        right: 20px;
        top: 8px;
        width: 100px;
    }
    .subBtn span{
        font-size: 18px;
    }
    

</style>