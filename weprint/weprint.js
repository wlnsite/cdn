var _weprintId = '';
for (var i = 0; i < 30; i++) {
    _weprintId += ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'][Math.ceil(Math.random() * 35)];
}
if (typeof (html2canvas) == "undefined") {
    var _js = document.createElement("script");
    _js.type = "text/javascript";
    _js.src = (document.location.protocol == "https:" ? "https:" : "http:") + "//cdn.wlniao.cn/weprint/html2canvas.min.js";
    _js.onload = function () {
        weprintLoad('pong', "https://openapi.wlniao.com/jsapi/pong?id=" + _weprintId);
    };
    document.head.appendChild(_js);
}
function weprintLoad(method, url) {
    var _ifr = document.createElement('iframe');
    _ifr.src = 'weprint://' + method + ' ' + url;
    _ifr.style.display = 'none';
    document.body.appendChild(_ifr);
    setTimeout(function () { document.body.removeChild(_ifr); }, 500);
}
function weprint(eleId) {
    var allBody = arguments.length == 0;
    var _temp = {};
    //if (_temp.success) {
    //    _print(_temp);
    //} else {
    //    $.getJSON("https://openapi.wlniao.com/jsapi/weprint?callback=?&id=" + _weprintId, function (obj) {
    //        _temp = obj;
    //        _print(_temp);
    //    });
    //}
     _print(_temp);
    function _print(obj) {
        if (obj.success) {
            html2canvas(allBody ? document.body : document.all.item(eleId), {
                onrendered: function (canvas) {
                    var formData = new FormData();
                    formData.append("policy", obj.policy);
                    formData.append("signature", obj.signature);
                    var bytes = window.atob(canvas.toDataURL("image/png").split(',')[1]);
                    var ab = new ArrayBuffer(bytes.length);
                    var ia = new Uint8Array(ab);
                    for (var i = 0; i < bytes.length; i++) {
                        ia[i] = bytes.charCodeAt(i);
                    }
                    formData.append("file", new Blob([ab], { type: 'image/png' }));
                    $.ajax({
                        url: obj.bucketurl,
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        xhr: function () {
                            myXhr = $.ajaxSettings.xhr();
                            return myXhr;
                        },
                        success: function (responseStr) {
                            var res = eval('(' + responseStr + ')');
                            if (res.code == 200) {
                                weprintLoad('print', obj.host + res.url);
                            }
                        },
                        error: function (res) {
                            if (res.responseText) {
                                alert(eval('(' + res.responseText + ')').message);
                            }
                        }
                    });
                }
            });
        } else if (allBody) {
            window.print();
        } else {
            var oldstr = document.body.innerHTML;
            var newstr = document.all.item(eleId).innerHTML;
            document.body.style.backgroundColor = '#ffffff'
            document.body.innerHTML = "<html><head><title></title></head><body>" + newstr + "</body>";
            window.print();
            document.body.style.backgroundColor = '#bababa'
            document.body.innerHTML = oldstr;
            return false;
        }
    }
}