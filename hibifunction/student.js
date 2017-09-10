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
                        url:'https://hib.iiit-bh.ac.in/Hibiscus/Students/stuList4All.php?crit1='+ post_data.method +'&Filt1='+post_data.query +'&crit2=STATUS&Filt2=O',
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
                        $('tr').filter(function ()
                        {
                                var id = $(this).find('td').eq(0).text();
                                var name = $(this).find('td').eq(1).text();                      
                                var link = 'https://hib.iiit-bh.ac.in/Hibiscus/Students/stucvDet.php?stuid=' + id
                                data.Notices.push
                                ({
                                           'id':id,
                                           'name':name,
                                           'link':link     
                                });
                        });
                        delete data.Notices[0]
                        delete data.Notices[1]
                        delete data.Notices[2]
                        cb(data);
                });
        });
};
