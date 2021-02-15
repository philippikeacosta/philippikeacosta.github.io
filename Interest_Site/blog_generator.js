const fs = require('fs');
const ejs = require('ejs');
const express = require('express');

//..............Create an Express server object..................//
const app = express();

//..............Apply Express middleware to the server object....//
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



app.get('/', function(request, response) {
  let content = JSON.parse(fs.readFileSync('data/content.json'));
  console.log(content.title);
  let link =[];
   for(i = 0; i<3; i++){
     link[i] = '/blog/' + content[i].title.replace(/ /g, "_").replace("?", "_");
   }
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index",{
    data: content,
    title: 'Home',
   link1: link[0],
   link2: link[1],
   link3: link[2]
  });
});

app.get('/about', function(request, response) {
  let content = JSON.parse(fs.readFileSync('data/content.json'));
  let link =[];
   for(i = 0; i<3; i++){
     link[i] = "/" + content[i].title.replace(/ /g, "_").replace("?", "_");
   }
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("about",{
    data: content,
    title: 'About',
   link1: link[0],
   link2: link[1],
   link3: link[2]
  });
});

app.get('/blog/:blog_title', function(request, response) {
  let content = JSON.parse(fs.readFileSync('data/content.json'));
  let title = request.params.blog_title;
  if(content[title]){
    let post = content[title];
    post.title = title;
    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    response.render(content,{
      post: post
    });
  }

  // let sortedUsers = [];
  // for(username in users){
  //   let user = users[username];
  //   user.win_percent = (user.wins/parseFloat(user.wins+user.losses) * 100).toFixed(2);
  //   sortedUsers.push(user);
  // }
  // sortedUsers.sort(function(a, b){
  //   return parseFloat(b.win_percent)-parseFloat(a.win_percent);
  // })
  // let link =[];
  //  for(i = 0; i<3; i++){
  //    link[i] = "/" + content[i].title.replace(/ /g, "_").replace("?", "_");
  //  }
  //
  // // content.forEach(function(post){
  // //    let post_template = fs.readFileSync('views/blog.ejs', 'utf8');
  // //    filename = "build/" + post.title.replace(/ /g, "_").replace("?", "_") + ".html";
  // //    let post_html = ejs.render(post_template, {
  // //      filename: __dirname + '/views/blog.ejs',
  // //      data: post,
  // //      posts: content,
  // //      link1: link[0],
  // //      link2: link[1],
  // //      link3: link[2]
  // //    });
  // //   fs.writeFileSync(filename, post_html, 'utf8');
  // //  });
  //  content.forEach(function(post){
  //    filename = '/blog/' + post.title.replace(/ /g, "_").replace("?", "_");
  //    console.log(filename);
  // response.status(200);
  // response.setHeader('Content-Type', 'text/html');
  // response.render(filename,{
  //   data: post,
  //   posts: content,
  //   link1: link[0],
  //   link2: link[1],
  //   link3: link[2]
  // });
  //    });
});

app.use("", function(request, response){
  response.status(404);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    "errorCode":"404"
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Easy server listening for requests on port ' + port + '!');
  console.log('Visit http://localhost:'+port+' to see the website.')
});

// let blogs = fs.readFileSync('data/content.json', 'utf8');
// let index_template = fs.readFileSync('views/index.ejs', 'utf8');
// let about_template = fs.readFileSync('views/about.ejs', 'utf8');
// let blogEntries = JSON.parse(blogs);
// let link = [];
// let filename = "";
//
// for(i = 0; i<3; i++){
//   link[i] = blogEntries[i].title.replace(/ /g, "_").replace("?", "_") + ".html";
// }
//
// blogEntries.forEach(function(post){
//   let post_template = fs.readFileSync('views/blog.ejs', 'utf8');
//   filename = "build/" + post.title.replace(/ /g, "_").replace("?", "_") + ".html";
//   let post_html = ejs.render(post_template, {
//     filename: __dirname + '/views/blog.ejs',
//     data: post,
//     posts: blogEntries,
//     link1: link[0],
//     link2: link[1],
//     link3: link[2]
//   });
//   fs.writeFileSync(filename, post_html, 'utf8');
// });
//
// let index_html = ejs.render(index_template, {
//   filename: __dirname + '/views/index.ejs',
//   data: blogEntries,
//   title: 'Home',
//   link1: link[0],
//   link2: link[1],
//   link3: link[2]
// });
// fs.writeFileSync('build/index.html', index_html, 'utf8');
//
// let about_html = ejs.render(about_template, {
//   filename: __dirname + '/views/about.ejs',
//   data: blogEntries,
//   title: 'About',
//   link1: link[0],
//   link2: link[1],
//   link3: link[2]
// });
//   console.log(filename);
// fs.writeFileSync('build/about.html', about_html, 'utf8');
