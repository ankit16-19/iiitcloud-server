const request = require('request');
const cheerio = require('cheerio');
const login = require('../hibifunction/login');


module.exports = function(post_data,cb)
{
        
                login(post_data,function(cookie)
                {
                        var option =
                                {
                                        url:'https://hib.iiit-bh.ac.in/Hibiscus/complain/compProcess.php?cmd=NEW&trid=',
                                        form:{
                                            CALL_DATE:post_data.date,
                                            CALL_TIME:post_data.time,
                                            PROB_DESC:post_data.des,
                                            ROOM_NO:post_data.room,
                                            DEPT_NAME:post_data.depname,
                                            LOCATION:post_data.location,
                                            AVAIL_TIME:post_data.avail_time,
                                            CONTACTNO:post_data.contact,
                                            STATUS:'O                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                '
                                        },
                                        headers:
                                        {
                                                'Cookie':cookie,
                                                'Referer':'https://hib.iiit-bh.ac.in/Hibiscus/complain/compEdit.php?cmd=NEW'
                                        }
                                }                                       
                                console.log("pre request")
                                var req = function()
                                {
                                    console.log("making request")
                                    request.post(option,function(err,res,html)
                                    {                  
                                        console.log("post request")   
                                        
                                        if(!err){
                                            var data =
                                            {
                                                    Notices : []
                                            };
                                            data.Notices.push({
                                                result:'success'
                                            })
                                            var $ = cheerio.load(html);
                                            
                                           cb(data);

                                            
                                        }
                                        else{
                                         
                                        }
                                    });
                                         
                                }
                                 req()
                });
};
