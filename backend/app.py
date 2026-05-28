from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd
import joblib


app = Flask(__name__)

CORS(app)


model = joblib.load(
    "models/ipl_prediction_model.pkl"
)

team_encoder = joblib.load(
    "models/team_encoder.pkl"
)

venue_encoder = joblib.load(
    "models/venue_encoder.pkl"
)

toss_encoder = joblib.load(
    "models/toss_encoder.pkl"
)



ntpi_df = pd.read_csv(
    "../data/normalized_team_power_rankings.csv"
)

ntfi_df = pd.read_csv(
    "../data/normalized_team_player_strength.csv"
)

rtmi_df = pd.read_csv(
    "../data/recent_team_momentum.csv"
)


team_ntpi = dict(
    zip(ntpi_df['Team'], ntpi_df['NTPI'])
)

team_ntfi = dict(
    zip(ntfi_df['batting_team'], ntfi_df['NTFI'])
)

team_rtmi = dict(
    zip(rtmi_df['team'], rtmi_df['RTMI'])
)



@app.route("/")
def home():

    return "IPLytics Backend Running Successfully!"

# =========================================
# PREDICTION ROUTE
# =========================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.json

        batting_team = data['batting_team'].strip()
        bowling_team = data['bowling_team'].strip()
        venue = data['venue'].strip()
        toss_winner = data['toss_winner'].strip()
        toss_decision = data['toss_decision'].strip()


        batting_team_encoded = (
            team_encoder.transform([batting_team])[0]
        )

        bowling_team_encoded = (
            team_encoder.transform([bowling_team])[0]
        )

        venue_encoded = (
            venue_encoder.transform([venue])[0]
        )

        toss_winner_encoded = (
            team_encoder.transform([toss_winner])[0]
        )

        toss_decision_encoded = (
            toss_encoder.transform([toss_decision])[0]
        )

        batting_team_ntpi = (
            team_ntpi.get(batting_team, 0)
        )

        bowling_team_ntpi = (
            team_ntpi.get(bowling_team, 0)
        )

        batting_team_ntfi = (
            team_ntfi.get(batting_team, 0)
        )

        bowling_team_ntfi = (
            team_ntfi.get(bowling_team, 0)
        )

        batting_team_rtmi = (
            team_rtmi.get(batting_team, 0)
        )

        bowling_team_rtmi = (
            team_rtmi.get(bowling_team, 0)
        )


        input_df = pd.DataFrame([{
            'batting_team': batting_team_encoded,
            'bowling_team': bowling_team_encoded,
            'venue': venue_encoded,
            'toss_winner': toss_winner_encoded,
            'toss_decision': toss_decision_encoded,
            'batting_team_ntpi': batting_team_ntpi,
            'bowling_team_ntpi': bowling_team_ntpi,
            'batting_team_ntfi': batting_team_ntfi,
            'bowling_team_ntfi': bowling_team_ntfi,
            'batting_team_rtmi': batting_team_rtmi,
            'bowling_team_rtmi': bowling_team_rtmi
        }])


        prediction = model.predict(input_df)[0]

        prediction_probabilities = (
            model.predict_proba(input_df)[0]
        )

        predicted_team = (
            team_encoder.inverse_transform([prediction])[0]
        )

        winning_probability = round(
            max(prediction_probabilities) * 100,
            2
        )


        return jsonify({
            "predicted_winner": predicted_team,
            "win_probability": winning_probability
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        })


if __name__ == "__main__":

    app.run(debug=True)