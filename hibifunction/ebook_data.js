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
                        url:'https://hib.iiit-bh.ac.in/Hibiscus/Pub/eBookDet.php?bookid=' + post_data.id,
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
                        var name = $('table table').find('td').eq(0).text();
                        var link = $('table table').find('td a').attr('href');
                        var author = $('table table').find('td').eq(2).text();
                        var publiser = $('table table').find('td').eq(3).text();   
                        var description =$('table table').find('td').eq(4).text();                      
                        data.Notices.push
                        ({
                                'name':name,
                                'link':link,
                                'author':author,
                                'publiser': publiser,
                                'description':description         
                        });

                        cb(data);
                });
        });
};
