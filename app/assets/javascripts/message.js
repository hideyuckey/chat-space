$(function() {

  function buildHTML(message){
    var html = `<div class = "message">
                  <div class = "message__name">${ message.user_name }</div>
                  <div class = "message__date">${ message.updated_at }</div>
                  <div class = "message__text">${ message.content }</div>
                  ${message.image.persent ? '<img class = "message__image", src = "${ message.image.url }"></img>' : ''}
                </div>`
    return html;
  }


  $("#new_message").on("submit", function(e){
    e.preventDefault();
    let formData = new FormData(this)
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data)
      var html = buildHTML(data);
      $(".chat-main__chat-list").append(html)
      $('.chat-main__chat-list').animate({ scrollTop: $('.chat-main__chat-list')[0].scrollHeight });
      $(".input__text").val('');
    })
    .fail(function(){
      alert("error");
    })
  })
})