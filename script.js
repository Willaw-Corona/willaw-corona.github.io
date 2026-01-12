// btw i vibe coded this, i dunno JavaScript
function pickRandom(arr) {
	if (!Array.isArray(arr) || arr.length === 0) return undefined;
	return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
	// Fisher-Yates in-place shuffle
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function TextRandomiser(options = {}) {
	const { selector, texts = [], interval = 2000, shuffle = true, repeat = true } = options;

	let elem = null;
	if (typeof selector === 'string') {
		try {
			elem = document ? document.querySelector(selector) : null;
		} catch (e) {
			elem = null;
		}
	} else if (selector instanceof Element) {
		elem = selector;
	}

	let pool = Array.isArray(texts) ? texts.slice() : [];
	if (shuffle) pool = shuffleArray(pool);

	let timer = null;

	function start() {
		if (!elem) return;
		stop();
		timer = setInterval(() => {
			if (pool.length === 0) {
				if (repeat) pool = Array.from(texts);
				else return stop();
				if (shuffle) pool = shuffleArray(pool);
			}
			// Take one from pool (pop gives shuffled order if shuffled)
			const next = pool.pop();
			elem.textContent = next;
		}, interval);
	}

	function stop() {
		if (timer !== null) {
			clearInterval(timer);
			timer = null;
		}
	}

	function setTexts(newTexts, doShuffle = shuffle) {
		pool = Array.isArray(newTexts) ? newTexts.slice() : [];
		if (doShuffle) pool = shuffleArray(pool);
	}

	function showOnce() {
		if (!elem) return;
		const v = pickRandom(texts);
		if (v !== undefined) elem.textContent = v;
	}

	return {
		start,
		stop,
		setTexts,
		showOnce,
		_internal: { pool }
	};
}

// Browser demo: if there's an element with id 'random-text', rotate a few phrases
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	const el = document.getElementById('random-text');
	if (el) {
		const r = TextRandomiser({
			selector: el,
			texts: [
				'Hello — this text is random!',
				'Sans is behind you.',
				'Did you know? Trans rights.',
				'Try reloading the page.',
				'Error 404: Text not found',
				'This is not a drill.',
				'I fucking hate JS but i gotta write JS for backend and frontend, so here we are.',
				'Proud northen Mexican from the Rio Grande/Northeast region.',
                '¡Independencia norteña!',
                'I forgot.',
				'Deport the Morena voters now.',
				'Im afraid of the corrupt government.',
                '¡Viva la corrupción! ¡Viva Jose Jose! ¡Viva el clasismo! ¡Viva el racismo! ~AMLO 2024',
                'Call me a fucking russian spy again and i will fucking do nothing about it.',
                'I forget things easily.',
                'I love the cute little pussy in my house, she is so fluffy and adorable.',
                'How much do programmers get paid again in Coahuila? I forgot.',
                'I want to move to Canada or Germoney.',
                'Open source is love, open source is life.',
                'Golang, i will never understand you.',
                '"Be open, be free" ~Me',
                'LESBIANS EAT WHAT?!',
                'When does Acchi Kocchi get an English dub? I dont understand Japanese, HELP!',
                'Door.',
                'I use Arch btw.',
                'NOOOO, TUX, NOOOOO DONT DRINK VODKA NOOOO!',
                'Error 418: Im a teapot',
                'Line 8: Missing library "love"',
                'I CANT SAY ALL THE WORDS AT ONCE OF HOW MUCH I HATE FRANCE RIGHT NOW!',
                'What, wha what?',
                'Im inside your walls, i watch you masterbat- i mean, sleep.',
                'Police in r/Saltillo ask for weed for some reason.',
                'Im trans, deal with it.',
                'Barely write closed source.',
                'I love my cat.',
                'Py-py-py-py-py-py-py-py-py-py-py-py-py-py-py-python!',
                'I know much about Python that i even forget to put an semicolon',
                'Variable: Love not found',
                'I want to be a catgirl, but im scared of what my family will say.',
                'I want to be a trap, but im scared of what my family will say.',
                'I want to be a cute',
                'Born male, but wants to be female.',
                'Do you have some?',
                'I need some of those RAM right now dawg',
                'Remember, kids: Don\'t put to your burger eighteen kilograms of cement, it\'s not good for your health instead put mayo!',
                'Kitty kat',
                'Yo, where can i find some "Love" around here? Oh, in "Nomansland"? Thanks bro!',
                'Guthib',
                'I don\'t miss my third leg!',
                'If PRI wins again, i would wish they deport all the Morena voters and leftists.',
                'Teeth',
                'Transfobic parent and religious, just what i needed, better stay in the closet forever.',
                'My first computer was an SONY VAIO with Windows 7, man, i wish there was an wayback machine to that time so i teach myself Linux from young, ¿¿probably at. 5 or 8??',
				'Windows sucks',
				'SANS WHAT ARE YOU DOING IN MY HOUSE!',
				'There\'s an syntax error on this code, but somehow it still works.',
                'English spawned in my brain, even tho i never went to America or any English speaking country.',
                'You might be alive if you\'re reading this',
                'The font name is called "Ubuntu" so you know.',
                'I want to eat some independence of the north fr fr.',
				'4kstore.com',
			],
			interval: 2500,
			shuffle: true,
			repeat: true
		});
		r.start();
	}
}

// Node-friendly export for quick console demo
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { pickRandom, shuffleArray, TextRandomiser };
}

