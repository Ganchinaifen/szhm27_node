const path = require('path')
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "szhm27_node"
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public//views/register.html'))
}

// exports.getRegisterPage = (req,res) =>{
//     res.sendFile(path.join(__dirname,'../public/views/register.html'))
// }
//导出注册方法
exports.register = (req,res) => {
    const result = {
        status:0,
        message:'注册成功'
    }
    const {username} = req.body
    console.log(username);
    
    MongoClient.connect(url,{useNewUrlParser:true},function(err,client){
        //拿到db
        const db = client.db(dbName)
        //拿到集合
        const collection = db.collection('accountInfo');
        collection.findOne({username},(err,doc)=>{
            if(doc){
                result.status = 1
                result.message = "用户名已存在"
                //关闭数据库
                client.close()
                //返回
                res.json(result)
            }else{
                //如果用户名不存在,插入到数据库中.
                collection.insertOne(req.body,(err,result2)=>{
                    if(!result2){
                        result.status = 2
                        result.message = "注册失败"
                    }
                    //关闭数据库
                    client.close()
                    //返回
                    res.json(result)
                })
            }
        })
    })
}

