### date-picker

model-value     / v-model 绑定值，如果它是数组，长度应该是 2 Date / number / string / Array — —
readonly        只读 boolean — false
disabled        禁用 boolean — false
size            输入框尺寸 string large/default/small default
editable        文本框可输入 boolean — true
clearable       是否显示清除按钮 boolean — true
placeholder     非范围选择时的占位内容 string — —
start-placeholder 范围选择时开始日期的占位内容 string — —
end-placeholder 范围选择时结束日期的占位内容 string — —
type            显示类型 string year/month/date/dates/datetime/ week/datetimerange/daterange/ monthrange date
format          显示在输入框中的格式 string 请查看 date formats YYYY-MM-DD
popper-class    DatePicker 下拉框的类名 string — —
popper-options  自定义 popper 选项，更多请参考 popper.js object — —
range-separator 选择范围时的分隔符 string — '-'
default-value   可选，选择器打开时默认显示的时间 Date / [Date, Date] — —
default-time    范围选择时选中日期所使用的当日内具体时刻 Date / [Date, Date] — —
value-format    可选，绑定值的格式。 不指定则绑定值为 Date 对象 string 请查看 date formats —
id              等价于原生 input id 属性 string / [string, string] — —
name            等价于原生 input name 属性 string — —
unlink-panels   在范围选择器里取消两个日期面板之间的联动 boolean — false
prefix-icon     自定义前缀图标 string | Component — Date
clear-icon      自定义清除图标 string | Component — CircleClose
validate-event  是否触发表单验证 boolean — true
disabled-date   一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。 function — —
shortcuts       设置快捷选项，需要传入数组对象 Array<{ text: string, value: Date | Function }> — —
cell-class-name 设置自定义类名 Function(Date) — —
teleported      是否将 date-picker 的下拉列表插入至 body 元素 boolean true / false true
