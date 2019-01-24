let serverSidePath="http://47.106.250.72/page/message_board/serverSide/messages.php";
function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}
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
        nicknameTip:"请写下您的名字",
        contentTip:"请写下您留言的内容。即使网页意外关闭，您的内容也是可以恢复的",
    },
    methods: {
        update:function(e){
            let id=e.srcElement.id;
            let value=e.path[0].value;
            if(id==='nickname'){
                createArea.nickname=value;
                localStorage.setItem('tmpNickname',value);
            }
            else if(id==='content'){
                createArea.content=value;
                localStorage.setItem('tmpContent',value);
            }
        },
        submit:function(){
            if(!createArea.nickname||!createArea.content){
                alert('昵称和留言内容都要写哦');
            }
            else{
                createArea.buttonText="正在发送中";
                localStorage.removeItem('tmpNickname');
                localStorage.removeItem('tmpContent');
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
if(!isEmpty(localStorage.getItem('tmpNickname'))||!isEmpty(localStorage.getItem('tmpContent'))){
    let response=confirm('您上次有未发送的草稿，是否要恢复');
    if(response){
        createArea.nickname=localStorage.getItem('tmpNickname');
        createArea.content=localStorage.getItem('tmpContent');
    }
    else{
        localStorage.removeItem('tmpNickname');
        localStorage.removeItem('tmpContent');
    }
}