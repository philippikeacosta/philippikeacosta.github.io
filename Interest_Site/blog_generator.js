const fs = require('fs');
const ejs = require('ejs');

let blogs = fs.readFileSync('data/content.json', 'utf8');
let index_template = fs.readFileSync('views/index.ejs', 'utf8');
let about_template = fs.readFileSync('views/about.ejs', 'utf8');
let blogEntries = JSON.parse(blogs);
let link = [];
let filename = "";

for(i = 0; i<3; i++){
  link[i] = blogEntries[i].title.replace(/ /g, "_").replace("?", "_") + ".html";
}

blogEntries.forEach(function(post){
  let post_template = fs.readFileSync('views/blog.ejs', 'utf8');
  filename = "build/" + post.title.replace(/ /g, "_").replace("?", "_") + ".html";
  let post_html = ejs.render(post_template, {
    filename: __dirname + '/views/blog.ejs',
    data: post,
    posts: blogEntries,
    link1: link[0],
    link2: link[1],
    link3: link[2]
  });
  fs.writeFileSync(filename, post_html, 'utf8');
});

let index_html = ejs.render(index_template, {
  filename: __dirname + '/views/index.ejs',
  data: blogEntries,
  title: 'Home',
  link1: link[0],
  link2: link[1],
  link3: link[2]
});
fs.writeFileSync('build/index.html', index_html, 'utf8');

let about_html = ejs.render(about_template, {
  filename: __dirname + '/views/about.ejs',
  data: blogEntries,
  title: 'About',
  link1: link[0],
  link2: link[1],
  link3: link[2]
});
  console.log(filename);
fs.writeFileSync('build/about.html', about_html, 'utf8');
