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
                        url:'https://hib.iiit-bh.ac.in/Hibiscus/Cms/cmsMenu.php?coid=' + post_data.sub_code,
                        headers:
                        {
                                Cookie:cookie,
                                Referer:'https://hib.iiit-bh.ac.in/Hibiscus/Cms/stuCoList.php?stuid=' + post_data.uid,
                                        
                        }
                }
                request.get(option2,function(err,res,html)
                {       
                        var option2 =
                        {
                                url:'https://hib.iiit-bh.ac.in/Hibiscus/Grades/stuvwGrade.php?coid=' + post_data.sub_code,
                                headers:
                                {
                                        Cookie:cookie,
                                        Referer:'https://hib.iiit-bh.ac.in/Hibiscus/Cms/cmsMenu.php?coid=' + post_data.sub_code,
                                                
                                }
                        }
                        request.get(option2,function(err,res,html)
                        {       
                                var data =
                                {
                                        Notices : []
                                };
                                var $ = cheerio.load(html);
                                var id  = $('tr tr').find('td').eq(0).text();
                                var name = $('tr tr').find('td').eq(1).text();
                                var quiz1 = $('tr tr').find('td').eq(2).text();
                                var quiz2 = $('tr tr').find('td').eq(3).text();
                                var midsem = $('tr tr').find('td').eq(4).text();
                                var endsem = $('tr tr').find('td').eq(5).text();
                                var facass = $('tr tr').find('td').eq(6).text();
                                var gpbp = $('tr tr').find('td').eq(7).text();
                                var pen = $('tr tr').find('td').eq(8).text();
                                var gp = $('tr tr').find('td').eq(9).text();
                                var fg = $('tr tr').find('td').eq(10).text();
                                data.Notices.push
                                ({
                                        id:id,
                                        name:name,
                                        quiz1:quiz1,
                                        quiz2:quiz2,
                                        midsem:midsem,
                                        endsem:endsem,
                                        faculty_assessment:facass,
                                        gp_penalty:gpbp,
                                        penalty:pen,
                                        grade_point:gp,
                                        final_grade:fg
                                });                                        
                                

                                cb(data);
                        });
                });
        });
};















