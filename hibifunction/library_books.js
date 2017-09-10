const request = require('request');
const cheerio = require('cheerio');
const login = require('../hibifunction/login');


module.exports = function(post_data,cb)
{
        //making post request to login
        login(post_data,function(cookie)
        {
                var option2 =
                {
                        url:'https://hib.iiit-bh.ac.in/Hibiscus/Pub/bookList4All.php?bkFilt1=' + post_data.name,
                        'headers':
                        {
                                'Cookie':cookie,
                                'Referer':'it doesn\'t matter',
                               
                                
                        }
                }
                request.post(option2,function(err,res,html)
                {
                        var data =
                        {
                                Notices : []
                        };
                        var $ = cheerio.load(html);
                        $('.lov').filter(function ()
                        {
                                var id = $(this).find('td').eq(0).text();
                                var author = $(this).find('td font').eq(0).text();
                                var publiser = $(this).find('td font').eq(1).text();   
                                var year =$(this).find('td font').eq(2).text(); 
                                var title = $(this).find('td').eq(1).text();
                                title = title.replace($(this).find('td font').text(),'');                                                          
                                var status = $(this).find('td').eq(3).text();
                                data.Notices.push
                                ({
                                        'di':id,
                                        'title':title,
                                        'author':author,
                                        'publiser': publiser,
                                        'year':year,
                                        'status':status
                                });
                        });
                        cb(data);
                });
        });
};
