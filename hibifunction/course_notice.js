const request = require('request');
const cheerio = require('cheerio');
const login = require('../hibifunction/login');


module.exports = function(post_data,cb)
{
        //making post request to login
        login(post_data,function(cookie)
        {
                //request option2
                var option2 =
                {
                        url:'https://hib.iiit-bh.ac.in/Hibiscus/Cms/cmsMenu.php?coid=' + post_data.id,
                        headers:
                        {
                                Cookie:cookie,
                                'Referer':'https://hib.iiit-bh.ac.in/Hibiscus/Cms/stuCoList.php?stuid=' + post_data.uid
                        }
                }
                request.post(option2,function(err,res,html)
                {
                        var data =
                        {
                                Notices : []
                        };
                        var $ = cheerio.load(html);
                        var $$ = cheerio.load($('table').eq(2).html());
                        $$('tr').filter(function()
                        {
                                var date = $(this).find('td').eq(0).text();
                                var title = $(this).find('td').eq(1).text();
                                var link = $(this).find('td a').attr('href');
                                data.Notices.push
                                ({
                                        'date':date,
                                        'title':title,
                                        'link_id':link,
                                        'id':post_data.id
                                });
                        });
                        delete data.Notices[0];
                        cb(data);

                });
        });
};
