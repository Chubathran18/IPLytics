import pandas as pd

ultimate_df = pd.read_csv(
    "../data/ultimate_match_prediction_dataset.csv"
)

rtmi_df = pd.read_csv(
    "../data/recent_team_momentum.csv"
)

print("\n========== ULTIMATE DATASET ==========\n")

print(ultimate_df.head())

print("\n========== RTMI DATASET ==========\n")

print(rtmi_df.head())


team_rtmi = dict(
    zip(
        rtmi_df['team'],
        rtmi_df['RTMI']
    )
)



ultimate_df['batting_team_rtmi'] = (
    ultimate_df['batting_team'].map(team_rtmi)
)

ultimate_df['bowling_team_rtmi'] = (
    ultimate_df['bowling_team'].map(team_rtmi)
)

print("\n========== FINAL ULTIMATE DATASET ==========\n")

print(ultimate_df.head())

print("\n========== DATASET SHAPE ==========\n")

print(ultimate_df.shape)


ultimate_df.to_csv(
    "../data/final_ultimate_prediction_dataset.csv",
    index=False
)

print("\n========== FINAL ULTIMATE DATASET SAVED ==========\n")