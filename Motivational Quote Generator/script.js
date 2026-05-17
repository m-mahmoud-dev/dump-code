(function() {
    // ==================== QUOTE DATABASE ====================
    const quotes = [
        // SUCCESS
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "success" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "success" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "success" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "success" },
        { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", category: "success" },
        { text: "Opportunities don't happen. You create them.", author: "Chris Grosser", category: "success" },
        { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller", category: "success" },
        { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson", category: "success" },
        { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill", category: "success" },
        { text: "The secret of success is to do the common thing uncommonly well.", author: "John D. Rockefeller", category: "success" },
        { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon", category: "success" },
        { text: "If you really want to do something, you'll find a way. If you don't, you'll find an excuse.", author: "Jim Rohn", category: "success" },
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "success" },
        // PERSEVERANCE
        { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "perseverance" },
        { text: "Fall seven times, stand up eight.", author: "Japanese Proverb", category: "perseverance" },
        { text: "Perseverance is not a long race; it is many short races one after the other.", author: "Walter Elliot", category: "perseverance" },
        { text: "The man who moves a mountain begins by carrying away small stones.", author: "Confucius", category: "perseverance" },
        { text: "When you feel like quitting, think about why you started.", author: "Unknown", category: "perseverance" },
        { text: "Pain is temporary. Quitting lasts forever.", author: "Lance Armstrong", category: "perseverance" },
        { text: "A river cuts through rock, not because of its power, but because of its persistence.", author: "Jim Watkins", category: "perseverance" },
        { text: "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack of will.", author: "Vince Lombardi", category: "perseverance" },
        { text: "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.", author: "Earl Nightingale", category: "perseverance" },
        { text: "Great works are performed not by strength but by perseverance.", author: "Samuel Johnson", category: "perseverance" },
        { text: "If you are going through hell, keep going.", author: "Winston Churchill", category: "perseverance" },
        { text: "Our greatest glory is not in never falling, but in rising every time we fall.", author: "Confucius", category: "perseverance" },
        { text: "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying, 'I will try again tomorrow.'", author: "Mary Anne Radmacher", category: "perseverance" },
        // MINDSET
        { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford", category: "mindset" },
        { text: "The mind is everything. What you think you become.", author: "Buddha", category: "mindset" },
        { text: "Your attitude, not your aptitude, will determine your altitude.", author: "Zig Ziglar", category: "mindset" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "mindset" },
        { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt", category: "mindset" },
        { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson", category: "mindset" },
        { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis", category: "mindset" },
        { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama", category: "mindset" },
        { text: "The greatest discovery of all time is that a person can change their future by merely changing their attitude.", author: "Oprah Winfrey", category: "mindset" },
        { text: "Act as if what you do makes a difference. It does.", author: "William James", category: "mindset" },
        { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair", category: "mindset" },
        { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson", category: "mindset" },
        // COURAGE
        { text: "Courage is not the absence of fear, but the triumph over it.", author: "Nelson Mandela", category: "courage" },
        { text: "Life shrinks or expands in proportion to one's courage.", author: "Anaïs Nin", category: "courage" },
        { text: "You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.", author: "Eleanor Roosevelt", category: "courage" },
        { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt", category: "courage" },
        { text: "Bravery is being the only one who knows you're afraid.", author: "Franklin P. Jones", category: "courage" },
        { text: "It takes courage to grow up and become who you really are.", author: "E.E. Cummings", category: "courage" },
        { text: "Fear is only as deep as the mind allows.", author: "Japanese Proverb", category: "courage" },
        { text: "The brave man is not he who does not feel afraid, but he who conquers that fear.", author: "Nelson Mandela", category: "courage" },
        { text: "Doubt kills more dreams than failure ever will.", author: "Suzy Kassem", category: "courage" },
        { text: "You can't cross the sea merely by standing and staring at the water.", author: "Rabindranath Tagore", category: "courage" },
        // WISDOM
        { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", category: "wisdom" },
        { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "wisdom" },
        { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu", category: "wisdom" },
        { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle", category: "wisdom" },
        { text: "The unexamined life is not worth living.", author: "Socrates", category: "wisdom" },
        { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", category: "wisdom" },
        { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche", category: "wisdom" },
        { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", category: "wisdom" },
        { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "wisdom" },
        { text: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.", author: "Albert Einstein", category: "wisdom" },
        { text: "To know what you know and what you do not know, that is true knowledge.", author: "Confucius", category: "wisdom" },
        // DISCIPLINE
        { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn", category: "discipline" },
        { text: "We must all suffer from one of two pains: the pain of discipline or the pain of regret.", author: "Jim Rohn", category: "discipline" },
        { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun", category: "discipline" },
        { text: "The successful person has the habit of doing the things failures don't like to do.", author: "E.M. Gray", category: "discipline" },
        { text: "Self-discipline begins with the mastery of your thoughts.", author: "Napoleon Hill", category: "discipline" },
        { text: "Small disciplines repeated with consistency every day lead to great achievements gained slowly over time.", author: "John C. Maxwell", category: "discipline" },
        { text: "You will never change your life until you change something you do daily.", author: "Mike Murdock", category: "discipline" },
        { text: "The first and best victory is to conquer self.", author: "Plato", category: "discipline" },
        { text: "It's not that I'm so smart, it's just that I stay with problems longer.", author: "Albert Einstein", category: "discipline" },
        { text: "Do the hard jobs first. The easy jobs will take care of themselves.", author: "Dale Carnegie", category: "discipline" },
        { text: "Without self-discipline, success is impossible. Period.", author: "Lou Holtz", category: "discipline" },
        // LEADERSHIP
        { text: "A leader is one who knows the way, goes the way, and shows the way.", author: "John C. Maxwell", category: "leadership" },
        { text: "The greatest leader is not necessarily the one who does the greatest things. They are the one that gets the people to do the greatest things.", author: "Ronald Reagan", category: "leadership" },
        { text: "Leadership is the capacity to translate vision into reality.", author: "Warren Bennis", category: "leadership" },
        { text: "If your actions inspire others to dream more, learn more, do more, and become more, you are a leader.", author: "John Quincy Adams", category: "leadership" },
        { text: "The art of leadership is saying no, not yes. It is very easy to say yes.", author: "Tony Blair", category: "leadership" },
        { text: "Great leaders are willing to sacrifice their own personal interests for the good of the team.", author: "John Wooden", category: "leadership" },
        { text: "A true leader has the confidence to stand alone, the courage to make tough decisions, and the compassion to listen to the needs of others.", author: "Douglas MacArthur", category: "leadership" },
        { text: "Leadership is not about being in charge. It is about taking care of those in your charge.", author: "Simon Sinek", category: "leadership" },
        { text: "The function of leadership is to produce more leaders, not more followers.", author: "Ralph Nader", category: "leadership" },
        { text: "Before you are a leader, success is all about growing yourself. When you become a leader, success is all about growing others.", author: "Jack Welch", category: "leadership" },
        { text: "People don't care how much you know until they know how much you care.", author: "Theodore Roosevelt", category: "leadership" },
    ];

    // ==================== STATE ====================
    let currentQuote = null;
    let currentCategory = 'all';
    let favorites = JSON.parse(localStorage.getItem('motivationalFavorites') || '[]');
    let isAnimating = false;

    // ==================== DOM ELEMENTS ====================
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const categoryBadge = document.getElementById('categoryBadge');
    const quoteIcon = document.getElementById('quoteIcon');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const tweetBtn = document.getElementById('tweetBtn');
    const favBtn = document.getElementById('favBtn');
    const filterPills = document.querySelectorAll('.filter-pill');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    const favoritesPanel = document.getElementById('favoritesPanel');
    const overlay = document.getElementById('overlay');
    const favCloseBtn = document.getElementById('favCloseBtn');
    const favList = document.getElementById('favList');

    const categoryIcons = {
        success: '🏆',
        perseverance: '🔥',
        mindset: '🧠',
        courage: '🦁',
        wisdom: '🦉',
        discipline: '⏰',
        leadership: '👑',
    };
    const badgeClasses = {
        success: 'badge-success',
        perseverance: 'badge-perseverance',
        mindset: 'badge-mindset',
        courage: 'badge-courage',
        wisdom: 'badge-wisdom',
        discipline: 'badge-discipline',
        leadership: 'badge-leadership',
    };

    // ==================== FUNCTIONS ====================
    function getFilteredQuotes() {
        if (currentCategory === 'all') return [...quotes];
        return quotes.filter(q => q.category === currentCategory);
    }

    function getRandomQuote() {
        const pool = getFilteredQuotes();
        if (pool.length === 0) return quotes[0];
        if (pool.length > 1 && currentQuote && pool.includes(currentQuote)) {
            const others = pool.filter(q => q !== currentQuote);
            return others[Math.floor(Math.random() * others.length)];
        }
        return pool[Math.floor(Math.random() * pool.length)];
    }

    function animateQuote(newQuote) {
        if (isAnimating) return;
        isAnimating = true;

        quoteText.classList.add('animating');
        quoteAuthor.classList.add('animating');

        setTimeout(() => {
            quoteText.textContent = `"${newQuote.text}"`;
            quoteAuthor.innerHTML = `<span class="author-dash">—</span> ${newQuote.author}`;
            currentQuote = newQuote;

            const cat = newQuote.category;
            categoryBadge.textContent = cat.toUpperCase();
            categoryBadge.className = 'category-badge ' + (badgeClasses[cat] || 'badge-success');
            quoteIcon.textContent = categoryIcons[cat] || '💡';

            quoteText.classList.remove('animating');
            quoteAuthor.classList.remove('animating');
            updateFavBtnState();

            setTimeout(() => { isAnimating = false; }, 300);
        }, 250);
    }

    function generateNewQuote() {
        const newQuote = getRandomQuote();
        animateQuote(newQuote);
        const card = document.getElementById('quoteCard');
        card.style.transform = 'scale(1.01)';
        setTimeout(() => { card.style.transform = 'scale(1)'; }, 150);
    }

    function showToast(message, icon = '✅') {
        toastMsg.textContent = message;
        toast.querySelector('.toast-icon').textContent = icon;
        toast.classList.add('show');
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => toast.classList.remove('show'), 2000);
    }

    function copyToClipboard() {
        if (!currentQuote) return;
        navigator.clipboard.writeText(`"${currentQuote.text}" — ${currentQuote.author}`)
            .then(() => showToast('Copied!', '📋'))
            .catch(() => showToast('Failed to copy', '❌'));
    }

    function tweetQuote() {
        if (!currentQuote) return;
        const text = `"${currentQuote.text}" — ${currentQuote.author}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=motivation,quotes`, '_blank');
    }

    function toggleFavorite() {
        if (!currentQuote) return;
        const index = favorites.findIndex(f => f.text === currentQuote.text && f.author === currentQuote.author);
        if (index > -1) {
            favorites.splice(index, 1);
            showToast('Removed from favorites', '💔');
        } else {
            favorites.push({ text: currentQuote.text, author: currentQuote.author, category: currentQuote.category });
            showToast('Added to favorites!', '❤️');
        }
        localStorage.setItem('motivationalFavorites', JSON.stringify(favorites));
        updateFavBtnState();
        renderFavorites();
    }

    function updateFavBtnState() {
        if (!currentQuote) return;
        const isFav = favorites.some(f => f.text === currentQuote.text && f.author === currentQuote.author);
        favBtn.innerHTML = isFav ? '❤️ Saved' : '❤️ Save';
        favBtn.style.borderColor = isFav ? '#4f8cff' : '';
        favBtn.style.color = isFav ? '#4f8cff' : '';
        favBtn.style.background = isFav ? 'rgba(79,140,255,0.08)' : '';
    }

    function renderFavorites() {
        if (favorites.length === 0) {
            favList.innerHTML = '<div class="no-favs">📭 No favorites yet.<br><small>Click ❤️ Save on a quote you love!</small></div>';
            return;
        }
        favList.innerHTML = favorites.map((f, i) => `
            <div class="fav-item">
                <button class="fav-remove" data-index="${i}" title="Remove">✕</button>
                <p class="fav-quote">"${f.text}"</p>
                <p class="fav-author">— ${f.author}</p>
            </div>
        `).join('');

        favList.querySelectorAll('.fav-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.getAttribute('data-index'));
                favorites.splice(idx, 1);
                localStorage.setItem('motivationalFavorites', JSON.stringify(favorites));
                renderFavorites();
                updateFavBtnState();
                showToast('Removed', '💔');
            });
        });
    }

    function openFavorites() {
        favoritesPanel.classList.add('open');
        overlay.classList.add('active');
        renderFavorites();
    }

    function closeFavorites() {
        favoritesPanel.classList.remove('open');
        overlay.classList.remove('active');
    }

    // ==================== EVENT LISTENERS ====================
    generateBtn.addEventListener('click', generateNewQuote);
    copyBtn.addEventListener('click', copyToClipboard);
    tweetBtn.addEventListener('click', tweetQuote);
    favBtn.addEventListener('click', toggleFavorite);
    favBtn.addEventListener('dblclick', (e) => { e.preventDefault(); openFavorites(); });
    favCloseBtn.addEventListener('click', closeFavorites);
    overlay.addEventListener('click', closeFavorites);

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCategory = pill.getAttribute('data-category');
            generateNewQuote();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
            generateNewQuote();
        }
        if (e.key === 'c' && e.ctrlKey && !e.target.closest('input,textarea')) {
            e.preventDefault();
            copyToClipboard();
        }
        if (e.key === 'f' && e.ctrlKey && !e.target.closest('input,textarea')) {
            e.preventDefault();
            toggleFavorite();
        }
        if (e.key === 'Escape') closeFavorites();
    });

    // ==================== INIT ====================
    function init() {
        const initial = getRandomQuote();
        currentQuote = initial;
        quoteText.textContent = `"${initial.text}"`;
        quoteAuthor.innerHTML = `<span class="author-dash">—</span> ${initial.author}`;
        const cat = initial.category;
        categoryBadge.textContent = cat.toUpperCase();
        categoryBadge.className = 'category-badge ' + (badgeClasses[cat] || 'badge-success');
        quoteIcon.textContent = categoryIcons[cat] || '💡';
        updateFavBtnState();
        renderFavorites();
    }

    init();
})();