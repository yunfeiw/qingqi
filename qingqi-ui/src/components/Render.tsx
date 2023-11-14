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
        props?: {}
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
        case 'InputForm':
            return (() => (
                <el-form-item label={obj.prop.label}>
                    <el-input {...obj.prop.props} />
                </el-form-item>
            ))();


    }
}