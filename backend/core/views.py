from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import User, FoodListing, Booking
from .serializers import UserSerializer, FoodListingSerializer, BookingSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class FoodListingViewSet(viewsets.ModelViewSet):
    queryset = FoodListing.objects.all().order_by('-creation_time')
    serializer_class = FoodListingSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['food_type', 'location', 'is_veg', 'status', 'provider']
    search_fields = ['food_type', 'location', 'provider__organization_name']
    ordering_fields = ['expiry_time', 'creation_time', 'prepared_time']

    def perform_create(self, serializer):
        # Override hardcoded creation with real request user
        serializer.save(provider=self.request.user)

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('-timestamp')
    serializer_class = BookingSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'coordinator', 'listing']

    def perform_create(self, serializer):
        # Override hardcoded creation with real request user
        serializer.save(coordinator=self.request.user)
