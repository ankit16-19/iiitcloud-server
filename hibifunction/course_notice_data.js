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
                        url:'https://hib.iiit-bh.ac.in/Hibiscus' + post_data.link.slice(2),
                        headers:
                        {
                                Cookie:cookie,
                                'Referer':'https://hib.iiit-bh.ac.in/Hibiscus/Cms/cmsMenu.php?coid='
                        }
                }
                request.post(option2,function(err,res,html)
                {
                        var data =
                        {
                                Notices : []
                        };

                        var $ = cheerio.load(html);
                         $('a').filter(function(){
		                        if($(this).attr('href')[1] = "."){
		                        $(this).attr('href',"https://hib.iiit-bh.ac.in/Hibiscus" + $(this).attr('href').slice(2))
		                        }
		                })                        
                        var heading = $('table tr').eq(1).text();
                        var notice_data = $('table tr').eq(2).text();
                        var date = $('table tr').eq(3).html();

                        data.Notices.push
                        ({
                                'heading':heading,
                                'notice_data':notice_data,
                                'date':date

                        });
                        cb(data);
                });
        });
};
