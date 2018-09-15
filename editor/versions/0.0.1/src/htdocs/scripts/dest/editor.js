"use strict";

window.onbeforeunload = function () {
  return false;
};

var editor = {

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

  getMode: function getMode(ending) {
    if (editor.highlights[ending]) return editor.highlights[ending];
    return ending;
  },
  save: function save() {
    if (editor.actual) editor.opened[editor.actual].save();else swal("Nothing to save!", "Sorry, but there is nothing to save, please select a file!", "error");
  },
  undo: function undo() {
    if (editor.actual) editor.opened[editor.actual].editor.undo();else swal("Nothing to undo!", "Sorry, but there is nothing to undo, please select a file!", "error");
  },
  redo: function redo() {
    if (editor.actual) editor.opened[editor.actual].editor.redo();else swal("Nothing to redo!", "Sorry, but there is nothing to redo, please select a file!", "error");
  },
  open: function open(path) {

    if (editor.opened[path]) return false;
    var res = server.getFileSync(path);

    var file = res.file;

    $("#editorcontainer .CodeMirror").hide();
    $("#editorcontainer .MineEditor").hide();

    editor.actual = path;

    var mode = editor.getMode(file.type);
    var aw = createEditor(mode, file.content);
    var div = aw.div;
    var edit = aw.editor;
    var type = aw.type;
    var frame = void 0;
    var id = aw.id;
    var editorid = $("#" + id).attr("editor");

    aw.save = async function () {
      if (type == "code") await server.saveFile(path, edit.getDoc().getValue()).then(function (res) {
        editor.opened[path].content = edit.getDoc().getValue();
        frame.removeClass('edited');
        swal("Successfully saved!", "File successfully saved to \"" + res.file.path + "\"", "success");
      });else if (type == "text") await server.saveFile(path, $("#" + editor.opened[path].id).val()).then(function (res) {
        editor.opened[path].content = $("#" + editor.opened[path].id).val();
        frame.removeClass('edited');
        swal("Successfully saved!", "File successfully saved to \"" + res.file.path + "\"", "success");
      });
    };

    $("#editorfiles div.openedfile.selected").removeClass('selected');
    $("#editorfiles #editorfilescontainer").append("<div class=\"openedfile selected\" path=\"" + path + "\"><p>" + file.name + "</p><i class=\"material-icons close\">close</i></div>");

    frame = $("#editorfiles div.selected");

    aw.frame = frame;
    editor.opened[path] = aw;

    $("#editorfiles div.selected").click(function (e) {
      $("#editorfiles div.openedfile.selected").removeClass('selected');
      $(this).addClass('selected');
      editor.actual = path;
      $("#editorcontainer .CodeMirror").hide();
      $("#editorcontainer .MineEditor").hide();
      $(div).show();
    }).children("i.close").click(function () {
      var el = this;
      var close = function close() {
        if ($(el).is(".selected")) editor.actual = undefined;
        server.sendUpdateCloseFile(path);
        $(el).parent().remove();
        $(div).remove();
        $("#" + editor.opened[path].id).remove();
        reloadEditors();
        if (editor.texteditors.includes(path)) editor.texteditors.remove(path);
        delete editor.opened[path];
        return false;
      };
      if ($(this).parent().hasClass('edited')) {
        swal({
          title: "Warning!",
          text: "This file has unsaved edits. If you close it, the edits will be lost forever! Do you realy want to close it?",
          icon: "warning",
          buttons: {
            save: "Save",
            continue: "Save not",
            cancel: "Cancel"
          },
          dangerMode: true
        }).then(function (res) {
          if (res == "save") {
            editor.opened[path].save().then(close);
          }
          if (res == "continue") {
            close();
          }
        });
      } else close();
    });

    if (aw.type == "code") {
      edit.on("change", function (cmirror) {
        if (editor.opened[path].content != edit.getDoc().getValue()) frame.addClass('edited');else frame.removeClass('edited');
      });
    } else if (aw.type == "text") {
      editor.texteditors.push(path);
    }
  }
};

(function () {
  setInterval(function () {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = editor.texteditors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var path = _step.value;

        if (editor.opened[path].content != $("#" + editor.opened[path].id).val()) editor.opened[path].frame.addClass('edited');else editor.opened[path].frame.removeClass('edited');
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }, 1);
})();

$(document).ready(function () {

  setInterval(function () {
    $("#editorcontainer").height($(window).height() - 20);
    $("#editorcontainer").width($(window).width() - 300);
    $("#editorcontainer .CodeMirror").height($("#editorcontainer").height() - 31);
    $("#editorcontainer .CodeMirror").width($("#editorcontainer").width() - 2);
    $("#editorcontainer #editorfiles").width($("#editorcontainer").width() - 2);
    $("#editorcontainer .MineEditor").height($("#editorcontainer").height() - 32);
    $("#editorcontainer .MineEditor").width($("#editorcontainer").width() - 2);
    $("#editorcontainer .MineEditor .MineEditor-canvas").each(function () {
      $(this).height($(this).parent().height() - $(this).parent().children('.MineEditor-menuebar').height() - $(this).parent().children('.MineEditor-bottom').height() - 44);
    });
  }, 10);

  $("#editorcontainer .CodeMirror").hide();
  $("#editorcontainer .MineEditor").hide();
});

function createEditor(mode, value) {

  if (mode == "htmlmixed") {
    var _id = guid();
    $("#editorcontainer").append("<textarea id=\"" + _id + "\" class=\"editor\">" + value + "</textarea>");
    reloadEditors();
    var area = document.getElementById(_id);
    return { editor: area, id: _id, content: value, type: "text", div: document.getElementById(area.getAttribute("editor")) };
  }

  var id = guid();
  $("#editorcontainer").append("<textarea id=\"" + id + "\">" + value + "</textarea>");

  var editor = CodeMirror.fromTextArea(document.getElementById(id), {
    mode: mode,
    tabSize: 4,
    lineNumbers: true,
    firstLineNumber: 1,
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Alt-F": "findPersistent",
      "F11": function F11(cm) {
        cm.setOption("fullScreen", !cm.getOption("fullScreen"));
      },
      "Esc": function Esc(cm) {
        if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
      },
      "Ctrl-Q": function CtrlQ(cm) {
        cm.foldCode(cm.getCursor());
      }
    },
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "breakpoints", "CodeMirror-foldgutter"],
    scrollbarStyle: "simple",
    styleActiveLine: true,
    theme: "mtheme"
  });
  editor.on("gutterClick", function (cm, n) {
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

  var id2 = guid();
  $("#editorcontainer .CodeMirror").not('.hasid').attr('id', id2);
  $("#editorcontainer .CodeMirror").not('.hasid').addClass('hasid');
  $("#id").remove();

  value = editor.getDoc().getValue();

  return { editor: editor, id: id, div: document.getElementById(id2), content: value, type: "code" };
}