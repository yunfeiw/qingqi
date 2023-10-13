<!--
 * @Descripttion:  
 * @Author: 
 * @Date: 
-->
<template>
  <Modal
    v-model="show"
    title="提示"
    :width="450"
    :mask-closable="false"
    :styles="{ top: '20px' }"
  >
    <div class="col-md-12">
      <Form
        ref="formData"
        :rules="rules"
        :model="formData"
        autocomplete="off"
        class="aaa_form"
        :label-width="90"
        onsubmit="return false;"
      >
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
            <FormItem label="文本" prop="wenben">
              <Input placeholder="请输入" v-model="formdata.val1" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div slot="footer">
      <Button type="default" @click="show = false">取消</Button>
      <Button type="primary" @click="save">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      tit: "",
      formData: { val1: "", val2: "", val3: "" },

      rules: {
        val1: { required: true, message: "不能为空!" },
      },
    };
  },
  props: ["XL1"],
  methods: {
    // 初始化
    init(id) {
      this.show = true;
      this.$refs.formData.resetFields();
    },
    // 数据
    save() {
      // 校验
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.$loading.show();
          // 保存
          this.$api.xxxxx.zzzzz({ ...this.formData }).then((res) => {
            this.$loading.hide();
            const { result, infos } = res.data;
            if (result == "success") {
              this.show = false;
              this.$Message.success(infos);
              this.$emit("getList");
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
