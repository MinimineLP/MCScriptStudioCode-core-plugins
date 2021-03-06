"use strict";

/**
 * @author Minimine <https://github.com/MinimineLP>
 *
 * @name Editor
 * @version 0.0.1
 * @since 0.0.1
 *
 * @copyright Copyright (c) 2018 by Minimine, all reights reserved
 * @license MIT
 *
 */

/**
* Start of the config
	*/
var editor_config = {
  import_material_icons: false, // Import googles material icons from googleapis
  material_icons: "MaterialDesign-Webfont-master/css/materialdesignicons.css",
  apply_style: false, // Should the stylesheet be added?
  language: {
    words: "words",
    word: "word",
    lines: "lines",
    line: "line",
    columns: "columns",
    column: "column"
  },
  style: "\n\t ",
  editorcontent: "\n\t <div class=\"MineEditor-menuebar\">\n\t\t <button class=\"MineEditor-button\" data-attribute=\"undo\" tooltip=\"undo\"><i class=\"material-icons mdi mdi-arrow-left\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"redo\" tooltip=\"redo\"><i class=\"material-icons mdi mdi-arrow-right\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"paste\" tooltip=\"paste text\"><i class=\"material-icons mdi mdi-content-paste\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"copy\" tooltip=\"copy selection\"><i class=\"material-icons mdi mdi-content-copy\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"cut\" tooltip=\"cut selection\"><i class=\"material-icons mdi mdi-content-cut\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"bold\" tooltip=\"fromat bold\"><i class=\"mdi mdi-format-bold\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"italic\" tooltip=\"fromat italic\"><i class=\"mdi mdi-format-italic\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"underline\" tooltip=\"fromat underline\"><i class=\"mdi mdi-format-underline\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"strikeThrough\" tooltip=\"fromat strikethrough\"><i class=\"mdi mdi-format-strikethrough-variant\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"justifyleft\" tooltip=\"justify left\"><i class=\"mdi mdi-format-align-left\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"justifycenter\" tooltip=\"justify center\"><i class=\"mdi mdi-format-align-center\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"justifyright\" tooltip=\"justify right\"><i class=\"mdi mdi-format-align-right\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"justifyFull\" tooltip=\"justify full\"><i class=\"mdi mdi-format-align-justify\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"foreColor\" tooltip=\"color text\"><input type=\"color\" hidden/><i class=\"mdi mdi-format-color-text\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"backColor\" tooltip=\"color background\"><input type=\"color\" hidden/><i class=\"mdi mdi-format-color-fill\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"insertUnorderedList\" tooltip=\"insert unordered list\"><i class=\"mdi mdi-format-list-bulleted\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"insertOrderedList\" tooltip=\"insert ordered list\"><i class=\"mdi mdi-format-list-numbers\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"createLink\" tooltip=\"create link\"><i class=\"mdi mdi-link-variant\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"unlink\" tooltip=\"remove link\"><i class=\"mdi mdi-link-variant-off\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"insertImage\" tooltip=\"insert image\"><i class=\"mdi mdi-image\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"insertEmote\" tooltip=\"insert emote\"><i class=\"mdi mdi-emoticon\"></i></button>\n\t\t <button class=\"MineEditor-button\" data-attribute=\"delete\" tooltip=\"delete\"><i class=\"mdi mdi-backspace\"></i></button>\n\t </div>\n\t \t<div class=\"MineEditor-canvas\" contenteditable></div>\n \t \t<div class=\"MineEditor-bottom\">\n      <p class=\"MineEditor-lines\"></p>\n      <p class=\"MineEditor-words\"></p>\n      <p class=\"MineEditor-columns\"></p>\n      <p class=\"MineEditor-credits\">by <a href=\"https://github.com/MinimineLP/\" target=\"_blank\">Minimine</a></p>\n    </div>\n\t "
};

/**
 * End of the config
 */

console.log("This website uses MineEditor (the tiny version) by Minimine < https://github.com/MinimineLP >, for beautiful text editing.");

Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
};

document.addEventListener('DOMContentLoaded', function () {
  /*
   * Functions
   */
  // InsertAfter: insert a element after another element
  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  // addCssCode: add css code
  function addStyle(code) {
    var style = document.createElement("style");
    style.innerHTML = code;
    document.head.appendChild(style);
  }

  // addCss: add a css file
  function addStylesheet(fileName) {

    // create <link> to import stylesheet
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;

    document.head.appendChild(link);
  }

  // guid: returns a uuid
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  // getFirstSubElementByClass
  function getFirstSubElementByClass(element, getclass) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = element.childNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var c = _step.value;

        if (c.className == getclass) {
          return c;
        }
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
  }

  // getEditorCanvas: get editor canvas from editor
  function getEditorCanvas(editor) {
    return getFirstSubElementByClass(editor, "MineEditor-canvas");
  }

  var toManageEditors = [];

  window.reloadEditors = function () {

    var elts = document.getElementsByClassName("MineEditor");
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = elts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var el = _step2.value;

        el.remove();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    toManageEditors = [];

    // Get editors
    var editors = document.getElementsByClassName("editor");

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = editors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _i = _step3.value;

        var id = guid();
        var editor = document.createElement("div");
        editor.innerHTML = editor_config.editorcontent;
        editor.classList.add('MineEditor');
        editor.id = id;
        _i.style.display = "none";
        _i.setAttribute("editor", id);

        getEditorCanvas(editor).innerHTML = _i.value;
        getEditorCanvas(editor).setAttribute("placeholder", _i.placeholder);
        getEditorCanvas(editor).onkeyup = _i.onkeyup;
        getEditorCanvas(editor).onkeydown = _i.onkeydown;
        getEditorCanvas(editor).onkeypress = _i.onkeypress;
        getEditorCanvas(editor).onclick = _i.onclick;
        getEditorCanvas(editor).onmousedown = _i.onmousedown;
        getEditorCanvas(editor).onmouseup = _i.onmouseup;

        getEditorCanvas(editor).addEventListener("click", function () {
          var target = event.target;

          if (target.tagName.toLowerCase() == "a") {
            if (target.href) {

              if (event.ctrlKey) {
                window.open(target.href, '_blank').focus();
                event.preventDefault();
              }
            }
          }
        });
        insertAfter(editor, _i);

        toManageEditors.push({ id: id, bef: _i, LastTickContent: guid(), EditorLastTickContent: guid() });
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    document.body.addEventListener("keydown", function (e) {
      if (e.ctrlKey) document.body.classList.add("ctrl_pressed");
      if (e.shiftKey) document.body.classList.add("shift_pressed");
      if (e.altKey) document.body.classList.add("alt_pressed");
    });

    document.body.addEventListener("keyup", function (e) {
      if (!e.ctrlKey) document.body.classList.remove("ctrl_pressed");
      if (!e.shiftKey) document.body.classList.remove("shift_pressed");
      if (!e.altKey) document.body.classList.remove("alt_pressed");
    });

    if (editor_config.import_material_icons) addStylesheet(editor_config.material_icons);
    if (editor_config.apply_style) addStyle(editor_config.style);

    var editorButtons = document.getElementsByClassName('MineEditor-button');

    var setAttribute = function setAttribute(element) {
      var selection = window.getSelection();
      getSelection(getEditorCanvas(element.parentNode.parentNode));
      var children = element.childNodes;

      if (element.dataset.attribute == "paste") {
        navigator.clipboard.readText().then(function (text) {
          document.execCommand("insertHTML", false, text);
        });
        return;
      }

      // Emotes
      if (element.dataset.attribute == "insertEmote") {
        window.open('https://emojipedia.org/', '_blank');
        return;
      }

      // Link & image
      if (element.dataset.attribute == "createLink" || element.dataset.attribute == "insertImage") {
        var link = prompt("Please enter the Link here");
        if (link != null) document.execCommand(element.dataset.attribute, false, link);
        return;
      }

      // Children (for the color selects)
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.tagName.toLowerCase() == "input" && child.getAttribute("type").toLowerCase() == "color") {
          child.click();
        }
      }

      // Execute command
      document.execCommand(element.dataset.attribute, false);
    };

    // Apply Listeners to buttons
    for (var i = 0; i < editorButtons.length; i++) {

      var children = editorButtons[i].childNodes;

      for (var c = 0; c < children.length; c++) {
        var child = children[c];

        // Manage inputs (for colors)
        if (child.tagName.toLowerCase() == "input" && child.getAttribute("type").toLowerCase() == "color") {
          child.addEventListener('change', function () {
            var color = this.value;
            var element = this.parentElement;
            if (color != null) document.execCommand(element.dataset.attribute, true, color);
          });
        }
      }
      editorButtons[i].addEventListener('click', function (e) {
        if (event.target.tagName.toLowerCase() == "input") return;
        e.preventDefault();
        setAttribute(this);
      }, false);
    }
  };

  window.reloadEditors();

  setInterval(function () {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = toManageEditors[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var i = _step4.value;

        var editor = document.getElementById(i.id);

        if (i.LastTickContent != i.bef.value) {
          getEditorCanvas(editor).innerHTML = i.bef.value;
        } else if (i.EditorLastTickContent != getEditorCanvas(editor).innerHTML) {
          i.bef.value = getEditorCanvas(editor).innerHTML;
        } else continue;

        i.LastTickContent = i.bef.value;
        i.EditorLastTickContent = getEditorCanvas(editor).innerHTML;

        var lines = 0,
            words = 0,
            cols = 0,
            linesWord = editor_config.language.lines,
            wordsWord = editor_config.language.words,
            colsWord = editor_config.language.columns,
            linesContainer = getFirstSubElementByClass(getFirstSubElementByClass(editor, "MineEditor-bottom"), "MineEditor-lines"),
            wordsContainer = getFirstSubElementByClass(getFirstSubElementByClass(editor, "MineEditor-bottom"), "MineEditor-words"),
            colsContainer = getFirstSubElementByClass(getFirstSubElementByClass(editor, "MineEditor-bottom"), "MineEditor-columns");

        if (getEditorCanvas(editor).innerText.match(/\n/g)) lines = getEditorCanvas(editor).innerText.match(/\n/g).length;
        if (getEditorCanvas(editor).innerText.match(/\S+/g)) words = getEditorCanvas(editor).innerText.match(/\S+/g).length;
        cols = getEditorCanvas(editor).innerText.length;

        if (lines == 0) lines = 1;

        if (lines == 1) linesWord = editor_config.language.line;
        if (words == 1) wordsWord = editor_config.language.word;
        if (cols == 1) colsWord = editor_config.language.column;

        linesContainer.innerHTML = lines + " " + linesWord;
        wordsContainer.innerHTML = words + " " + wordsWord;
        colsContainer.innerHTML = cols + " " + colsWord;
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  }, 1);

  (function () {

    function getPosition(el) {
      var _x = 0;
      var _y = 0;
      var positionInfo = el.getBoundingClientRect();
      var height = positionInfo.height;
      var width = positionInfo.width;
      while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      }
      return { top: _y, left: _x, width: width, height: height };
    }

    function getAllElementsWithAttribute(attribute) {
      var matchingElements = [];
      var allElements = document.getElementsByTagName('*');
      for (var i = 0, n = allElements.length; i < n; i++) {
        if (allElements[i].getAttribute(attribute) !== null) {
          // Element exists with attribute. Add to array.
          matchingElements.push(allElements[i]);
        }
      }
      return matchingElements;
    }

    var tooltip = document.createElement("div");
    tooltip.id = "MineEditor_tooltip";
    tooltip.style.display = "none";
    document.body.appendChild(tooltip);

    getAllElementsWithAttribute("tooltip").forEach(function (el) {
      el.addEventListener("mouseenter", function (e) {
        if (this.getAttribute("tooltip")) {
          var position = getPosition(this);
          var _tooltip = document.getElementById("MineEditor_tooltip");
          _tooltip.innerHTML = this.getAttribute("tooltip");
          _tooltip.style.top = position.top + position.height + 3 + "px";
          _tooltip.style.left = position.left + position.width / 2 + "px";
          _tooltip.style.display = null;
        }
        el.addEventListener("mouseleave", function (e) {
          tooltip.style.display = "none";
        });
      });
    });
  })();
}, false);