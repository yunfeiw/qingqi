/*
 * @Descripttion: 日期组件
 * @Author: yunfei
 * @Date: 2023-01-31 11:41:47
 */

export const datepicker = {
    type: 'datepicker',

    x: 0,

    y: 0,

    props: {

        type: "date",

        'v-model': '',

        placeholder: '请选择',

        format: 'YYYY-MM-DD',

        size: 'default',

        clearable: true,

        disabled: false,

        readonly: false,

        teleported: false,

        editable: false

    }
}
