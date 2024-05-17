const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/download', (req, res) => {
    const url = req.query.url;
    const format = req.query.format;

    if (!url || !format) {
        return res.status(400).send('Falta URL o formato.');
    }

    const video = ytdl(url, { filter: 'audioandvideo' });

    res.header('Content-Disposition', `attachment; filename="video.${format}"`);

    if (format === 'mp3') {
        ffmpeg(video)
            .audioBitrate(128)
            .saveToFile(path.join(__dirname, 'video.mp3'))
            .on('end', () => {
                res.download(path.join(__dirname, 'video.mp3'), 'video.mp3');
            });
    } else if (format === 'mp4') {
        video.pipe(res);
    } else {
        res.status(400).send('Formato no soportado.');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
