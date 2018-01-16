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
    }
    // else: 
    // do not intefere
    // allow click to proceed
  })

  $("#contact-form").submit(handleContactForm);


})


var validateContactForm = function() {
  var name = $("#contact-name").val().trim()
  var email = $("#contact-email").val().trim()
  var subject = $("#contact-subject").val()
  var comments = $("#contact-comments").val().trim()

  // validate
  var msgs = [];

  if (!name) msgs.push("Please enter your name.");
  if (!comments) msgs.push("Please enter your comments.");
  if (!email && subject != 'complaint') msgs.push("Please enter your email address");

  if (msgs.length) {
    alert("There were errors with your submission\n\n" + msgs.join("\n"));
    return false;
  }

  // allow opportunity to add email address if complaint
  if (!email && subject == 'complaint') {
    var no_email_ok = confirm("You are registering a complaint, are you sure you do not want to leave us your email address?");
    if (!no_email_ok) return false;
  }

  // all went well, return data
  return {
    name: name,
    email: email,
    subject: subject,
    comments: comments,
  }

}

var handleContactForm = function() {

  var submissionURL = "https://y53v3i5o2f.execute-api.eu-west-1.amazonaws.com/prod/submit";

  var params = validateContactForm();

  // did it validate, cancel if not
  if (params === false) return false;

  $("#contact-spinner").show();
  $("#contact-submit").hide();

  $.ajax({
    type: "POST",
    url: submissionURL,
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(params),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
      console.log(data);
      alert("Thank you for your submission. We will be in touch as soon as possible.")
      window.location.reload()
    },
    failure: function(errMsg) {
        alert("There was an error with your submission. Please contact us by phone.");
        $("#contact-spinner").hide();
        $("#contact-submit").show();
    }
  });

  return false; // cancels submit event

}




