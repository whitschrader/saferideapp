class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :authenticate, :except => ['sign_in', 'create']

  def authenticate
    check_signin
    check_phone if current_user
  end

  def check_signin
    # redirect_to :login unless User.find_by_provider_and_uid(auth["provider"], auth["uid"])
    redirect_to signin_path unless current_user
  end

  def check_phone
    redirect_to phone_path if current_user.phone.nil? 
  end


private

  def current_user
    begin
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    rescue => e
    end
  end

  helper_method :current_user
end


