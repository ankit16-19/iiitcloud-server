# IIIT Cloud Server
Written in **NodeJS**, this server scrapes the Mandaar (previously, Hibiscus) server and returns an JSON object depending upon the request. Simply put, this is an **unofficial API** for the Mandaar UMS.  
This server is hosted on Digital Ocean for now and is accessible on the IP `139.59.23.157`.    

# API Endpoints
### 1. login test
* ##### Verifies user credentials.  
  + > Request URL: http://139.59.23.157/api/hibi/login_test
  + > Request Method: POST
  + > Form Data
    + 'uid':'userID'
    + 'pwd :'pass@123'
   + Returns JSON object `{"return":"success"}` on successful authentication and `{"return":"failed"}` otherwise.  
  
### 2. login
* ##### Returns 50 most recent notices.
  + > Request URL: http://139.59.23.157/api/hibi/notice
  + > Request Method: POST
  + > Form Data
    + 'uid':'userID'
    + 'pwd :'pass@123'
  + Returns JSON object `{"Notices":[{"date":"dd-mm-yyyy","title":"Lorem Ipsum","id":"0000","id_link":"dummyLink.php","posted_by":"XYZ","attention":"XYZ"} , ....49 }]}`

### 3. notice_data
* ##### Returns notice data in HTML format.
  + > Request URL: http://139.59.23.157/api/hibi/notice_data
  + > Request Method: POST
  + > Form Data
    + 'uid':'userID'
    + 'pwd :'pass@123'
    + 'id':0000
  + Returns JSON object `{"Notices":[{"notice_data":".....html content......"}]}`

### 4. mycourse
* ##### Returns user's course list.
  + > Request URL: http://139.59.23.157/api/hibi/mycourse
  + > Request Method: POST
  + > Form Data
    + 'uid':'userID'
    + 'pwd :'pass@123'
  + Returns JSON object `{"Notices":[{"semester":"BXXX-Y","id":"BXXX-Y~EEXXX","name":"XYZ","link":"dummyLink.php","professor":"XYZ","status":"C","credits":"X.00"},....}]}`
  
### 5. course_details
* ##### Returns professor details.
  + > Request URL: http://139.59.23.157/api/hibi/course_details
  + > Request Method: POST
  + > Form Data
    + 'uid':'userID'
    + 'pwd':'pass@123'
    + 'id':'BXXX-X~EEXXX'
  + Returns JSON object `{"Notices":[{"name":"XYZ","designation":"Asst. XYZ","qualifications":"XYZ in XYZ","contact":" Phone(Ext) :   Email : xyz@iiit-bh.ac.in"}]}`
  
### 6. attendance
* ##### Returns user attendance.
  + > Request URL: http://139.59.23.157/api/hibi/attendence
  + > Request Method: POST
  + > Form Data
    + 'uid':'userID'
    + 'pwd':'pass@123'
  + Returns JSON object `{"Notices":[{"subcode":"BXXX-X~EEXXX","sub":"XYZ","name":"Mr. XYZ","attendance":"  X(   %)    X(   %)   X(   %)   X"},....}]}`
  
### 7. course_notice
* ##### Returns the complete course notice board.
  + > Request URL: http://139.59.23.157/api/hibi/course_notice
  + > Request Method: POST
  + > Form Data
    + 'uid':'userID'
    + 'pwd':'pass@123'
    + 'id':'BXXX-X~HMXXX'
  + Returns JSON object `{"Notices":[null,{"date":"dd-mm-yyyy","title":"XYZ","link_id":"dummyLink.php","id":"BXXX-X~HMXXX"}]}`
  + **`null` in the above JSON object is a known issue and will be fixed soon.**
  
### 8. course_notice_data
* ##### Returns the course notice data.
  + > Request URL: http://139.59.23.157/api/hibi/course_notice_data
  + > Request Method: POST
  + > Form Data
    + 'uid':'userID'
    + 'pwd':'pass@123'
    + 'link : 'dumyLink.php..'  // from #7
    + 'id':'BXXX-X~HMXXX'
  + Returns JSON object `{"Notices":[{"heading":"XYZ","notice_data":"xyz xyz","date":"...content in html....."}]}`
  
  
  
### 9. view_grades
* ##### Returns the Grades in HTML format.
  + > Request URL: http://139.59.23.157/api/hibi/view_grades
  + > Request Method: POST
  + > Form Data
    + 'uid':'userID'
    + 'pwd':'pass@123'
  + Returns JSON object `{"Notices":[{{"Notices":[{"html":".....html content......"}]}`
