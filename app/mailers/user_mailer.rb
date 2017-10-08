class UserMailer < ActionMailer::Base
  default from: 'notifications@aircast.com'

  require 'mailgun'

  # send a signup email to the user, pass in the user object that   contains the user's email address
  def send_pulse
    mg_client = Mailgun::Client.new 'pubkey-737fae69820e229ec81c1b55896d06ac'
    
    message_params =  { from: 'bob@sending_domain.com',
                    to:   'leolopelofranco@gmail.com',
                    subject: 'The Ruby SDK is awesome!',
                    text:    'It is really easy to send a message!'
                  }
    mg_client.send_message 'aircast-notifications.palmsolutions.co', message_params
    # @user = user
    # Rails.logger.info 'hello'
    # emails = ['leolopelofranco@gmail.com', 'leo@palmsolutions.co']
    #
    # mail(to: user["to"], subject: user["subject"])

  end
end
