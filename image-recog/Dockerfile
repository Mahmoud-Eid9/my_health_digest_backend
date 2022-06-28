FROM python:3.8

COPY requirements.txt ./requirements.txt
COPY index.py ./index.py
COPY analyze.py ./analyze.py

RUN pip install -r requirements.txt

CMD ["python", "./index.py"]