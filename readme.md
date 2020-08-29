User
1 Basic profile info GET /user/:id ✅
2 The issues posted GET /user/:id/issues/ongoing ✅
3 The issues been solved GET /users/:id/issues/solved
4 The assignment been solved GET /users/:id/assignment/ongoing ✅
5 The assignment been solved GET /users/:id/assignment/solved ✅
6 Post a issue POST /issues ✅

Click one issue in step 2 or 3
show all the comments with the issue GET /issues/:id ✅

add a comment POST /issues/:id/comments ✅
As the user of the comment, able to delete comment DELETE /issues/:id/comments/:id ✅

As the sender of the issue, able to modify the issue UPDATE /issues/:id
