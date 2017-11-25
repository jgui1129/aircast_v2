class UserMailer < ActionMailer::Base


  require 'mailjet'
  Mailjet.configure do |config|
    config.api_key = '786033b61fb4dc87db3b046cbcaca036'
    config.secret_key = 'e61a7d032b5ef43ef2a733f82d105035'
    config.api_version = "v3.1"
  end

  require "tzinfo"

  def local(time)
    TZInfo::Timezone.get('Asia/Singapore').local_to_utc(Time.parse(time))
  end

  # send a signup email to the user, pass in the user object that   contains the user's email address
  def send_pulse
    require 'rest-client'

    response = RestClient.get 'http://gpdigital.crabdance.com/api/v0/aircast_status.php?location=all'
    response = JSON.parse(response)

    response.each do |d|

      d["last_active"] = Time.zone.parse(d["LastAlive"])
      d["beforetime"] = Time.zone.parse(d["OpenTime"])
      d["aftertime"] = Time.zone.parse(d["CloseTime"])
      now = DateTime.now
      unless now.between?(d["beforetime"], d["aftertime"])
      end
    end

    # variable = Mailjet::Send.create(messages: [{
    #     'From'=> {
    #         'Email'=> 'leo@palmsolutions.co',
    #         'Name'=> 'Leo'
    #     },
    #     'To'=> [
    #         {
    #             'Email'=> 'leo@palmsolutions.co',
    #             'Name'=> 'Leo Lope Lofranco'
    #         }
    #     ],
    #     'Subject'=> 'Aircast Pulse',
    #     'TextPart'=> 'Dear HGS, welcome to Mailjet! May the delivery force be with you!',
    #     'HTMLPart'=> '<h3>Dear passenger 1, welcome to Mailjet!</h3>≷br/>May the delivery force be with you!'
    # }]
    # )
    # p variable.attributes['Messages']
  end

end
