$(function() {
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    let formData = new FormData(this)
    href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
  })
})