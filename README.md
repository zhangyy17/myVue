# myVue
# UUI
UPortal UI框架

## 准备
由于UUI项目使用[NodeJS](https://nodejs.org/en/ "NodeJS")的**NPM**来管理依赖，所以需要先行安装[NodeJS](https://nodejs.org/en/ "NodeJS")。

安装完[NodeJS](https://nodejs.org/en/ "NodeJS")以后，由于受到公司网络影响，我们无法直接访问外网的NPM服务器。
1. 如果没有外网权限，请打开CMD命令行执行一下命令：
```cmd
npm config rm proxy
npm config rm http-proxy
npm config rm https-proxy
npm config set no-proxy .huawei.com
npm config set registry http://w3cloudnkg-sit1.huawei.com/ccloud/nexus/content/groups/npm-all/
![image.png](http://rnd-isourceb.huawei.com/images/SZ/20180130/fbb3050f-4382-4bf9-a6c2-1e59036010e8/image.png)
```
2. 如果有外网权限，可以在工程项目根目录下新建一个\.npmrc的文件，然后将文件内容修改成以下内容：
```
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
electron_mirror=https://npm.taobao.org/mirrors/electron/
registry=https://registry.npm.taobao.org
proxy=http://{域账号:c00346582}:{密码:12345678}@proxyus-nrd.huawei.com:8080/
https-proxy=http://{域账号:c00346582}:{密码:12345678}@proxycn2.huawei.com:8080
```
> 域账号域密码请填写个人真实的域账号密码。如：
> http://c00346582:12345678@proxyus-nrd.huawei.com:8080/
> 如果密码包含特殊字符，可以使用双引号包裹起来。

最后执行以下命令来安装依赖并启动项目：
``` cmd
npm install webpack -g #UUI代码通过Webpack来管理，所以需要先安装Webpack。
npm install #安装依赖包。如果因为无法安装P...JS而导致安装依赖失败，那么请执行npm install --ignore-script
npm start #启动项目
```

## 代码静态检查
UUI 使用[ESlint](https://eslint.org/docs/rules "ESlint")对前台代码做静态检查。可以通过以下命令执行静态检查。
```cmd
npm run lint
```
静态检查并fix自定义的eslint规则，规则定义在.eslintrc.js的rules中。详细信息请在[ESlint](https://eslint.org/docs/rules "ESlint")官网中查看。

| 规则名称        | 描述                                                                                        | 设置级别             |
| --------------- | ------------------------------------------------------------------------------------------- | -------------------- |
| semi            | 需要使用分号结尾                                                                            | warn                 |
| comma-dangle    | 当最后一个元素或属性与闭括号在不同的行时，允许使用拖尾逗号；当在 同一行时，禁止使用拖尾逗号 | error only-multiline |
| no-extra-semi   | 禁用不必要的分号                                                                            | error                |
| no-unused-vars  | 禁止未使用过的变量                                                                          | warn                 |
| no-useless-call | 禁用不必要的call()和apply()                                                                 | warn                 |
| no-dupe-keys    | 禁止在对象字面量中出现重复的键                                                              | error                |
| quotes          | 强制使用一致的单引号                                                                        | warn, single         |
| no-multi-spaces | 禁止出现多个空格                                                                            | warn                 |


如果您使用的编辑器是VSCode，请安装eslint插件，并在用户设置中配置新增以下配置项，即可实现文件保存时的autofix功能。
```json
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",{
            "language": "vue",
            "autoFix": true
        },"html",
        "vue"
    ],
    "editor.formatOnSave": true,
```

## 如何使用UUI
首先，编译出uui.js文件
```cmd
npm run plugin;
```
编译以后，会在dist目录下生成以下文件。只要在html文件中uui.js和style.css文件就可以了。
```
dist
  |- uui.js
  |- style.css
  |- 5e8fa168960bda64d7943d670d22684f.svg
  |- 0517a6fce55fea7c56b32c5116cef5a0.ttf
  |- 5592887d61fc22ae04e995efbf88f4c6.woff
  |- cfe19ca139f356e160f5303cf70a5846.eot
```
> PS: 如果使用的字体图标有改变，生成的后4个文件名也会随之改变。
