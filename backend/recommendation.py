import pandas as pd
import numpy as np
from fastapi import APIRouter, Query, HTTPException,Depends
from auth import get_current_user

router = APIRouter()

df = pd.read_csv("movies.csv")

df["Production House"] = df["Production House"].fillna("N/A")
df["Director"] = df["Director"].fillna("N/A")


df1 = df.drop(columns=['Total Ratings', 'Rating'])


df1['describe'] = (
    df1['Genre'].fillna('') + ' ' +
    df1['Cast'].fillna('') + ' ' +
    df1['Director'].fillna('') + ' ' +
    df1['Production House'].fillna('') + ' ' +
    df1['Plot'].fillna('')
)

def stri(x):
    x = x.str.replace(' ','')
    x= x.str.replace('/', '')
    x = x.str.lower()
    return x

df1['describe'] = stri(df1['describe'])
df1['describe'].head()




df1['Title'] = df1['Title'].str.replace(r'\s*\(\d{4}\)', '', regex=True)

from sklearn.feature_extraction.text import CountVectorizer
vectorizer = CountVectorizer(max_features = 5000, stop_words='english')
X = vectorizer.fit_transform(df1['describe']).toarray()



from sklearn.metrics.pairwise import cosine_similarity
similarity = cosine_similarity(X)


@router.get("/")
def recommend(movie: str = Query(..., description="Movie title to get recommendations for"),
    user=Depends(get_current_user)):
    try:
        index = df[df['Title'] == movie].index[0]
    except IndexError:
        raise HTTPException(status_code=404, detail=f"Movie '{movie}' not found")
    
    distances = similarity[index]
    movie_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]

    results = []
    for i in movie_list:
        row = df.iloc[i[0]]
        results.append({
            "title": row['Title'],
            "genre": row['Genre'],
            "cast": row['Cast'],
            "director": row['Director'],
            "production_house": row['Production House'],
            "release_date": row['Release Dates'],
            "plot": row['Plot'],
            "image_url": row.get('Image URL', None),     
            "video_url": row.get('Movie URL', None)   
        })
    return {"movie": movie, "recommendations": results}


