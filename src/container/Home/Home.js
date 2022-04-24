import { useState, useRef, useEffect } from 'react';
import '../Home/Home.css';
//

function Home() {
	/*     Data      */
	const colors = [
		'#ff794d',
		'#ffa64d',
		'#ffd24d',
		'#ffff4d',
		'#d2ff4d',
		'#a6ff4d',
		'#79ff4d',
		'#4dff4d',
		'#4dff79',
		'#4dffa6',
		'#4dffd2',
		'#4dffff',
		'#4dd2ff',
		'#4da6ff',
		'#4d79ff',
		'#4d4dff',
		'#794dff',
		'#a64dff',
		'#d24dff',
		'#ff4dff',
		'#ff4dd2',
		'#ff4da6',
		'#ff4d79',
		'#ff4d4d',
	];
	const initialState = {
		quote: 'Life isn’t about getting and having, it’s about giving and being.',
		author: 'Kevin Kruse',
		color: colors[0],
		getTweetLink: function (){
			return `https://twitter.com/intent/tweet?text=\"${this.quote}\" ${this.author}`;
		}
	};

	// get Data from Api
	useEffect(() => {
		fetch(
			'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
		)
			.then((res) => res.json())
			.then((quotes) => {
				//set dataQuote from api
				dataQuote.current = quotes.quotes;
			});
		// set background color
		setColor(colors[0]);
	}, []);
	/*     End Data      */

	const index = useRef(1);
	const dataQuote = useRef([]);
	const [quote, setQuote] = useState(initialState);
	const $ = document.querySelector.bind(document);

	const setColor = (color) => {

		$('body').style.backgroundColor = color;
	
		$('#tweet-quote').style.backgroundColor = color;
		$('#new-quote').style.backgroundColor = color;

		$('#text').style.opacity = 0;
		$('#author').style.opacity = 0;
		setTimeout(() => {
			$('body').style.color = color;
			$('#text').style.opacity = 1;
			$('#author').style.opacity = 1;

		}, 1000)

		
	};

	const handleNewQuote = () => {

		
		/* Random color */
		const randomIndexColor = Math.round(Math.random() * colors.length);
		const color = colors[randomIndexColor];

		/* tweet link */
		const getTweetLink = initialState.getTweetLink;

		/* set state with object {quote, color} */
		const dataLength = dataQuote.current.length - 1;
		if (index.current <= dataLength) {
			const dataCurrent  = dataQuote.current[index.current];
			const newData = Object.assign(dataCurrent, { color,getTweetLink });

			setTimeout(() => {
				setQuote(() => newData);
			}, 1000)
			
			index.current = index.current > dataLength ? 0 : index.current + 1;
		}

		setColor(color);
	};

	return (
		<div id="quote-box">
			<h1 id="text">
				<i className="fa-solid fa-quote-left"></i>
				{quote.quote}
			</h1>
			<p id="author">- {quote.author}</p>
			<a id="tweet-quote" href={quote.getTweetLink()}>
				<i className="fa-brands fa-twitter"></i>
			</a>

			<button id="new-quote" onClick={handleNewQuote}>
				New Quote
			</button>
		</div>
	);
}

export default Home;
