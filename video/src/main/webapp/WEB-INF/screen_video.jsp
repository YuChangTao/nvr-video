<%--
  Created by IntelliJ IDEA.
  User: yutyi
  Date: 2019/3/8
  Time: 15:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>视频监控</title>
    <link rel="stylesheet" type="text/css" href="../static/layui/css/layui.css"/>
    <link rel="stylesheet" type="text/css" href="../static/page/css/base.css"/>
    <link rel="stylesheet" type="text/css" href="../static/page/css/common.css"/>
    <link href="../static/video/video-js.min.css" rel="stylesheet">

</head>

<body>
<div class="main_cont">
    <div class="">
        <h1 class="title_text">视频监控</h1>
        <div class="model_box violation_body_box" style="height:900px;">
            <div class="from_box fn-mb20">
                <form class="layui-form" action="" lay-filter="example">
                    <div class="layui-form-item customize_from">
                        <div class="layui-inline">
                            <label class="layui-form-label">工艺线</label>
                            <div class="layui-input-block lay_bg_img">
                                <select name="interest" lay-filter="aihao" id="option">
                                </select>
                            </div>
                        </div>
                        <button type="button" class="btn_inquiry fn-mr20 fn-ml20" id="select-video">查询</button>
                    </div>
                </form>
            </div>
            <div class="left_top"></div>
            <div class="right_top"></div>
            <div class="left_bottom"></div>
            <div class="right_bottom"></div>
            <div class="violation_body">
                <ul class="violation_body_ul" style="height:800px;" id="videoList">
                </ul>
            </div>
        </div>
    </div>
</div>

<!--弹框内容-->
<div class="layer_cont_type">
    <!--<div class="layer_left_top"></div>
    <div class="layer_right_top"></div>
    <div class="layer_left_bottom"></div>
    <div class="layer_right_bottom"></div>-->
    <div class="main_cont_layer">
        <h1 class="title_text">视频详情</h1>
        <div class="model_box map_pollution_details" style="height: 550px;">
            <div class="left_top"></div>
            <div class="right_top"></div>
            <div class="left_bottom"></div>
            <div class="right_bottom"></div>
            <div id="videoBox" class="videoBox" style="width: 100%; height: 100%;">
                <%--<video id="my-video" style="width: 100%; height: 100%;" class="video-js vjs-default-skin vjs-big-play-centered">
                    <source src="" type="rtmp/flv"/>
                    <!--<object width="" height="" type="application/x-shockwave-flash" data="myvideo.swf">
                        <param name="movie" value="myvideo.swf" />
                        <param name="flashvars" value="autostart=true&amp;file=myvideo.swf" />
                    </object>-->
                </video>--%>
                <easy-player id="my-video" live="true" aspect="300:100" show-custom-button="true"></easy-player>
            </div>
        </div>
    </div>
</div>
</body>
<script src="../static/video/jquery-3.3.1.min.js" type="text/javascript" charset="utf-8"></script>
<script src="../static/layui/layui.js" type="text/javascript"></script>
<%--<script type="text/javascript" src="../static/video/video.min.js"></script>--%>
<%--<script type="text/javascript" src="../static/video/videojs-flash.min.js"></script>--%>
<script type="text/javascript" src="../static/video/easy-player-element.min.js"></script>
<script src="../static/page/js/index.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" charset="utf-8">
    layui.use(['form', 'layedit', 'laydate'], function() {
        var form = layui.form
    })

</script>

</html>