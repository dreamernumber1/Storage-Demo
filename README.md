# Storage-Demo
**可以拉取更新的新资源。**

__可以存储拉取下来的资源。__

_可以根据版本迭代，置换过期资源。_


***


### 功能拆分

- 网络交互能力，XHR
- 本地存储能力，localSDK
- 缓存展示能力，浏览器的dom解析器

### 拆解细化-网络能力

* create:创建xhr对象
* readstate:回调函数处理
* para：参数转换
* get：请求发送

### 拆解模块细化-存储读取能力

+ resourceVersion:维护本地缓存版本，更新依据
+ resourceJavascriptList:需要缓存的文件列表
+ needUpdate：检测文件是否需要更新的方法
+ isIE：判断文件是否为IE的方法
+ checkHedge：检测本地缓存是否溢出
+ save：保存缓存与startup相对应

needUpdate()进来直接执行一遍



*That is all!*

