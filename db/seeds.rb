# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.delete_all
Ride.delete_all

a = User.create(name:"Whit_Avail", current_lat:"37.779841", current_long:"-122.39491809999998", role: "driver", status:"available")
b = User.create(name:"Whit_UnAvail", current_lat:"37.77821286878486", current_long:"-122.40332950747069", role: "driver", status:"unavailable")
c = User.create(name:"Noah_Avail", current_lat:"37.780858563799116", current_long:"-122.41860737001952", role: "passenger", status:"available")
d = User.create(name:"Noah_UnAvail", current_lat:"37.78085856379926", current_long:"-122.4186073700252", role: "passenger", status:"unavailable")


i = Ride.create(pickup_long:"-122.44041346489257", pickup_lat: "37.793280512583676", dropoff_long:"-122.41921328443886", dropoff_lat:"37.78758293262829")
j = Ride.create(pickup_long:"-122.44041346489444", pickup_lat: "37.793280512583733", dropoff_long:"-122.41921328483856", dropoff_lat:"37.78758293262129")
k = Ride.create(pickup_long:"-122.44041346489557", pickup_lat: "37.793280512583376", dropoff_long:"-122.41921328483876", dropoff_lat:"37.78758293262229")
l = Ride.create(pickup_long:"-122.44041346489657", pickup_lat: "37.793280512583276", dropoff_long:"-122.41921328483896", dropoff_lat:"37.78758293262500")

a.rides << i
#j.users << b
