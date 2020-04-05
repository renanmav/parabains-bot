import nltk
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.linear_model import SGDClassifier
from sklearn.pipeline import Pipeline
from sklearn.externals import joblib

nltk.download('stopwords')
stopwords = nltk.corpus.stopwords.words('portuguese')
stopwords = list(filter(lambda w: w != 'não' and w != 'meu', stopwords))

data = pd.read_csv('standard.csv', sep=';')
data.drop('url', axis=1, inplace=True)

X_train, X_test, y_train, y_test = train_test_split(
    data['text'], data['is_birthday'], shuffle=True)

# Add GridSearch here to improve hyperparameter tuning
text_clf = Pipeline([
    ('vect', CountVectorizer(stop_words=stopwords)),
    ('tfidf', TfidfTransformer()),
    ('clf-svm', SGDClassifier(loss='hinge', penalty='l2', alpha=1e-3))
])

text_clf = text_clf.fit(X_train, y_train)

predicted = text_clf.predict(X_test)

print(np.mean(predicted == y_test))

joblib.dump(text_clf, 'model.pkl')
