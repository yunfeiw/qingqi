<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
trimDirectiveWhitespaces="true" %> <%@ include
file="/WEB-INF/views/include.inc.jsp" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>xxxxxxxxx</title>
    <%@ include file="/WEB-INF/views/meta.inc.jsp" %>
    <!-- css -->
    <link
      rel="stylesheet"
      href="${ctx}/styles2.0/font/css/font-awesome.min.css?v20201125"
    />
    <link
      rel="stylesheet"
      href="${ctx}/styles2.0/layui/css/layui.css?v20201125"
    />
    <link rel="stylesheet" href="${ctx}/styles2.0/css/common.css?v20201125" />
    <!-- js -->
    <script src="${ctx}/styles2.0/js/jquery-1.9.1.min.js"></script>
    <script src="${ctx}/styles2.0/js/common.js?v20201125"></script>
    <script src="${ctx}/styles2.0/layui/layui.js?v20201125"></script>
    <script src="${ctx}/styles2.0/layui/layTableConfig.js?v20210906"></script>
    <script src="${ctx}/styles2.0/layui/xm-select.js?v20201125"></script>
    <script src="${ctx}/styles/js/H-ui.admin.js?v20210126?v20201125"></script>
    <script src="${ctx}/styles2.0/components/select-query.js?v2020.12.1"></script>
    <script type="text/javascript" src="${ctx}/common/dict"></script>
    <style>
      .item_toggle {
        display: none;
      }
    </style>
  </head>

  <body>
    <div class="ysb-container">
      <div style="display: none">
        <!-- 地区 -->
        <select class="collection_item" id="orgTaxArea">
          <c:forEach items="${dbDictdatasList}" var="dbDictdata">
            <option value="${dbDictdata.dictCode}">
              ${dbDictdata.dictDesc}
            </option>
          </c:forEach>
        </select>
      </div>
      <!-- 表单 -->
      <form method="post" action="${ctx}/business/report/exportData">
        <div class="layui-form">
          <div class="layui-form-item">
            <div class="layui-inline">
              <label class="layui-form-label">公司编码：</label>
              <div class="layui-input-inline">
                <input
                  type="text"
                  id="clientCode"
                  name="clientCode"
                  class="layui-input"
                  placeholder="输入公司编码"
                />
              </div>
            </div>

            <div class="layui-inline">
              <label class="layui-form-label">申报日期：</label>
              <div class="layui-input-inline">
                <input
                  readonly
                  type="text"
                  id="declareDate"
                  name="declareDate"
                  class="layui-input laydate-icon-bg"
                />
              </div>
            </div>

            <div class="layui-inline">
              <label class="layui-form-label">报税地区：</label>
              <div class="layui-input-inline">
                <div id="orgTaxArea_x"></div>
              </div>
            </div>

            <div class="layui-inline">
              <label class="layui-form-label">所属期起止：</label>
              <div class="layui-input-inline">
                <input
                  type="hidden"
                  id="reportPeriodBeginDate"
                  name="reportPeriodBegin"
                />
                <input
                  type="hidden"
                  id="reportPeriodEndDate"
                  name="reportPeriodEnd"
                />
                <input
                  type="text"
                  readonly
                  class="layui-input laydate-icon-bg"
                  id="_time"
                />
              </div>
            </div>

            <!-- 隐藏 -->
            <div class="layui-inline item_toggle">
              <label class="layui-form-label">纳税期限：</label>
              <div class="layui-input-inline">
                <div id="declarePeriod_x"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div align="right">
            <div class="layui-input-inline" style="width: 230px">
              <a
                href="javascript:;"
                class="layui-btn layui-btn-normal layui-btn-sm search_btn"
                ><i class="icon-search"></i> 查 询</a
              >
              <a
                href="javascript:;"
                class="layui-btn layui-btn-primary layui-btn-sm reset_btn"
                ><i class="icon-repeat"></i> 重 置</a
              >
              <a href="javascript:;" class="layui-btn layui-btn-sm senior_btn"
                >高级搜索</a
              >
              <input type="reset" name="res" style="display: none" />
            </div>
          </div>
        </div>
      </form>
      <!-- ------------工具----------- -->
      <div class="ys-table-tool">
        <button type="button" class="btn btn-warning" onclick="declareMore(1)">
          申报
        </button>

        <!-- 导出/导入 -->
        <span class="btn-down-yh">
          <button class="btn btn-default" type="button">导入</button>
          <ul class="btn-down-menu-yh">
            <li><a href="#" onclick="aaa()">历史数据</a></li>
          </ul>
        </span>
      </div>
      <!-- ---------列表及分页-------- -->
      <div class="table-box">
        <table class="layui-hide" id="sample-table" lay-filter="table1"></table>
      </div>
      <div align="center" id="sample-table-page" class="ys-table-page"></div>
    </div>

    <script type="text/javascript">
      var cs = null;
      var table = null;

      /**@desctiption: 当前界面状态*/
      $(function () {
        /*高级搜索*/
        $(".senior_btn").click(function () {
          var start = $(".item_toggle").css("display");
          if (start == "none") {
            $(".item_toggle").css("display", "inline-block");
          } else {
            $(".item_toggle").css("display", "none");
          }
        });

        // 开启下拉多选
        createSelectMutil.data = {
          // 认定类型：
          confirmType: {
            ele: null,
            items: [
              {
                name: "分支认定",
                value: 0,
              },
              {
                name: "税种认定",
                value: 1,
              },
            ],
          },
        };
        createSelectMutil.start();

        layui.use(["form", "laydate", "table"], function () {
          table = layui.table;
          var form = layui.form;
          var laydate = layui.laydate;
          var numbersArr = ["declareAmountSUM", "declareAmountDidSUM"]; //特殊字段
          // 重写排序
          layerSort(layui, numbersArr);

          /* -------初始化日期-------- */
          initDate();

          function initDate() {
            var initStartDate = "";

            var date = new Date();
            var month = date.getMonth() + 1;
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            declareDate = date.getFullYear() + "-" + month;
            initStartDate = declareDate;

            laydate.render({
              elem: "#declareDate",
              theme: "#307ecc",
              trigger: "click",
              type: "month",
              value: initStartDate,
            });
            laydate.render({
              elem: "#_time",
              range: true,
              trigger: "click",
              type: "date",
              theme: "#307ecc",
              done: function (value, date, endDate) {
                if (value == "") {
                  $("#reportPeriodBeginDate").val("");
                  $("#reportPeriodEndDate").val("");
                  return;
                }
                $("#reportPeriodBeginDate").val(value.split(" - ")[0]);
                $("#reportPeriodEndDate").val(value.split(" - ")[1]);
              },
            });
          }

          /* --------实例化图表---------- */
          var cols = [
            //标题栏
            {
              type: "checkbox",
              fixed: "left",
            },
            {
              field: "clientCode",
              title: "公司编码/公司名称",
              minWidth: 330,
              sort: true,
              fixed: "left",
            },
            {
              field: "clientCode",
              title: "报税地区",
              minWidth: 120,
              sort: true,
              fixed: "center",
            },
            {
              field: "auditStatusName",
              title: "审核状态",
              sort: true,
              width: 90,
            },
            {
              field: "declareDate",
              title: "申报日期",
              width: 90,
              sort: true,
              align: "center",
            },
            {
              field: "reportStatus",
              title: "操作",
              width: 80,
              fixed: "right",
              templet: function (full) {
                return (
                  '<a onclick="bbb(' + full.id + ')"  title="点击">点击</a>'
                );
              },
            },
          ];

          cs = new yftable({
            layui: layui, //必填引入layui依赖
            tableItem: "#sample-table", //table 实例节点
            pageItem: "sample-table-page", //分页实例节点
            cols: cols, //thead 表头样板
            fnServerData: function (aoData, fnCallback) {
              aoData.push(
                {
                  name: "clientCode",
                  value: $.trim($("#clientCode").val()),
                },
                {
                  name: "orgName",
                  value: $.trim($("#orgName").val()),
                },
                {
                  name: "auditStatus",
                  value: $('[name="auditStatus"]').val(),
                },
                {
                  name: "orgTaxArea",
                  value: $('[name="orgTaxArea"]').val(),
                },
                {
                  name: "orgCode",
                  value: $("#orgCode").val(),
                }
              );

              $.ajax({
                type: "post",
                dataType: "json",
                data: JSON.stringify(aoData),
                contentType: "application/json",
                url: "${ctx}/business/report/list",
                error: function (xhr, data, e) {
                  console.log(xhr);
                },
                success: function (res) {
                  //成功回调
                  fnCallback(res);
                },
              });
            },
            done: function () {},
          });
          /* ---------查询与重置------- */
          $(".search_btn").on("click", function () {
            cs.searchtable();
          });
          $(".reset_btn").on("click", function () {
            $(".layui-form .layui-input").val("");
            $(".layui-form select").val("");

            var date = new Date();
            var month = date.getMonth() + 1;
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            $("#declareDate").val(date.getFullYear() + "-" + month);
            createSelectMutil.reset();
            form.render();
            cs.resettable();
          });
        });
      });
    </script>
  </body>
</html>
