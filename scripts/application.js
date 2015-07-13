function unWrapPlaceholder(){
  $(this).contents().unwrap();
}

$( document ).ready(function() {
  $('[data-includefile]').each(function(){
    var file = $(this).attr("data-includefile")
    $(this).load("includes/"+$(this).attr("data-includefile")+".html", unWrapPlaceholder)
  });
});
