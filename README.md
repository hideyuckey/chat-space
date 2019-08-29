### chat-space DB設計

---

## usersテーブル

|column|type|options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|

## Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: :groups_users

---

## groupsテーブル

|column|type|options|
|------|----|-------|
|name|string|null: false|

## Association
- has_many :messages
- has_many :groups_users
- has_many :users, through: :groups_users

---

## messagesテーブル

|column|type|options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

## Association
- belongs_to :user
- belongs_to :group

---

## groups_users

|column|type|options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

## Asspciation
- belongs_to :group
- belongs_to :user