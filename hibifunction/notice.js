const request = require('request');
const cheerio = require('cheerio');
const login = require('../hibifunction/login');


module.exports = function(post_data,cb)
{
        
                login(post_data,function(cookie)
                {
                        var option =
                                {
                                        url:'https://hib.iiit-bh.ac.in/Hibiscus/NoticeBoard/docList.php',
                                        headers:
                                        {
                                                'Cookie':cookie,
                                                'Referer':'https://hib.iiit-bh.ac.in/Hibiscus/Start/menu.php'
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
                                                    var id_link = $(this).find('td a').attr('href');
                                                    var id = $(this).find('td a').attr('href').slice(17).slice(0,-12);
                                                    var posted_by = $(this).find('td').eq(2).text();
                                                    var attention = $(this).find('td').eq(3).text();
                                                    data.Notices.push
                                                    ({
                                                            'date':date,
                                                            'title': title,
                                                            'id':id,
                                                            'id_link':id_link,
                                                            'posted_by':posted_by,
                                                            'attention':attention
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
