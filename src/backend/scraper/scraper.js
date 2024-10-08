const https = require('https');

// fetch given url content using HTTP GET
const fetchHost = (_hostname, _path) => {
    return new Promise((resolve, reject) => {
        var options = {
            hostname: _hostname,
            path: _path,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:10.0) Gecko/20100101 Firefox/10.0' }
        };
        let data = ''
        var request = https.get(options, (res) => {
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
            });
        });
        request.on('error', (e) => {
            reject(e.message);
        });
    })
}

// get all the embeeded links from given html data ('<!DOCTYPE html><html>...</html>')
const getLinks = (htmlData) => {
    var pattern = /href=('|")([^('|")]+)('|")/g;
    let link, links = [];
    while (link = pattern.exec(htmlData)) {
        links.push(link[0].substring(6, link[0].length - 1));
    }
    return links;
}

// fetch metadata from given html data ('<!DOCTYPE html><html>...</html>')
const fetchMetadata = async(data) => {
    var pattern = /<meta[^>]*>/g;
    let meta_tag, meta_tags = [];
    while (meta_tag = pattern.exec(data)) {
        meta_tags.push(meta_tag[0]);
    }
    return meta_tags;
}

module.exports = { fetchHost, getLinks, fetchMetadata };