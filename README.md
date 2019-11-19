# NoticeMe.AI
## Inspiration
Billions of people use social media every day. It is used for anything and everything, including the voicing of opinions and emotions, both good and bad. Many cries for help also go unnoticed. With NoticeMe.AI these people can be heard.
—
## What it does
NoticeMe.AI allows users to easily retrieve and monitor specific tweets with the click of a button. Tweets that are deemed by the system to have a negative sentiment are displayed to the user. This can allow users to detect troubled individuals and cries for help that otherwise go unnoticed.
## How we built it
We made heavy use of the Google Cloud Platform, both for Firebase and Google Cloud's Sentiment Analysis API. Flask was used for the middle-tier and React was used for the front-end. Additionally Twitter's Tweepy API was used. Lastly we are using DigitalOcean to collectively develop in a Linux environment and host our web application on the cloud.
<p><b>What each technology was used for:</b></p>
<ul>
<li>Firebase: Firebase's authentication and realtime database were used to create and manage users as well as their data</li>
<li>Google Cloud's Sentiment Analysis API: this API was used for categorizing tweets in terms of their emotional weight</li>
<li>Flask: Python Flask was used as a middle-tier to handle requests from the front-end to Tweepy and Google Cloud</li>
<li>React: React, with the help of Material-UI was used to build a clean and responsive front-end</li>
<li>Tweepy: Tweepy was used to search Twitter for tweets</li>
</ul>
