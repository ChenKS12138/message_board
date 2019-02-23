<?php
    header('Access-Control-Allow-Origin:*');
    date_default_timezone_set("Asia/Shanghai");
    function getSqlResult($sql,$con){
        $responce=$con->query($sql);
        $result=[];
        $i=0;
        while($arr=$responce->fetch_array()){
            $result[$i]["id"]=$arr["id"];
            $result[$i]["nickname"]=$arr["nickname"];
            $result[$i]["content"]=$arr["content"];
            $result[$i]["time"]=date("Y-m-d H:i",$arr["time"]);
            $i++;
        }   
        return $result;
    }
    $con=mysqli_connect('localhost','root','root');
    $con->select_db('messageboard');
    if(empty($_POST['nickname'])||empty($_POST['content'])){
        $messages=getSqlResult('select * from messages',$con);
        $responce=[
            'ret' => 200,
            'desc' => 'success',
            'data' => [
                'messages' => $messages,
            ],
        ];
        $responce=json_encode($responce,JSON_UNESCAPED_UNICODE);
        echo $responce;
    }
    else{
        $nickname=addslashes($_POST['nickname']);
        $content=addslashes($_POST['content']);
        $currentTime=time();
        if(empty($nickname)||empty($content)){
            $responce=[
                'ret' => 201,
                'desc' => 'fall',
            ];
            $responce=json_encode($responce,JSON_UNESCAPED_UNICODE);
            echo $responce;
        }
        else{
            $queryCommand="insert into messages (nickname,content,time) values ('$nickname','$content',$currentTime)";
            $con->query($queryCommand);
            $responce=[
                'ret' => 200,
                'desc' => 'success',
            ];
            $responce=json_encode($responce,JSON_UNESCAPED_UNICODE);
            echo $responce;
        }
    }
?>