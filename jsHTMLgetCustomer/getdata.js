function getFromServer(){
    $.getJSON('https://nusbackendstub.herokuapp.com/user/all', mydata );
    } 
    // mydata is a callback function dicating how data will be presented


    function mydata(data){
      var text ="<ul>";
      data.forEach(function(item){    
      text = text + `<li> Account: ${item.user_id}, ${item.first_name} ${item.last_name}  <br> 
                  Email: ${item.email} </li>` 
      
      });
      text += "</ul>"//same as innerHTML method but through string concatenation
      $(".mypanel").html(text); //my panel is the indicated class of a div where the text will appear
      //this is a jquery statement (as shown by $)
  }