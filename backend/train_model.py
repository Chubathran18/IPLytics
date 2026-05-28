import pandas as pd
import joblib

from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


df = pd.read_csv(
    "../data/final_ultimate_prediction_dataset.csv"
)

print("\n========== FINAL DATASET ==========\n")

print(df.head())

df = df[df['match_won_by'] != 'Unknown']

team_encoder = LabelEncoder()
venue_encoder = LabelEncoder()
toss_encoder = LabelEncoder()


df['batting_team'] = team_encoder.fit_transform(
    df['batting_team']
)

df['bowling_team'] = team_encoder.transform(
    df['bowling_team']
)

df['venue'] = venue_encoder.fit_transform(
    df['venue']
)

df['toss_winner'] = toss_encoder.fit_transform(
    df['toss_winner']
)

df['toss_decision'] = toss_encoder.fit_transform(
    df['toss_decision']
)

df['match_won_by'] = team_encoder.transform(
    df['match_won_by']
)

X = df[
    [
        'batting_team',
        'bowling_team',
        'venue',
        'toss_winner',
        'toss_decision',
        'batting_team_ntpi',
        'bowling_team_ntpi',
        'batting_team_ntfi',
        'bowling_team_ntfi',
        'batting_team_rtmi',
        'bowling_team_rtmi'
    ]
]


y = df['match_won_by']


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


model = RandomForestClassifier(
    n_estimators=500,
    max_depth=12,
    min_samples_split=5,
    random_state=42
)

model.fit(X_train, y_train)


y_pred = model.predict(X_test)


accuracy = accuracy_score(y_test, y_pred)

print("\n========== FINAL MODEL ACCURACY ==========\n")

print(f"Accuracy: {accuracy * 100:.2f}%")


joblib.dump(
    model,
    "models/ipl_prediction_model.pkl"
)

joblib.dump(
    team_encoder,
    "models/team_encoder.pkl"
)

joblib.dump(
    venue_encoder,
    "models/venue_encoder.pkl"
)

joblib.dump(
    toss_encoder,
    "models/toss_encoder.pkl"
)

print("\n========== MODEL FILES SAVED ==========\n")