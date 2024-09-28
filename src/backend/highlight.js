function highlight(el, text) {
	if (el.children.length != 0) {
		for (const child of el.children) {
			highlight(child, text)
		}
		return
	}

	if (el.innerText != undefined && el.innerText.toLowerCase().indexOf(text) != -1) {
		el.parentElement.style.border = "4px solid yellow"
		el.style.background = "rgba(252, 232, 180, 0.5)"
		el.scrollIntoView()
	}
}
