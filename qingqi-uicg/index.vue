<!--
 * @Descripttion: 
 * @Author: 
 * @Date: 2023年10月17日 16:44:40
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
          <FormItem label="文本" prop="val2">
            <Input
              @on-enter="getList"
              placeholder="请输入"
              v-model="formValidate.val2"
            />
          </FormItem>
        </Col>
        
        
        
       
        

    
        
        <Col span="6">
          <FormItem label="下拉" prop="val1">
            <Select v-model="formValidate.val1" filterable>
              <Option value="">请选择</Option>
              <Option
                v-for="(item, index) in XL1"
                :value="item.dictCode"
                :key="item.dictCode"
                ></Option
              >
            </Select>
          </FormItem>
        </Col>
        
        
       
        

    

    
    <template v-show="formshow">
    
    </template>

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
        
              <a class="ml-2" href="javascript:;" @click="formshow = !formshow"
        > &lt;&lt;formshow ? "收起" : "展开" &gt;&gt;
        <i
          class="ivu-icon ml-1"
          :class="
          formshow ? 'ivu-icon-ios-arrow-up' : 'ivu-icon-ios-arrow-down'
          "
        ></i
      ></a>

    </Form> 

      
    <div class="mb-2">
      <a class="btn btn-outline-info" @click="btnbefore">删除</a>
      
      <Tooltip
        content="导出"
        placement="top"
        class="float-right ml-2 mt-1 tooltipcon"
      >
        <a @click="downloadhandle">
          <i class="ioss-export3 cursor_pointer fontsize16"></i>
        </a>
      </Tooltip>
      
      <Tooltip
        content="导入"
        placement="top"
        class="float-right ml-2 mt-1 tooltipcon"
      >
        <a @click="download">
          <i class="ioss-exportin cursor_pointer fontsize16"></i>
        </a>
      </Tooltip>
    </div>

    <table-common
      ref="tablecon"
      v-autoHeight:tableMinHeight="{ context: this }"
      :columnsTable="columnsTable"
      :dataTable="dataTable"
    />
    <page-common ref="tablepage" :dataTableShow="getList" />

    
        <!-- 询问框 -->
    <confirm-delete :deleteData="btnhandle" ref="btnEle">
      <div>确认提示？</div>
    </confirm-delete>
    <!-- 失败提示 -->
    <errortip tit="提示" ref="errTip"> 失败原因： </errortip>

  </div>
</template>

<script>
  import { searchFieldFormat, CusInfoTooltip } from "@/misc/root-common";
import { operatorBtn } from "@/misc/operator-btn";
// 表格
import TableCommon from "@/components/common-component/table";
import PageCommon from "@/components/common-component/page";
  
// 询问框
import confirmDelete from "@/components/common-component/modal/confirm-delete";
// 错误提示
import errortip from "@/components/common-component/custom-modal/errortip.vue";

  export default {
    components: {
      TableCommon,
PageCommon,
      confirmDelete,
errortip,
    },
    data() {
      return {
        ckid:"",
        formshow:false,
        formdata:{

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
        {
          title: "操作",
          key: "id",
          width: 250,
          fixed: "right",
          render: (h, p) => {
            const { id } = p.row;

            var arr = [];
            arr.push(
              h(
                "a",
                {
                  attrs: {
                    class: "vouchericon",
                  },
                  on: {
                    click: () => {
                      this.$refs.czEle.init(id);
                    },
                  },
                },
                "操作"
              )
            );

            arr.push(
              h(
                "a",
                {
                  attrs: {
                    class: "vouchericon",
                  },
                  on: {
                    click: () => {
                      window.$fileCenter.openUploadModal({
                        // tempName: "模板名",
                        // tempUrl: this.$api.taxdeclaresupp.importExcelDownload(),
                        uploadType: ["zip"],
                        uploadSize: 1024 * 200,
                        title: "税务档案文件生成中...",
                        content: "请前往【文件传输中心】查看上传进度。",
                        registerId: "gtbt_version_collect_file_upload",
                        params: { id },
                        onSuccess: () => {},
                        onError: () => {},
                        onStep: (step) => {},
                      });
                    },
                  },
                },
                "上传"
              )
            );

            return operatorBtn(arr, h);
          },
        },
      ],
      dataTable: [],
      };
    },
    mounted() {
    },
    methods: {
          // 提示
    showerr(msg) {
        this.msg = msg;
        this.$refs.errTip.show = true;
    },
    // 删除
    btnbefore() {
        const arrs = this.$refs.tablecon.selectdata;
        if (arrs.length == 0) {
            this.$Message.warning("请选择一条数据！");
            return;
        }
        this.ckid = { ids: arrs.map((e) => id).join(",") };
        this.$refs.btnEle.deleteconfirm = true;
    },
    btnhandle() {
        this.$loading.show();
        this.$api.taxfilecollection.sendCollectTask(this.ckid).then((res) => {
            this.$loading.hide();
            this.$refs.btnEle.deleteconfirm = false;
            // 提示
            const { result, infos } = res.data;
            if (result == "success") {
                this.$Message.success(infos);
            } else {
                this.showerr(infos)
            }
        });
    },
          // 导出
    downloadHandle() {
      window.$fileCenter.openDownloadModal({
        title: "税务档案文件生成中...",
        content:
          "点击“稍后下载”，可前往【文件传输中心】查看生成进度，生成完成后可进行下载操作。",
        registerId: "gtbt_version_collect_export",
        params: { condition: JSON.stringify(this.getSearchField()) },
        onSuccess: () => {},
        onError: () => {},
        onStep: (step) => {},
      });
    },
          // 导入
    uploadHandle() {
      window.$fileCenter.openUploadModal({
        // tempName: "模板名",
        // tempUrl: this.$api.taxdeclaresupp.importExcelDownload(),
        uploadType: ["zip"],
        uploadSize: 1024 * 200,
        title: "税务档案文件生成中...",
        content: "请前往【文件传输中心】查看上传进度。",
        registerId: "gtbt_version_collect_file_upload",
        params: { id },
        onSuccess: () => {},
        onError: () => {},
        onStep: (step) => {},
      });
    },
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
      this.$api.taxfilecollection.queryCollectList(params).then((res) => {
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
