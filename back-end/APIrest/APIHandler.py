from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Caminho do arquivo onde serão salvos os usuários
USERS_FILE = 'back-end/Data-banc/users.json'

# Garante que o arquivo exista
if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, 'w') as f:
        json.dump([], f)

@app.route('/api/cadastrar', methods=['POST'])
def cadastrar_usuario():
    
    data = request.json
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')
    cargo = data.get('cargo')

    if not nome or not email or not senha or not cargo:
        return jsonify({'erro': 'Preencha todos os campos'}), 400

    # Carrega os usuários existentes
    with open(USERS_FILE, 'r') as f:
        usuarios = json.load(f)

    # Verifica se email já existe
    if any(user['email'] == email for user in usuarios):
        return jsonify({'erro': 'Email já cadastrado'}), 409

    # Adiciona novo usuário
    novo_usuario = {'nome': nome, 'email': email, 'senha': senha, 'cargo': cargo}
    usuarios.append(novo_usuario)

    with open(USERS_FILE, 'w') as f:
        json.dump(usuarios, f, indent=4)

    return jsonify({'mensagem': 'Usuário cadastrado com sucesso!'}), 201
'''
assim está comentado?
'''

@app.route('/api/login', methods=['POST'])
def login_usuario():
    data = request.json
    email = data.get('email')
    senha = data.get('senha')

    if not email or not senha:
        return jsonify({'erro': 'Preencha todos os campos'}), 400

    with open(USERS_FILE, 'r') as f:
        usuarios = json.load(f)

    # Busca o usuário com o email e senha fornecidos
    for usuario in usuarios:
        if usuario['email'] == email and usuario['senha'] == senha:
            return jsonify({
                'mensagem': 'Login bem-sucedido!',
                'usuario': {
                    'nome': usuario['nome'],
                    'email': usuario['email'],
                    'cargo': usuario['cargo']
                }
            }), 200

    return jsonify({'erro': 'Credenciais inválidas'}), 401


if __name__ == '__main__':
    app.run(debug=True)
