const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;
var app=express();
app.use(express.static(__dirname));
hbs.registerPartials(__dirname+'/views');

app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('upper',(text)=>{
	return text.toUpperCase();
});

app.use((req,res,next)=>{
var now=new Date().toString();
var log=`${now} : ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log + '\n');
next();
})

// app.use((req,res,next)=>{
// 	res.render('about.hbs');
// })


app.get('/',(req,res)=>{
	res.render('about.hbs',{
		PageTitle:'Welcome',
		CurrentYear: new Date().getFullYear()
	});
});
app.get('/bad',(req,res)=>{
	res.send({
		error:'Bad request'
	});
});
app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		PageTitle:'Welcome',
		CurrentYear: new Date().getFullYear()
	});
});
app.listen(3000,()=>{
	console.log(`server is connecte on port ${port}`);
});	