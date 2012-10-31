var blacklist='';

extension_init();


function extension_init(){

	chrome.extension.sendRequest({method: "getLocalStorage", key: "blacklist"}, function(response) {
	  console.log(response.data);
	  blacklist = response.data;
	  blacklist = blacklist.split(",");
	  blacklist_block();
	});
	$("a:contains('只看该作者')").after("<a id = 'block_this_author' href='javascript:;'> 屏蔽该作者<a>");
	content_filter("内容");
};



function content_filter(s)
{
	// var content = $("td.t_msgfont").html();
	var temp = '';
	$("td.t_msgfont").each(function(){
		if(this.innerHTML.slice(0,2) == s)
		{
			this.innerHTML =  this.innerHTML.slice(2);
		}
	})
	return false;
}


function blacklist_block(){
	var i;
	for(i = 0; i < blacklist.length; i++)
	{
		//thread list
		$("td.author a:contains('"+blacklist[i]+"')").parent().parent().parent().hide();	

		//post list
		$("div.postinfo a:contains('"+blacklist[i]+"')").parentsUntil("table").filter("tbody").hide();
	}
};

$("#block_this_author").live('click',function(){
	var is_confirm = window.confirm("确定屏蔽该用户？");
	if(is_confirm)
	{
		//var blacklist = localStorage.getItem("blacklist");
		var author_name = $(this).parentsUntil("tr").filter(".postcontent").prev(".postauthor").find("div.postinfo a").html();
		blacklist = blacklist + author_name +",";
		//ocalStorage.setItem('blacklist',blacklist);
		chrome.extension.sendRequest({method: "setLocalStorage", key: 'blacklist',value:blacklist}, function(response) {
	  		console.log(response.data);
		});
	}
	return false;
});


