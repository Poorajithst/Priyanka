(function() {
    "use strict";
  
    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
  
    /**
     * Sticky header on scroll
     */
    const selectHeader = document.querySelector('#header');
    if (selectHeader) {
      let headerOffset = selectHeader.offsetTop;
      let nextScroll = 0;
      const headerFixed = () => {
        if (selectHeader.classList.contains("sticky-top")) {
          if (window.scrollY > headerOffset) {
            selectHeader.classList.add('fixed-top');
          } else {
            selectHeader.classList.remove('fixed-top');
          }
        } else {
          if (window.scrollY > headerOffset) {
            selectHeader.classList.add('header-scrolled');
          } else {
            selectHeader.classList.remove('header-scrolled');
          }
        }
        nextScroll = window.scrollY;
      }
      window.addEventListener('load', headerFixed);
      document.addEventListener('scroll', headerFixed);
    }
    
     /**
     * Scroll top button
     */
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
      const togglescrollTop = function() {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
      window.addEventListener('load', togglescrollTop)
      document.addEventListener('scroll', togglescrollTop)
      scrollTop.addEventListener('click', window.scrollTo({
        top: 0,
        behavior: 'smooth'
      }))
    }
    
    /**
     * Mobile nav toggle
     */
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navmenu = document.querySelector('.navmenu');
  
    mobileNavToggle.addEventListener('click', function() {
      if(navmenu.style.display == 'block'){
        navmenu.style.display = 'none';
         document.querySelector('body').classList.remove('mobile-nav-active');
      }else{
        navmenu.style.display = 'block';
        document.querySelector('body').classList.add('mobile-nav-active');
      }
    });
  
    document.addEventListener('click', (e) => {
      if (!e.target.classList.contains('mobile-nav-toggle') && !e.target.closest('.navmenu') && document.querySelector('body').classList.contains('mobile-nav-active')) {
        navmenu.style.display = 'none';
         document.querySelector('body').classList.remove('mobile-nav-active');
      }
    })
     
      
     /**
     * Init aos
     */
    function aos_init() {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
    window.addEventListener('load', () => {
        aos_init();
    });
    
     /**
     * Init swiper
     */
    const swipers = document.querySelectorAll('.init-swiper');
  
    swipers.forEach(swiperEl => {
      const config = JSON.parse(swiperEl.querySelector('.swiper-config').textContent);
      new Swiper(swiperEl, config);
    });
  
     /**
      * Initiate GLightbox
      */
    const glightbox = GLightbox({
        selector: '.glightbox'
    });
  
    /**
       * Initiate Isotope
       */
    const isotopeLayout = document.querySelectorAll('.isotope-layout');
    isotopeLayout.forEach(iso => {
        let defaultFilter = iso.dataset.defaultFilter;
        let layout = iso.dataset.layout;
        let sort = iso.dataset.sort;
  
        let isotopeContainer = iso.querySelector('.isotope-container')
        let filters = iso.querySelector('.isotope-filters')
  
        if (isotopeContainer) {
            let iso = new Isotope(isotopeContainer, {
                itemSelector: '.isotope-item',
                layoutMode: layout,
                filter: defaultFilter,
                sortBy: sort
            });
  
            if(filters) {
                filters.addEventListener('click', (event) => {
                    if (event.target.classList.contains('filter-active')) {
                        return;
                    }
                    let filterValue = event.target.dataset.filter
                    iso.arrange({filter: filterValue})
  
                    filters.querySelectorAll('li').forEach(li => {
                        li.classList.remove('filter-active')
                    });
                    event.target.classList.add('filter-active');
  
                })
            }
        }
    });
        
    
    /**
     * Project Section Looping scroll
     */
      
       const projectContainer = document.querySelector('.project-container');
        if (projectContainer) {
      const projectWrapper = projectContainer.querySelector('.project-wrapper');
      let scrollSpeed = 2;
      let initialScrollPos = 0;
  
      function loopScroll() {
            if(!projectWrapper){
                return;
            }
          if (projectContainer.scrollLeft >= projectWrapper.scrollWidth - projectContainer.offsetWidth) {
             projectContainer.scrollLeft = 0;
          }
        projectContainer.scrollLeft += scrollSpeed;
        requestAnimationFrame(loopScroll);
      }
            
      projectContainer.addEventListener('mouseenter', () => {
        scrollSpeed = 0.5;
      });
  
      projectContainer.addEventListener('mouseleave', () => {
        scrollSpeed = 2;
      });
    
      
          
            
      
      loopScroll();
    }
      
  })();