"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Hoteles, Branches, Maintenance, Administrador
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'tu_clave_secreta'  # Cambia esto por una clave secreta segura
jwt = JWTManager(app)




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

# Obtener todos los branches
@api.route('/branches', methods=['GET'])
def obtener_branches():
    branches = Branches.query.all()  # Obtener todos los branches
    branches_serialize = [branch.serialize() for branch in branches]  # Serializar cada branch
    
    return jsonify(branches_serialize), 200  # Retornar los datos serializados como JSON

# Obtener un branch por ID
@api.route('/branches/<int:id>', methods=['GET'])
def get_branch(id):
    branch = Branches.query.get_or_404(id)
   
    return jsonify(branch.serialize()), 200  # Aquí se añade la respuesta JSON

# Crear un nuevo branch
@api.route('/branches', methods=['POST'])
def crear_branch():
    data = request.get_json()
    nuevo_branch = Branches(
        nombre=data["nombre"],
        direccion=data["direccion"],
        longitud=data["longitud"],
        latitud=data["latitud"],
        hotel_id=data["hotel_id"]
    )
   
    db.session.add(nuevo_branch)
    db.session.commit()
    
    return jsonify(nuevo_branch.serialize()), 201

# Actualizar un branch existente
@api.route('/branches/<int:id>', methods=['PUT'])
def actualizar_branch(id):
    branch = Branches.query.get_or_404(id)
    data = request.get_json()
    branch.nombre = data.get("nombre", branch.nombre)
    branch.direccion = data.get("direccion", branch.direccion)
    branch.longitud = data.get("longitud", branch.longitud)
    branch.latitud = data.get("latitud", branch.latitud)
    branch.hotel_id = data.get("hotel_id", branch.hotel_id)
    
    db.session.commit()
    
    return jsonify(branch.serialize()), 200

# Eliminar un branch
@api.route('/branches/<int:id>', methods=['DELETE'])
def delete_branch(id):
    branch = Branches.query.get_or_404(id)
   
    db.session.delete(branch)
    db.session.commit()
    
    return jsonify({"message": "Branch eliminado"}), 200

# Rutas para Maintenance

# Ruta para obtener todos los trabajadores de mantenimiento
@api.route('/maintenance', methods=['GET'])
def get_maintenance():
    maintenance = Maintenance.query.all()
    
    return jsonify([maint.serialize() for maint in maintenance])

# Ruta para obtener un trabajador de mantenimiento por ID
@api.route('/maintenance/<int:id>', methods=['GET'])
def get_maint(id):
    maint = Maintenance.query.get_or_404(id)
    
    return jsonify(maint.serialize())

# Ruta para crear un nuevo trabajador de mantenimiento
@api.route('/maintenance', methods=['POST'])
def create_maintenance():
    data = request.get_json()
    nuevo_maint = Maintenance(
        nombre=data['nombre'],
        email=data['email'],
        password=data['password'],
        hotel_id=data['hotel_id']
    )
    
    db.session.add(nuevo_maint)
    db.session.commit()
    
    return jsonify(nuevo_maint.serialize()), 201

# Ruta para actualizar un trabajador de mantenimiento
@api.route('/maintenance/<int:id>', methods=['PUT'])
def update_maintenance(id):
    maint = Maintenance.query.get_or_404(id)
    data = request.get_json()
    maint.nombre = data['nombre']
    maint.email = data['email']
    maint.password = data['password']
    maint.hotel_id = data['hotel_id']
   
    db.session.commit()
   
    return jsonify(maint.serialize())

# Ruta para eliminar un trabajador de mantenimiento
@api.route('/maintenance/<int:id>', methods=['DELETE'])
def delete_maintenance(id):
    maint = Maintenance.query.get_or_404(id)
    
    db.session.delete(maint)
    db.session.commit()
    
    return jsonify({"message": "Trabajador de mantenimiento eliminado con éxito"}), 200
 
@api.route("/loginhotel", methods=["POST"])
def loginhotel():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    hotel = Hoteles.query.filter_by(email=email).first()
    
     # Si no se encuentra el hotel
    if hotel is None:
        return jsonify({"msg": "Correo no encontrado"}), 401

    # Verificar la contraseña (deberías usar hashing para contraseñas en producción)
    if password != hotel.password:
        return jsonify({"msg": "Correo o contraseña incorrectos"}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200


@api.route("/signuphotel", methods=["POST"])
def signuphotel():
     # Obtener los datos de la solicitud de registro
    body = request.get_json()

    # Verificar si el correo ya está registrado
    hotel = Hoteles.query.filter_by(email=body["email"]).first()
    
    if hotel:
        return jsonify({"msg": "Ya se encuentra un hotel con ese correo"}), 401

    # Crear un nuevo hotel
    hotel = Hoteles(email=body["email"], password=body["password"], nombre=body["nombre"])
    db.session.add(hotel)
    db.session.commit()

    # Responder con mensaje de éxito
    response_body = {
        "msg": "Hotel creado exitosamente"
    }
    return jsonify(response_body), 200
         
@api.route("/privatehotel", methods=["GET"])
@jwt_required()
def privatehotel():
    current_user = get_jwt_identity() #obtiene la identidad del usuario desde el token
    return jsonify(logget_in_as=current_user), 200

   