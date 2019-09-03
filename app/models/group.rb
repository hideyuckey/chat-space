class Group < ApplicationRecord
  has_many :groupusers
  hasmany :users, through: :group_users
  varidates :name, presence: true, unique: true
end
