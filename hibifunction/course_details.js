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
                        var name = $('h2').text();
                        var designation = $('p font').eq(0).text();
                        var qualifications= $('p font').eq(1).text();
                        var contact = $('p').first().text().replace(designation,'').replace(qualifications, '');

                        data.Notices.push
                        ({
                                'name':name,
                                'designation':designation,
                                'qualifications':qualifications,
                                'contact':contact
                        });
                        cb(data);
                });
        });
};
