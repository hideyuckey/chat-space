require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  config.storage = :fog
  config.fog_provider = 'fog/aws'
  config.fog_credentials = {
    provider: 'AWS',
    AWS_ACCESS_KEY_ID: Rails.application.secrets.aws_access_key_id,
    AWS_SECRET_ACCESS_KEY: Rails.application.secrets.aws_secret_access_key,
    region: 'ap-northeast-1'
  }

  config.fog_directory  = 'hides-bucket'
  config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/hides-bucket'
end