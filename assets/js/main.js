$(function(){
  $("nav ul>li>a").click(function(e){
    var isMobile = $('.menu-icon').css('display')=='block';
    var hasChildren = $(this).hasClass('has-children');

    if ( hasChildren && isMobile) {
      // has children AND on mobile: show submenu on click
      var thisSubmenu = $(this).siblings('ul')
      var allSubmenus = $("nav ul ul")
      allSubmenus.hide();
      thisSubmenu.show();
      e.preventDefault();
      console.log('prevent')
    }
    // else: 
    // do not intefere
    // allow click to proceed
  })
})