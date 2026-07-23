from django.core.management.base import BaseCommand
from pets.models import Pet


SAMPLE_PETS = [
    dict(name="Bella", species="dog", breed="Labrador Retriever", age=14, gender="female",
         size="large", color="Golden", vaccinated=True, neutered=True, location="Lahore, PK",
         image_url="https://images.unsplash.com/photo-1552053831-71594a27632d?w=600",
         description="Bella is a playful, affectionate lab who loves long walks and belly rubs."),
    dict(name="Max", species="dog", breed="German Shepherd", age=24, gender="male",
         size="large", color="Black & Tan", vaccinated=True, neutered=True, location="Islamabad, PK",
         image_url="https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600",
         description="Max is loyal, intelligent, and great with kids. Looking for an active family."),
    dict(name="Luna", species="cat", breed="Persian", age=8, gender="female",
         size="small", color="White", vaccinated=True, neutered=False, location="Karachi, PK",
         image_url="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600",
         description="Luna is a calm lap cat who enjoys sunny windowsills and gentle brushing."),
    dict(name="Simba", species="cat", breed="Domestic Shorthair", age=6, gender="male",
         size="small", color="Orange Tabby", vaccinated=True, neutered=True, location="Lahore, PK",
         image_url="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600",
         description="Simba is a curious kitten full of energy, perfect for a playful household."),
    dict(name="Charlie", species="rabbit", breed="Holland Lop", age=10, gender="male",
         size="small", color="Brown & White", vaccinated=False, neutered=False, location="Rawalpindi, PK",
         image_url="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600",
         description="Charlie is a gentle bunny who loves fresh veggies and quiet cuddle time."),
    dict(name="Coco", species="bird", breed="Cockatiel", age=12, gender="female",
         size="small", color="Grey & Yellow", vaccinated=False, neutered=False, location="Faisalabad, PK",
         image_url="https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600",
         description="Coco loves to whistle tunes and is very social once she knows you."),
    dict(name="Rocky", species="dog", breed="Bulldog", age=30, gender="male",
         size="medium", color="Fawn", vaccinated=True, neutered=True, location="Hazro, PK", status="pending",
         image_url="https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=600",
         description="Rocky is a laid-back bulldog who enjoys short walks and long naps."),
    dict(name="Daisy", species="cat", breed="Siamese", age=18, gender="female",
         size="medium", color="Cream & Brown", vaccinated=True, neutered=True, location="Multan, PK", status="adopted",
         image_url="https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600",
         description="Daisy is talkative, elegant, and already found her forever home!"),
]


class Command(BaseCommand):
    help = "Seed the database with sample pets for the adoption app"

    def handle(self, *args, **options):
        created = 0
        for data in SAMPLE_PETS:
            _, was_created = Pet.objects.get_or_create(name=data["name"], species=data["species"], defaults=data)
            if was_created:
                created += 1
        self.stdout.write(self.style.SUCCESS(f"Seeded database. {created} new pets created."))
