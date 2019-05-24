###一.运行前提条件：

    1.机器上存在nvr并且在10800端口上运行，配置好网络摄像头，确保访问localhost:10800，能在nvr上观看视频。 
    2.机器上安装java运行环境jdk

###二.Windows系统下运行bme-nvr.jar：

    1.将resource目录下start.bat,stop.bat copy到bme-nvr.jar同级目录下。
    2.启动（start.bat）和停止脚本(stop.bat)，双击脚本即可完成启动和停止。
    3.访问路径 http://localhost:8090/nvr/video/list ，localhost可替换成当前机器的内网ip地址。
    4.每次修改视频分类配置文件需要重新启动该服务：stop.bat——>start.bat

###三.视频分类配置文件application.yml说明: 

每条分类类型使用 || 分割，分类类型和视频通道使用 | 分割，通道之间使用英文逗号分割，示例如下：

	文丰高炉|Channel1||文丰烧结|Channel2,Channel3||文丰球团|Channel4,Channel5