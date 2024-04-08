<template>
  <div class="page-container data-collect">
    <pageTable
      ref="tablecon"
      ellipsisAble="tooltip"
      :columnsTable="columns"
      :pageTransfer="true"
      v-autoTableHeight="{ key: 'page-list-table' }"
    >
      <pageSearchList
        ref="formValidate"
        slot="search"
        :searchList="searchList"
        :formValidate.sync="formValidate"
        :loadSearch="pageSearchLoad"
      >
        <div class="mb-16">
          <Button type="primary" @click="handleAdd">添加</Button>
        </div>
      </pageSearchList>
    </pageTable>
    <editDrawer ref="editDrawer" />
    <detailDrawer ref="detailDrawer" />
  </div>
</template>
<script>
import { operatorBtn } from '@/misc/operator-btn'
import editDrawer from './components/editDrawer.vue'
import detailDrawer from './components/detailDrawer.vue'
export default {
  name: 'custom-attribute',
  components: { editDrawer, detailDrawer },
  props: {},
  data() {
    return {
      sellerNameArr: [],
      searchList: [
        {
          type: 'text',
          name: '指标编码',
          key: 'code',
          value: '',
          disabled: false,
          noDrag: false,
          checked: true
        },
        {
          type: 'text',
          name: '指标名称',
          key: 'title',
          value: '',
          disabled: false,
          noDrag: false,
          checked: true
        },
        {
          type: 'select',
          name: '项目类型',
          key: 'type',
          noDrag: false,
          filterable: true,
          clearable: true,
          value: '',
          checked: true,
          optionValue: 'orgTaxNum',
          optionName: 'orgName',
          option: () => this.sellerNameArr
        },
        {
          type: 'select',
          name: '项目名称',
          key: 'type1',
          noDrag: false,
          filterable: true,
          clearable: true,
          value: '',
          checked: true,
          optionValue: 'orgTaxNum',
          optionName: 'orgName',
          option: () => this.sellerNameArr
        },
        {
          type: 'select',
          name: '强弱名称',
          key: 'type2',
          noDrag: false,
          filterable: true,
          clearable: true,
          value: '',
          checked: true,
          optionValue: 'orgTaxNum',
          optionName: 'orgName',
          option: () => this.sellerNameArr
        },
        {
          type: 'select',
          name: '适用范围',
          key: 'type3',
          noDrag: false,
          filterable: true,
          clearable: true,
          value: '',
          checked: true,
          optionValue: 'orgTaxNum',
          optionName: 'orgName',
          option: () => this.sellerNameArr
        },
        {
          type: 'select',
          name: '反馈类型',
          key: 'type4',
          noDrag: false,
          filterable: true,
          clearable: true,
          value: '',
          checked: true,
          optionValue: 'orgTaxNum',
          optionName: 'orgName',
          option: () => this.sellerNameArr
        },
        {
          type: 'select',
          name: '启用状态',
          key: 'type5',
          noDrag: false,
          filterable: true,
          clearable: true,
          value: '',
          checked: true,
          optionValue: 'orgTaxNum',
          optionName: 'orgName',
          option: () => this.sellerNameArr
        }
      ],
      columns: [
        {
          type: 'seq',
          title: '序号',
          fixed: 'left',
          width: 80
        },
        {
          field: 'indicatorSetNo',
          title: '指标编码',
          minWidth: 150
        },
        {
          field: 'indicatorSetName',
          title: '指标名称',
          minWidth: 150
        },
        {
          field: 'indicatorSetNo',
          title: '项目类型',
          minWidth: 150
        },
        {
          field: 'indicatorSetName',
          title: '项目名称',
          minWidth: 150
        },
        {
          field: 'indicatorSetNo',
          title: '子项名称',
          minWidth: 150
        },
        {
          field: 'indicatorSetName',
          title: '目标栏次',
          minWidth: 150
        },
        {
          field: 'indicatorSetName',
          title: '强弱类型',
          minWidth: 150
        },
        {
          field: 'indicatorSetName',
          title: '适用范围',
          minWidth: 150,
          slots: {
            header: ({ column }, h) => {
              return [
                h('span', column.title),
                h(
                  'Tooltip',
                  {
                    attrs: {
                      content: '',
                      transfer: true,
                      placement: 'top',
                      'max-width': 800
                    }
                  },
                  [
                    h('Icon', {
                      props: { type: 'ios-alert-outline', color: '#000', size: 16 },
                      style: { marginLeft: '6px' }
                    }),
                    h(
                      'div',
                      {
                        slot: 'content'
                      },
                      [
                        h('div', '全国：指标适用全部地区和集团'),
                        h('div', '地区：指标适用指定地区'),
                        h('div', '集团：指标适用指定集团，具体集团名称在“税务数据管理”下的【集团规则引用】中设置')
                      ]
                    )
                  ]
                )
              ]
            }
          }
        },
        {
          field: 'indicatorSetName',
          title: '反馈类型',
          minWidth: 150
        },
        {
          field: 'indicatorSetDesc',
          title: '操作人',
          minWidth: 150
        },
        {
          field: 'indicatorSetDesc',
          title: '操作时间',
          minWidth: 150
        },
        {
          field: 'status',
          title: '启用状态',
          minWidth: 150,
          slots: {
            default: ({ row, column }, h) => {
              // status 0:启用 1:关闭 2:开启中 3:开启失败
              const { status } = row
              let arr = []

              arr.push(
                h('i-switch', {
                  props: {
                    'before-change': () => {
                      return new Promise(resolve => {
                        vm.editStatus(row, resolve)
                      })
                    },
                    value: status === 0
                  }
                })
              )

              return arr
            }
          }
        },
        {
          width: 180,
          title: '操作',
          fixed: 'right',
          slots: {
            default: ({ row, column }, h) => {
              const { id } = row
              var arr = []
              
              arr.push(
                h(
                  'a',
                  {
                    on: {
                      click: () => {
                        this.handleDetail(row)
                      }
                    }
                  },
                  '查看'
                )
              )
              arr.push(
                h(
                  'a',
                  {
                    on: {
                      click: () => {
                        this.handleEdit(row)
                      }
                    }
                  },
                  '编辑'
                )
              )
              arr.push(
                h(
                  'a',
                  {
                    on: {
                      click: () => {
                        this.handleDelete(row)
                      }
                    }
                  },
                  '删除'
                )
              )

              return [operatorBtn(arr, h)]
            }
          }
        }
      ],
      formValidate: {
        code: '',
        title: ''
      }
    }
  },
  methods: {
    handleAdd() {
      this.$refs.editDrawer.openDrawer()
    },
    handleEdit(row) {
      this.$refs.editDrawer.openDrawer(row)
    },
    async editStatus(row, resolve) {
      const { status, openId } = row
      const name = status == 1 ? '停用' : '启用'
      let params = {
        openId,
        status: status == 0 ? 1 : 0
      }
      let res = null
      this.$loading.show()
      if (status == 1) {
        res = await this.$api.indicatorSetApi.closeStatus(params)
      } else {
        res = await this.$api.indicatorSetApi.openStatus(params)
      }
      this.$loading.hide()
      const { result } = res.data
      if (result == 'success') {
        this.$Message.success(name + '成功')
        this.initData()
      } else {
        this.$Message.error(infos)
      }
      // this.$Modal.confirm({
      //   title: '确认',
      //   content: `确定${name}该指标集吗？`,
      //   okText: name,
      //   type: 'warning',
      //   onOk: async () => {
      //   }
      // })
    },
    handleDelete(row) {
      let content = ''
      if (row.status == 1) {
        content = '当前指标已启用'
      } else if (row.hasReport == 1) {
        content = '当前指标已生成了校验报告'
      } else {
        this.$Modal.confirm({
          title: `确认删除当前指标吗？`,
          content: '',
          onOk: () => {
            console.log('111')
          }
        })
        return
      }
      this.$Modal.confirm({
        title: `不允许删除`,
        content: content,
        okText: '知道了',
        showCancel: false,
        onOk: () => {
          console.log('111')
        }
      })
    },
    handleDetail(row) {
      this.$refs.detailDrawer.openDrawer(row)
    },
    pageSearchLoad() {
      this.initData('pagejump')
    },

    initData(...rest) {
      var params = {
        module: 'indicatorSetApi',
        api: 'getList',
        condition: this.condition,
        params: {
          ...this.formValidate,
          isCloseHidden: 0, // 不隐藏的列表
          serviceType: this.serviceType
        }
      }
      rest.indexOf('pagejump') >= 0 && (params.pagejump = 'pagejump')
      this.$refs.tablecon.params = params
      this.$refs.tablecon.params = params
      this.$refs.tablecon.tableData = [{ id: 1 }]
      // this.$refs.tablecon.loadTable()
    }
  },
  mounted() {
    this.initData('pagejump')
  },
  destroyed() {}
}
</script>
<style lang="scss" scoped>
.page-container {
  padding: 16px;
  height: 100%;
  .button-more {
    width: 32px;
    height: 32px;
    padding: 0px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    i {
      margin-right: 0px;
    }
  }
}
</style>
