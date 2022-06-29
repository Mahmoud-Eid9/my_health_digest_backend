import json
import boto3


def show_custom_labels(model, image, min_confidence):
    client = boto3.client(
    'rekognition',
    aws_access_key_id="AKIASLISXSXCLAXXR4MG",
    aws_secret_access_key="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",
   region_name="us-east-1"
)
    # Call DetectCustomLabels

    response = client.detect_custom_labels(Image={'Bytes': image.read(
    )}, MinConfidence=min_confidence, ProjectVersionArn=model)

    # for customLabel in response['CustomLabels']:
    #     print('Label ' + str(customLabel['Name']))
    #     print('Confidence ' + str(customLabel['Confidence']))
    data = response['CustomLabels']
    return data
