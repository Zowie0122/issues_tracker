user
1 The issues user need to do ongoing GET /user/received/ongoing ✅
2 The issues user solved GET /user/received/solved ✅
3 The issues user posted ongoing GET /users/requested/ongoing
4 The issues user posted solved GET /users/requested/solved ✅

login
1 For all users login (including admin) POST /login ✅

issue
1 get an issue with the comments GET /issue/:id ✅
2 post an issue POST /issue ✅
3 modify and issue PUT /issue/:id ✅

comment
1 add a comment POST /comment ✅

department
1 get all departments GET /department/ ✅
2 get the employees in a department GET /department/:id ✅

admin
1 add a new employee POST /admin/onboard ✅
2 add a new department POST /admin/department ✅
3 delete an employee DELETE /admin/delete ✅

// sql intersection
// web sockets long-pooling short-pooling
