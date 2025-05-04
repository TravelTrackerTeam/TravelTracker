import os
import certifi
from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import mongo, jwt, bcrypt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)


    uri = app.config["MONGO_URI"]
    if "tlsCAFile" not in uri:
        uri = (
            uri
            + ("?" if "?" not in uri else "&")
            + f"tls=true&tlsCAFile={certifi.where()}"
        )
        app.config["MONGO_URI"] = uri

    
    mongo.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)

    CORS(
        app,
        supports_credentials=True,
        resources={r"/*": {
            "origins": [
                "http://127.0.0.1:5173",
                "http://localhost:5173"
            ],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "expose_headers": ["Content-Type", "Authorization"],
        }},
    )


    from auth import auth_bp
    from trips import trip_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(trip_bp)

    return app

if __name__ == "__main__":

    port = int(os.environ.get("PORT", 5001))
    app = create_app()

    app.run(debug=True, host="0.0.0.0", port=port)





























