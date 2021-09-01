#takes our python code for the Room model and translate it into a JSON response
from rest_framework import serializers
from .models import Room


#this is a reponse
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        #id is the primary key for every model
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')

#were going to send a POST request to the endpoint we set up here
#with this we want to make sure that the data being send in our post request is valid and it meets the fields we need to create a Room
#this is a request
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip')

class UpdateRoomSerializer(serializers.ModelSerializer):
    #before when creating a room we are given a unique code
    #however with updating a room, we would get an error if we dont enter a unique code
    #so here we are redefining it so we dont get an error when updating a room
    code = serializers.CharField(validators=[])

    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip', 'code')