<!--
 * @Descripttion: 
 * @Author: 
 * @Date: 
-->

<template>
  <div class="card mx-3 b-no">
    <Form
      ref="formValidate"
      :model="formValidate"
      autocomplete="off"
      :label-width="90"
      onsubmit="return false;"
    >
      <Row>
        <Col span="6">
          <FormItem label="下拉" prop="val1">
            <Select v-model="formValidate.val1" filterable>
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
        <Col span="6">
          <FormItem label="申报期" prop="val2">
            <DatePicker
              type="month"
              :clearable="false"
              style="width: 100%"
              :value="formValidate.val2"
              @on-change="formValidate.val2 = $event"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="下拉" prop="val3">
            <Select v-model="formValidate.val3" filterable>
              <Option value="">请选择</Option>
              <Option
                v-for="item in XL2"
                :value="item.dictCode"
                :key="item.dictCode"
                >{{ item.dictName }}</Option
              >
            </Select>
          </FormItem>
        </Col>

        <template v-if="formshow">
          <Col span="6">
            <FormItem label="文本" prop="val4">
              <Input
                @on-enter="getList"
                placeholder="请输入"
                v-model="formValidate.val4"
              />
            </FormItem>
          </Col>
        </template>
        <Col span="6">
          <FormItem label="" class="text-right" :label-width="0">
            <a href="javascript:;" class="btn searchBtn" @click="getList()">
              搜索
            </a>
            <a
              href="javascript:;"
              class="btn searchresetBtn ml-2"
              @click="resethandle"
            >
              重置
            </a>
            <a href="javascript:;" class="ml-2" @click="formshow = !formshow"
              >{{ formshow ? "收起" : "展开" }}
              <i
                class="ivu-icon ml-1"
                :class="
                  formshow ? 'ivu-icon-ios-arrow-up' : 'ivu-icon-ios-arrow-down'
                "
              ></i
            ></a>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <!-- 操作 -->
    <div class="mb-2">
      <a class="btn btn-outline-info" @click="btnbefore">按钮</a>

      <Tooltip
        content="导出"
        placement="top"
        class="float-right ml-2 mt-1 tooltipcon"
      >
        <a @click="download">
          <i class="ioss-export3 cursor_pointer fontsize16"></i>
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

    <confirm-delete :deleteData="btnhandle" ref="btnEle">
      <div>确认提示？</div>
    </confirm-delete>

    <!-- 失败提示 -->
    <errortip tit="提示" ref="errTip"> 失败原因：{{ msg }} </errortip>
  </div>
</template>

<script>
import { searchFieldFormat, CusInfoTooltip } from "@/misc/root-common";
import { operatorBtn } from "@/misc/operator-btn";
import { getCurrentDate } from "@/misc/datetool";
import moment from "moment";
// 表格
import TableCommon from "@/components/common-component/table";
import PageCommon from "@/components/common-component/page";
// 询问框
import confirmDelete from "@/components/common-component/modal/confirm-delete";
// 提示
import errortip from "@/components/common-component/custom-modal/errortip.vue";
export default {
  components: {
    TableCommon,
    confirmDelete,
    PageCommon,
    CreateCjtask,
    ModifyState,
    UploadCom,
    errortip,
    CollectionRecords,
  },
  data() {
    return {
      msg: "",
      ckid: "",
      XL1: [],
      XL2: [],
      /*查询条件 */
      formValidate: {
        val1: "",
        val2: getCurrentDate(0), // 申报期
        val3: "",
        val4: "",
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
          title: "开始执行时间",
          key: "sendTime",
          ellipsis: true,
          tooltip: true,
          align: "center",
          minWidth: 180,
          render: (h, p) => {
            const { sendTime } = p.row;
            return h(
              "div",
              sendTime ? moment(sendTime).format("YYYY-MM-DD HH:mm:ss") : "--"
            );
          },
        },
        {
          title: "操作",
          key: "id",
          fixed: "right",
          width: 250,
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
    this.getList();
  },
  methods: {
    // 多选
    selectListen(val, name) {
      if (val.includes("")) {
        this.formValidate[name] = [];
      }
    },
    // 提示
    showerr(msg) {
      this.msg = msg;
      this.$refs.errTip.show = true;
    },
    // 按钮
    btnbefore() {
      const arrs = this.$refs.tablecon.selectdata;
      if (arrs.length == 0) {
        this.$Message.warning("请选择一条数据！");
        return;
      }
      this.ckid = { openIds: arrs.map((e) => e.openId).join(",") };
      this.$refs.cjEle.deleteconfirm = true;
    },
    btnhandle() {
      this.$loading.show();
      this.$api.xxxxx.zzzzz(this.ckid).then((res) => {
        this.$loading.hide();
        this.$refs.btnEle.deleteconfirm = false;
        // 提示
        const { result, infos } = res.data;
        if (result == "success") {
          this.$Message.success(infos);
        } else {
          this.msg = infos;
          this.$refs.errTip.show = true;
        }
      });
    },

    // 导出
    download() {
      const arrs = this.$refs.tablecon.selectdata;
      let params = {};
      if (arrs.length == 0) {
        var conarr = this.getSearchField();
        params = {
          condition: JSON.stringify(conarr),
        };
      } else {
        params = {
          ids: arrs.map((e) => e.id).join(","),
        };
      }
      window.$fileCenter.openDownloadModal({
        title: "税务档案文件生成中...",
        content:
          "点击“稍后下载”，可前往【文件传输中心】查看生成进度，生成完成后可进行下载操作。",
        registerId: "gtbt_version_collect_export",
        params: params,
        onSuccess: () => {},
        onError: () => {},
        onStep: (step) => {},
      });
    },
    /**重置 */
    resethandle() {
      this.$refs.formValidate.resetFields();
      this.$refs.tablepage.pageReset();
      this.getList();
    },
    // 列表参数
    getSearchField() {
      const { sendTime, collectStatus } = this.formValidate;

      return searchFieldFormat(
        [
          { f: "gtbtTaxType", op: "eq", t: "i" },
          { f: "orgName", op: "like", t: "s" },
          { f: "sendTimeBegin", op: "eq", t: "s" },
          { f: "sendTimeEnd", op: "eq", t: "s" },
        ],
        {
          ...this.formValidate,
          sendTimeBegin: sendTime[0] || "",
          sendTimeEnd: sendTime[1] || "",
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
      this.$api.xxxxx.zzzzz(params).then((res) => {
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
