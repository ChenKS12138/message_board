Vue.component('messages',{
    props:['item'],
    template:'<div class="message shadow"><div class="message-nickname">{{item.nickname}}</div><div class="message-content">{{item.content}}</div><div class="message-time">{{item.time}}</div></div>',
})
let message=new Vue({
    el:'#messages',
    data:{
        messagesContent:[
            {nickname:'chen',content:'haha',time:'longlongago'},
        ],
    },
    created:function(){
        let response;
        let status;
        $.get('http://localhost/message_board/serverSide/messages.php',function(data,sta){
            response=data;
            status=sta;
        })
        let messageT=setInterval(function(){
            if(status==='success'){
                response=JSON.parse(response);
                message.messagesContent=response.data.messages;
                console.log(response.data.messages);
                clearInterval(messageT);
            }
        },100)
    },
})