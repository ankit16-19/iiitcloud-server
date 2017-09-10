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
                                var temp = $(this).find('td font').eq(3).text();
                                var edition = $(this).find('td font').eq(4).text()                                
                                title = title.replace(author,'')
                                             .replace(publiser,'')
                                             .replace(year,'')
                                             .replace(temp,'')
                                             .replace(edition,'');    
                                var newtitle = title.substring(0,title.indexOf('Title on'))                                                      
                                var status = $(this).find('td').eq(3).text();
                                data.Notices.push
                                ({
                                        'id':id,
                                        'title':newtitle,
                                        'author':author,
                                        'publiser': publiser,
                                        'year':year,
                                        'edition':edition,
                                        'status':status
                                });
                        });
                        cb(data);
                });
        });
};
