import '@riotjs/hot-reload'
import { component, register } from 'riot'
import App from './app.riot'

// register
const basename = (path, extension = '') =>
	path.split('/').reverse()[0].replace(extension, '')

const globalComponentsContext = import.meta.webpackContext(
	'./components/global/',
	{ recursive: true, regExp: /[a-zA-Z0-9-]+\.riot/ }
)

globalComponentsContext.keys().map((path) => {
	const name = basename(path, '.riot')

	const component = globalComponentsContext(path)

	register(name, component.default || component)

	return {
		name,
		component,
	}
})

// mount the root tag
component(App)(document.getElementById('root'))
