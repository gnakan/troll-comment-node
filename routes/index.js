
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.userlist = function(db){
	return function(req, res){
		var collection = db.get('usercollection');
		collection.find({},{},function(e,docs){
			res.render('userlist', {
				"userlist" :docs
			});
		});
	};
};

exports.newuser = function(req, res){
	res.render('newuser', {title: 'Add New Comment'});
};

exports.adduser = function(db){
	return function(req, res){
		var userName = req.body.username;
		var userEmail = req.body.useremail;
		var userComment = req.body.comment;

		var collection = db.get('usercollection'); //set the collection

		if(userComment.indexOf("suck") !== -1)
			userComment = "WARNING - TROLL TEXT FOLLOWS: " + userComment;

		collection.insert({
			"username" : userName,
			"email" : userEmail,
			"Comment" : userComment
		}, function (err, doc){
			if(err){
				res.send("There was a problem storing data.");
			}
			else
			{
				res.location("blogpost");
				res.redirect("blogpost");
			}
		});
	};
};