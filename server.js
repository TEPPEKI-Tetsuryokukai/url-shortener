const express = require('express');
const app = express();
const port = 3000;
const shortUrls = {};  // 短縮URLと元URLを保存するオブジェクト

app.use(express.static('public'));
app.use(express.json());

// 長いURLを短縮するエンドポイント
app.post('/shorten', (req, res) => {
    const longUrl = req.body.longUrl;
    const shortUrl = Math.random().toString(36).substring(2, 8); // ランダムな文字列を生成
    shortUrls[shortUrl] = longUrl;
    res.json({ shortUrl: `https://yourdomain.com/${shortUrl}` });
});

// 短縮URLにアクセスしたときのリダイレクト
app.get('/:shortUrl', (req, res) => {
    const shortUrl = req.params.shortUrl;
    const longUrl = shortUrls[shortUrl];
    if (longUrl) {
        res.redirect(longUrl); // 元のURLにリダイレクト
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
