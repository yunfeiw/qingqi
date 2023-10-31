<!--
 * @Descripttion: 
 * @Author: 
 * @Date: 2023年10月31日 17:32:32
-->

<template>
    <div class="card mx-3 b-no">
  
      <Form
        ref="formdata"
        :model="formdata"
        autocomplete="off"
        :label-width="90"
        onsubmit="return false;"
      >
      
      
      
  
      <Col span="6">
        <FormItem label="" class="text-right" :label-width="0">
          <a href="javascript:;" class="btn searchBtn" @click="getList()">
            搜索
          </a>
          <a
            href="javascript:;"
            @click="resethandle"
            class="btn searchresetBtn ml-2"
          >
            重置
          </a>
          
          
        </FormItem>
  
        </Col>
      </Form> 
  
        
      <div class="mb-2">
        
        
        
      </div>
  
      <table-common
      ref="tablecon"
      v-autoHeight:tableMinHeight="{ context: this }"
      :columnsTable="columnsTable"
      :dataTable="dataTable"
    />
    <page-common ref="tablepage" :dataTableShow="getList" />
  
      
      
  
    </div>
  </template>
  
  <script>
    import { searchFieldFormat, CusInfoTooltip } from "@/misc/root-common";
import { operatorBtn } from "@/misc/operator-btn";
// 表格
import TableCommon from "@/components/common-component/table";
import PageCommon from "@/components/common-component/page";
    
  
    export default {
      components: {
        TableCommon,
PageCommon,
        
      },
      data() {
        return {
          
          
          formdata:{
  
          },
          
      /*表格 */
      columnsTable: [
        

        {
          title: "公司名称",
          key: "orgName",
          ellipsis: true,
          tooltip: true,
          resizable: true,
          fixed: "left",
          minWidth: 340,
          render: (h, p) => {
            const { orgName, clientCode } = p.row;
            return CusInfoTooltip(h, clientCode, orgName);
          },
        },

        {
          title: "税号",
          key: "orgTaxNum",
          ellipsis: true,
          tooltip: true,
          flexd: "left",
          minWidth: 250,
        },
        {
          title: "申报期",
          key: "declareMonth",
          width: 180,
          align: "center",
          render: (h, p) => {
            const { declareMonth } = p.row;
            return h(
              "div",
              declareMonth ? moment(declareMonth).format("YYYY-MM") : "--"
            );
          },
        },
        {
          title: "档案类型",
          key: "gtbtTaxType",
          width: 200,
          tooltip: true,
          render: (h, p) => {
            const { gtbtTaxType } = p.row;
            let item =
              this.GTBT_TAX_TYPE.find((e) => e.dictCode == gtbtTaxType) || {};
            return h("div", item["dictName"] || "--");
          },
        },
        {
          title: "采集状态",
          key: "collectStatus",
          ellipsis: true,
          tooltip: true,
          width: 160,
          render: (h, p) => {
            const { collectStatus, collectMessage } = p.row;
            let item =
              this.COLLECT_STATUS.find((e) => e.dictCode == collectStatus) ||
              {};
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: collectStatus == 3 ? "error" : "primary",
                },
              },
              [
                h(
                  "a",
                  {
                    on: {
                      click: () => {
                        if (collectStatus == 3) {
                          this.msg = collectMessage;
                          this.$refs.errTip.show = true;
                        }
                      },
                    },
                  },
                  item["dictName"] || "--"
                ),
              ]
            );
          },
        },
        {
          title: "时间",
          key: "val6",
          ellipsis: true,
          tooltip: true,
          align: "center",
          minWidth: 180,
          render: (h, p) => {
            const { val6 } = p.row;
            return h(
              "p",
              val6 ? moment(val6).format("YYYY-MM-DD HH:mm:ss") : "--"
            );
          },
        },
        
      ],
      dataTable: [],
        };
      },
      mounted() {
      },
      methods: {
        
        
        
            /**重置 */
    resethandle() {
      this.$refs.formdata.resetFields();
      this.$refs.tablepage.pageReset();
      this.getList();
    },
    // 列表参数
    getSearchField() {
      const { val5, val6 } = this.formdata;

      return searchFieldFormat(
        [
          { f: "val1", op: "eq", t: "i" },
          { f: "val2", op: "like", t: "s" },
          { f: "val3", op: "eq", t: "s" },
          { f: "val4", op: "eq", t: "s" },
          { f: "val5", op: "eq", t: "s" },
          { f: "val6Begin", op: "eq", t: "s" },
          { f: "val6End", op: "eq", t: "s" },
        ],
        {
          ...this.formdata,
          val6Begin: val6[0] || "",
          val6End: val6[1] || "",
          val5: [...val5].join(","),
        }
      );
    },
    // 列表查询
    getList(...rest) {
      this.$loading.show();
      // 初始化
      this.dataTable = [];
      this.$refs.tablecon.selectdata = [];
      rest.indexOf("pagejump") < 0 && (this.$refs.tablepage.current = 1);
      // 参数
      const { current, pagesize } = this.$refs.tablepage;
      const params = {
        page: current,
        per_page: pagesize,
        condition: JSON.stringify(this.getSearchField()),
      };
      // 请求
      this.$api.Index.queryCollectList(params).then((res) => {
        this.$loading.hide();
        const { result, data, page } = res.data;
        if (result == "success") {
          this.dataTable = data;
          this.$refs.tablepage.tabelTotal(page.total);
        }
      });
    },
      },
    };
  </script>
  
  <style></style>
  