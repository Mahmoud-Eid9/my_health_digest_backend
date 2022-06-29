from flask import Flask, request
from analyze import show_custom_labels
import json

app = Flask(__name__)


@app.route('/api/imagerecog/upload', methods=['POST'])
def upload():
    pic = request.files['pic']

    model = 'arn:aws:rekognition:us-east-1:161637438916:project/Food-Calories/version/Food-Calories.2022-06-27T11.15.02/1656321302920'
    min_confidence = 70
    label_count = show_custom_labels(model, pic, min_confidence)
    print("Custom labels detected: " + str(label_count))

    if not pic:
        return 'No photo uploaded', 400

    return json.dumps(label_count[0]), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3002, debug=True)
