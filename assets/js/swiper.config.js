var swiper = new Swiper('.swiper-container', {
    //pagination: '.swiper-pagination',
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    //direction: 'vertical',
    coverflow: {
        rotate: 50,
        stretch: 50,
        depth: 50,
        modifier: 1,
        slideShadows: true
    }
});