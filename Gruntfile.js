module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			'chrome-ruler': {
				files: ['src/chrome-ruler.js'],
				tasks: ['exec:chrome-ruler'],
				options: {
					interupt: true,
					atBegin: true
				}
			}
		},
		exec: {
			'chrome-ruler': {
				cmd: 'echo 1',
				stdout: true,
				stderr: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-exec');
}
