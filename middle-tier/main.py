# Imports the Google Cloud client library
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
import tweepy
import csv
import time


from flask import Flask, Response, render_template, url_for, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import requests
import json

consumer_key = "KEY" 
consumer_secret = "SECRET"
access_key = "KEY"
access_secret = "SECRET"
  
def categorize(content):
    # Instantiates a client
    client = language.LanguageServiceClient()

    # The text to analyze
    text = content.encode('utf-8')
    document = types.Document(
        content=text,
        type=enums.Document.Type.PLAIN_TEXT)

    # Detects the sentiment of the text
    try:
        sentiment = client.analyze_sentiment(document=document).document_sentiment
        print(type(sentiment))
        print("{},{}".format(sentiment.score, sentiment.magnitude))
        return sentiment
    except Exception as e:
        print('error {}'.format(e))
        return None

    

# Function to extract tweets 
def get_tweets(type, value): 
        
        if(type=="username"):
            auth = tweepy.OAuthHandler(consumer_key, consumer_secret) 
            auth.set_access_token(access_key, access_secret) 
    
            api = tweepy.API(auth) 
            tweets = api.user_timeline(screen_name=value) 

            r = []
              
            for tweet in tweets:
                jsonObject = {
                    "content": tweet.text,
                    "imgUrl": tweet.user.profile_image_url,
                    "username":tweet.user.screen_name,
                    "date":tweet.created_at
                }

                y = jsonObject
                r.append(y)
            return r

        if(type=="hashtag" or type =="keyword"):
            
            MAX_TWEETS = 50

            auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
            api = tweepy.API(auth)

            r = []

            for tweet in tweepy.Cursor(api.search, q=value, rpp=100).items(MAX_TWEETS):
                jsonObject = {
                    "content": tweet.text,
                    "imgUrl": tweet.user.profile_image_url,
                    "username":tweet.user.screen_name,
                    "date":tweet.created_at
                }

                x = jsonObject
                r.append(x)
            return r


@app.route('/', methods=['GET','POST'])
def hello():
    content = request.form['content']
    searchType = request.form['type']
    
    response = get_tweets(searchType, content)

    resp = []

    for res in response:
        sentiment = categorize(res["content"])
        if sentiment is None:
            continue
        if sentiment.score * sentiment.magnitude <= -0.25:
            print('in')
            resp.append(res)

    return jsonify(resp)

if __name__ == '__main__':
    app.run()