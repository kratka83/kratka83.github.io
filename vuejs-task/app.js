new Vue ({
	el: '#tasks',
	
	data: {
		tasks: taskStorage.fetch(),
		newTask: ''
	},

	watch: {
		tasks: {
			handler: function (tasks) {
			  taskStorage.save(tasks);
			},
			deep: true
		}
	},

	computed: {
		completions: function() {
			return this.tasks.filter(function(task) {
				return task.completed;
			});
		},
		remaining: function() {
			return this.tasks.filter(function(task) {
				return ! task.completed;
			});
		}
	},

	filters: {
		inProcess: function(tasks) {
			return tasks.filter(function(task) {
				return ! task.completed;
			});
		}
	},

	methods: {
		addTask: function(e) {
			e.preventDefault();
			if ( ! this.newTask ) return;
			this.tasks.push({
				body: this.newTask,
				completed: false,
        date: (new Date()).toLocaleString()
			});
			this.newTask = '';
		},
		editTask: function(task) {
			this.removeTask(task);
			this.newTask = task.body;
			this.$$.newTask.focus();
		},
		toggleTaskCompletion: function(task) {
			task.completed = ! task.completed;
		},
		completeAll: function() {
			this.tasks.forEach(function(task) {
				task.completed = true;
			});
		},
		removeTask: function(task) {
			this.tasks.$remove(task);
		},
		clearCompleted: function() {
			this.tasks = this.tasks.filter(function(task) {
				return ! task.completed;
			});
		}
	}
})
