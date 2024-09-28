import { WebContentsView } from "electron";

/*
focus given selector inside view with thick, red border

e.g.:

embedView.webContents.on("did-finish-load", async () => {
    colorFocus(embedView, 'div');
});

*/
export function colorFocus(view: WebContentsView, selector: any) {
    var generatedCode = `const e = document.querySelector('${selector}'); console.log(e); e.style.borderStyle = 'solid'; e.style.borderColor = 'red'; e.style.borderWidth = 'thick';`;
    view.webContents.executeJavaScript(generatedCode);
}