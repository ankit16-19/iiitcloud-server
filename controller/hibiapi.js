const request = require('request');
const fs = require('fs');
const bodyparser = require('body-parser');
const login_test = require('../hibifunction/login_test');
const notice = require('../hibifunction/notice');
const notice_data = require('../hibifunction/notice_data');
const mycourse = require('../hibifunction/mycourse');
const course_details = require('../hibifunction/course_details');
const attendence = require('../hibifunction/attendence');
const course_notice = require('../hibifunction/course_notice');
const course_notice_data = require('../hibifunction/course_notice_data');
const view_grades = require('../hibifunction/view_grades');
const  fee = require('../hibifunction/fee');
const library_books = require('../hibifunction/library_books');
const ebooks = require('../hibifunction/ebooks');
const ebook_data = require('../hibifunction/ebook_data');
const student = require('../hibifunction/student');
const sub_grades = require('../hibifunction/sub_grades');
const complaint = require('../hibifunction/complaint');
const complaint_post = require('../hibifunction/complaint_post');
const moocs = require('../hibifunction/moocs');



module.exports = function(app){


app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});
//login test
app.post('/login_test', function(req,res){
  login_test(req.body,function(data){
  res.json(data);
  res.end()
 });
});
//NoticeBoard
app.post('/notice', function(req,res){
  notice(req.body,function(data){
  res.json(data);
 });
});
//notice_data
app.post('/notice_data', function(req,res){
  
    notice_data(req.body,function(data){
    res.json(data);
  });
});
//mycourse
app.post('/mycourse', function(req,res){
    mycourse(req.body,function(data){
    res.json(data);
  });
});
//course_details
app.post('/course_details', function(req,res){
    course_details(req.body,function(data){
    res.json(data);
  });
});
//attendence
app.post('/attendence', function(req,res){
    attendence(req.body,function(data){
    res.json(data);
  });
});
//course_noticeboard
app.post('/course_notice', function(req,res){
    course_notice(req.body,function(data){
    res.json(data);
  });
});
//course_noticeboard_data
app.post('/course_notice_data', function(req,res){
    course_notice_data(req.body,function(data){
    res.json(data);
  });
});
//view_grades
app.post('/view_grades', function(req,res){
    view_grades(req.body,function(data){
    res.json(data);
  });
});
// sub_grades
app.post('/sub_grades', function(req,res){
    sub_grades(req.body,function(data){
    res.json(data);
  });
});
// fee
app.post('/fee', function(req,res){
    fee(req.body,function(data){
    res.json(data);
  });
});
// library books
app.post('/library_books', function(req,res){
    library_books(req.body,function(data){
    res.json(data);
  });
});
// ebooks
app.post('/ebooks', function(req,res){
    ebooks(req.body,function(data){
    res.json(data);
  });
});
// ebook data
app.post('/ebook_data', function(req,res){
    ebook_data(req.body,function(data){
    res.json(data);
  });
});
// ebook data donwnload
app.get('/ebook_download', function(req,res){
    let fileStream = fs.createWriteStream('book.pdf');  
    request('http://172.16.1.60/ebooks/' + req.query.id + '.pdf')
    .pipe(fileStream)
    .on('close', function(){res.sendFile('/home/administrator/ankit/iiitcloud-server/book.pdf')});

});
// student
app.post('/student', function(req,res){
    student(req.body,function(data){
    res.json(data);
  });
});
// complaint
app.post('/complaint', function(req,res){
    complaint(req.body,function(data){
    res.json(data);
  });
});
// complaint_post
app.post('/complaint_post', function(req,res){
    complaint(req.body,function(data){
    res.json(data);
  });
});
//moocs
app.get('/moocs', function(req,res){
    moocs(function(data){
    res.json(data);
  });
});

};
