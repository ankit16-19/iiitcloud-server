const request = require('request');
var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');




module.exports = function(post_data,callback)
{
  var pass;
//console.log(post_data)
  if(post_data.method == 'encrypted'){
    var  decryptedString = cryptr.decrypt(post_data.pwd);    
    pass = decryptedString;
  }else{
    pass = post_data.pwd
  }
console.log(post_data.uid, pass , "password")
  //request options
  var option =
  {
          url:'https://hib.iiit-bh.ac.in/Hibiscus/Login/auth.php?client=iiit',
          form:
          {
                  'uid':post_data.uid,
                  'pwd':pass,
                  'txtinput':3,
                  'sub':'Login'
          },
          headers:
          {
            'User-Agent':"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:54.0) Gecko/20100101 Firefox/54.0",
            'Connection':"keep-alive"         
          }
  }
  var req = function(){
      //making post request to login
  request.post(option, function(error,response,body)
  {

    if(!error){
          var data = {};
          // console.log(response.headers)
          var location = response.headers['location']
          if (location === './?client=iiit&mes=UserID_or_Password_or_A_Incorrect' || location === './?client=iiit&mes=UserID_or_Password_Incorrect')
          {
            data.result = 'failed';
          }
          if(location === '../Start/setWindowSize.php')
          {
            data.result = 'success';
          }
          callback(data);
    }
    if(error){
      console.log(error)
     
    }
  });
  }

  req();




};
