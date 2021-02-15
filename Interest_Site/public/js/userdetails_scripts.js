let username= document.getElementsByTagName("h1")[1].innerText.trim();
console.log("username:"+username);

document.getElementById("like_button").addEventListener('click', function(){
  let xmlhttp = new XMLHttpRequest();

  // Specify details of the POST request
  xmlhttp.open("POST", "/user/like/"+username.replace(/ /g, "_"), true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  // Define the data you’d like to send to the server
  let postData = {
   "like": 1
  };

  // Make a POST request with your data in the body of the request
  xmlhttp.send(JSON.stringify(postData));

  // Do something once the Response (Good or Bad) has been received
  xmlhttp.onreadystatechange = function(data) {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          let userObject=JSON.parse(xmlhttp.responseText);
          document.getElementById("like_count").innerText=userObject.likes;
      }else{

  	  }
  }

});
