/**
 * author       : 
 * createTime   : 
 * description  : 
 */
<template>
  <div class="cabinetControl">
    <div class="card mx-3 b-no">
      <Form
        id="formvalid"
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        autocomplete="off"
        :label-width="60"
        onsubmit="return false;"
      >
        <Row>
          <Col span="6">
            <FormItem label="公司名称" prop="orgName">
              <Input
                name="orgName"
                clearable
                v-model.trim="formValidate.orgName"
                placeholder="请输入公司名称"
                @keyup.native="dataResultKey($event)"
              />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="税种名称" prop="jsdgName">
              <Input
                name="jsdgName"
                clearable
                v-model.trim="formValidate.jsdgName"
                placeholder="请输入税种名称"
                @keyup.native="dataResultKey($event)"
              />
            </FormItem>
          </Col>

          <Col span="6">
            <FormItem class="label_hh" label="税款所属期" prop="declareDate">
              <DatePickers
                name="declareDate"
                type="monthrange"
                placeholder="请选择"
                :value="formValidate.declareDate"
                style="width: 100%"
                format="yyyy-MM"
                @on-change="formValidate.declareDate = $event"
              />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="提交人" prop="submitter">
              <Select
                name="submitter"
                v-model="formValidate.submitter"
                filterable
                clearable
              >
                <Option value>请选择</Option>
                <Option
                  v-for="item in frontGtbtSubmitByArr"
                  :value="item"
                  :key="item"
                  >{{ item }}</Option
                >
              </Select>
            </FormItem>
          </Col>

          <Col span="24" class="text-right">
            <FormItem label="" class="search-btn-width">
              <a
                href="javascript:;"
                title="查询"
                class="btn searchBtn"
                @click="dataTableShow"
              >
                搜索
              </a>
              <a
                href="javascript:;"
                title="重置"
                class="btn searchresetBtn ml-2"
                @click="resetDataResult"
              >
                重置
              </a>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="button-con">
        <a
          class="btn btn-outline-info"
          v-btnhaspermisson="10171902"
          @click="pitchCheck"
          >审核</a
        >
      </div>
      <table-common
        ref="tablecon"
        v-autoHeight:tableMinHeight="{ context: this }"
        :columnsTable="columnsTable"
        :dataTable="dataTable"
      />
      <page-common ref="tablepage" :dataTableShow="dataTableShow" />
    </div>
    <message-desc ref="messagedesc">
      <template #smsDescribe>
        <div v-html="descript"></div>
      </template>
    </message-desc>
  </div>
</template>

<script>
import { styleVisible, searchFieldFormat, sorTable } from "@/misc/root-common";
import TableCommon from "@/components/common-component/table";
import DatePickers from "@/components/common-component/date-pickers";
import PageCommon from "@/components/common-component/page";
import MessageDesc from "@/components/common-component/modal/error-desc";

import { operatorBtn } from "@/misc/operator-btn";
export default {
  components: {
    TableCommon,
    PageCommon,
    MessageDesc,
    DatePickers,
    AuditModal,
    // RepeatAuditModal,
  },
  data() {
    return {
      descript: "",

      /*查询条件 */
      formValidate: {
        clientCode: "",
        orgName: "",
        declareDate: [],
      },
      ruleValidate: {},
      /*表格 */
      columnsTable: [
        {
          type: "selection",
          width: 70,
          fixed: "left",
          align: "center",
        },
        {
          title: "公司编码",
          key: "clientCode",
          fixed: "left",
          sortable: true,
          resizable: true,
          minWidth: 200,
        },
        {
          title: "公司名称",
          key: "orgName",
          fixed: "left",
          sortable: true,
          resizable: true,
          minWidth: 200,
        },

        {
          title: "核算主体编码",
          key: "hsztCode",
          sortable: true,
          minWidth: 220,
          resizable: true,
          sortMethod: (a, b, type) => {
            return sorTable(a, b, type);
          },
        },
        {
          title: "核算主体名称",
          key: "hsztName",
          sortable: true,
          minWidth: 220,
          resizable: true,
          sortMethod: (a, b, type) => {
            return sorTable(a, b, type);
          },
        },
        {
          title: "税种名称",
          key: "jsdgName",
          sortable: true,
          minWidth: 220,
          resizable: true,
          sortMethod: (a, b, type) => {
            return sorTable(a, b, type);
          },
        },

        {
          title: "审核状态",
          key: "auditStatusText",
          sortable: true,
          width: 120,
          resizable: true,
          sortMethod: (a, b, type) => {
            return sorTable(a, b, type);
          },
        },
        {
          title: "提交人",
          key: "submitter",
          minWidth: 140,
          resizable: true,
          tooltip: true,
        },

        {
          title: "操作",
          key: "id",
          width: 120,
          fixed: "right",
          render: (h, p) => {
            const { id } = p.row;
            var arr = [];
            const isdisplaylook = styleVisible("10171901");

            if (isdisplaylook == "visible") {
              arr.push(
                h(
                  "a",
                  {
                    attrs: {
                      class: "vouchericon",
                      title: "查看",
                    },
                    on: {
                      click: () => {
                        this.checkLook(id, declareDate, platformNo);
                      },
                    },
                  },
                  "查看"
                )
              );
            }
            return operatorBtn(arr, h);
          },
        },
      ],
      dataTable: [],
    };
  },
  created() {},
  methods: {
    /**回车键 */
    dataResultKey(e) {
      if (e.keyCode == 13) {
        this.dataTableShow();
      }
    },

    /*数据f返回重组 */
    dataTableShow(...rest) {
      this.$loading.show();
      this.dataTable = [];
      rest.indexOf("pagejump") < 0 && (this.$refs.tablepage.current = 1);
      this.$refs.tablecon.selectdata = [];
      const { current, pagesize } = this.$refs.tablepage;
      var conarr = this.getSearchField();
      const params = {
        page: current,
        per_page: pagesize,
        condition: JSON.stringify(conarr),
      };
      this.$api.certDownload
        .list(params)
        .then((res) => {
          this.$loading.hide();
          const { result, data, page } = res.data;
          if (result == "success") {
            this.dataTable = data;
            this.$refs.tablepage.tabelTotal(page.total);
          }
        })
        .catch((err) => {
          this.$loading.hide();
        });
    },

    /* 参数处理 */
    getSearchField() {
      var arr = [
        { f: "clientCode", v: "", op: "eq", t: "s" },
        { f: "orgName", v: "", op: "eq", t: "s" },
        { f: "taxId", v: "", op: "like", t: "s" },
        { f: "statisticsDateStart", v: "", op: "eq", t: "s" },
        { f: "statisticsDateEnd", v: "", op: "eq", t: "s" },
      ];
      var searchfiled = this.formValidate;
      const { declareDate } = this.formValidate;

      searchfiled.declareDateDateStart = declareDate[0];
      searchfiled.declareDateEnd = declareDate[1];

      var conarr = searchFieldFormat(arr, searchfiled);
      return conarr;
    },
    /**重置 */
    resetDataResult() {
      this.$refs.formValidate.resetFields();
      this.$refs.tablepage.pageReset();
      this.dataTableShow();
    },
  },
  mounted() {
    this.dataTableShow();
  },
};
</script>

<style>
</style>