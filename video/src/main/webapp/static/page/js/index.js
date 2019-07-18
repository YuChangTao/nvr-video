$(document).ready(function(){
	 function countScale() {
        var sc = $(window).width() / 1920;
        //var sch = $(window).height();
        $('body').css("transform", "scale(" + sc + ")")
        /*$('body').css("transform", "scale(" + sch + ")")*/
       // console.log(sc);
       //console.log(sch);


    }
    $(window).resize(function() {
        countScale()
    })
    countScale();
    //页面等比例铺满屏幕方法结束
    login();
    // getConfig();
    getChannel();
})


// var baseUrl = "http://demo.easynvr.com:10800";
// var baseUrl = "http://192.168.1.3:10800";
var baseUrl = "http://localhost:10800";
var data = [];
//通道id
var channelIdArr=[];
//通道rtmp视频流
var rtmpUrl;
//定时器
var timerArr=[];
//配置数据
var config;
//延时触发单双击
var clickTimeSingle,clickTimeDouble;
//li索引
//var index;
// videojs.options.flash.swf = '../static/video/video-js.swf';
/**
 * 登录获取token
 */
function login() {
    $.ajaxSettings.async = false;
    var getUrl = baseUrl + "/api/v1/login";
    $.get(getUrl, {"username": "admin", "password": "21232f297a57a5a743894a0e4a801fc3"}, function (res) {

    });
    $.ajaxSettings.async = true;
}

function getConfig() {
    var getUrl = '/nvr/config/classify';
    $.get(getUrl, {}, function (res) {
        if (res) {
            console.log(res);
            config = res;
            var options = '<option value="-1">全部</option>';
            for (var i in res) {
                options += '<option value="' + i + '">' + i + '</option>';
            }
            $("#option").html(options);
            $("#select-video").click(function () {
                var v = $("#option").val();
                console.log(v);
                if (v == -1) {
                    getChannel();
                } else {
                    getChannelByType(v);
                }
            })
        }
    })
}

/**
 * 获取通道列表
 */
function getChannel() {
    var getUrl = baseUrl + '/api/v1/getchannels';

/*    var res = '{\n' +
        '    "EasyDarwin": {\n' +
        '        "Header": {\n' +
        '            "CSeq": "1",\n' +
        '            "Version": "v1",\n' +
        '            "MessageType": "MSG_SC_SERVER_GET_CHANNELS_ACK",\n' +
        '            "ErrorNum": "200",\n' +
        '            "ErrorString": "Success OK"\n' +
        '        },\n' +
        '        "Body": {\n' +
        '            "ChannelCount": 8,\n' +
        '            "Channels": [\n' +
        '                {\n' +
        '                    "Channel": 1,\n' +
        '                    "Name": "Channel1",\n' +
        '                    "Online": 1,\n' +
        '                    "SnapURL": "/snap/1/channel_1.jpg?t=1558600547089659600",\n' +
        '                    "ErrorString": ""\n' +
        '                },\n' +
        '                {\n' +
        '                    "Channel": 16,\n' +
        '                    "Name": "Channel16",\n' +
        '                    "Online": 0,\n' +
        '                    "SnapURL": "/snap/16/channel_16.jpg",\n' +
        '                    "ErrorString": ""\n' +
        '                }\n' +
        '            ]\n' +
        '        }\n' +
        '    }\n' +
        '}\n';
    res = JSON.parse(res);
    var list = res.EasyDarwin.Body.Channels;
    data = list;
    createView(list);*/
    $.get(getUrl, {}, function (res) {
        if (res.EasyDarwin.Header.ErrorNum == 200) {
            var list = res.EasyDarwin.Body.Channels;
            data = list;
            createView(list);
        }
    })
}

//通过分类查询视频列表
function getChannelByType(type) {
    var getUrl = baseUrl + '/api/v1/getchannels';
    $.get(getUrl, {}, function (res) {
        if (res.EasyDarwin.Header.ErrorNum == 200) {
            var list = res.EasyDarwin.Body.Channels;
            var listByType = new Array();
            var channelList;
            for (var i in config) {
                if (i == type) {
                    channelList = config[i];
                }
            }
            for (var i=0;i<list.length;i++) {
                var channelName = list[i].Name;
                for (var j=0;j<channelList.length;j++) {
                    if (channelName==channelList[j]) {
                        listByType.push(list[i]);
                    }
                }
            }

            data = listByType;
            createView(listByType);
        }
    })
}

/**
 * 根据通道获取直播流地址
 */
function getChannelStream(index) {
    $.ajaxSettings.async = false;//设置为同步
    var getUrl = baseUrl + '/api/v1/getchannelstream';
    $.get(getUrl, {"channel": channelIdArr[index],"protocol":"FLV"}, function (res) {
        if (res.EasyDarwin.Header.ErrorNum == 200) {
            rtmpUrl = res.EasyDarwin.Body.URL;
        }
    });
}

/**
 * 创建视图
 * @param list
 * @returns {string}
 */
function createView(list) {
    //根据数据生成列表
    var $str = '';
    for (var i = 0; i < list.length; i++) {
        $str += '<li class="violation_body_li model_box">' +
            '          <div class="left_top"></div>' +
            '          <div class="right_top"></div>' +
            '          <div class="left_bottom"></div>' +
            '          <div class="right_bottom"></div>' +
            '          <div class="img_flow_chart_div">' +
            '                <div class="img_box_flow">' +
            '                      <img src="'+baseUrl + list[i].SnapURL+'" width="100%" class="gy_pic_img" />' +
            '                      <div class="bg_play_img"></div>' +
            '                </div>' +
            '                <p class="clearfix violation_img_time">' +
            '                       <span class="float_L">';
        if (list[i].Online == 1) {
            $str += '<font color="green">【在线】</font>';
        } else {
            $str += '<font color="red">【离线】</font>';
        }
        $str += '                   </span> ' +
            '                       <span class="float_R">'+list[i].Name+'</span>' +
            '                </p>' +
            '          </div>' +
            '     </li>';
    }
    $("#videoList").html($str);
    initLiEvent();
}

/**
 * 初始化事件
 * @param val
 */
function initLiEvent(val) {
    //弹出对话框
    $(document).on("dblclick",'.violation_body_li',function() {
    	let _this=this;
    	clearTimeout(clickTimeSingle);
    	clearTimeout(clickTimeDouble);
    	clickTimeDouble =setTimeout(function(){
	    	//获取通道流
	        var index = $(_this).index();
	        var channel = data[index];
	        console.log(data[index]);
	        channelIdArr[index] = channel.Channel;
	        getChannelStream(index);
	        $.ajaxSettings.async = true;
			
	        var videoStr = '<easy-player id="my-video" live="true" aspect="187:100" show-custom-button="true" video-url="'+baseUrl+rtmpUrl+'"></easy-player>'
	        $("#videoBox").html(videoStr);
	        $(".videoBox").find(".vjs-control-bar").hide();//隐藏底部工具
	        //定时刷新心跳
	        let refreshCountFun=function(){
		    		var getUrl = baseUrl + "/api/v1/touchchannelstream";
    				$.get(getUrl, {channel: channelIdArr[index], protocol: "FLV","_":new Date().getTime()}, function (res) {
					})
    		};
	        timerArr[index] = window.setInterval(refreshCountFun, 5000);
	        form_box = layer.open({
	            type: 1,
	            //                   title:['视频详情'],
	            title: false,
	            area: ['60%', '70%'], //宽高width:;
	            content: $('.layer_cont_type'), //DOM对象
	            scrollbar: false, //是否允许浏览器出现滚动条
	            shadeClose: true,
	            end:function(){
	                console.log("close");
	                // 停止定时刷新心跳
	                window.clearInterval(timerArr[index]);
	                //销毁实例
	                // player.dispose();
	            }
	            //maxmin:true//放大窗口按钮
	
	        });
    	},250)
        
        //详情页面数据
    });
    //所有video 单击事件
    $(document).on("click","video",function(){
    	changeVideo(this);
    });
    //li单击事件
    $(document).on("click",".violation_body_li",function(){
    	let _this=this;
    	var index = $(_this).index();
    	if(!$(this).find("video").length){
	    	clearTimeout(clickTimeSingle);
	    	clickTimeSingle = setTimeout(function(){
		    	//获取通道流
//		        index = $(_this).index();
		        var channel = data[index];
		        console.log(index);
		        channelIdArr[index] = channel.Channel;
		    	getChannelStream(index);
		        $.ajaxSettings.async = true;
		    	var videoStr = '<easy-player id="my-video" live="true" aspect="150:100" show-custom-button="true" video-url="'+baseUrl+rtmpUrl+'"></easy-player><div class="video_bg"></div>'
		    	$(_this).find("img,.bg_play_img").hide();
		    	$(_this).find(".img_box_flow").append(videoStr);
		    	$(_this).find(".vjs-control-bar").hide();//隐藏底部工具
		    	//定时刷新心跳
		    	console.log(index)
		    	let refreshCountFun=function(){
		    		var getUrl = baseUrl + "/api/v1/touchchannelstream";
    				$.get(getUrl, {channel: channelIdArr[index], protocol: "FLV","_":new Date().getTime()}, function (res) {
					})
    			};	
	        	timerArr[index] = window.setInterval(refreshCountFun, 5000);
	    	},250)
    	}else{
    		$(_this).find("img,.bg_play_img").show();
    		$(_this).find("easy-player").remove();
            $(_this).find("video").remove();
            window.clearInterval(timerArr[index]);
    	}
    	
    	
    })
    
}


/**
 * 定时刷新心跳
 */
function refreshCount(index) {
//	alert('123')
    var getUrl = baseUrl + "/api/v1/touchchannelstream";
    $.get(getUrl, {channel: channelIdArr[index], protocol: "FLV","_":new Date().getTime()}, function (res) {
		
    })
}
//
function changeVideo(_video){
    if( _video.paused ){
        _video.play();
    }else{
        _video.pause();
    }
}
