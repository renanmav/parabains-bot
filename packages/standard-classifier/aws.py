import json
import joblib


def handler(event, context):
    body = json.loads(event['body'])

    print('event decoded', body)

    clf = joblib.load('model.pkl')

    predictions = clf.predict(body['data'])

    return json.dumps({'predictions': predictions})
