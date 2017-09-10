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
                        url:'https://hib.iiit-bh.ac.in/Hibiscus/Guardian/stutransDet.php?sid=' + post_data.uid,
                        'headers':
                        {
                                'Cookie':cookie,
                                'Referer':'https://hib.iiit-bh.ac.in/Hibiscus/Cms/cmsMenu.php?coid=B216-2~CS102',
                               
                                
                        }
                }
                request.post(option2,function(err,res,html)
                {
                        var data =
                        {
                                Notices : []
                        };
                      

                        var $ = cheerio.load(html);
                        var new_html = $('table').eq(2).html()
                        $ = cheerio.load(new_html);
                   
                        data.Notices.push
                        ({
                        	'html':$.html()
                        });
                        cb(data);
                });
        });
};
