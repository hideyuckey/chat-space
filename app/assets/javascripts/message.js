$(function() {

  function buildHTML(message){
    if (message.image == null) {
      let html = `
      <div class = "message">
        <div class = "message__name">${ message.user_name }</div>
        <div class = "message__date">${ message.updated_at }</div>
        <div class = "message__text">${ message.content }</div>
      </div>
      `
      return html;
    }else {
      let html = `
      <div class = "message">
        <div class = "message__name">${ message.user_name }</div>
        <div class = "message__date">${ message.updated_at }</div>
        <div class = "message__text">${ message.content }</div>
        <img class = "message__image", src = "${message.image}">
      </div>
      `
      return html;
    }
  }


  $("#new_message").on("submit", function(e){
    e.preventDefault();
    let formData = new FormData(this)
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $(".chat-main__chat-list").append(html)
      $('.chat-main__chat-list').animate({ scrollTop: $('.chat-main__chat-list')[0].scrollHeight });
      $('.input__submit').attr('disabled', false);
      $(".input__text").val('');
      $(".input__image__hiden").val('');
    })
    .fail(function(){
      alert("error");
      $('.input__submit').attr('disabled', false);
    })
  })
})