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
 const min_editor_config = {
	 import_material_icons: true, // Import googles material icons from googleapis
   material_icons: "MaterialDesign-Webfont-master/css/materialdesignicons.css",
	 apply_style: true, // Should the stylesheet be added?
   language: {
     words: "words",
     word: "word",
     lines: "lines",
     line: "line",
     columns: "columns",
     column: "column",
   },
	 style:
	 `
   .rotate_90 {
     transform: rotate(90deg);
   }
   .rotate_180 {
     transform: rotate(180deg);
   }
   .rotate_270 {
     transform: rotate(270deg);
   }

	 .MinMineEditor {
	   display: relative;
     border: 1px solid #1b2431;
     height: auto;
	 }

	 .MinMineEditor-menuebar {
	   padding-left: 0px;
	   width: 100%;
	   background-color: #1b2431;
	   grid-template-columns: repeat(auto-fill, 50px);
	   grid-column-gap: 0px
	   -moz-user-select: -moz-none;
	   -khtml-user-select: none;
	   -webkit-user-select: none;
	   -ms-user-select: none;
	   user-select: none;
	 }

	 .MinMineEditor-menuebar button {
	   background-color: #ff6e48;
	   margin: 0px;
	   color: #ffffff;
	   font-size: 20px;
	   padding: 8px;
	   background-color: rgba(0, 0, 0, 0);
	   cursor: pointer;
	   transition: all 250ms;
	   border: none;
	   outline:none;
	 }

	 .MinMineEditor-menuebar button:hover {
	   background-color: #ff6e48;
	   color: #fffff;
	 }

	 .MinMineEditor-canvas {
	   overflow-wrap: break-word;
	   background-color: #fff;
	   width: 96%;
	   height: 200px;
	   padding: 2%;
	   font-size: 16px;
	   color: #000;
	   font-family: arial;
	   line-height: 1.5em;
	   overflow: auto;
	 }

	 .MinMineEditor-canvas:focus {
	   outline: none;
	 }

   .MinMineEditor-canvas a {
     color: rgb(70, 70, 70);
     cursor: text;
   }

   .MinMineEditor-canvas a:hover {
     color: rgb(120, 120, 120);
     cursor: text;
   }

   body.ctrl_pressed .MinMineEditor-canvas a:hover {
     cursor: pointer;
   }

   #MinMineEditor_tooltip {
     position: absolute;
     transform: translate(-50%,0%);
     background-color: rgba(0,0,0,0.5);
     border-radius: 3px;
     color: #fff;
     display: inline;
     font-family: sans-serif;
   }

   /* Placeholder support for contenteditable divs */
   .MinMineEditor div[contenteditable]:empty::before {
     content: attr(placeholder);
     display: block; /* For Firefox */
     color: rgb(180, 180, 180);
   }
	 `,
	 editorcontent:
	 `
	 <div class="MinMineEditor-menuebar">
		 <button class="MinMineEditor-button" data-attribute="undo" tooltip="undo"><i class="material-icons mdi mdi-arrow-left"></i></button>
		 <button class="MinMineEditor-button" data-attribute="redo" tooltip="redo"><i class="material-icons mdi mdi-arrow-right"></i></button>
		 <button class="MinMineEditor-button" data-attribute="paste" tooltip="paste text"><i class="material-icons mdi mdi-content-paste"></i></button>
		 <button class="MinMineEditor-button" data-attribute="copy" tooltip="copy selection"><i class="material-icons mdi mdi-content-copy"></i></button>
		 <button class="MinMineEditor-button" data-attribute="cut" tooltip="cut selection"><i class="material-icons mdi mdi-content-cut"></i></button>
		 <button class="MinMineEditor-button" data-attribute="bold" tooltip="fromat bold"><i class="mdi mdi-format-bold"></i></button>
		 <button class="MinMineEditor-button" data-attribute="italic" tooltip="fromat italic"><i class="mdi mdi-format-italic"></i></button>
		 <button class="MinMineEditor-button" data-attribute="underline" tooltip="fromat underline"><i class="mdi mdi-format-underline"></i></button>
		 <button class="MinMineEditor-button" data-attribute="strikeThrough" tooltip="fromat strikethrough"><i class="mdi mdi-format-strikethrough-variant"></i></button>
		 <button class="MinMineEditor-button" data-attribute="foreColor" tooltip="color text"><input type="color" hidden/><i class="mdi mdi-format-color-text"></i></button>
		 <button class="MinMineEditor-button" data-attribute="backColor" tooltip="color background"><input type="color" hidden/><i class="mdi mdi-format-color-fill"></i></button>
		 <button class="MinMineEditor-button" data-attribute="createLink" tooltip="create link"><i class="mdi mdi-link-variant"></i></button>
		 <button class="MinMineEditor-button" data-attribute="unlink" tooltip="remove link"><i class="mdi mdi-link-variant-off"></i></button>
		 <button class="MinMineEditor-button" data-attribute="insertEmote" tooltip="insert emote"><i class="mdi mdi-emoticon"></i></button>
	 </div>
	 	<div class="MinMineEditor-canvas" contenteditable></div>
	 `,
 };

/**
 * End of the config
 */

 console.log("This website uses MineEditor (the tiny version) by Minimine < https://github.com/MinimineLP >, for beautiful text editing.")

document.addEventListener('DOMContentLoaded', function(){
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
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  // getFirstSubElementByClass
  function getFirstSubElementByClass(element, getclass) {
    for (let c of element.childNodes) {
      if (c.className == getclass) {
        return c;
      }
    }
  }

  // getEditorCanvas: get editor canvas from editor
  function getEditorCanvas(editor) {
    return getFirstSubElementByClass(editor,"MinMineEditor-canvas");
  }

  function getTextSelection(el) {
    var start = 0, end = 0, normalizedValue, range, textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
      start = el.selectionStart;
      end = el.selectionEnd;
    } else {
    }
    alert("start :" + start + " End :" + end);
  }

  let toManageEditors = [];
  window.reloadMinEditors = function() {

    let elts = document.getElementsByClassName("MinMineEditor");
    for(let el of elts) {
      el.remove();
    }
    toManageEditors = [];

    // Get editors
  	let editors = document.getElementsByClassName("mineditor");

  	for(let i of editors) {
      let id = guid();
  		let editor = document.createElement("div");
  		editor.innerHTML = min_editor_config.editorcontent;
  		editor.classList.add('MinMineEditor');
      editor.id = id;
  		i.style.display = "none";
      i.setAttribute("editor", id);

      getEditorCanvas(editor).innerHTML = i.value;
      getEditorCanvas(editor).setAttribute("placeholder",i.placeholder);
      getEditorCanvas(editor).onkeyup = i.onkeyup;
      getEditorCanvas(editor).onkeydown = i.onkeydown;
      getEditorCanvas(editor).onkeypress = i.onkeypress;
      getEditorCanvas(editor).onclick = i.onclick;
      getEditorCanvas(editor).onmousedown = i.onmousedown;
      getEditorCanvas(editor).onmouseup = i.onmouseup;

      getEditorCanvas(editor).addEventListener("click", function() {
        let target = event.target;

        if(target.tagName.toLowerCase()=="a") {
          if(target.href) {

            if (event.ctrlKey) {
              window.open(target.href, '_blank').focus();
              event.preventDefault();
            }
          }
        }
      });
  		insertAfter(editor,i);

      toManageEditors.push({id: id, bef: i, LastTickContent: guid(), EditorLastTickContent: guid()});
  	}

    document.body.addEventListener("keydown", function(e) {
      if(e.ctrlKey)document.body.classList.add("ctrl_pressed");
      if(e.shiftKey)document.body.classList.add("shift_pressed");
      if(e.altKey)document.body.classList.add("alt_pressed");
    })

    document.body.addEventListener("keyup", function(e) {
      if(!e.ctrlKey)document.body.classList.remove("ctrl_pressed");
      if(!e.shiftKey)document.body.classList.remove("shift_pressed");
      if(!e.altKey)document.body.classList.remove("alt_pressed");
    })

  	if(min_editor_config.import_material_icons)addStylesheet(min_editor_config.material_icons);
  	if(min_editor_config.apply_style)addStyle(min_editor_config.style);

  	let editorButtons = document.getElementsByClassName('MinMineEditor-button');

  	let setAttribute = (element) => {
      let selection = window.getSelection();
      getSelection(getEditorCanvas(element.parentNode.parentNode))
  		let children = element.childNodes;

      if(element.dataset.attribute=="paste") {
        navigator.clipboard.readText().then(function(text) {
          document.execCommand("insertHTML", false, text)
        });
        return;
      }

      // Emotes
  		if(element.dataset.attribute=="insertEmote") {
  			window.open('https://emojipedia.org/','_blank');
  			return;
  		}

      // Link & image
  		if(element.dataset.attribute=="createLink"||element.dataset.attribute=="insertImage") {
  			var link = prompt("Please enter the Link here");
  			if(link != null)document.execCommand( element.dataset.attribute, false, link);
  			return;
  		}

      // Children (for the color selects)
  		for(var i=0;i<children.length;i++) {
  			var child = children[i];
  			if(child.tagName.toLowerCase()=="input" && child.getAttribute("type").toLowerCase()=="color") {
  				child.click();
  			}
  		}

      // Execute command
  		document.execCommand( element.dataset.attribute, false);
  	}

    // Apply Listeners to buttons
  	for(let i = 0; i<editorButtons.length;i++) {
  		var children = editorButtons[i].childNodes;

  		for(var c=0;c<children.length;c++) {
  			var child = children[c];

        // Manage inputs (for colors)
  			if(child.tagName.toLowerCase()=="input" && child.getAttribute("type").toLowerCase()=="color") {
  				child.addEventListener('change',function() {
  					var color = this.value;
  					var element = this.parentElement;
  					if(color != null)document.execCommand( element.dataset.attribute, true, color);
  				});
  			}
  		}
  		editorButtons[i].addEventListener('click',function(e) {
        if(event.target.tagName.toLowerCase()=="input")return;
        e.preventDefault();
  			setAttribute(this);
  		}, false);
  	}
  }

  reloadMinEditors();

  setInterval(function() {
    for(let i of toManageEditors) {
      let editor = document.getElementById(i.id);

      if(i.LastTickContent != i.bef.value) {
        getEditorCanvas(editor).innerHTML = i.bef.value;
      }
      else if(i.EditorLastTickContent != getEditorCanvas(editor).innerHTML){
        i.bef.value = getEditorCanvas(editor).innerHTML;
      }
      else continue;

      i.LastTickContent = i.bef.value;
      i.EditorLastTickContent = getEditorCanvas(editor).innerHTML;
    }
  },1);

  (function () {

    function getPosition( el ) {
      var _x = 0;
      var _y = 0;
      var positionInfo = el.getBoundingClientRect();
      var height = positionInfo.height;
      var width = positionInfo.width;
      while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
      }
      return { top: _y, left: _x, width: width, height: height };
    }

    function getAllElementsWithAttribute(attribute){
      var matchingElements = [];
      var allElements = document.getElementsByTagName('*');
      for (var i = 0, n = allElements.length; i < n; i++){
        if (allElements[i].getAttribute(attribute) !== null){
          // Element exists with attribute. Add to array.
          matchingElements.push(allElements[i]);
        }
      }
      return matchingElements;
    }

    let tooltip = document.createElement("div");
    tooltip.id="MinMineEditor_tooltip";
    tooltip.style.display = "none";
    document.body.appendChild(tooltip);

    getAllElementsWithAttribute("tooltip").forEach(function(el) {
      el.addEventListener("mouseenter", function (e) {
        if(this.getAttribute("tooltip")) {
          let position = getPosition(this);
          let tooltip = document.getElementById("MinMineEditor_tooltip");
          tooltip.innerHTML = this.getAttribute("tooltip");
          tooltip.style.top = (position.top + position.height + 3) + "px";
          tooltip.style.left = (position.left + (position.width/2)) + "px";
          tooltip.style.display = null;
        }
        el.addEventListener("mouseleave", function(e) {
        tooltip.style.display = "none";
        })
      });
    });
  }());
}, false);
