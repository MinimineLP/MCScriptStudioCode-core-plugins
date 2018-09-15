'use strict';(function(c){"object"==typeof exports&&"object"==typeof module?c(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],c):c(CodeMirror)})(function(c){c.defineMode("mllike",function(c,e){function f(a,b){var d=a.next();return'"'===d?(b.tokenize=k,b.tokenize(a,b)):"{"===d&&a.eat("|")?(b.longString=!0,b.tokenize=l,b.tokenize(a,b)):"("===d&&a.eat("*")?(b.commentLevel++,b.tokenize=m,b.tokenize(a,b)):"~"===d||"?"===d?(a.eatWhile(/\w/),"variable-2"):
"`"===d?(a.eatWhile(/\w/),"quote"):"/"===d&&e.slashComments&&a.eat("/")?(a.skipToEnd(),"comment"):/\d/.test(d)?("0"===d&&a.eat(/[bB]/)&&a.eatWhile(/[01]/),"0"===d&&a.eat(/[xX]/)&&a.eatWhile(/[0-9a-fA-F]/),"0"===d&&a.eat(/[oO]/)?a.eatWhile(/[0-7]/):(a.eatWhile(/[\d_]/),a.eat(".")&&a.eatWhile(/[\d]/),a.eat(/[eE]/)&&a.eatWhile(/[\d\-+]/)),"number"):/[+\-*&%=<>!?|@\.~:]/.test(d)?"operator":/[\w\xa1-\uffff]/.test(d)?(a.eatWhile(/[\w\xa1-\uffff]/),a=a.current(),g.hasOwnProperty(a)?g[a]:"variable"):null}
function k(a,b){for(var d,c=!1,e=!1;null!=(d=a.next());){if('"'===d&&!e){c=!0;break}e=!e&&"\\"===d}c&&!e&&(b.tokenize=f);return"string"}function m(a,b){for(var d,c;0<b.commentLevel&&null!=(c=a.next());)"("===d&&"*"===c&&b.commentLevel++,"*"===d&&")"===c&&b.commentLevel--,d=c;0>=b.commentLevel&&(b.tokenize=f);return"comment"}function l(a,b){for(var d,c;b.longString&&null!=(c=a.next());)"|"===d&&"}"===c&&(b.longString=!1),d=c;b.longString||(b.tokenize=f);return"string"}var g={as:"keyword","do":"keyword",
"else":"keyword",end:"keyword",exception:"keyword",fun:"keyword",functor:"keyword","if":"keyword","in":"keyword",include:"keyword",let:"keyword",of:"keyword",open:"keyword",rec:"keyword",struct:"keyword",then:"keyword",type:"keyword",val:"keyword","while":"keyword","with":"keyword"};c=e.extraWords||{};for(var h in c)c.hasOwnProperty(h)&&(g[h]=e.extraWords[h]);return{startState:function(){return{tokenize:f,commentLevel:0,longString:!1}},token:function(a,b){return a.eatSpace()?null:b.tokenize(a,b)},
blockCommentStart:"(*",blockCommentEnd:"*)",lineComment:e.slashComments?"//":null}});c.defineMIME("text/x-ocaml",{name:"mllike",extraWords:{and:"keyword",assert:"keyword",begin:"keyword","class":"keyword",constraint:"keyword",done:"keyword",downto:"keyword",external:"keyword","function":"keyword",initializer:"keyword",lazy:"keyword",match:"keyword",method:"keyword",module:"keyword",mutable:"keyword","new":"keyword",nonrec:"keyword",object:"keyword","private":"keyword",sig:"keyword",to:"keyword","try":"keyword",
value:"keyword",virtual:"keyword",when:"keyword",raise:"builtin",failwith:"builtin","true":"builtin","false":"builtin",asr:"builtin",land:"builtin",lor:"builtin",lsl:"builtin",lsr:"builtin",lxor:"builtin",mod:"builtin",or:"builtin",raise_notrace:"builtin",trace:"builtin",exit:"builtin",print_string:"builtin",print_endline:"builtin","int":"type","float":"type",bool:"type","char":"type",string:"type",unit:"type",List:"builtin"}});c.defineMIME("text/x-fsharp",{name:"mllike",extraWords:{"abstract":"keyword",
assert:"keyword",base:"keyword",begin:"keyword","class":"keyword","default":"keyword",delegate:"keyword","do!":"keyword",done:"keyword",downcast:"keyword",downto:"keyword",elif:"keyword",extern:"keyword","finally":"keyword","for":"keyword","function":"keyword",global:"keyword",inherit:"keyword",inline:"keyword","interface":"keyword",internal:"keyword",lazy:"keyword","let!":"keyword",match:"keyword",member:"keyword",module:"keyword",mutable:"keyword",namespace:"keyword","new":"keyword","null":"keyword",
override:"keyword","private":"keyword","public":"keyword","return!":"keyword","return":"keyword",select:"keyword","static":"keyword",to:"keyword","try":"keyword",upcast:"keyword","use!":"keyword",use:"keyword","void":"keyword",when:"keyword","yield!":"keyword",yield:"keyword",atomic:"keyword","break":"keyword",checked:"keyword",component:"keyword","const":"keyword",constraint:"keyword",constructor:"keyword","continue":"keyword",eager:"keyword",event:"keyword",external:"keyword",fixed:"keyword",method:"keyword",
mixin:"keyword",object:"keyword",parallel:"keyword",process:"keyword","protected":"keyword",pure:"keyword",sealed:"keyword",tailcall:"keyword",trait:"keyword",virtual:"keyword","volatile":"keyword",List:"builtin",Seq:"builtin",Map:"builtin",Set:"builtin",Option:"builtin","int":"builtin",string:"builtin",not:"builtin","true":"builtin","false":"builtin",raise:"builtin",failwith:"builtin"},slashComments:!0});c.defineMIME("text/x-sml",{name:"mllike",extraWords:{abstype:"keyword",and:"keyword",andalso:"keyword",
"case":"keyword",datatype:"keyword",fn:"keyword",handle:"keyword",infix:"keyword",infixr:"keyword",local:"keyword",nonfix:"keyword",op:"keyword",orelse:"keyword",raise:"keyword",withtype:"keyword",eqtype:"keyword",sharing:"keyword",sig:"keyword",signature:"keyword",structure:"keyword",where:"keyword","true":"keyword","false":"keyword","int":"builtin",real:"builtin",string:"builtin","char":"builtin",bool:"builtin"},slashComments:!0})});