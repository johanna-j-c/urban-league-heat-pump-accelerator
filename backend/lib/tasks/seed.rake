# frozen_string_literal: true

require 'open-uri'

namespace :seed do
  desc 'Download City of Boston dataset'
  task download: :environment do
    target_dir = 'lib/seeds/download'
    Dir.mkdir(target_dir) unless Dir.exist?(target_dir)
    local_csv = "#{target_dir}/boston_fy2022_pa.csv"
    unless File.exist?(local_csv)
      remote_path = 'https://data.boston.gov/dataset/e02c44d2-3c64-459c-8fe2-e1ce5f38a035/resource/4b99718b-d064-471b-9b24-517ae5effecc/download/fy2022pa-4.csv'
      URI.parse(remote_path).open do |input|
        File.open(local_csv, 'wb') do |output|
          output.write(input.read)
        end
      end
    end
  end

  desc 'Import test seed data (1000 record subset)'
  task test: :environment do
    puts "Environment Check: Rails Environment = #{Rails.env}"
    Rake::Task['db:seed'].invoke
  end

  desc 'Import full Boston dataset'
  task full: :environment do
  end
end