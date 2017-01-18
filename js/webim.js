/**
 * jQuery websocket 与服务通信实现在线聊天
 *yeoman
 */
(function($) {

    $(function() {
    	var $resData = $("#resData"),
    	 	$content = $("#content"),
    	 	$userList = $("#userList"),
    		$sendBtn = $("#sendBtn"),
    		$userInfo = $("#userInfo");
    	var swuName = getCookie('swuName');
    	var exampleSocket = new WebSocket("ws://192.168.226.130:50011?swuName="+swuName);
	    exampleSocket.onopen = function (event) {
	    	//var swuName = getCookie('swuName');
	    	//var openArray = new Array()
	    	//openArray[0] = swuName;
	    	//exampleSocket.send(JSON.stringify(openArray));
	    };
    	exampleSocket.onmessage = function (event) {
	    	console.log(event.data);
	    	if(event.data){
		        var data = JSON.parse(event.data);
		        var msgVal = '';
		        var leftVal = '';
		        var userName = '';
		        console.log(data);
		        switch(data.type){
			        case 'selfInit' :
			            msgVal += "欢迎~"+data.content.nickname+"\n";
			            userName += "欢迎~"+data.content.nickname+"\n";
			            $userInfo.text(userName);
			            break;
			        case 'connect' :
			            msgVal += data.content.nickname+"~上线啦！";
			            msgVal += "现在线人数总计"+data.content.total+"人\n";
			            break;
			        case 'message' :
			            msgVal += data.content.nickname+"说："+data.content.message+"\n";
			            break;
			        case 'disconnect' :
			            msgVal += data.content.nickname+"~已下线！\n";
			            msgVal += "现在线人数总计"+data.content.total+"人\n";
			            break;
			        case 'userList' :
			            leftVal += "实时在线" +data.content.total +"人:\n";
			            for(var i=0;i< data.content.userList.length; i++){
			                leftVal += data.content.userList[i].nickname+"\n";
			            }
			            $userList.val(leftVal);
			            break;
		        }
		        msgVal = $resData.val() + msgVal;
		        $resData.val(msgVal);
	    	}
    	}
    	$sendBtn.click(function() {
            var msgVal = $content.val();
	        var msgData = $resData.val() + '我说：' + msgVal + "\n";
	        $resData.val(msgData);
	        exampleSocket.send(msgVal);
	        $content.val('');
        });
        function getCookie(name)
		{
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg))
				return unescape(arr[2]);
			else
				return null;
		}
    });
})(jQuery);
