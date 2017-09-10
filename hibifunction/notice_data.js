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
                        url:'https://hib.iiit-bh.ac.in/Hibiscus/NoticeBoard/docDet.php?docid=' + post_data.id + '&iframe=true',
                        headers:
                        {
                                Cookie:cookie,
                                'Referer':'https://hib.iiit-bh.ac.in/Hibiscus/NoticeBoard/docList.php'
                        }
                }
                console.log("pre request")
                var req = function()
                {
                        console.log('making request')
                        request.post(option2,function(err,res,html)
                                {       

                                        console.log("post request")
                                        if(!err){
                                                var $ = cheerio.load(html);
                                                        
                                                $('a').filter(function(){
                                                        if($(this).attr('href')[1] = "."){
                                                        $(this).attr('href',"https://hib.iiit-bh.ac.in/Hibiscus" + $(this).attr('href').slice(2))
                                                        }
                                                })
                                               
                                               
                                                var notice_data = $('body > div > div:nth-child(4)').html()



                                                var data =
                                                        {
                                                                Notices : []
                                                        };
                                                data.Notices.push
                                                        ({
                                                                'notice_data':notice_data
                                                        });
                                                cb(data);
                                        }
                                        else{
                                               
                                }
                        });
                }
                req();
        });
};


