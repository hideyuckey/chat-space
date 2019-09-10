$(function() {

  let search_list = $("#user-search-result");
  function appendUser(user) {
    let html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
    search_list.append(html);
  }
  function appendErrMsgToHTML(msg) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    search_list.append(html);
  }

  let add_list = $("#user-search-add")
  function addGroupUser(user) {
    let userId = $(user).data("user-id")
    let userName = $(user).data("user-name")
    let htmlUser = `
                <div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    add_list.append(htmlUser);
  }

  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
        $(".chat-group-user").on("click", ".user-search-add", function() {
          $(this).parent().remove();
          let user = $(this)
          addGroupUser(user)
          $(".chat-group-user").on("click", ".user-search-remove", function() {
            $(this).parent().remove();
          })
        })
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません")
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  });
  $(".chat-group-user").on("click", ".user-search-remove", function() {
    $(this).parent().remove();
  })
});