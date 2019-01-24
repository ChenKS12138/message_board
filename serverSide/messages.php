<?php
    header('Access-Control-Allow-Origin:*');
    function getSqlResult($sql,$con){
        $responce=$con->query($sql);
        $result=[];
        $i=0;
        while($arr=$responce->fetch_array()){
            $result[$i]["id"]=$arr["id"];
            $result[$i]["nickname"]=$arr["nickname"];
            $result[$i]["content"]=$arr["content"];
            $result[$i]["time"]=$arr["time"];
            $i++;
        }   
        return $result;
    }
    $con=mysqli_connect('localhost','root','root');
    $con->select_db('messageboard');
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
?>