from flask import Flask, Response, request, jsonify
from flask_pymongo import PyMongo
import cv2

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/mydatabase"
mongo = PyMongo(app)

def generate_frames(rtsp_url):
    cap = cv2.VideoCapture(rtsp_url)
    while True:
        success, frame = cap.read()
        if not success:
            break
        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/overlay', methods=['POST'])
def create_overlay():
    data = request.json
    overlay_id = mongo.db.overlays.insert(data)
    return jsonify(str(overlay_id)), 201

@app.route('/overlay/<overlay_id>', methods=['GET'])
def get_overlay(overlay_id):
    overlay = mongo.db.overlays.find_one_or_404({"_id": overlay_id})
    return jsonify(overlay), 200

@app.route('/overlay/<overlay_id>', methods=['PUT'])
def update_overlay(overlay_id):
    data = request.json
    updated_overlay = mongo.db.overlays.find_one_and_update(
        {"_id": overlay_id},
        {"$set": data},
        return_document=True
    )
    if updated_overlay:
        return jsonify(updated_overlay), 200
    else:
        return jsonify({"message": "Overlay not found"}), 404

@app.route('/overlay/<overlay_id>', methods=['DELETE'])
def delete_overlay(overlay_id):
    result = mongo.db.overlays.delete_one({"_id": overlay_id})
    if result.deleted_count > 0:
        return jsonify({"message": "Overlay deleted"}), 200
    else:
        return jsonify({"message": "Overlay not found"}), 404

@app.route('/livestream')
def livestream():
    rtsp_url = "your_rtsp_url_here"
    return Response(generate_frames(rtsp_url), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(debug=True)
