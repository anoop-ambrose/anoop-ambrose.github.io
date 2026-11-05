document.addEventListener('DOMContentLoaded',()=>{
  const menuButton=document.getElementById('menuToggle');
  const nav=document.getElementById('navLinks');
  if(menuButton&&nav){
    menuButton.addEventListener('click',()=>{
      const open=menuButton.getAttribute('aria-expanded')!=='true';
      menuButton.setAttribute('aria-expanded',String(open));
      menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');
      nav.classList.toggle('open',open);
    });
    nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded','false');
      menuButton.setAttribute('aria-label','Open navigation');
    }));
  }
  const progress=document.getElementById('progressBar');
  const updateProgress=()=>{
    if(!progress)return;
    const total=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.width=(total>0?Math.min(100,window.scrollY/total*100):0)+'%';
  };
  updateProgress();
  window.addEventListener('scroll',updateProgress,{passive:true});
  window.addEventListener('resize',updateProgress);
  const revealItems=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const observer=new IntersectionObserver((entries,obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target);}
      });
    },{threshold:.12,rootMargin:'0px 0px -35px 0px'});
    revealItems.forEach(item=>observer.observe(item));
  }else{revealItems.forEach(item=>item.classList.add('visible'));}
  const sections=document.querySelectorAll('main section[id]');
  const links=nav?nav.querySelectorAll('a[href^="#"]'):[];
  if('IntersectionObserver' in window&&links.length){
    const sectionObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id));
      });
    },{rootMargin:'-35% 0px -55% 0px'});
    sections.forEach(section=>sectionObserver.observe(section));
  }
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click',event=>{
      const target=document.querySelector(anchor.getAttribute('href'));
      if(!target)return;
      event.preventDefault();
      target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    });
  });
  const year=document.getElementById('year');
  if(year)year.textContent=new Date().getFullYear();
});