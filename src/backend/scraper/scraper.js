const http = require('http');
const https = require('https');

// fetch given url content using HTTP GET
const fetchHost = (url) => {
    return new Promise((resolve, reject) => {
        protocol = url.substr(0, 5);
        let client;
        if (protocol == 'http:')
            client = http;
        else if (protocol == 'https')
            client = https;
        else throw new Error(`unrecognized protocol: ${protocol}`);
        let data = ''
        var request = client.get(url, (res) => {
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
    var pattern=/href=('|")([^('|")]+)('|")/g;
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