from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


PRODUCTS = [
    {"id": 1, "name": "Banana (6 pcs)", "category": "Fruits & Veggies", "image": "https://placehold.co/200x200?text=Banana", "weight": "6 pcs", "price": 40, "originalPrice": 50, "discount": 20, "inStock": True},
    {"id": 2, "name": "Tomato (1 kg)", "category": "Fruits & Veggies", "image": "https://placehold.co/200x200?text=Tomato", "weight": "1 kg", "price": 35, "originalPrice": 45, "discount": 22, "inStock": True},
    {"id": 3, "name": "Whole Milk (1 L)", "category": "Dairy", "image": "https://placehold.co/200x200?text=Milk", "weight": "1 L", "price": 50, "originalPrice": 60, "discount": 16, "inStock": True},
    {"id": 4, "name": "Cheddar Cheese (200 g)", "category": "Dairy", "image": "https://placehold.co/200x200?text=Cheese", "weight": "200 g", "price": 150, "originalPrice": 180, "discount": 16, "inStock": True},
    {"id": 5, "name": "Potato Chips (Pack)", "category": "Snacks", "image": "https://placehold.co/200x200?text=Chips", "weight": "150 g", "price": 30, "originalPrice": 40, "discount": 25, "inStock": True},
    {"id": 6, "name": "Orange Juice (500 ml)", "category": "Beverages", "image": "https://placehold.co/200x200?text=Juice", "weight": "500 ml", "price": 80, "originalPrice": 100, "discount": 20, "inStock": True},
    {"id": 7, "name": "Brown Bread (400 g)", "category": "Bakery", "image": "https://placehold.co/200x200?text=Bread", "weight": "400 g", "price": 45, "originalPrice": 55, "discount": 18, "inStock": True},
    {"id": 8, "name": "Frozen Peas (500 g)", "category": "Frozen", "image": "https://placehold.co/200x200?text=Peas", "weight": "500 g", "price": 70, "originalPrice": 90, "discount": 22, "inStock": True},
    {"id": 9, "name": "Dishwash Liquid (500 ml)", "category": "Cleaning", "image": "https://placehold.co/200x200?text=Dishwash", "weight": "500 ml", "price": 120, "originalPrice": 150, "discount": 20, "inStock": True},
    {"id": 10, "name": "Toothpaste (100 g)", "category": "Personal Care", "image": "https://placehold.co/200x200?text=Toothpaste", "weight": "100 g", "price": 75, "originalPrice": 90, "discount": 16, "inStock": True},
    {"id": 11, "name": "Instant Noodles (Pack)", "category": "Snacks", "image": "https://placehold.co/200x200?text=Noodles", "weight": "70 g", "price": 20, "originalPrice": 25, "discount": 20, "inStock": True},
    {"id": 12, "name": "Yogurt (400 g)", "category": "Dairy", "image": "https://placehold.co/200x200?text=Yogurt", "weight": "400 g", "price": 60, "originalPrice": 75, "discount": 20, "inStock": True},
]


@app.get("/")
async def root():
    return {"message": "Zepto-style API running"}


@app.get("/products")
async def get_products(category: str = None, q: str = None):
    results = PRODUCTS
    if category:
        results = [p for p in results if p["category"] == category]
    if q:
        qlow = q.lower()
        results = [p for p in results if qlow in p["name"].lower()]
    return {"products": results}