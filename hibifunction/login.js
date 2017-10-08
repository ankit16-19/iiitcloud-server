const request = require('request');
var Cryptr = require('cryptr'),
    cryptr = new Cryptr('yoursecretekey');



module.exports = function(post_data,callback)
{
  var pass;

  if(post_data.pass == 'encrypt'){
    var  decryptedString = cryptr.decrypt(post_data.pwd);    
    pass = decryptedString;
  }else{
    pass = post_data.pwd
  }
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
          console.log(response.headers['set-cookie'])
          var cookie = response.headers['set-cookie'][0].slice(0,36);
          callback(cookie);
    }
    else{
      console.log(error);
     
    }

  });

  }

  req();
  



};
