var socket = io("http://localhost:8081");

socket.on("sendMsg", (msg) => {
    console.log("received  " + msg)
    showMsg(msg, 'receiveMsg');
})

var showChatWindow = () => {
    $(".chatBlock").show();
}

var sendMsg = () => {
    
    var userMsg = $("#userMsg").val();
    var data = {
        uid: 'test',
        msg: userMsg
    }
    socket.emit("receiveMsg", JSON.stringify(data));
    $("#userMsg").val('');
    showMsg(userMsg, 'send');
}

var showMsg = (msg, type) => {
    var divTag = $("<div />").text(msg);
    var className = (type == 'send') ? 'sendMsg' : 'receiveMsg';
    
    divTag.addClass(className);
    $(".msgBlock").append(divTag);
}