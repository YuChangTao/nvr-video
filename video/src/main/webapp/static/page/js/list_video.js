// var baseUrl = "http://localhost:10800";
var baseUrl = "http://192.168.1.3:10800";
var data = [];
//通道id
var channelId;
//通道rtmp视频流
var rtmpUrl;
//定时器
var timer;
//配置数据
var config;

videojs.options.flash.swf = '../static/video/video-js.swf';
$(document).ready(function () {
    var $info = $('#info');
    var $tabs = $('#tabs .item');
    $('#shipin_Bofang').css("width", ($("#list1-container").width() - 40) + "px");
    $('#shipin_Bofang').css("height", $("#list1-container").height() + "px");
    $('.video_div').css("height", ($("#shipin_Bofang").height() - 100) + "px");

    $tabs.on('click', function () {
        var $this = $(this);
        var index = $this.index();
        $this.addClass('active').siblings().removeClass('active');
        /*
          NOTE
            可以 对已有的节点进行 show/hide 操作,
            亦可 动态.html(template)覆盖内容.
        */
        switch (index) {
            case 0:
                $info.find('.track').show();
                $info.find('.item').hide();
                break;
            case 1:
                $info.find('.item').show();
                $info.find('.track').hide();
                break;
            default:
                ;
        }
    });
    //初始化加载列表
    login();
    getConfig();
    getChannel();
});

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

            $("#option").change(function () {
                var v = $(this).val();
                if (v == -1) {
                    getChannel();
                } else {
                    getChannelByType($(this).val());
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
    $.get(getUrl, {}, function (res) {
        if (res.EasyDarwin.Header.ErrorNum == 200) {
            var list = res.EasyDarwin.Body.Channels;
            data = list;
            var str = createView(list);
            $("#list1").html(str);
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
            var str = createView(listByType);
            $("#list1").html(str);
        }
    })
}

/**
 * 根据通道获取直播流地址
 */
function getChannelStream() {
    $.ajaxSettings.async = false;//设置为同步
    var getUrl = baseUrl + '/api/v1/getchannelstream';
    $.get(getUrl, {"channel": channelId}, function (res) {
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
        $str += '<div class="item" style="margin-bottom: 17px;margin-top:17px;height: 415px" onclick="openVideo(' + i + ')">';
        $str += '<div style="background-image: url(\'' + baseUrl + list[i].SnapURL + '\');" class="snapshot"></div>';
        $str += '<div class="info">';
        $str += '<span style="text-align:left;white-space: nowrap;">';
        if (list[i].Online == 1) {
            $str += '<font color="green">【在线】</font>';
        } else {
            $str += '<font color="red">【离线】</font>';
        }
        $str += list[i].Name + '</span>';
        // $str+='<span style="text-align:right;white-space: nowrap;">'+data[i].lastEditTime.substr(5,data[i].lastEditTime.length-1)+'</span>';

        $str += '</div></div>';
    }
    return $str;
}

/**
 * 打开视频
 * @param val
 */
function openVideo(val) {
    var channel = data[val];
    console.log(channel);
    channelId = channel.Channel;
    getChannelStream();
    $.ajaxSettings.async = true;
    var url = "play?Channel=" + channelId + "&Name=" + channel.Name + "&rtmpUrl=" + rtmpUrl + "&SnapURL=" + baseUrl + channel.SnapURL;
    $('.video_div iframe').attr('src', url);
    $('#shipin_Bofang').show();
    $('#list1-container').css("display", "None;");
    $('.video_name').html("通道名称：" + channel.Name);

    timer = window.setInterval(refreshCount, 5000);
}

/**
 * 关闭视频
 */
$(".close_video").on('click', function () {
    $('#shipin_Bofang').hide();
    $('#list1-container').show();
    window.clearInterval(timer);
});


/**
 * 定时刷新心跳
 */
function refreshCount() {
    var getUrl = baseUrl + "/api/v1/touchchannelstream";
    $.get(getUrl, {channel: channelId, "line": "local", protocol: "rtmp"}, function (res) {

    })
}