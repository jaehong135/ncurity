 $(document).ready(function () {
                // 햄버거 메뉴 및 모바일 메뉴 토글
                const $hamburger = $('.hamburger');
                const $mobileMenu = $('.mobile-menu');
                const $hasSubmenuItems = $('.has-submenu');

                // 햄버거 클릭 시 메뉴 열기/닫기
                $hamburger.on('click', function () {
                    $(this).toggleClass('active');
                    $mobileMenu.toggleClass('active');
                    $('.visual').toggleClass('blur')
                    $('body').toggleClass('fixed')
                });

                // 서브메뉴 토글    
                $hasSubmenuItems.each(function () {
                    const $item = $(this);
                    const $anchor = $item.find('a');
                    const $icon = $anchor.find('img');
                    const $submenu = $item.find('.mobile-submenu');
                    $item.on('click', function (e) {
                        
                        if ($anchor[0].contains(e.target)) {
                            e.preventDefault();

                            $('.mobile-submenu').not($submenu).stop(true, true).slideUp(300);
                            $('.has-submenu img').not($icon).removeClass('rotated');

                            $icon.toggleClass('rotated')
                            $item.find('.mobile-submenu').stop(true, true).slideToggle(300);
                        }
                    });
                });
                if (window.innerWidth <= 768) {
                const $slideList = $('.mo_slide');
                const $slides = $('.mo_slide .slide');
                let currentIndex = 0;
                let startX = 0;
                let moveX = 0;
                let isDragging = false;

                function getSlideOffset(index) {
                  let offset = 0;
                  for (let i = 0; i < index; i++) {
                    offset += $slides.eq(i).outerWidth(true);
                  }
                  return offset;
                }

                function goToSlide(index) {
                  const offset = getSlideOffset(index);
                  $slideList.css('transform', `translateX(-${offset + 25 * index}px)`);
                  $('.pagination-count').text(`${index + 1} / ${$slides.length}`);
                }

                $slideList.on('touchstart', function (e) {
                  startX = e.originalEvent.touches[0].clientX;
                  isDragging = true;
                  moveX = 0;
                });

                $slideList.on('touchmove', function (e) {
                  if (!isDragging) return;
                  const currentX = e.originalEvent.touches[0].clientX;
                  moveX = currentX - startX;
                  const baseOffset = getSlideOffset(currentIndex);
                  $slideList.css('transform', `translateX(${-baseOffset + moveX}px)`);
                });

                $slideList.on('touchend', function () {
                  isDragging = false;
                  const threshold = 50;
                  if (moveX > threshold && currentIndex > 0) {
                    currentIndex--;
                  } else if (moveX < -threshold && currentIndex < $slides.length - 1) {
                    currentIndex++;
                  }
                  goToSlide(currentIndex);
                });

                $(window).on('resize', function () {
                  goToSlide(currentIndex);
                });

                // 첫 로딩 시 위치 초기화
                goToSlide(currentIndex);
              }
            });
