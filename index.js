// basic express, ejs code


const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

// override require

const methodOverride = require('method-override')

// uuid require

const { v4: uuidv4 } = require('uuid');






app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'))



app.set("view engine", "ejs");

app.set("views", path.join(__dirname,"/views"));
app.use(express.static( path.join(__dirname,"/public")));


app.listen(port,()=>{
    console.log("app is listening");
});


// get / post to get data for all post

let posts = [
    {
        id: uuidv4(),
        username: "adityaprocoder",
        content: "We help businesses to grow their online presence and reach new customer. I have 2+ yeares exp in Full Stack web Dev",        
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})


// creat route :- (to add a new post);

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content} = req.body
    let id = uuidv4();
    posts.push({id,username,content})
    res.redirect("/posts")
});


// show routs

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs", {post});
});

// edit routs

app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
    
})

// patch routs

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(newContent);
    res.redirect("/posts");
});


// delete routs

app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});



