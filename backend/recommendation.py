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




df['Title'] = df['Title'].str.replace(r'\(\d{4}\)', '', regex=True).str.strip()

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
vectorizer = CountVectorizer(max_features = 5000, stop_words='english')
X = vectorizer.fit_transform(df1['describe']).toarray()
similarity = cosine_similarity(X)

@router.get("/")
def recommend(
    movie: str = Query(..., description="Movie title to get recommendations for"),
    user=Depends(get_current_user)
):
    movie_lower = movie.lower()

    try:
        index = df[df['Title'].str.lower() == movie_lower].index[0]
    except IndexError:
        raise HTTPException(status_code=404, detail=f"Movie '{movie}' not found")

    distances = similarity[index]
    top_similar = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]

    recommendations = []
    for i in top_similar:
        row = df.iloc[i[0]]

        recommendations.append({
            "title": row['Title'],
            "genre": row['Genre'],
            "cast": row['Cast'],
            "director": row['Director'],
            "production_house": row['Production House'] if 'Production House' in df.columns else None,
            "release_date": row['Release Dates'] if 'Release Dates' in df.columns else None,
            "plot": row['Plot'],
            "image_url": row['Image URL'] if 'Image URL' in df.columns and pd.notna(row['Image URL']) else None,
            "video_url": row['Movie URL'] if 'Movie URL' in df.columns and pd.notna(row['Movie URL']) else None,
        })

    return {
        "movie": movie,
        "recommendations": recommendations
    }
