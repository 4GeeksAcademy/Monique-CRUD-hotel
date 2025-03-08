"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Estudiantes, Hoteles
from api.utils import generate_sitemap, APIException
from flask_cors import CORS


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

 
@api.route('/hoteles', methods=['GET'])
def obtener_hoteles():
    hoteles = Hoteles.query.all()  # Obtener todos los hotel
    hoteles_serialize = [hotel.serialize() for hotel in hoteles]  # Serializar cada hotel
    return jsonify(hoteles_serialize), 200  # Retornar los datos serializados como JSON

@api.route("/hoteles/<int:id>", methods=["GET"])
def obtener_hotel_por_id(id):
    hotel = Hoteles.query.get(id)
    
    if not hotel:
        return jsonify({"error": "Hotel no encontrado"}), 404
    
    return jsonify(hotel.serialize()), 200

@api.route('/hoteles', methods=['POST'])
def crear_hoteles():
        data = request.get_json()
        #crear hoteles
        if "password" not in data or not data["password"]:
            return jsonify({"error": "Password is requires"}), 400
        if "email" not in data or not data["email"]:
            return jsonify({"error": "Email is required"}), 400
    
        # Validar que el email contenga "@"
        if "@" not in data["email"]:
            return jsonify({"error": "Email must contain '@'"}), 400
        
        existing_hotel = Hoteles.query.filter_by(nombre=data["nombre"]).first()
        if existing_hotel:
            return jsonify({"error": "Hotel con este nombre ya existe"}), 400
        
        # Verificar si el email ya está registrado
        existing_email = Hoteles.query.filter_by(email=data["email"]).first()
        if existing_email:
            return jsonify({"error": "Email is already in use"}), 400
            
        nuevo_hotel =Hoteles(
            nombre=data["nombre"],
            email=data["email"],
            password=data["password"]
        )
        db.session.add(nuevo_hotel)
        db.session.commit()
    
        return jsonify(nuevo_hotel.serialize()), 200

@api.route("/hoteles/<int:id>", methods=["DELETE"])
def delete_hoteles(id):
    hotel = Hoteles.query.get(id)
    
    if not hotel:
        return jsonify({"error": "Hotel no encontrado"}), 400

    db.session.delete(hotel)
    db.session.commit()

    return jsonify({"message" : "Hotel eliminado"}), 200

@api.route("/hoteles/<int:id>", methods=["PUT"])
def actualizar_hoteles(id):
    hotel = Hoteles.query.get(id)
    
    if not hotel:
        return jsonify({"error": "Hotel no encontrado"}), 400

    data = request.get_json()

    hotel.nombre = data.get("nombre", hotel.nombre)
    hotel.email = data.get("email", hotel.email)
    hotel.password = data.get("password", hotel.password)

    db.session.commit()

    return jsonify(hotel.serialize()), 200

