const express = require('express');
// const path = require('path');
let router = express.Router();

let Board = [
    {
        title:"HTML",
        content:"html 은 Hyper Text Markup Language의 약자로 웹 페이지를 제작하기 위한 언어입니다.",
        createdAt: '2023-03-03',
        updatedAt: '2023-03-07'
    },
    {
        title:"CSS",
        content:"CSS 는 Cascading Style Sheets 의 약자로 HTML 파일을 꾸며주기 위한 언어입니다.",
        createdAt: '2023-02-10',
        updatedAt: '2023-02-14'
    },
    {
        title:"JavaScript",
        content:"JavaScript 는 뭘까요?",
        createdAt: '2023-02-18',
        updatedAt: '2023-02-18'
    },
    {
        title:"TypeScript",
        content:"TypeScript 는 JavaScript 의 모든 단점을 보완하여 만든 언어입니다.",
        createdAt: '2023-02-20',
        updatedAt: '2023-02-20'
    },
]
let len = Board.length;
router.get('/', async function(req, res, next){
    
    let list = "";
    for(let i = 0; i < len; i++){
        let temp;
        if(Board[i].content.length > 10){
            temp = Board[i].content.substring(0, 11);
            temp += "..."
        }
        else{
            temp = Board[i].content;
        }
        list += "<tr>"
        list += "<td>" + i + "</td>";
        list += "<td>" + Board[i].title + "</td>";
        list += "<td>" + temp + "</td>";
        list += "<td>" + Board[i].createdAt + "</td>";
        list += "<td>" + Board[i].updatedAt + "</td>";
    }
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>My Stacks</title>
                <style>
                    body{
                        background-color: rgba(240, 247, 255);
                    }
                    h1{
                        color: rgba(11, 92, 27);
                        text-align: center;
                    }
                    input[type=text]{
                        width: 500px;
                        height:40px;
                        font-size: 17px;
                        border: 1px solid black;
                        border-radius: 10px;
                        outline: none;
                        padding-left: 10px;
                        text-align: center;
                    }
                    .firstbutton{
                        height: 40px;
                        width: 100px;
                        border-radius: 10px;
                        text-align:center;
                        font-size: 17px;
                        cursor:pointer;
                    }
                    .secondbutton{
                        background-color: rgba(245, 222, 180);
                        border-radius: 20px;
                        text-align: center;
                        font-size: 20px;
                        heigth: 30px;
                        width: 600px;
                        color: rgba(152, 67, 190);
                        cursor:pointer;
                    }
                    form{
                        margin-bottom: 10px;
                        text-align: center;
                    }
                    .table{
                        width: 100%;
                        border-style: dotted;
                        border-color: rgba(116, 142, 124);
                        border-radius: 10px;
                        border-collapse: collapse;
                    }
                    .table tr{
                        height: 40px;
                    }
                    .table th{
                        border-style: dotted;
                        border-color: rgba(116, 142, 124);
                    }
                    .table td{
                        border-style: dotted;
                        border-color: rgba(116, 142, 124);
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <h1>내가 다룰 수 있는 기술 스택 자랑하기</h1>
                <form style="text-align: center;" action ="/title" method="get">
                    <input type="text" name="search" placeholder="입력하신 단어를 포함하는 제목의 게시글을 볼 수 있습니다"/>
                    <input class="firstbutton" type="submit" value="검색">
                </form>
                <form style="text-align: center;" action= "/index" method="get">
                    <input type="text" name="number" placeholder="번호를 입력하여 게시글을 자세히 볼 수 있습니다"/>
                    <input class="firstbutton" type="submit" value="상세보기">
                </form>
                <form action="/write" method="get">
                    <input class="secondbutton" type="submit" value="새 게시글 작성하기">
                </form>
                <div style="margin: 15px 20%;">
                    <h2>현재 검색된 게시글 개수: <span style="color:rgba(148,96,62)">${len}<span></h2>
                    <table id="table" class="table">
                        <thead>
                            <tr style="background-color: rgba(173, 255, 48)">
                                <th>번호</th>
                                <th>제목</th>
                                <th>내용</th>
                                <th>작성일</th>
                                <th>수정일</th>
                            </tr>
                        </thead>
                        <tbody>${list}</tbody>
                    </table>
                </div>
            </body>
        </html>
    `);
});

router.get('/title', function(req, res, next){
    // console.log(req.query)
    let arr = [];
    let indexarr = [];
    for(let i = 0; i < len; i++){
        if(Board[i].title.includes(req.query.search)){
            // console.log(req.query.search);
            arr.push(Board[i]);
            indexarr.push(i);
            // console.log(Board[i].title);
        }
    }
    let arrlen = arr.length

    let list = "";
    for(let i = 0; i < arrlen; i++){
        let temp;
        if(arr[i].content.length > 10){
            temp = arr[i].content.substring(0, 11);
            temp += "..."
        }
        list += "<tr>"
        list += "<td>" + indexarr[i] + "</td>";
        list += "<td>" + arr[i].title + "</td>";
        list += "<td>" + temp + "</td>";
        list += "<td>" + arr[i].createdAt + "</td>";
        list += "<td>" + arr[i].updatedAt + "</td>";
    }
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>My Stacks</title>
                <style>
                    body{
                        background-color: rgba(240, 247, 255);
                    }
                    h1{
                        color: rgba(11, 92, 27);
                        text-align: center;
                    }
                    input[type=text]{
                        width: 500px;
                        height:40px;
                        font-size: 17px;
                        font-color: 'gray';
                        border: 1px solid black;
                        border-radius: 5px;
                        outline: none;
                        padding-left: 10px;
                        text-align: center;
                    }
                    .firstbutton{
                        height: 40px;
                        width: 100px;
                        border-radius: 10px;
                        text-align:center;
                        font-size: 17px;
                        cursor:pointer;
                    }
                    .secondbutton{
                        background-color: rgba(245, 222, 180);
                        border-radius: 20px;
                        text-align: center;
                        font-size: 20px;
                        heigth: 30px;
                        width: 600px;
                        color: rgba(152, 67, 190);
                        cursor:pointer;
                    }
                    form{
                        margin-bottom: 10px;
                        text-align: center;
                    }
                    .table{
                        width: 100%;
                        border-style: dotted;
                        border-color: rgba(116, 142, 124);
                        border-radius: 10px;
                        border-collapse: collapse;
                    }
                    .table tr{
                        height: 40px;
                    }
                    .table th{
                        border-style: dotted;
                        border-color: rgba(116, 142, 124);
                    }
                    .table td{
                        border-style: dotted;
                        border-color: rgba(116, 142, 124);
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <h1>내가 다룰 수 있는 기술 스택 자랑하기</h1>
                <form style="text-align: center;" action ="/title" method="get">
                    <input type="text" name="search" placeholder="입력하신 단어를 포함하는 제목의 게시글을 볼 수 있습니다"/>
                    <input class="firstbutton" type="submit" value="검색">
                </form>
                <form style="text-align: center;" action="/index"method="get">
                    <input type="text" name="number" placeholder="번호를 입력하여 게시글을 자세히 볼 수 있습니다"/>
                    <input class="firstbutton" type="submit" value="상세보기">
                </form>
                <form action="/write" method="get">
                    <input class="secondbutton" type="submit" value="새 게시글 작성하기">
                </form>
                <div style="margin: 15px 20%;">
                    <h2>현재 검색된 게시글 개수: <span style="color:rgba(148,96,62)">${arrlen}<span></h2>
                    <table id="table" class="table">
                        <thead>
                            <tr style="background-color: rgba(173, 255, 48)">
                                <th>번호</th>
                                <th>제목</th>
                                <th>내용</th>
                                <th>작성일</th>
                                <th>수정일</th>
                            </tr>
                        </thead>
                        <tbody>${list}</tbody>
                    </table>
                </div>
            </body>
        </html>
    `)
});

let no;

router.get('/index', function(req,res,next){
    // console.log(req.query)
    no = req.query.number;
    // res.json(Board[no]);
    if(no >= len){
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Error: You entered wrong index. Please go to the main page and enter a correct index again.</h1>
        </body>
        </html>
        `)
    }
    else{
        res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>My Stacks</title>
                <style>
                    body{
                        background-color: rgba(240, 247, 255);
                    }
                    h1{
                        color: rgba(11, 92, 27);
                        text-align: center;
                    }
                    input[type=text]{
                        width: 500px;
                        height:40px;
                        font-size: 17px;
                        font-color: 'gray';
                        border: 1px solid black;
                        border-radius: 5px;
                        outline: none;
                        padding-left: 10px;
                        text-align: center;
                    }
                    .firstbutton{
                        height: 40px;
                        width: 100px;
                        border-radius: 10px;
                        text-align:center;
                        font-size: 17px;
                        cursor:pointer;
                    }
                    form{
                        margin-bottom: 10px;
                        text-align: center;
                    }
                    .container{
                        height: 500px;
                        text-align:center;
                        width: 70%;
                        background-color: rgba(245, 222, 180);
                        margin:auto;
                        border-radius: 15px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .title{
                        width: 95%;
                        background-color: rgba(221, 198, 224);
                        height: 100px;
                        margin: 10px;
                        border-radius: 15px;
                        line-height: 100px;
                        font-size: 50px;
                    }
                    .date{
                        width: 95%;
                        background-color: rgba(221, 198, 224);
                        margin-bottom: 5px;
                        height: 30px;
                        border-radius: 15px;
                        line-height: 30px;
                        font-size: 15px;
                        color: gray;
                    }
                    .content{
                        width: 95%;
                        background-color: rgba(144, 238, 144);
                        height: 250px;
                        margin: 10px;
                        border-radius: 15px;
                        font-size: 30px;
                        text-align: left;
                        align-items: center;
                    }
                    .thirdbutton{
                        width: 100%;
                        border:none;
                        background-color: rgba(144, 238, 144);
                        border-radius: 20px;
                        text-align: center;
                        font-size: 20px;
                        heigth: 30px;
                        cursor:pointer;
                    }
                </style>
            </head>
            <body>
                <h1>내가 다룰 수 있는 기술 스택 자랑하기</h1>
                <form style="text-align: center;" action ="/title" method="get">
                    <input type="text" name="search" placeholder="입력하신 단어를 포함하는 제목의 게시글을 볼 수 있습니다"/>
                    <input class ="firstbutton" type="submit" value="검색">
                </form>
                <form style="text-align: center;" action= "/index" method="get">
                    <input type="text" name="number" placeholder="번호를 입력하여 게시글을 자세히 볼 수 있습니다"/>
                    <input class="firstbutton" type="submit" value="상세보기">
                </form>
                <div class="container">
                    <div class="title">${Board[no].title}</div>
                    <div class="date">작성일: ${Board[no].createdAt}</div>
                    <div class="date">수정일: ${Board[no].updatedAt}</div>
                    <div class="content">${Board[no].content}</div>
                    <form style="text-align:center;width:95%" action="/edit/${no}" method:"GET">
                        <input class="thirdbutton" type="submit" value="수정하기">
                    </form>
                </div>
            </body>
        </html>
        `)
    }

});

router.get('/edit/:id', function(req,res,next){
    // console.log(req.params.id)
    let i = req.params.id;
    // res.json(req.params)
    // console.log(req.query)
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>My Stacks</title>
                <style>
                    body{
                        background-color: rgba(240, 247, 255);
                    }
                    h1{
                        color: rgba(11, 92, 27);
                        text-align: center;
                    }
                    input[type=text]{
                        width: 500px;
                        height:40px;
                        font-size: 17px;
                        font-color: 'gray';
                        border: 1px solid black;
                        border-radius: 5px;
                        outline: none;
                        padding-left: 10px;
                        text-align: center;
                    }
                    form{
                        margin-bottom: 10px;
                        text-align: center;
                    }
                    .container{
                        height: 500px;
                        text-align:center;
                        width: 50%;
                        background-color: rgba(249, 234, 215);
                        margin:auto;
                        border-radius: 15px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .title{
                        width: 100%;
                        background-color: rgba(221, 198, 224);
                        height: 100px;
                        margin: 10px;
                        border-radius: 15px;
                        line-height: 100px;
                        font-size: 50px;
                        text-align: left;
                        border:none;
                    }
                    .thirdbutton{
                        width: 100%;
                        border:none;
                        background-color: rgba(0, 128, 0);
                        border-radius: 20px;
                        text-align: center;
                        font-size: 20px;
                        heigth: 30px;
                        cursor:pointer;
                        color: white;
                    }
                    .date{
                        width: 95%;
                        background-color: rgba(221, 198, 224);
                        margin-bottom: 5px;
                        height: 30px;
                        border-radius: 15px;
                        line-height: 30px;
                        font-size: 15px;
                        color: gray;
                    }
                </style>
            </head>
            <body>
                <h1>내가 다룰 수 있는 기술 스택 자랑하기</h1>
                <div class="container">
                    <form class="container" style="text-align:center;" action="/edit2/${i}" method="POST">
                        <input style="text-align:left"class ="title" type="text" name="title" value="${Board[i].title}">
                        <div class="date">작성일: ${Board[i].createdAt}</div>
                        <div class="date">수정일: ${Board[i].updatedAt}</div>
                        <br>
                        <textarea style="border-radius: 10px; background-color: rgba(144, 238, 144)" name="content" cols ="100" rows="20">${Board[i].content}</textarea>
                        <br>
                        <input class="thirdbutton" type="submit" value="수정완료">
                    </form>
                </div>
            </body>
        </html>
    `)
});

router.post('/edit2/:id', function(req,res,next){
    let index = req.params.id;
    // console.log(req.body)
    // res.json(req.body)
    Board[index].title = req.body.title;
    Board[index].content = req.body.content;
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1);
    if(month.length === 1){
        month = '0' + month;
    }
    let date = today.getDate();
    Board[index].updatedAt = year + '-' + month + '-' + date;
    res.redirect('/');
});

router.get('/write', function(req,res,next){
    res.send(`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Stacks</title>
            <style>
                body{
                    background-color: rgba(240, 247, 255);
                }
                h1{
                    color: rgba(11, 92, 27);
                    text-align: center;
                }
                input[type=text]{
                    width: 500px;
                    height:40px;
                    font-size: 17px;
                    font-color: 'gray';
                    border: 1px solid black;
                    border-radius: 5px;
                    outline: none;
                    padding-left: 10px;
                    text-align: center;
                }
                form{
                    margin-bottom: 10px;
                    text-align: center;
                }
                .container{
                    height: 500px;
                    text-align:center;
                    width: 50%;
                    background-color: rgba(116, 197, 75);
                    margin:auto;
                    border-radius: 15px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .title{
                    width: 100%;
                    background-color: white;
                    height: 100px;
                    margin: 10px;
                    border-radius: 15px;
                    line-height: 100px;
                    font-size: 50px;
                    text-align: left;
                }
                .thirdbutton{
                    width: 100%;
                    border:none;
                    background-color: rgba(0, 128, 0);
                    border-radius: 20px;
                    text-align: center;
                    font-size: 20px;
                    heigth: 30px;
                    cursor:pointer;
                    color: white;
                }
            </style>
        </head>
        <body>
            <h1>내가 다룰 수 있는 기술 스택 자랑하기</h1>
            <div class="container">
                <form class="container" style="text-align:center;" action="/write/${Board.length}" method="POST">
                    <input class ="title" type="text" name="title">
                    <br>
                    <textarea style="border:1px solid black; border-radius: 10px;" name="content" cols ="100" rows="20"></textarea>
                    <br>
                    <input class="thirdbutton" type="submit" value="작성완료">
                </form>
            </div>
        </body>
    </html>
    `)
});

router.post('/write/:id', function(req,res,next){
    // console.log(req.params)
    let newI = req.params.id;
    // console.log(req.body)
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1);
    if(month.length === 1){
        month = '0' + month;
    }
    let date = today.getDate();

    let newone ={
        title: req.body.title,
        content: req.body.content,
        createdAt: year + '-' + month + '-' + date,
        updatedAt: year + '-' + month + '-' + date
    }
    // res.json(newone)
    // Board.push({...newone});
    Board = [...Board, newone]
    len = Board.length
    // console.log(len)
    // res.json(Board)
    res.redirect('/')
});

module.exports = router;