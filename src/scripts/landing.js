(function(){
  var btn=document.getElementById('wa-btn'),panel=document.getElementById('wa-panel'),close=document.getElementById('wa-close');
  function set(open){panel.hidden=!open;btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Cerrar WhatsApp':'Abrir WhatsApp');btn.querySelector('use').setAttribute('href',open?'#i-x':'#i-message');}
  btn.addEventListener('click',function(){set(panel.hidden)});
  close.addEventListener('click',function(){set(false);btn.focus()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden){set(false);btn.focus()}});
  var top=document.getElementById('to-top');
  function syncTop(){top.hidden=window.scrollY<400}
  window.addEventListener('scroll',syncTop,{passive:true});syncTop();
  top.addEventListener('click',function(){document.querySelector('.brand').focus({preventScroll:true})});
  var bar=document.querySelector('.topbar');
  function syncBar(){bar.classList.toggle('scrolled',window.scrollY>8)}
  window.addEventListener('scroll',syncBar,{passive:true});syncBar();

  var lb=document.getElementById('lb'),stage=document.getElementById('lb-stage'),img=document.getElementById('lb-img'),level=document.getElementById('lb-level'),out=document.getElementById('lb-out'),inn=document.getElementById('lb-in');
  var zoom=1,MAX=4,moved=false;
  function fitWidth(){var r=stage.getBoundingClientRect(),w=r.width-32,h=r.height-32;return Math.min(img.naturalWidth,Math.min(w/img.naturalWidth,h/img.naturalHeight)*img.naturalWidth)}
  function render(cx,cy){
    var prevW=img.getBoundingClientRect().width||1,sl=stage.scrollLeft,st=stage.scrollTop;
    img.style.width=Math.round(fitWidth()*zoom)+'px';
    stage.classList.toggle('zoomed',zoom>1);
    level.textContent=Math.round(zoom*100)+'%';out.disabled=zoom<=1;inn.disabled=zoom>=MAX;
    if(cx!==undefined){var k=img.getBoundingClientRect().width/prevW;stage.scrollLeft=(sl+cx)*k-cx;stage.scrollTop=(st+cy)*k-cy}
    img.style.cursor=zoom>=MAX?'zoom-out':'';
  }
  function setZoom(z,cx,cy){zoom=Math.max(1,Math.min(MAX,z));render(cx===undefined?stage.clientWidth/2:cx,cy===undefined?stage.clientHeight/2:cy)}
  document.querySelectorAll('.js-zoom').forEach(function(a){a.addEventListener('click',function(e){
    e.preventDefault();
    document.getElementById('lb-caption').textContent=a.getAttribute('data-caption')||'';
    img.alt=a.getAttribute('data-caption')||'';
    zoom=1;img.style.width='';
    img.onload=function(){render();stage.scrollTop=0;stage.scrollLeft=0};
    img.src=a.getAttribute('href');
    lb.showModal();
    if(img.complete&&img.naturalWidth)img.onload();
  })});
  inn.addEventListener('click',function(){setZoom(zoom*1.5)});
  out.addEventListener('click',function(){setZoom(zoom/1.5)});
  level.addEventListener('click',function(){zoom=1;render()});
  document.getElementById('lb-close').addEventListener('click',function(){lb.close()});
  stage.addEventListener('click',function(e){if(e.target===stage)lb.close()});
  img.addEventListener('click',function(e){
    if(moved)return;
    var r=stage.getBoundingClientRect();
    if(zoom>=MAX){zoom=1;render()}else setZoom(zoom===1?2:zoom*1.5,e.clientX-r.left,e.clientY-r.top);
  });
  var drag=null;
  img.addEventListener('pointerdown',function(e){moved=false;if(zoom>1&&e.pointerType==='mouse'){drag={x:e.clientX,y:e.clientY,l:stage.scrollLeft,t:stage.scrollTop};img.setPointerCapture(e.pointerId)}});
  img.addEventListener('pointermove',function(e){if(!drag)return;var dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>4){moved=true;stage.classList.add('dragging')}stage.scrollLeft=drag.l-dx;stage.scrollTop=drag.t-dy});
  function endDrag(){drag=null;stage.classList.remove('dragging')}
  img.addEventListener('pointerup',endDrag);img.addEventListener('pointercancel',endDrag);
  window.addEventListener('resize',function(){if(lb.open)render()});
})();
