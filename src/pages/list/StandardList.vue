<template>
  <div>
    <el-row :style="{marginBottom: '15px'}">
      <el-col :span="24">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
        <el-button type="primary" size="small" icon="el-icon-edit" @click="editArticle">编辑</el-button>
        <el-button type="primary" size="small" icon="el-icon-minus">删除</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" border v-loading="loading" ref="articleTable">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :style="{marginTop: '20px'}"
    ></el-pagination>

    <el-dialog title="添加" :visible.sync="addDialogVisible" width="40%">
      <el-form
        ref="addDialogForm"
        :model="addDialogFormData"
        :rules="addDialogFormRules"
        label-width="60px"
        label-position="left"
      >
        <el-form-item prop="title" label="标题">
          <el-input v-model="addDialogFormData.title"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <el-input v-model="addDialogFormData.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetAddDialogForm('addDialogForm')">取 消</el-button>
        <el-button type="primary" @click="submitAddDialogForm('addDialogForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="editDialogVisible" width="40%">
      <el-form
        ref="editDialogForm"
        :model="editDialogFormData"
        :rules="editDialogFormRules"
        label-width="60px"
        label-position="left"
      >
        <el-form-item prop="title" label="标题">
          <el-input v-model="addDialogFormData.title"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <el-input v-model="addDialogFormData.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetEditDialogForm('editDialogForm')">取 消</el-button>
        <el-button type="primary" @click="submitEditDialogForm('editDialogForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      addDialogVisible: false,
      editDialogVisible: false,
      addDialogFormData: {
        title: "",
        content: ""
      },
      addDialogFormRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      editDialogFormData: {
        title: "",
        content: ""
      },
      editDialogFormRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getData(this.currentPage, val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getData(val, this.pageSize);
    },
    getData(pageNumber, pageSize) {
      this.loading = true;
      this.$axios
        .get(
          `/api/blog/all/?pageSize=${pageSize}&pageNumber=${pageNumber}&sortName=id&sortOrder=desc&_=1595230808893`
        )
        .then(
          resp => {
            this.loading = false;
            let ajaxData = [];
            for (let i = 0; i < resp.data.rows.length; i++) {
              ajaxData.push({
                key: resp.data.rows[i].id,
                id: resp.data.rows[i].id,
                title: resp.data.rows[i].title,
                content: resp.data.rows[i].content
              });
            }

            this.tableData = ajaxData;
            this.total = resp.data.total;
          },
          err => {
            this.loading = false;
            console.log(err);
          }
        );
    },
    openAddDialog() {
      this.addDialogVisible = true;
    },
    submitAddDialogForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
        }
      });
    },
    resetAddDialogForm(formName) {
      this.$refs[formName].resetFields();
      this.addDialogVisible = false;
    },
    editArticle() {
      let selection = this.$refs.articleTable.selection;
      let len = selection.length;
      if (len == 0) {
        this.$notify.error({
          title: "错误",
          message: "请选择一篇文章"
        });
      } else if (len > 1) {
        this.$notify.error({
          title: "错误",
          message: "一次只能编辑一篇文章"
        });
      } else {
        this.addDialogVisible = true;
      }
    },
    submitEditDialogForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
        }
      });
    },
    resetEditDialogForm(formName) {
      this.$refs[formName].resetFields();
      this.editDialogVisible = false;
    },
  },
  mounted() {
    this.getData(1, 5);
  }
};
</script>

<style scoped>
</style>