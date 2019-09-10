$(function() {

  function buildHTML(message){
    let image = (message.image) ? `<img class = 'message__image', src= "${message.image}">` : ""
    let html = `
              <div class = "message" data-message-id =${message.id}>
                <div class = "message__name">${ message.user_name }</div>
                <div class = "message__date">${ message.updated_at }</div>
                <div class = "message__text">${ message.content }</div>
                  ${ image }
              </div>
              `
    return html;
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
      $("form")[0].reset();
    })
    .fail(function(){
      alert("error");
    })
    .always(function(){
      $('.input__submit').attr('disabled', false);
    })
  })

  let reloadMessages = function() {
    last_message_id = $(".message").last().data("message-id");
    $.ajax({
      url: "api/messages",
      type: "GET",
      dataType: "json",
      data: {id: last_message_id}
    })
    .done(function(messages) {
      let insertHTML = '';
      messages.forEach(function(message){
        insertHTML  = buildHTML(message);
        return insertHTML
      })
      $(".chat-main__chat-list").append(insertHTML);
      $('.chat-main__chat-list').animate({ scrollTop: $('.chat-main__chat-list')[0].scrollHeight });
    })
    .fail(function() {
      console.log('error');
    });
  };
  
  if (document.URL.match("/messages")){
    setInterval(reloadMessages, 5000);
  }

});