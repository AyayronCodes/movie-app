import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {

  const { userFrom, movieId } = props
  const movieTitle = props.movieInfo.title
  const moviePost = props.movieInfo.backdrop_path
  const movieRunTime = props.movieInfo.runtime

  const [FavoriteNumber, setFavoriteNumber] = useState(0)
  const [Favorited, setFavorited] = useState(false)

  const variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  }

  useEffect(() => {

    axios.post('/api/favorite/favoriteNumber', variables)
      .then(response => {
        console.log(response.data)
        setFavoriteNumber(response.data.favoriteNumber)
        if (response.data.success) {

        } else {
          alert('Failed to bring information about favorites...')
        }
      })

    axios.post('/api/favorite/favorited', variables)
      .then(response => {
        if (response.data.success) {
          setFavorited(response.data.favorited)
        } else {
          alert('Failed to bring favorited info...')
        }
      })
  }, [])

  const onClickFavorite = () => {
    if (Favorited) {
      axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1)
            setFavorited(!Favorited)
          } else {
            alert('Failed to remove from favorite...')
          }
        })
    } else {
      axios.post('/api/favorite/addToFavorite', variables)
        .then(response => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber + 1)
            setFavorited(!Favorited)
          } else {
            alert('Failed to add to favorite...')
          }
        })
    }
  }

  return (
    <div>
      <Button onClick={onClickFavorite}>{Favorited ? 'Not Favorite' : 'Add to Favorite'} {FavoriteNumber}</Button>
    </div>
  )
}

export default Favorite
