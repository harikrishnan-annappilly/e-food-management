from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('provider', 'Provider'),
        ('coordinator', 'Coordinator'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='coordinator')
    organization_name = models.CharField(max_length=255, blank=True, null=True)
    license_number = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    contact_person = models.CharField(max_length=255, blank=True, null=True)
    id_proof_url = models.URLField(blank=True, null=True)

class FoodListing(models.Model):
    provider = models.ForeignKey(User, on_delete=models.CASCADE, related_name='listings')
    food_type = models.CharField(max_length=255)
    is_veg = models.BooleanField(default=True)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    quantity_unit = models.CharField(max_length=50, default='servings')
    location = models.CharField(max_length=255)
    prepared_time = models.DateTimeField(null=True, blank=True)
    expiry_time = models.DateTimeField()
    creation_time = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='active')

    def __str__(self):
        return f"{self.food_type} by {self.provider.username}"

class Booking(models.Model):
    STATUS_CHOICES = (
        ('pending_pickup', 'Pending Pickup'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    listing = models.ForeignKey(FoodListing, on_delete=models.CASCADE, related_name='bookings')
    coordinator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending_pickup')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.id} for {self.listing.food_type}"
