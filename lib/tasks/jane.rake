namespace :jane do
  desc 'email pulse'
  task send_pulse: :environment do
    UserMailer.send_pulse
  end
end
