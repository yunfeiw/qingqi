<template>
  <Modal v-model="show" title="提示" :width="900" :mask-closable="false">
    <!--  -->
    <Form
      ref="formdata"
      class="aaa_form"
      :model="formdata"
      :rules="rules"
      autocomplete="off"
      :label-width="150"
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

    <table-common
      ref="tablecon"
      id="modalTable"
      v-autoHeight:tableMinHeight="{ context: this }"
      :columnsTable="columnsTable"
      :dataTable="dataTable"
    />
    <page-common ref="tablepage" :dataTableShow="dataTableShow" />

    <div slot="footer">
      <Button type="default" @click="show = false">取消</Button>
      <Button type="primary" @click="save">确定</Button>
    </div>
  </Modal>
</template>

<script>
import { searchFieldFormat } from "@/misc/root-common";
// 表格
import TableCommon from "@/components/common-component/table";
import PageCommon from "@/components/common-component/page";
export default {
  components: { TableCommon, PageCommon },
  props: ["XL1"],
  data() {
    return {
      show: false,
      formdata: {
        val1: "",
        val2: "",
        val3: "",
      },
      /*表格 */
      columnsTable: [
        {
          type: "selection",
          width: "60",
          fixed: "left",
          align: "center",
        },
        {
          title: "公司名称",
          key: "orgName",
          ellipsis: true,
          tooltip: true,
          flexd: "left",
          minWidth: 300,
        },

        {
          title: "税号",
          key: "orgTaxNum",
          ellipsis: true,
          tooltip: true,
          flexd: "left",
          minWidth: 250,
        },
      ],
      dataTable: [],
      rules: {
        val1: { required: true, message: "不能为空!" },
      },
    };
  },
  methods: {
    // 初始化
    init() {
      this.show = true;
      this.$refs.formdata.resetFields();
      this.dataTableShow();
    },
    /**回车键 */
    dataResultKey(e) {
      if (e.keyCode == 13) {
        this.dataTableShow();
      }
    },
    getSearchField() {
      return searchFieldFormat(
        [
          { f: "val1", op: "eq", t: "s" },
          { f: "val2", op: "like", t: "s" },
          { f: "val3", op: "like", t: "s" },
        ],
        {
          ...this.formdata,
        }
      );
    },
    /*数据f返回重组 */
    dataTableShow(...rest) {
      this.$loading.show();
      // 初始化
      this.dataTable = [];
      this.$refs.tablecon.selectdata = [];

      // 参数
      rest.indexOf("pagejump") < 0 && (this.$refs.tablepage.current = 1);
      const { current, pagesize } = this.$refs.tablepage;
      const params = {
        page: current,
        per_page: pagesize,
        condition: JSON.stringify(this.getSearchField()),
      };
      // 请求
      this.$api.taxfilecollection.queryOrg(params).then((res) => {
        this.$loading.hide();
        const { result, data, page } = res.data;
        if (result == "success") {
          this.dataTable = data;
          this.$refs.tablepage.tabelTotal(page.total);
        }
      });
    },
    // 保存
    save() {
      this.$refs.formdata.validate((valid) => {
        if (valid) {
          this.$loading.show();

          // 请求
          this.$api.xxxxxx.aaaaaa({ ...this.formdata }).then((res) => {
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

<style lang="less"></style>
