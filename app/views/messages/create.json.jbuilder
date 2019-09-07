
json.content    @message.content

json.image      @message.image.url
json.user_name  @message.user.name
json.updated_at  @message.updated_at.strftime("%Y/%m/%d %H:%M")