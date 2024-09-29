function highlight(el, text) {
	const elms = document.getElementsByClassName('highlight')
	while (elms.length != 0) {
		elms[0].classList.remove('highlight')
	}

	highlight_real(el, text)
}

function highlight_real(el, text) {
	if (el.children.length != 0) {
		for (let i = el.children.length - 1; i >= 0; i--) {
			const child = el.children[i];
			highlight_real(child, text)
		}
		return
	}

	if (el.innerText != undefined && el.innerText.toLowerCase().indexOf(text) != -1) {
		el.classList.add('highlight')
		el.parentElement.scrollIntoView()
	}
}
