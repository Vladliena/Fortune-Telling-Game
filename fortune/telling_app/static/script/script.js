let questionArr = [];

userquestion.addEventListener('submit', getQuestion);
butbybook.addEventListener('click', getTytleBook);
butstatistic.addEventListener('click', getPopularQuestions);


async function getTytleBook() {
    try {
        const booksData = await fetch('http://localhost:8000/fortune/books/');
        if (booksData.ok) {
            const books = await booksData.json();
            booksForm(books);
        }
    } catch (err) {
        err;
    };
};

function booksForm(books) {
    const booksList = document.createElement('select');
    booksList.setAttribute('id', 'choice');
    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('value', '');
    defaultOption.textContent = 'Select a book';
    booksList.appendChild(defaultOption);

    books.forEach(book => {
        const option = document.createElement('option');
        option.setAttribute('value', book['book']);
        option.textContent = book['book'];
        booksList.appendChild(option);
    });

    bybook.innerHTML = `<label for="choice">Your future is here:</label>`;
    bybook.appendChild(booksList);

    booksList.addEventListener('change', searchByBook);
};

async function searchByBook(event) {
    try {
        const quoteData = await fetch(`http://localhost:8000/fortune/book/${event.srcElement.value}`);
        if (quoteData.ok) {
            const quote = await quoteData.json();
            answer(quote);
        }
    } catch (err) {
        console.log(err);
    };
};

function answer(quote, target = '') {

    const rundAnswer = document.createElement('p');
    rundAnswer.classList.add('my_text')
    console.log(questionArr)
    if (target.id === 'butrandom') {
        console.log(questionArr)
        rundAnswer.innerText = quote[0]['content'];
        random.appendChild(rundAnswer);
        questions.innerHTML = '<button id="postuserquestion">One more time?</button>';
        postuserquestion.addEventListener('click', postQuestion);
    } else {
        if (bybook.lastElementChild.localName === 'p') bybook.lastElementChild.remove()
        rundAnswer.innerText = quote;
        bybook.appendChild(rundAnswer);
    };
};


async function randomQuote(questions, target) {  // genereted random qutes from api by tags
    const keys = await tags();
    const commonElements = questions.map(word => keys.includes(word) ? word : 'none');
    const Elements = commonElements.filter(el => el != 'none');
    const category = Elements.length > 0 ? Elements.length > 1 ? Elements.join('|') : Elements.join('') : keys[questions.length < keys.length / 10 ? Math.floor(Math.random() * keys.length) : Math.floor(Math.random() * questions.length)]; // if user input not empty and his words containts in keys, then We need to check it's word or sentence. If it's sentence return string of words seperated | . If input not contains in keys we need to check length of keys and input user for randomaizing 

    try {
        const data = await fetch(`https://api.quotable.io/quotes/random?tags=${category}`);
        if (data.ok) {
            const quote = await data.json();
            answer(quote, target);
        } else {
            throw new Error;
        }

    } catch (err) {
        console.log(err);
    };
};

async function tags() {
    try {
        const data = await fetch('https://api.quotable.io/tags');
        if (data.ok) {
            const dataJson = await data.json();
            return dataJson.map(item => item['slug']);
        }
    } catch (error) {
        console.log(error);
    }
}

async function postQuestion() {
    let question = questionArr.toSorted().join(' ');
    console.log(question)
    let newQuestion = { pattern: questionArr.join(' '), question: question };
    let options = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(newQuestion),
    };
    try {
        const res = await fetch("http://localhost:8000/fortune/questions/", options);
        const data = await res.json();
        // return data;
        console.log('data=>', data);
    } catch (error) {
        console.log(error);
    }
    window.location.reload();
}


async function getQuestion(event) {
    event.preventDefault();
    questionArr = [...event.target.question.value.toLowerCase().replace(/[^a-zA-Z\s]+/g, '').split(' ')]
    randomQuote(questionArr, event.target.butrandom);
}

async function getPopularQuestions() {
    try {
        const questions = await fetch("http://localhost:8000/fortune/questions/popular/3/");
        const questionsArr = await questions.json();
        const questionList = questionsArr.map(question => `Question "${question.pattern.split('=')[1].replace('errors', '')}" was asked ${question.count} time.`)
        const listQuest = document.createElement('ul');
        questionList.forEach(quest => {
            const li = document.createElement('li');
            li.innerText = quest;
            listQuest.appendChild(li);
        })
        statistic.appendChild(listQuest)
        butstatistic.setAttribute('disabled', 'true')
    } catch (error) {
        console.log(error);
    }
}