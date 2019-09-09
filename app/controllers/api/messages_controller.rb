class Api::MessagesController < ApplicationController

  def index
    group = Group.find(params[])
    last_message_id = params[:id].to_i
    @messages = group.messages.includes(:user).where("id > #{last_message_id}")
  end

end