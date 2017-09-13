const request = require('request');
const cheerio = require('cheerio');

module.exports = function(cb)
{
        
        var req = function()
        {
   
            request.get('http://172.16.1.60:81/moocs/',function(err,res,html)
            {

                if(!err){
                    var data =
                    {
                            Notices : []
                    };
                    var $ = cheerio.load(html);
                    var i = 0;
                    $('tr').filter(function ()
                    {
                            if(i>1){
                                var name = $(this).find('h2').text();
                                var link = 'http://172.16.1.60:81/moocs/' +$(this).find('a').attr('href');
                                data.Notices.push
                                ({
                                    name:name,
                                    link:link.replace("\r\n",'')
                                });
                                i++;
                            }else{
                                i++;
                            }

                    });
                   cb(data);

                    
                }
                else{
                 
                }
            });
                 
        }
         req()
               
};
