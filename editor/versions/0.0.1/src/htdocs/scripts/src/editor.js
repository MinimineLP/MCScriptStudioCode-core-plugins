window.onbeforeunload = function(){return false;};

let editor = {

  highlights: {
     mcscript: "mcscript",
     mcfunction: "mcfunction",
     mcmeta: "application/ld+json",
     json: "application/ld+json",
     md: "gfm",
     js: "javascript",
     html: "htmlmixed"
  },

  actual: undefined,

  opened: {},

  texteditors: [],

  // getEditorCanvas: get editor canvas from editor
  getEditorCanvas(editor) {
    function getFirstSubElementByClass(element, getclass) {
      for (let c of element.childNodes) {
        if (c.className == getclass) {
          return c;
        }
      }
    }
    return getFirstSubElementByClass(editor,"MineEditor-canvas");
  },

  getMode(ending) {
    if(editor.highlights[ending])return editor.highlights[ending];
    return ending;
  },

  save() {
    if(editor.actual)editor.opened[editor.actual].save();
    else swal({title: "Nothing to save!", text: `Sorry, but there is nothing to save, please select a file!`, icon: `error`, className: `top-right`});
  },

  undo() {
    editor.focus();
    if(!editor.actual) swal({title: "Nothing to undo!", text: `Sorry, but there is nothing to undo, please select a file!`, icon: `error`, className: `top-right`});
    else if(editor.opened[editor.actual].type=="code")editor.opened[editor.actual].editor.undo();
    else document.execCommand("undo");
  },

  redo() {
    editor.focus();
    if(!editor.actual) swal({title: "Nothing to redo!", text: `Sorry, but there is nothing to redo, please select a file!`, icon: `error`, className: `top-right`});
    else if(editor.opened[editor.actual].type=="code")editor.opened[editor.actual].editor.redo();
    else document.execCommand("redo");
  },

  focus() {
    if(!editor.actual)return;
    if(editor.opened[editor.actual].type=="code")editor.opened[editor.actual].editor.focus();
    else editor.getEditorCanvas(editor.opened[editor.actual].div).focus();
  },

  open(path) {

    if(editor.opened[path])return false;
    let res = server.getFileSync(path);

    let file = res.file;

    $("#editorcontainer .CodeMirror").hide();
    $("#editorcontainer .MineEditor").hide();

    editor.actual = path;

    let mode = editor.getMode(file.type);
    let aw = createEditor(mode,file.content);
    let div = aw.div;
    let edit = aw.editor;
    let type = aw.type;
    let frame;
    let id = aw.id;
    let editorid = $(`#${id}`).attr("editor");

    aw.save = async function() {
      if(type=="code")await server.saveFile(path,edit.getDoc().getValue()).then(function(res) {
        editor.opened[path].content = edit.getDoc().getValue();
        frame.removeClass('edited');
        swal({title: "Successfully saved!", text: `File successfully saved to "${res.file.path}"`, icon: `success`, className: `top-right`});
      });
      else if(type=="text")await server.saveFile(path,$(`#${editor.opened[path].id}`).val()).then(function(res) {
        editor.opened[path].content = $(`#${editor.opened[path].id}`).val();
        frame.removeClass('edited');
        swal({title: "Successfully saved!", text: `File successfully saved to "${res.file.path}"`, icon: `success`, className: `top-right`});
      });
    }

    $("#editorfiles div.openedfile.selected").removeClass('selected');
    $("#editorfiles #editorfilescontainer").append(`<div class="openedfile selected" path="${path}"><p>${file.name}</p><i class="material-icons close">close</i></div>`)

    frame = $("#editorfiles div.selected");

    aw.frame = frame;
    editor.opened[path] = aw;

    $("#editorfiles div.selected").click(function(e) {
      $("#editorfiles div.openedfile.selected").removeClass('selected');
      $(this).addClass('selected');
      editor.actual = path;
      $("#editorcontainer .CodeMirror").hide();
      $("#editorcontainer .MineEditor").hide();
      $(div).show();
    }).children("i.close").click(function() {
      let el = this;
      let close = function() {
        if($(el).is(".selected"))editor.actual = undefined;
        server.sendUpdateCloseFile(path);
        $(el).parent().remove();
        $(div).remove();
        $(`#${editor.opened[path].id}`).remove();
        reloadEditors();
        if(editor.texteditors.includes(path))editor.texteditors.remove(path)
        delete editor.opened[path];
        delete editor.actual;
        return false;
      }
      if($(this).parent().hasClass('edited')) {
        swal({
          title: "Warning!",
          text: "This file has unsaved edits. If you close it, the edits will be lost forever! Do you realy want to close it?",
          icon: "warning",
          buttons: {
            save: "Save",
            continue: "Save not",
            cancel: "Cancel",
          },
          dangerMode: true,
        })
        .then((res) => {
          if (res=="save") {
            editor.opened[path].save().then(close);
          }
          if (res=="continue") {
            close();
          }
        });
      }else close();
    });

    if(aw.type=="code") {
      edit.on("change",function(cmirror) {
        if(editor.opened[path].content!=edit.getDoc().getValue())frame.addClass('edited');
        else frame.removeClass('edited');
      });
    }
    else if(aw.type=="text") {
      editor.texteditors.push(path);
    }
  },
};

(function() {
  setInterval(function() {
    for(let path of editor.texteditors) {
      if(editor.opened[path].content!=$(`#${editor.opened[path].id}`).val())editor.opened[path].frame.addClass('edited');
      else editor.opened[path].frame.removeClass('edited');
    }
  },1);
})();

$(document).ready(function() {

  setInterval(function() {
    $("#editorcontainer").height($(window).height()-20);
    $("#editorcontainer").width($(window).width()-300);
    $("#editorcontainer .CodeMirror").height($("#editorcontainer").height()-31);
    $("#editorcontainer .CodeMirror").width($("#editorcontainer").width()-2);
    $("#editorcontainer #editorfiles").width($("#editorcontainer").width()-2);
    $("#editorcontainer .MineEditor").height($("#editorcontainer").height()-32);
    $("#editorcontainer .MineEditor").width($("#editorcontainer").width()-2);
    $("#editorcontainer .MineEditor .MineEditor-canvas").each(function() {
      $(this).height($(this).parent().height()-$(this).parent().children('.MineEditor-menuebar').height()-$(this).parent().children('.MineEditor-bottom').height()-44);
    });
  },10);

  $("#editorcontainer .CodeMirror").hide();
  $("#editorcontainer .MineEditor").hide();
});

function createEditor(mode,value) {

  if(mode == "htmlmixed") {
    let id = guid();
    $("#editorcontainer").append(`<textarea id="${id}" class="editor">${value}</textarea>`)
    reloadEditors();
    let area = document.getElementById(id)
    return {editor: area, id: id, content: value, type: "text", div: document.getElementById(area.getAttribute("editor"))};
  }

  let id = guid();
  $("#editorcontainer").append(`<textarea id="${id}">${value}</textarea>`)

  let editor = CodeMirror.fromTextArea(document.getElementById(id), {
    mode: mode,
    tabSize: 4,
    lineNumbers: true,
    firstLineNumber: 1,
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Alt-F": "findPersistent",
      "F11": function(cm) {
        cm.setOption("fullScreen", !cm.getOption("fullScreen"));
      },
      "Esc": function(cm) {
        if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
      },
      "Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }
    },
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "breakpoints", "CodeMirror-foldgutter"],
    scrollbarStyle: "simple",
    styleActiveLine: true,
    theme: "mtheme",
  });
  editor.on("gutterClick", function(cm, n) {
    var info = cm.lineInfo(n);
    cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
  });

  function makeMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#822";
    marker.innerHTML = "<font color=\"red\">&bull;</font>";
    return marker;
  }

  function looksLikeScheme(code) {
    return !/^\s*\(\s*function\b/.test(code) && /^\s*[;\(]/.test(code);
  }

  let id2 = guid();
  $("#editorcontainer .CodeMirror").not('.hasid').attr('id', id2);
  $("#editorcontainer .CodeMirror").not('.hasid').addClass('hasid');
  $("#id").remove();

  value = editor.getDoc().getValue();

  return {editor: editor, id: id, div: document.getElementById(id2), content: value, type: "code"};
}
