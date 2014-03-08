module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			'chrome-ruler': {
				files: ['src/chrome-ruler.js', 'src/chrome-ruler/**/*.{js.jsx}'],
				tasks: ['exec:chrome-ruler'],
				options: {
					interupt: true,
					atBegin: true
				}
			}
		},
		exec: {
			'chrome-ruler': {
				cmd: 'browserify -d -t reactify -e ./src/chrome-ruler.js -o ./dist/chrome-ruler.js',
				stdout: true,
				stderr: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-exec');
}
