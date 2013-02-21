var prefix = (window.location.href.search(/file:\/\//i) > -1 ? "http://" : "//");

if ("undefined" == typeof jQuery){
    jQueryElement = document.createElement('script');
    jQueryElement.src = prefix + "ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
    document.body.appendChild(jQueryElement)
}

if ("undefined" == typeof soundManager){
    soundManagerElement = document.createElement('script');
    soundManagerElement.src = prefix + "192.168.1.189/js/soundmanager2.js";
    document.body.appendChild(soundManagerElement)
}


var saySelectionElement = document.createElement('script');
saySelectionElement.innerHTML = 'soundManager.setup({preferFlash:!1});$(function(){var a=function(){var b;window.getSelection?b=window.getSelection():document.selection&&(b=document.selection.createRange());if(""!==b.toString()){document.body.style.cursor="wait";soundManager.stopAll();var a="s"+(new Date).getTime()+"-"+Math.floor(1E5*Math.random());soundManager.createSound({id:a,autoLoad:!0,url:"http://tts-api.com/tts.mp3?q="+encodeURIComponent(b.toString()),onload:function(){document.body.style.cursor="inherit"},stream:!0});soundManager.play(a)}};$(document.body).on("mouseup",a);$(document.body).on("keyup",a)});';

var pollSoundManager = setInterval(function(){
  if("undefined" != typeof soundManager){
     soundManager.reboot();
     document.body.appendChild(saySelectionElement);
     clearTimeout(pollSoundManager);    
  }
}, 500);
