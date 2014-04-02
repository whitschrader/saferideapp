module ApplicationHelper

  def send_text_message(id, message)

    binding.pry

    receiver = User.find_by_id(id)
    number_to_send_to = "+1#{receiver.phone}"

    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    twilio_phone_number = ENV['TWILIO_PHONE']

    @twilio_client = Twilio::REST::Client.new account_sid, auth_token

    @twilio_client.account.sms.messages.create(
      :from => ENV['TWILIO_PHONE'],
      :to => number_to_send_to,
      :body => message )

  end

end
