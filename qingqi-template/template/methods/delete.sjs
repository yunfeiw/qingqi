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
        this.$api.{{apiname}}.sendCollectTask(this.ckid).then((res) => {
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