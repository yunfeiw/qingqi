
## 项目介绍

- 项目构建工具 
- 模板生成工具 

### 项目构建工具

支持创建vue2/3、react、qiankun项目

### 模板生成工具

支持命令式创建简单的表单、列表页面

## 环境

以`node`环境为基础，使用`TS`进行开发。

#### 命令

```

    使用：qingqi  <command>  [options]

    Commands：

    *  qingqi  init  [ProjectName]  初始化项目  默认初始化，当前执行环境下所有项目

    *  qingqi  serve [ProjectName]  开启服务    默认会启动，当前运行环境下所有项目
        
    *  qingqi  build [ProjectName]  打包        默认打包，当前运行环境下所有项目   
        
    *  qingqi  link                 初始化本地项目依赖

    *  qingqi  creator              创建项目
                                    qingqi creator
                                        - vue 服务    vue-cli
                                        - vue 微服务  vue-qiankun
        
    *  qingqi page                  创建页面
                                        - vue
                                            
                                            * list-page   列表页
                                            * tabs-page   tab页

                                            * list-model  列表弹出层
                                            * form-model  表单弹出层
                                            
                                            * list-drawer 列表抽屉
                                            * form-drawer 表单抽屉

                                        - jsx
                                        - html
                                        - jsp

    Options：

    --help      

    --version  

```

#### 内置UI组件

vue：[iview](https://iviewui.com/view-ui-plus/guide/introduce)

react: [ant.design](https://ant.design)
