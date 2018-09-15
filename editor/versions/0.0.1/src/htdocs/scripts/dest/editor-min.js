"use strict";window.onbeforeunload=function(){return!1};var editor={highlights:{mcscript:"mcscript",mcfunction:"mcfunction",mcmeta:"application/ld+json",json:"application/ld+json",md:"gfm",js:"javascript",html:"htmlmixed"},actual:void 0,opened:{},texteditors:[],getMode:function(e){return editor.highlights[e]?editor.highlights[e]:e},save:function(){editor.actual?editor.opened[editor.actual].save():swal("Nothing to save!","Sorry, but there is nothing to save, please select a file!","error")},undo:function(){editor.actual?editor.opened[editor.actual].editor.undo():swal("Nothing to undo!","Sorry, but there is nothing to undo, please select a file!","error")},redo:function(){editor.actual?editor.opened[editor.actual].editor.redo():swal("Nothing to redo!","Sorry, but there is nothing to redo, please select a file!","error")},open:function(e){if(editor.opened[e])return!1;var t=server.getFileSync(e).file;$("#editorcontainer .CodeMirror").hide(),$("#editorcontainer .MineEditor").hide(),editor.actual=e;var i=createEditor(editor.getMode(t.type),t.content),o=i.div,r=i.editor,n=i.type,d=void 0,a=i.id;$("#"+a).attr("editor");i.save=async function(){"code"==n?await server.saveFile(e,r.getDoc().getValue()).then(function(t){editor.opened[e].content=r.getDoc().getValue(),d.removeClass("edited"),swal("Successfully saved!",'File successfully saved to "'+t.file.path+'"',"success")}):"text"==n&&await server.saveFile(e,$("#"+editor.opened[e].id).val()).then(function(t){editor.opened[e].content=$("#"+editor.opened[e].id).val(),d.removeClass("edited"),swal("Successfully saved!",'File successfully saved to "'+t.file.path+'"',"success")})},$("#editorfiles div.openedfile.selected").removeClass("selected"),$("#editorfiles #editorfilescontainer").append('<div class="openedfile selected" path="'+e+'"><p>'+t.name+'</p><i class="material-icons close">close</i></div>'),d=$("#editorfiles div.selected"),i.frame=d,editor.opened[e]=i,$("#editorfiles div.selected").click(function(t){$("#editorfiles div.openedfile.selected").removeClass("selected"),$(this).addClass("selected"),editor.actual=e,$("#editorcontainer .CodeMirror").hide(),$("#editorcontainer .MineEditor").hide(),$(o).show()}).children("i.close").click(function(){var t=this,i=function(){return $(t).is(".selected")&&(editor.actual=void 0),server.sendUpdateCloseFile(e),$(t).parent().remove(),$(o).remove(),$("#"+editor.opened[e].id).remove(),reloadEditors(),editor.texteditors.includes(e)&&editor.texteditors.remove(e),delete editor.opened[e],!1};$(this).parent().hasClass("edited")?swal({title:"Warning!",text:"This file has unsaved edits. If you close it, the edits will be lost forever! Do you realy want to close it?",icon:"warning",buttons:{save:"Save",continue:"Save not",cancel:"Cancel"},dangerMode:!0}).then(function(t){"save"==t&&editor.opened[e].save().then(i),"continue"==t&&i()}):i()}),"code"==i.type?r.on("change",function(t){editor.opened[e].content!=r.getDoc().getValue()?d.addClass("edited"):d.removeClass("edited")}):"text"==i.type&&editor.texteditors.push(e)}};function createEditor(e,t){if("htmlmixed"==e){var i=guid();$("#editorcontainer").append('<textarea id="'+i+'" class="editor">'+t+"</textarea>"),reloadEditors();var o=document.getElementById(i);return{editor:o,id:i,content:t,type:"text",div:document.getElementById(o.getAttribute("editor"))}}var r=guid();$("#editorcontainer").append('<textarea id="'+r+'">'+t+"</textarea>");var n=CodeMirror.fromTextArea(document.getElementById(r),{mode:e,tabSize:4,lineNumbers:!0,firstLineNumber:1,extraKeys:{"Ctrl-Space":"autocomplete","Alt-F":"findPersistent",F11:function(e){e.setOption("fullScreen",!e.getOption("fullScreen"))},Esc:function(e){e.getOption("fullScreen")&&e.setOption("fullScreen",!1)},"Ctrl-Q":function(e){e.foldCode(e.getCursor())}},lineWrapping:!0,foldGutter:!0,gutters:["CodeMirror-linenumbers","breakpoints","CodeMirror-foldgutter"],scrollbarStyle:"simple",styleActiveLine:!0,theme:"mtheme"});n.on("gutterClick",function(e,t){var i,o=e.lineInfo(t);e.setGutterMarker(t,"breakpoints",o.gutterMarkers?null:((i=document.createElement("div")).style.color="#822",i.innerHTML='<font color="red">&bull;</font>',i))});var d=guid();return $("#editorcontainer .CodeMirror").not(".hasid").attr("id",d),$("#editorcontainer .CodeMirror").not(".hasid").addClass("hasid"),$("#id").remove(),t=n.getDoc().getValue(),{editor:n,id:r,div:document.getElementById(d),content:t,type:"code"}}setInterval(function(){var e=!0,t=!1,i=void 0;try{for(var o,r=editor.texteditors[Symbol.iterator]();!(e=(o=r.next()).done);e=!0){var n=o.value;editor.opened[n].content!=$("#"+editor.opened[n].id).val()?editor.opened[n].frame.addClass("edited"):editor.opened[n].frame.removeClass("edited")}}catch(e){t=!0,i=e}finally{try{!e&&r.return&&r.return()}finally{if(t)throw i}}},1),$(document).ready(function(){setInterval(function(){$("#editorcontainer").height($(window).height()-20),$("#editorcontainer").width($(window).width()-300),$("#editorcontainer .CodeMirror").height($("#editorcontainer").height()-31),$("#editorcontainer .CodeMirror").width($("#editorcontainer").width()-2),$("#editorcontainer #editorfiles").width($("#editorcontainer").width()-2),$("#editorcontainer .MineEditor").height($("#editorcontainer").height()-32),$("#editorcontainer .MineEditor").width($("#editorcontainer").width()-2),$("#editorcontainer .MineEditor .MineEditor-canvas").each(function(){$(this).height($(this).parent().height()-$(this).parent().children(".MineEditor-menuebar").height()-$(this).parent().children(".MineEditor-bottom").height()-44)})},10),$("#editorcontainer .CodeMirror").hide(),$("#editorcontainer .MineEditor").hide()});