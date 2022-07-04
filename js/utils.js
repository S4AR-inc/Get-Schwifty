export { deepFreeze };

function deepFreeze(object) {
	Object.keys(object).forEach(prop => {
	  if (typeof object[prop] === 'object') deepFreeze(object[prop]);
	});
	return Object.freeze(object);
}