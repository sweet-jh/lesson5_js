var bookmarks;
var keywords;
$.getJSON("bookmarks.json",function(data)
{
  bookmarks=data;
  init();
});

//init 显示数据
function init()
{
  var $jsontip = $(".content");
  var strHtml = "";//存储数据的变量
  $jsontip.empty();//清空内容
  $.each(bookmarks,function(infoIndex,info){
      strHtml += '<div class="title">'+info["title"]+'</div>';
      strHtml += '<div class="time">'+'Created @ '+getTime(info["created"])+'</div>';
      strHtml += "<hr>"
    })
  $jsontip.html(strHtml);//显示处理后的数据
}

function getTime(unix) {
    var d = new Date();
    d.setTime(unix);
    return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + (d.getDate()+1);
}

$(document).ready(function(){

  $("#search").bind('input propertychange',function(){
    keywords=$("#search").val();

    if(keywords.length>0)
    {
      var a = new RegExp(keywords, "igm");
      var totalstr="";
      var str="";
      $.each(bookmarks,function(infoIndex,info){
      str = info["title"];
      if(a.test(str))
      {
        str = str.replace(a,'<span id="key">$&</span>');
        totalstr = totalstr + '<div class="title">'+str+'</div>' + '<div class="time">'+'Created @ '+getTime(info["created"])+'</div>'+"<hr>";
      }
    });
    $(".content").empty();
    $(".content").html(totalstr);
    }
    else
      init();
  });

});
