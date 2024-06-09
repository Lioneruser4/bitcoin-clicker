let username = localStorage.getItem('username');
let user;

if (!username) {
    username = prompt('Lütfen kullanıcı adınızı girin:');
    localStorage.setItem('username', username);
    createUser(username);
} else {
    getUser(username);
}

document.getElementById('bitcoin-button').addEventListener('click', () => {
    user.score += 100;
    updateUserScore(username, user.score);
    document.getElementById('score').textContent = user.score;
});

async function createUser(username) {
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    });
    user = await response.json();
    document.getElementById('score').textContent = user.score;
}

async function getUser(username) {
    const response = await fetch(`http://localhost:3000/users/${username}`);
    user = await response.json();
    document.getElementById('score').textContent = user.score;
}

async function updateUserScore(username, score) {
    await fetch(`http://localhost:3000/users/${username}/score`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score })
    });
}
