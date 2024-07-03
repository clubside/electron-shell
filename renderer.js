'use strict'

/**
 * Convert all `a` link elements to open in the user's default browser.
 */
function captureLinks() {
	const links = document.getElementsByTagName('a')
	for (const link of links) {
		link.addEventListener('click', (event) => {
			event.preventDefault()
			window.electronAPI.openLink(event.target.href)
		})
	}
}

async function startup() {
	const appSettings = await window.electronAPI.getSettings()
	if (appSettings.homeFolder) {
		document.getElementById('home-folder').value = appSettings.homeFolder
	}
	captureLinks()
}

document.getElementById('set-home-folder').addEventListener('click', async () => {
	const homeFolder = await window.electronAPI.setHomeFolder()
	if (homeFolder) {
		document.getElementById('home-folder').value = homeFolder
	}
})

document.addEventListener('DOMContentLoaded', () => {
	console.log('DOM loaded')
	startup()
})
