/* fraserky.github.io — shared behaviour
   Theme toggle, scroll progress, section reveal, projects dropdown, project rail. */

(function(){
  'use strict';

  /* ---------- theme ---------- */
  (function(){
    var root = document.documentElement;
    var btn = document.querySelector('.themetoggle');
    if(!btn) return;
    var mq = window.matchMedia('(prefers-color-scheme: dark)');

    function current(){
      var set = root.getAttribute('data-theme');
      return (set === 'dark' || set === 'light') ? set : (mq.matches ? 'dark' : 'light');
    }
    function label(){
      var next = current() === 'dark' ? 'light' : 'dark';
      btn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      btn.setAttribute('aria-pressed', current() === 'dark' ? 'true' : 'false');
    }
    btn.addEventListener('click', function(){
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try{ localStorage.setItem('theme', next); }catch(e){}
      label();
    });
    mq.addEventListener('change', label);
    label();
  })();

  /* ---------- scroll progress ---------- */
  (function(){
    var bar = document.querySelector('.progress');
    if(!bar) return;
    var ticking = false;
    function update(){
      var d = document.documentElement;
      var max = d.scrollHeight - d.clientHeight;
      var p = max > 0 ? d.scrollTop / max : 0;
      bar.style.transform = 'scaleX(' + (p < 0 ? 0 : p > 1 ? 1 : p) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  /* ---------- reveal on scroll ---------- */
  (function(){
    var root = document.documentElement;
    var items = document.querySelectorAll('.reveal');
    if(!root.classList.contains('js-motion') || !items.length) return;

    function showAll(){
      for(var i = 0; i < items.length; i++) items[i].classList.add('shown');
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        // second test catches sections jumped straight past, e.g. an #anchor
        // link or a restored scroll position, which never enter the viewport
        if(e.isIntersecting || e.boundingClientRect.top < 0){
          e.target.classList.add('shown');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });

    Array.prototype.forEach.call(items, function(el){ io.observe(el); });
    setTimeout(showAll, 3000);              // never leave content hidden
    window.addEventListener('beforeprint', showAll);
  })();

  /* ---------- projects dropdown ---------- */
  (function(){
    var dd = document.querySelector('.dropdown');
    if(!dd) return;
    document.addEventListener('click', function(e){
      if(dd.open && !dd.contains(e.target)) dd.open = false;
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && dd.open){ dd.open = false; dd.querySelector('summary').focus(); }
    });
  })();

  /* ---------- project rail ---------- */
  (function(){
    var track = document.querySelector('.track');
    if(!track) return;
    var prev = document.querySelector('.railbtn.prev');
    var next = document.querySelector('.railbtn.next');
    if(!prev || !next) return;

    function step(){
      var card = track.querySelector('.card');
      var gap = parseFloat(getComputedStyle(track).columnGap) || 18;
      return card ? card.getBoundingClientRect().width + gap : 320;
    }
    var rail = track.closest('.rail');
    function sync(){
      var max = track.scrollWidth - track.clientWidth;
      var atEnd = track.scrollLeft >= max - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = atEnd;
      // hide the right-hand fade once there is nothing more to scroll to
      if(rail) rail.classList.toggle('at-end', atEnd || max <= 0);
    }
    prev.addEventListener('click', function(){ track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function(){ track.scrollBy({ left:  step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', function(){ requestAnimationFrame(sync); }, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  })();

})();
