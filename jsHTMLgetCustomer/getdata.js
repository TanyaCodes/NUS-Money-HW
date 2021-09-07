function getFromServer(){
    $.getJSON('https://nusbackendstub.herokuapp.com/user/all', mydata );
    } 
    // mydata is a callback function


    function mydata(data){
      var text ="<ul>";
      data.forEach(function(item){    
      text = text + `<li> Account: ${item.user_id}, ${item.first_name} ${item.last_name}  <br> 
                  Email: ${item.email} </li>`
      
      });
      text += "</ul>"
      $(".mypanel").html(text); //same as innerHTML
  }