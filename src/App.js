import { useState, useEffect } from 'react'
import './App.css'
import searchIcon from './search.svg'
import MovieCard from './MovieCard'

const API_URL = 'http://www.omdbapi.com?apikey=89e34662'

// const movie1 = {
// 	Title: 'Italian Spiderman',
// 	Year: '2007',
// 	imdbID: 'tt2705436',
// 	Type: 'movie',
// 	Poster:
// 		'https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg',
// }

const App = () => {
	const [movies, setMovies] = useState([])
	const [searchTerm, setSearchTerms] = useState('Spiderman')

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`)
		const data = await response.json()

		setMovies(data.Search)
	}

	useEffect(() => {
		searchMovies('Spiderman')
	}, [])
	return (
		<div className="app">
			<h1>MovieLand</h1>
			<div className="search">
				<input
					placeholder="Search for movies"
					value={searchTerm}
					onChange={(e) => setSearchTerms(e.target.value)}
				/>
				<img
					src={searchIcon}
					alt="search"
					onClick={() => {
						searchMovies(searchTerm)
					}}
				></img>
			</div>

			{movies.length > 0 ? (
				<div className="container">
					{movies.map((movie) => (
						<MovieCard movie={movie} />
					))}
				</div>
			) : (
				<div className="empty">
					<h2>No moviews found</h2>
				</div>
			)}
		</div>
	)
}

export default App
