let serverSidePath="http://localhost/message_board/serverSide/messages.php";
Vue.component('messages',{
    props:['item'],
    template:'<div data-scroll-reveal="enter bottom" class="message shadow"><div class="message-nickname">{{item.nickname}}</div><div class="message-content">{{item.content}}</div><div class="message-time">{{item.time}}</div></div>',
})
let message=new Vue({
    el:'#messages',
    data:{
        messagesContent:null,
        seen:true,
    },
    created:function(){
        let response;
        let status;
        $.get(serverSidePath,function(data,sta){
            response=data;
            status=sta;
        })
        let messageT=setInterval(function(){
            if(status==='success'){
                response=JSON.parse(response);
                message.messagesContent=response.data.messages.reverse();
                $('#tip').animate({fontSize:'0px',padding:'0px'},300,function(){
                    message.seen=false;
                });
                clearInterval(messageT);
            }
        },100)
    },
})
let createArea=new Vue({
    el:'#createArea',
    data:{
        nickname:null,
        content:null,
        buttonText:"发送",
    },
    methods: {
        update:function(e){
            let id=e.srcElement.id;
            let value=e.path[0].value;
            if(id==='nickname'){
                createArea.nickname=value;
            }
            else if(id==='content'){
                createArea.content=value;
            }
        },
        submit:function(){
            if(!createArea.nickname||!createArea.content){
                alert('昵称和留言内容都要写哦')
            }
            else{
                createArea.buttonText="正在发送中";
                $.post(serverSidePath,{
                    'nickname':createArea.nickname,
                    'content':createArea.content,
                },function(data,sta){
                    alert('留言成功!!');
                    location.reload();
                })
            }
        },
    },
})