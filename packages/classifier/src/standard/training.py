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
stopwords = [stopword for stopword in stopwords if stopword != 'meu']

data = pd.read_csv('./data/standard.csv', sep=';')
data.drop('url', axis=1, inplace=True)

X_train, X_test, y_train, y_test = train_test_split(
    data['text'], data['is_birthday'], shuffle=True)

text_clf = Pipeline([
    ('vect', CountVectorizer(stop_words=stopwords)),
    ('tfidf', TfidfTransformer()),
    ('clf-svm', SGDClassifier(loss='hinge', penalty='l2', alpha=1e-2))
])

text_clf = text_clf.fit(X_train, y_train)

predicted = text_clf.predict(X_test)

print(np.mean(predicted == y_test))

joblib.dump(text_clf, './src/standard/model.pkl')
