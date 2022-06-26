const express= require('express');
const bodyparser=require('body-parser');
const _ = require("lodash");  
const app=express();

app.use(bodyparser.urlencoded({extended:false}));
app.set('view engine','ejs');



const homecontent="If you live to be a hundred, I want to live to be a hundred minus one day so I never have to live without you. A. A. Milne Normal is getting dressed in clothes that you buy for work, driving through traffic in a car that you are still paying for, in order to get to a job that you need so you can pay for the clothes, car and the house that you leave empty all day in learn, I must do it by listening. Larry King I, not events, have the power to make me happy or unhappy today. I can choose which it shall be. Yesterday is dead, tomorrow hasn't arrived yet. I have just one day, today, and I'm going to be happy in it. Groucho Marx If you can walk away from a landing, it's a good. ";
const aboutus="When using a website builder to create your website,the About Us page is one of the first supporting pages you'll likely design, regardless of the industry you're in.They may go by different labels—About, Story, Mission—but these types of pages generally serve the same key purpose: to be the page for a brand to say, This is who we are.When a visitor wants to learn more about you or your business, the About page is the page they will look for.";
const contactus="A map isn't always necessary, but if your business is located in a confusing spot or have frequent visitors, it could be beneficial for you to provide a map to highlight where you are. There are also several tools that allow you to embed interactive maps onto your website so people can get individual directions from their specific locations.";
let composeList=[{title:"Home",body:homecontent}];

app.use(express.static(__dirname+'/public'));
app.get('/',function (req,res) {

    
    res.render('home',{homeList:composeList});
    
})

app.get('/aboutus',function (req,res) {
    res.render('aboutus',{aboutus:aboutus});
})

app.get('/contactus',function (req,res) {
    res.render('contactus',{contactus:contactus});
})

app.get('/compose',function (req,res) {
    res.render('compose');
})





app.post('/compose',function(rep,res){
    const title=rep.body.title;
    const body=rep.body.compose;
    const length=100;
    const truncated=body.substring(0,length)+"...";
    const word={
        title:title,
        body:body,
        truncated:truncated
    }
    composeList.push(word);
    
    res.redirect('/');
    

    
})

app.get('/:compostname',function (req,res){
    const compostTitle=_.lowerCase(req.params['compostname']);
     const fil=_.find(composeList,function(element){
            const elementTitle=_.lowerCase(element.title);
            return elementTitle==compostTitle;
     });
     if(fil){
        res.render('post',{postTitle:fil.title,postBody:fil.body});
     }else {
       res.render('post',{postTitle:"Error",postBody:'There is nothing to show.'});
       }
      
    
     
         
    
       
    
})
app.listen(8000,function (){
    console.log('Sever at 8000')
})