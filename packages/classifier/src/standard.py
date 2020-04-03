import pandas as pd

data = pd.read_csv('./data/standard.csv', sep=';')
data.drop('url', axis=1, inplace=True)

print(data.head())