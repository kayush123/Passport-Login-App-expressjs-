// function validateSignup(){
// //alert('hiii');
//   //$(document).ready(function(){
//     var name = $('#name').val().trim();
//     var mobile = $('#mobile').val().trim();
//     var email = $('#email').val().trim();
//     var pass  = $('#password').val().trim();

//     var checkEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email);
//     var checkPass = /^[A-Z][a-z 0-9 @$%#~?><>]/.test(pass);
//     var checkName = /^[a-zA-Z]/.test(name);

//     var checkMobile = /^\d{10}$/.test(mobile);
    
//     // /^[a-z]+[0-9]+(@).[a-z]+$/
//     if(!checkEmail || email == ''){
//       alert('Enter Correct Email');
//       return false;
//     }

//    else if(!checkPass || pass == ''){
//       alert('Enter Correct Password');
//       return false;
//     }

//    else if(!checkName || name == ''){
//       alert('Name must contain alphabets only');
//       return false; 
//      }

//     else if(!checkMobile || mobile == ''){
//       alert('Enter Correct Mobile Number');
//       return false ;
//     } 

//     else{
//       return true;
//     }  
//   }
$(document).ready(function(){
  $('#name').on('focusout',function(){
    var name = $('#name').val();
    var checkName = /^[a-zA-Z]/.test(name);
    if(name == '' || !checkName){
      $('#nameErr').text('Name must contain alphabets only').show();
      return false; 
    } else {
      //$('#nameErr').text().hide()
    }
  });
  
});