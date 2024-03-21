const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require("path");
const port = process.env.PORT || 3001;
const mysqlConnection = require("../conn");
const { UCS2_DANISH_CI } = require("mysql/lib/protocol/constants/charsets");
const { AsyncLocalStorage } = require("async_hooks");
const { application } = require("express");
const static_path = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*" );
    next();
  });

var username="";
//insert user
app.post('/register',(req,res)=>{
    let uname = req.body.username;
    let pswd = req.body.password;
    let fname = req.body.fname;
    let lname = req.body.lname;
    var f=false;
    mysqlConnection.query("SELECT * FROM user WHERE username = ?",uname, (e,row)=>{
        if(e || row[0]==undefined)
        {
            var sql =`INSERT into user(username,password,fname,lname)VALUES("${uname}","${pswd}","${fname}","${lname}")`;
            mysqlConnection.query(sql,function(err,result){
                if(err)
                res.status(500).send({error:'user is not registered!'+err})
                else
                res.json({status:'User '+uname+' is registered !'})
            });
        }
        else{
        res.status(500).send({error:'Username is already exist!'});
        console.log(row[0]==undefined);
        }
    });
});

app.post("/login", async (req, res) => {
    
    var uname = req.body.username;
    var upswd = req.body.password;
    var f=false;
    mysqlConnection.query("SELECT * FROM user WHERE username = ?",uname, (e,row)=>{
        if(e || row.length==0)
            res.status(404).send({error:'User does not exist !'});
        else
        {
            username=row[0].username;
            var password =row[0].password;
            if(password==upswd)
            {
                res.send(row);
                return;
            }
            else
                res.status(500).send({error:'Password is not correct!'});
        }
    });
})


app.get("/user",(req,res)=>{
    res.send(username);
})
app.get("/logout",async(req,res)=>{
    username="";
    res.send(true);
})
//insert blog
app.post('/blog/:category_id',(req,res)=>{
    let r = req.body;
    let title = r.title;
    let content = r.content;
    let category_id=req.params.category_id;
    mysqlConnection.query("SELECT * FROM category WHERE id =?",[category_id],function(err,result){
        if(!err)
        {
            let category_name = result[0].categoryName;
            var sql ="INSERT into blog(title,content,date,category_name)VALUES(?,?,NOW(),?)";
            mysqlConnection.query(sql,[title,content,category_name],function(err,result){
                if(err)
                {console.log(err);
                    res.status(500).send({error:'Blog not posted!'+err});
                    return;
                }
                else
                res.status(200).send({success:'Blog is posted!'});
            });  
        }
        else
            res.send(500).send({error:'No category found!'})
            console.log(result);
    });
              
});

//list of blogs
app.get('/blogs',(req,res)=>{
    mysqlConnection.query("SELECT * FROM blog",function(err,result){
        if(!err)
            res.send(result);
        else
           res.status(500).send({error:'No Blog Found'+err});
    });
});

//get blog by id
app.get('/blog/:id',async(req,res)=>{
    mysqlConnection.query("SELECT * FROM blog WHERE id =?",[req.params.id],function(err,result){
        if(!err)
        {
            console.log(result[0]);
            res.status(200).send(result[0]);
        }
        else
            res.status(500).send({error:'No Blog found!'})
    });
});

//update blog
app.put('/blog',(req,res)=>{
    console.log("*"+req.body);
    var body = req.body;
    var id = body.id;
    var title=body.title;
    var content=body.content;
    var category_name=body.category_name;
    console.log("here"+body.category_name)
            var sql ="UPDATE  blog SET title=?,content=?,date=NOW(),category_name=? WHERE id=?";
            mysqlConnection.query(sql,[title,content,category_name,id],function(err,result){
                if(err)
                {
                    res.status(500).send({error:'Post not updated!'+err});
                    console.log(err);
                    return;
                }
                res.json({status:'success'})
            });
});


//delete blog
app.delete('/blog/:id',(req,res)=>{
    var id = req.params.id;
    var sql = "DELETE FROM blog WHERE id=?";
    console.log("Delete "+id);
    mysqlConnection.query(sql,id,function(err,result){
        if(!err)
            res.json({status:'Success !'});
        else
            res.json({status:'Unsuccessfull !'});
    });
});

//get all categories
app.get('/categories',(req,res)=>{
    mysqlConnection.query("SELECT * FROM category",function(err,result){
        if(!err)
            res.send(result);
        else
            res.json({status:'Unsuccessfull !'});
    });
});

//get ctegory by id
app.get('/category/:name',(req,res)=>{
    console.log("hmmm")
    mysqlConnection.query("SELECT * FROM category WHERE categoryName =?",[req.params.name],function(err,result){
        if(!err)
            res.send(result[0]);
        else
            res.status(500).send({error:'No category found!'})
            console.log(result);
    });
});

//add like
app.put('/like/:id',(req,res)=>{
    let count=0;
    mysqlConnection.query("SELECT likes FROM blog WHERE id =?",[req.params.id],function(err,result1){
        if(!err && result1!=undefined)
        {
            count = result1[0].likes+1;
            mysqlConnection.query("UPDATE blog SET likes=? WHERE id =?",[count,req.params.id],function(err,result2){
                if(!err){
                    mysqlConnection.query("SELECT likes FROM blog WHERE id =?",[req.params.id],function(err,result3){
                        if(!err)
                        {
                            res.set("likes", result3[0].likes);
                            res.status(200).send({success:'Success',"likes":result3[0].likes});
                        }
                    });
                }
                else
                 res.status(500).send({error:'Error'+err})
            });
        }
        else
            res.status(500).send({error:'No category found!'})
    });
});

app.listen(port, () => {
    console.log(`server is running shruti at port no ${port}`);
})

