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