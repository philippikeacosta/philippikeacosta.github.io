let blogpost = document.getElementsByTagName("h1")[1].innerText.trim();
console.log("blogpost:" + blogpost);

document.getElementById("comment-submit").addEventListener('click', function() {

  let xmlhttp = new XMLHttpRequest();

  xmlhttp.open("POST", "/blog/comment/" + blogpost.replace(/ /g, "_"), true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  let postData = {
    "author": document.getElementById("comment-author").value,
    "date": document.getElementById("comment-date").value,
    "text": document.getElementById("comment-text").value

  };
  console.log(document.getElementById("comment-text").value);

  xmlhttp.send(JSON.stringify(postData));


  xmlhttp.onreadystatechange = function(data) {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      let userObject = JSON.parse(xmlhttp.responseText);
      document.getElementById("like_count").innerText = userObject.likes;
      document.getElementById("comment-author").value = "";
      document.getElementById("comment-date").value = "";
      document.getElementById("comment-text").value = "";
    } else {

    }
  };
});
for (i = 0; i < document.getElementsByClassName("like_button").length; i++) {
  document.getElementsByClassName("like_button")[i].addEventListener('click', function(button) {
    let xmlhttp = new XMLHttpRequest();

    // Specify details of the POST request
    xmlhttp.open("POST", "/blog/like/" + blogpost.replace(/ /g, "_"), true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(button.target.id);
    // Define the data you’d like to send to the server
    let postData = {
      "like": 1,
      "commentid": button.target.id
    };

    // Make a POST request with your data in the body of the request
    xmlhttp.send(JSON.stringify(postData));

    // Do something once the Response (Good or Bad) has been received
    xmlhttp.onreadystatechange = function(data) {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        let userObject = JSON.parse(xmlhttp.responseText);
        document.getElementsByClassName(button.target.id)[0].innerText = userObject.comments[button.target.id].likes;

      } else {

      }
    }

  });
}
