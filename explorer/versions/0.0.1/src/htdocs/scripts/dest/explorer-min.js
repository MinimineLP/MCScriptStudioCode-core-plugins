"use strict";var explorer_openedfolders=["/"];async function reloadExplorer(){var e=await server.getFiles(),r=e.working_dir,i=e.files;$("#explorerlist").remove(),$("#explorer").append('<ul id="explorerlist">'+function e(r,i){var t=r;if(t.endsWith("/")&&(t=t.replace(/\/$/,"")),t=t.substring(t.lastIndexOf("/")+1,t.length),i instanceof Object){var n='<li class="dir" path="'+r+'"><i class="material-icons">keyboard_arrow_right</i><img src=/images/explorericons/folder.png /><p>'+t+'</p><ul style="display: none">';for(var o in i)n+=e(r+"/"+o,i[o]);return n+="</ul></li>"}return'<li class="file" path="'+i+'"><img src="'+function(e){switch(e.split(".")[e.split(".").length-1]){case"mcscript":return"/images/explorericons/mcscript.png";case"mcfunction":return"/images/explorericons/mcfunction.png";case"mcmeta":return"/images/explorericons/mcmeta.png";default:return"/images/explorericons/unknown.png"}}(i)+'" /><p>'+t+"</p></li>"}(r,i)+"</p>"),$("#explorer ul li i").click(function(e){var r=$(this).parent().attr("path");"keyboard_arrow_down"==$(this).text()?($(this).parent().children("ul").hide(),$(this).text("keyboard_arrow_right"),explorer_openedfolders.remove(r)):($(this).parent().children("ul").show(),$(this).text("keyboard_arrow_down"),explorer_openedfolders.push(r))}),$("#explorer .file").click(function(){var e=$(this).attr("path");editor.open(e)}),$("#explorer ul li.dir").each(function(){explorer_openedfolders.includes($(this).attr("path"))&&$(this).children("i").trigger("click")})}$(document).ready(function(){setInterval(function(){$("#explorer").height($(window).height()-20)},10),setInterval(function(){reloadExplorer()},1e3)});