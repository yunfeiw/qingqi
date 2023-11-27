/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-11-14 11:05:31
 */
type COMPONENT = {
    prop: {
        type: string,
        text?: string,
        label?: string,
        props?: {
            column?: []
        },

        options?: [
            {
                label: string,
                value: string
            }
        ],
        btns?: [{ text: string }],
        btnprops?: []
    }
}
// import type { PropType } from 'vue';
// import { defineComponent } from 'vue'
// export const Render = defineComponent({
//     props: {
//         obj: {} as PropType<(vec: DragEvent) => void>
//     },
//     setup(props) {
//         console.log('props', { ...props.obj }, props.obj.type)
//         switch (props.obj.type) {
//             case 'button':
//                 return () => (<el-button {...props.obj.props} > {props.obj.text}</el-button >);
//             case 'input':
//                 return
//         }
//     }
// })

export const Render = (obj: COMPONENT) => {

    switch (obj.prop.type) {
        case 'button':
            return (() => (<el-button {...obj.prop.props} > {obj.prop.text}</el-button >))();
        case 'input':
            return (() => (<el-input {...obj.prop.props} />))();

        case 'select':
            return (() => (
                <el-select {...obj.prop.props} >
                    <el-option label="1" value="1" />
                    <el-option label="2" value="2" />
                    <el-option label="3" value="3" />
                </el-select>
            ))()

        case 'Switch':
            return (() => (
                <el-switch  {...obj.prop.props} />
            ))()

        case 'datepicker':
            return (() => (<el-date-picker  {...obj.prop.props} />))()

        case 'download':
            return (() => (<el-button > {obj.prop.text}</el-button >))();

        case 'upload':
            return (() => (<el-button  > {obj.prop.text}</el-button >))();

        case 'InputForm':
            return (() => (
                <el-form-item label={obj.prop.label}>
                    <el-input {...obj.prop.props} />
                </el-form-item>
            ))();
        case 'SelectForm':
            return (() => (
                <el-form-item label={obj.prop.label}>
                    <el-select {...obj.prop.props} >
                        {
                            obj.prop.options!.map(e => {
                                <el-option label={e.label} value={e.value} />
                            })
                        }
                    </el-select>
                </el-form-item>
            ))();
        case 'DatePickerForm':
            return (() => (
                <el-form-item label={obj.prop.label}>
                    <el-date-picker  {...obj.prop.props} />
                </el-form-item>
            ))();



        case 'SwitchForm':
            return (() => (
                <el-form-item label={obj.prop.label}>
                    <el-switch  {...obj.prop.props} />
                </el-form-item>
            ))()


        case "table":


            // 特殊处理 action

            if (obj.prop.btns!.length > 0) {
                let column = [...obj.prop.props!.column!, {
                    label: '操作',
                    prop: 'id',
                    width: '200'
                }];
                return (() => (
                    <el-table {...obj.prop.props} >
                        {column.map((e: { label: string }) => {

                            if (e.label !== '操作') {
                                return <el-table-column {...e} />
                            } else {
                                return (
                                    <el-table-column {...obj.prop.btnprops}>
                                        <div v-slot='default'>
                                            {
                                                obj.prop.btns!.map(el => (<el-button link type="primary" size="small" >{el.text}</el-button >))
                                            }
                                        </div>
                                    </el-table-column>
                                )
                            }


                        })}
                    </el-table>

                ))()
            } else {
                return (() => (
                    <el-table {...obj.prop.props} >
                        {obj.prop.props!.column!.map((e: { label: string }) => <el-table-column {...e} />)}
                    </el-table>

                ))()
            }

    }
}