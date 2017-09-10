const request = require('request');
const cheerio = require('cheerio');
const login = require('../hibifunction/login');


module.exports = function(post_data,cb)
{
        login(post_data,function(cookie)
        {
                //request option2
                var option2 =
                {
                        url:'https://hib.iiit-bh.ac.in/Hibiscus/Cms/stuCoList.php?stuid=' + post_data.uid,
                        headers:
                        {
                                Cookie:cookie,
                                'Referer':'https://hib.iiit-bh.ac.in/Hibiscus/Start/aisMenu.php'
                        }
                }
                request.post(option2,function(err,res,html)
                {
                        var data =
                        {
                                Notices : []
                        };
                        var $ = cheerio.load(html);
                        $('.LOV').filter(function()
                        {
                                var semester = $(this).find('td').eq(0).text();
                                var id = $(this).find('td').eq(1).text();
                                var name = $(this).find('td a').text();
                                var link = $(this).find('td a').attr('href').slice(2);
                                var professor = $(this).find('td font').text();
                                var status = $(this).find('td').eq(3).text();
                                var credits = $(this).find('td').eq(4).text();
                                data.Notices.push
                                ({
                                        'semester':semester,
                                        'id':id,
                                        'name':name,
                                        'link':link,
                                        'professor':professor,
                                        'status':status,
                                        'credits':credits
                                });
                        });
                        cb(data);
                });
        });
};
