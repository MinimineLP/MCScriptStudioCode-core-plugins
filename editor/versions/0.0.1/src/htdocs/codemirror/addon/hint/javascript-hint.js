'use strict';(function(h){"object"==typeof exports&&"object"==typeof module?h(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],h):h(CodeMirror)})(function(h){function m(a,b){for(var k=0,f=a.length;k<f;++k)b(a[k])}function q(a,b,k,f){var c=a.getCursor(),d=k(a,c);if(!/\b(?:string|comment)\b/.test(d.type)){var e=h.innerMode(a.getMode(),d.state);if("json"!==e.mode.helperType){d.state=e.state;/^[\w$_]*$/.test(d.string)?d.end>c.ch&&(d.end=c.ch,d.string=
d.string.slice(0,c.ch-d.start)):d={start:c.ch,end:c.ch,string:"",state:d.state,type:"."==d.string?"property":null};for(e=d;"property"==e.type;){e=k(a,n(c.line,e.start));if("."!=e.string)return;e=k(a,n(c.line,e.start));if(!p)var p=[];p.push(e)}return{list:r(d,p,b,f),from:n(c.line,d.start),to:n(c.line,d.end)}}}}function t(a,b){a=a.getTokenAt(b);b.ch==a.start+1&&"."==a.string.charAt(0)?(a.end=a.start,a.string=".",a.type="property"):/^\.[\w$_]*$/.test(a.string)&&(a.type="property",a.start++,a.string=
a.string.replace(/\./,""));return a}function r(a,b,k,f){function c(a){var b;if(b=0==a.lastIndexOf(h,0)){a:if(Array.prototype.indexOf)b=-1!=e.indexOf(a);else{for(b=e.length;b--;)if(e[b]===a){b=!0;break a}b=!1}b=!b}b&&e.push(a)}function d(a){"string"==typeof a?m(u,c):a instanceof Array?m(v,c):a instanceof Function&&m(w,c);if(Object.getOwnPropertyNames&&Object.getPrototypeOf)for(;a;a=Object.getPrototypeOf(a))Object.getOwnPropertyNames(a).forEach(c);else for(var b in a)c(b)}var e=[],h=a.string,l=f&&f.globalScope||
window;if(b&&b.length){a=b.pop();var g;a.type&&0===a.type.indexOf("variable")?(f&&f.additionalContext&&(g=f.additionalContext[a.string]),f&&!1===f.useGlobalScope||(g=g||l[a.string])):"string"==a.type?g="":"atom"==a.type?g=1:"function"==a.type&&(null==l.jQuery||"$"!=a.string&&"jQuery"!=a.string||"function"!=typeof l.jQuery?null!=l._&&"_"==a.string&&"function"==typeof l._&&(g=l._()):g=l.jQuery());for(;null!=g&&b.length;)g=g[b.pop().string];null!=g&&d(g)}else{for(b=a.state.localVars;b;b=b.next)c(b.name);
for(b=a.state.globalVars;b;b=b.next)c(b.name);f&&!1===f.useGlobalScope||d(l);m(k,c)}return e}var n=h.Pos;h.registerHelper("hint","javascript",function(a,b){return q(a,x,function(a,b){return a.getTokenAt(b)},b)});h.registerHelper("hint","coffeescript",function(a,b){return q(a,y,t,b)});var u="charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search".split(" "),v="length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight ".split(" "),
w=["prototype","apply","call","bind"],x="break case catch class const continue debugger default delete do else export extends false finally for function if in import instanceof new null return super switch this throw true try typeof var void while with yield".split(" "),y="and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes".split(" ")});