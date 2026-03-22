from rest_framework import serializers
from .models import User, FoodListing, Booking

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'password', 'organization_name', 'license_number', 'address', 'contact_person', 'id_proof_url']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class FoodListingSerializer(serializers.ModelSerializer):
    provider_name = serializers.ReadOnlyField(source='provider.username')
    provider_org = serializers.ReadOnlyField(source='provider.organization_name')

    class Meta:
        model = FoodListing
        fields = '__all__'
        read_only_fields = ['provider', 'creation_time']

class BookingSerializer(serializers.ModelSerializer):
    listing_details = FoodListingSerializer(source='listing', read_only=True)
    coordinator_name = serializers.ReadOnlyField(source='coordinator.username')

    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['coordinator', 'timestamp']
