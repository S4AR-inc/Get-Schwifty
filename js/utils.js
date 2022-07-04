function deepFreeze(object) {
	Object.keys(object).forEach(prop => {
		if (typeof object[prop] === "object"){
			deepFreeze(object[prop]);
		}
	});
	return Object.freeze(object);
}

function IMECompositionFilter(next, keyboardEvent) {
	if (keyboardEvent.isComposing || keyboardEvent.keyCode === 229) {
		return;
	}
	next(keyboardEvent);
}

const exports = { deepFreeze, IMECompositionFilter };
export { deepFreeze, IMECompositionFilter };

window.utils = exports;