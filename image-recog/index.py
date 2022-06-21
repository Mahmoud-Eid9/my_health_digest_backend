from fileinput import filename
import os
from flask import Flask, request
from werkzeug.utils import secure_filename

app = Flask(__name__)

@app.route('/api/imagerecog/upload', methods=['POST'])
def upload():
    pic = request.files['pic']
    if not pic:
        return 'No pic uploaded', 400
    filename = secure_filename(pic.filename)
    pic.save(os.path.join(os.path.abspath(__file__).replace("\\index.py", "\\images").replace("/index.py","/images"), pic.filename))

    return 'Image has been uploaded', 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3002, debug=True)
