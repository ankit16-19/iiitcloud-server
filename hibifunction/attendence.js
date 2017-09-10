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
                        url:'https://hib.iiit-bh.ac.in/Hibiscus/Guardian/stuAttList.php?stuid=' post_data.uid,
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
	                    i = 0;
                        var $ = cheerio.load(html);
	                    $('.LOV').filter(function ()
	                    {
	                    		i++;
	                            var subcode = $(this).find('td').eq(1).text();
	                            var sub = $(this).find('td').eq(2).text();
	                            var name = $(this).find('i').eq(0).text();
	                            sub = sub.replace(name,"");
	                            var attendance = $(this).find('td').eq(3).text();
	                            attendance = attendance.replace(')',') ');
	                        
	                            data.Notices.push
	                            ({
	                                    'subcode':subcode,
	                                    'sub':sub,
	                                    'name': name,
	                                    'attendance':attendance,
	                            
	                            });
	                    });
	                    console.log(i)
                        cb(data);
                });
        });
};
