var bookmarks;
var keywords;
$.getJSON("http://sweet-jh.github.io/lesson5_js/bookmarks.json",function(data)
{
  bookmarks=data;
});

//init 显示数据
function init()
{
  var $jsontip = $(".content");
  var strHtml = "";//存储数据的变量
  $jsontip.empty();//清空内容
  $.each(bookmarks,function(infoIndex,info){
      strHtml += "title："+info["title"]+"<br>";
      strHtml += "time："+info["created"]+"<br>";
      strHtml += "<hr>"
    })
  $jsontip.html(strHtml);//显示处理后的数据
}

$(document).ready(function(){

    init();

  $("#search").bind('input propertychange',function(){
    keywords=$("#search").val();

    if(keywords.length>0)
    {
      var a = new RegExp(keywords, "ig");
      var totalstr="";
      var str="";
      $.each(bookmarks,function(infoIndex,info){
      str = "title："+info["title"];
      if(a.test(str))
      {
        totalstr = totalstr + str.replace(a,("<span style='color:#F00'>" + keywords + "</span>")) + "<br>"+"<hr>";
      }
    });
    $(".content").empty();
    $(".content").html(totalstr);
    }
    else
      init();
  });

});
