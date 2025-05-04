
from app import create_app

app = create_app()

if __name__ == "__main__":
    print("✅ MONGO_URI:", app.config.get("MONGO_URI"))  # Optional debug
    app.run()


