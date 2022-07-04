function DeepFreeze(object) {
	Object.keys(object).forEach(prop => {
		if (typeof object[prop] === "object"){
			DeepFreeze(object[prop]);
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

const exports = { DeepFreeze, IMECompositionFilter };
export { DeepFreeze, IMECompositionFilter };

window.utils = exports;