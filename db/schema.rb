# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140326005450) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "connections", force: true do |t|
    t.integer  "user_id"
    t.integer  "ride_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "connections", ["ride_id"], name: "index_connections_on_ride_id", using: :btree
  add_index "connections", ["user_id"], name: "index_connections_on_user_id", using: :btree

  create_table "rides", force: true do |t|
    t.float    "pickup_lat"
    t.float    "pickup_long"
    t.boolean  "started",      default: false
    t.boolean  "canceled",     default: false
    t.boolean  "completed",    default: false
    t.boolean  "confirmed",    default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "dropoff_lat"
    t.float    "dropoff_long"
  end

  create_table "users", force: true do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.integer  "phone",            limit: 8
    t.float    "current_lat"
    t.float    "current_long"
    t.string   "status"
    t.string   "role"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image"
  end

end
