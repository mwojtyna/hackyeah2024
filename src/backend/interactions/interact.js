const { fetchHost } = require('../scraper/scraper.js');
const jsdom = require('jsdom');

const getForms = (htmlData) => {
    let form_b, form_e, forms = [];
    var pattern_b = /<form/g;
    var pattern_e = /<\/form>/g;
    while (form_b = pattern_b.exec(htmlData)) {
        form_e = pattern_e.exec(htmlData);
        if (form_e == null || form_b.index > form_e.index)
            throw new Error('unrecognized DOM layout');
        forms.push(new jsdom.JSDOM(htmlData.substring(form_b.index, form_e.index + 7)).window.document.querySelector('form'));
    }
    return forms;
}

const login = async(hostname, path, login, password) => {
    var data = await fetchHost(hostname, path);
    var forms = getForms(data);
    // to finish   
}

(async () => {
    var data = await fetchHost('www.google.com', '');
    console.log(getForms(data));
})();
