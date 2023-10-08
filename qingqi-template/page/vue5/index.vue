<template>
  <Drawer title="提示" width="1000" :closable="false" v-model="show">
    <Form
      ref="formdata"
      :model="formdata"
      :rules="rules"
      autocomplete="off"
      :label-width="150"
      class="aaa_form"
      onsubmit="return false;"
    >
      <!-- label-position="top" -->
      <Row>
        <Col span="12">
          <FormItem label="申报期" prop="val3">
            <DatePicker
              type="month"
              style="width: 100%"
              :value="formdata.val3"
              @on-change="formdata.val3 = $event"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="下拉" prop="val2">
            <Select v-model="formdata.val2">
              <Option value="">请选择</Option>
              <Option
                v-for="item in XL1"
                :value="item.dictCode"
                :key="item.dictCode"
                >{{ item.dictName }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="文本" prop="val1">
            <Input placeholder="请输入" v-model="formdata.val1" />
          </FormItem>
        </Col>
      </Row>
    </Form>

    <div align="right">
      <Button style="margin-right: 8px" @click="show = false">取消</Button>
      <Button type="primary" @click="save">保存</Button>
    </div>
  </Drawer>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      formdata: {
        val1: "",
        val2: "",
        val3: "",
      },

      rules: {
        val1: { required: true, message: "不能为空!" },
      },
    };
  },
  props: ["XL1"],
  methods: {
    // 初始化
    init() {
      this.show = true;
      this.$refs.formdata.resetFields();
    },
    // 保存
    save() {
      this.$refs.formdata.validate((valid) => {
        if (valid) {
          this.$loading.show();
          // 请求
          this.$api.xxxxxxxxxxx.zzzzzzzzz({ ...this.formdata }).then((res) => {
            this.$loading.hide();
            const { result, infos } = res.data;
            if (result == "success") {
              this.show = false;
              this.$emit("getList");
              this.$Message.success(infos);
            } else {
              this.$Message.error(infos);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less">
.aaa_form {
}
</style>
