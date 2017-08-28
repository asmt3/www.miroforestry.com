$(function(){
  $("nav ul>li>a").click(function(e){
    var isMobile = $('.menu-icon').css('display')=='block';
    var noChildren = $(this).hasClass('no-children');

    if (noChildren || !isMobile) {
      // do not intefere
      // allow click to proceed
    } else {
      // has children AND on mobile: show submenu on click
      var thisSubmenu = $(this).siblings('ul')
      var allSubmenus = $("nav ul ul")
      allSubmenus.hide();
      thisSubmenu.show();
      e.preventDefault();
    }
  })
})