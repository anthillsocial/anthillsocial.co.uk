+++
image = "/img/fragments/htmlgraph.png"
showonlyimage = false
description="..."
draft = false
date = "2014-09-05T19:53:42+05:30"
mydate = "2014"
title = "Jquery HTML Graph"
project = ["fragment"]
sidebartext = ""
+++

A code snippet for drawing a pure HTML graph using jquery:


    var points = {0.3,0.5,0.9,0.7};
    function htmlgraph(points){
        var str = "";
        for (var i = 0; i < points.length; i++) {
            var ioid = 'io'+i;
            var x = i*(100/points.length);
            var y = points[i]*100+10;
            var css = 'border:1px solid red;left:'+x+'%;top:'+y+'%;width:1px;height:1px;position:absolute;';
            var mystr = '<div class="p" id="'+ioid+'" style="'+css+'"></div>';
            str += mystr;
        }
        $("#graph").html("<strong>"+i+" points</strong><div id=\"gIOIO\">"+str+"</div>");
        $("#graph #gIOIO").css({'border':'1px solid #ccc', 'height':'100%'});
    }
    htmlgraph(points);

<img src="/img/fragments/htmlgraph.png" />
