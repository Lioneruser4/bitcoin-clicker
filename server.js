const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/bitcoin-clicker', { useNewUrlParser: true, useUnifiedTopology: true });

// Kullanıcı şeması ve modeli
const userSchema = new mongoose.Schema({
  username: String,
  score: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

// Yeni kullanıcı oluşturma veya mevcut kullanıcıyı alma
app.post('/users', async (req, res) => {
  const { username } = req.body;
  let user = await User.findOne({ username });

  if (!user) {
    user = new User({ username });
    await user.save();
  }

  res.status(201).send(user);
});

// Kullanıcı puanını güncelleme
app.post('/users/:username/score', async (req, res) => {
  const { username } = req.params;
  const { score } = req.body;
  const user = await User.findOneAndUpdate({ username }, { score }, { new: true });
  res.send(user);
});

// Kullanıcı bilgilerini alma
app.get('/users/:username', async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  res.send(user);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
