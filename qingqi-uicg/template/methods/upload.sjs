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