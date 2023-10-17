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