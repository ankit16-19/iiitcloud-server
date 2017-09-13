const request = require('request');
const cheerio = require('cheerio');
const login = require('../hibifunction/login');


module.exports = function(post_data,cb)
{
        
                login(post_data,function(cookie)
                {
                        var option =
                                {
                                        url:'https://hib.iiit-bh.ac.in/Hibiscus/complain/compList.php',
                                        headers:
                                        {
                                                'Cookie':cookie,
                                                'Referer':'it doesn\'t matter'
                                        }
                                }
                              
                                var req = function()
                                {
                        
                                    request.post(option,function(err,res,html)
                                    {
                                    
                                        
                                        if(!err){
                                            var data =
                                            {
                                                    Notices : []
                                            };
                                            var $ = cheerio.load(html);
                                            $('.LOV').filter(function ()
                                            {
                                                    var date = $(this).find('td').eq(0).text();
                                                    var title = $(this).find('td').eq(1).text();
                                                    var status = $(this).find('td').eq(2).text();
                                                    data.Notices.push
                                                    ({
                                                            'date':date,
                                                            'title': title,
                                                            status:status
                                                    });
                                            });
                                           cb(data);

                                            
                                        }
                                        else{
                                         
                                        }
                                    });
                                         
                                }
                                 req()
                });
};
    