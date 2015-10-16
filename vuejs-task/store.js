(function (exports) {

	'use strict';

	var STORAGE_KEY = 'task-vuejs';

	exports.taskStorage = {
		fetch: function () {
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		},
		save: function (tasks) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
		}
	};

})(window);
