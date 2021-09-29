/*Syntax: */
frm = document.getElementById("myform");


function postToServer(e){
  e.preventDefault();  //to prevent form from submitting and refreshing the page
  
  const uid = document.getElementById('userid');
  const fname = document.getElementById('firstname');
  const lname = document.getElementById('lastname');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const pid = document.getElementById('planid');
  const sdate = Date.now();


      if (uid =="") return false;

      postData = { 
          //user_id: parseInt(uid.value, 10),
        first_name: fname.value,
        last_name: lname.value,  
        email: email.value,
        mobile: phone.value, 
        plan_id: parseInt(pid.value,10)
        //signup_date: sdate.toString()
    
      };
      console.log(postData);
      postDataJSON = JSON.stringify(postData);
      console.log(postDataJSON);
      addData(postDataJSON);
}  
     
//url: "https://varlabs.comp.nus.edu.sg/fintech/itemsapi.php"


function addData(postData){// pass your data in method
     console.log(postData);
     $.ajax({
             type: "POST",
             url: "https://nusbackendstub.herokuapp.com/user/add",
             data: postData,// now data come in this function
             contentType: "application/x-www-form-urlencoded; charset=UTF-8",
             crossDomain: true,
             dataType: "text", 

             success: function (data, status, jqXHR) {

               //  alert("success");// write success in " "
                 alert(status);
                 document.getElementById("output").innerText = data;
             },

             error: function (jqXHR, status) {
                 // error handler
                 //console.log(jqXHR);
                 alert('fail ' + status.code);   
             }
          });

    }

     


   frm.addEventListener("submit", postToServer); 