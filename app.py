from flask import Flask, render_template, request
import requests
import numpy as np

# Thu vien cho data reprocessing
import nltk
import re
from nltk.corpus import stopwords
from bs4 import BeautifulSoup
from nltk.stem import WordNetLemmatizer

from tensorflow.keras.models import load_model
from tensorflow.keras.layers import Embedding
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.preprocessing.text import one_hot

nltk.download('stopwords')
nltk.download('wordnet')

app = Flask(__name__)
model = load_model('my_model.h5')
lemmatizer = WordNetLemmatizer()

@app.route('/',methods=['GET'])
def home():
    return render_template('home.html', show_predictions_modal=True)


@app.route("/predict", methods=['POST'])
def predict():
    if request.method == 'POST':
        text = request.form['review']

        corpus = []
        #review = BeautifulSoup(text)
        review = re.sub('[^a-zA-Z]', ' ', text)
        review = review.lower()
        review = review.split()

        review = [lemmatizer.lemmatize(word) for word in review if not word in stopwords.words('english')]
        review = ' '.join(review)
        corpus.append(review)
        print(corpus)

        # Vocabulary size
        voc_size = 10000
        onehot_repr = [one_hot(words, voc_size) for words in corpus]

        sent_length = 1450
        embedded_docs = pad_sequences(onehot_repr, padding='pre', maxlen=sent_length)

        pred = model.predict(embedded_docs)[0][0]
        print(pred)
        if pred >= 0.5:
            return render_template('home.html', result='Positive')
        else:
            return render_template('home.html', result='Negative')
    else:
        return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)
