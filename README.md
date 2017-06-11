**项目介绍：**
* 使用 vue-cli + vuex + vue-router + 饿了么UI，编写的一个运维平台的前端页面
* 后端使用Django-rest-framework编写的API，实现前后端分离的后台管理系统。
  * （后端地址：https://github.com/peshow/vue-django）

**功能实现：**
* 暂时只完成了一个Supervisor的管理平台
  * 通过Ansible扫描所有主机，将使用Supervisor的主机写入数据库并展示在前端界面
  * 前端页面可通过进程控制或组控制，对各主机的Supervisor所管理的进程，进行统一的 启动/关闭/重启操作。


**前端页面**
* ![Alt text](https://github.com/peshow/vue-manager/blob/master/png/login.png)
* ![Alt text](https://github.com/peshow/vue-manager/blob/master/png/proc_manager.png)
* ![Alt text](https://github.com/peshow/vue-manager/blob/master/png/group_manager.png)

**结语：**
* 虽然页面和后端代码都还是很low的，但是先把功能实现出来是第一步，以后会不断地对页面及后端API做优化。
