

const fs = require('fs');
const ejs = require('ejs');
const express = require('express');
let bodyParser = require('body-parser');


//..............Create an Express server object..................//
const app = express();


app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



app.get('/', function(request, response) {
  let content = JSON.parse(fs.readFileSync('data/content.json'));
  let link = [];
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index", {
    data: content,
    title: 'Home'
  });
});

app.get('/about', function(request, response) {
  let content = JSON.parse(fs.readFileSync('data/content.json'));
  let link = [];

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("about", {
    data: content,
    title: 'About'
  });
});

app.get('/createBlog', function(request, response) {
  let content = JSON.parse(fs.readFileSync('data/content.json'));
  let users = JSON.parse(fs.readFileSync('data/users.json'));
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render("createBlog", {
    title: 'Create Blog',
    data: content,
    users: users
  });
});

app.post('/blog/like/:blog_title', function(request, response) {
  let content = JSON.parse(fs.readFileSync('data/content.json'));
  let title = request.params.blog_title;
  let commentid = request.body.commentid;

  if(content[title]){
    if(typeof commentid !== 'undefined'){
        if (!content[title].comments[commentid].likes) content[title].comments[commentid].likes = 0;
        content[title].comments[commentid].likes++;
      }
    fs.writeFileSync('data/content.json', JSON.stringify(content));

    response.status(200);
    response.setHeader('Content-Type', 'text/json');
    response.send(content[title]);
  }else{
    response.status(404);
    response.setHeader('Content-Type', 'text/json');
    response.send('{results: "no user"}');
  }


});

app.post('/blog/comment/:blog_title', function(request, response) {
  console.log(request.body);
  let content = JSON.parse(fs.readFileSync('data/content.json'));
  let title = request.params.blog_title;


  if(content[title]){
    var comment = {
      author: request.body.author,
      date: request.body.date,
      text: request.body.text,
    };
    content[title].comments[content[title].comments.length] = comment;

    fs.writeFileSync('data/content.json', JSON.stringify(content));

    response.status(200);
    response.setHeader('Content-Type', 'text/json');
    response.send(content[title]);
  }else{
    response.status(404);
    response.setHeader('Content-Type', 'text/json');
    response.send('{results: "no user"}');
  }

});

app.get('/blog/:blog_title', function(request, response) {
  let content = JSON.parse(fs.readFileSync('data/content.json'));
  let users = JSON.parse(fs.readFileSync('data/users.json'));
  let title = request.params.blog_title;

  if (content[title]) {
    let post = content[title];
    post.title = title;

    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    response.render("blog", {
      data: content,
      posts: post,
      users: users,
      title: title,
      comments: []
    });

  } else {
    response.status(404);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode": "404",
      data: content
    });
  }


});


app.post('/blog', function(request, response) {
  let posts = JSON.parse(fs.readFileSync('data/content.json'));
  //console.log(request.body);
  var u = {

    date: request.body.date.trim(),
    author: request.body.author.trim(),
    publication: request.body.publication.trim(),
    text: request.body.text.trim(),
    comments: []
  };
  posts[request.body.title.trim().split(" ").join("_")] = u;

  fs.writeFileSync('data/content.json', JSON.stringify(posts));

  response.redirect("/");
});



app.use("", function(request, response) {
  let content = JSON.parse(fs.readFileSync('data/content.json'));
  response.status(404);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    title: 'Error',
    data: content,
    "errorCode": "404"
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Easy server listening for requests on port ' + port + '!');
  console.log('Visit http://localhost:' + port + ' to see the website.')
});
