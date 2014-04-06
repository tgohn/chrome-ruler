module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			'chrome-ruler': {
				files: ['src/chrome-ruler.js', 'src/chrome-ruler/**/*.{js,jsx}'],
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


	grunt.task.registerTask('build-release', 'build stuffs for production', function() {
		if (process.env.NODE_ENV !== 'production')
			return grunt.log.error('Please run node\'s in producion: "NODE_ENV=production grunt build-release"');

		var done = this.async();

		return buildStuffs(done);

		function buildStuffs(cb) {
			var cws = require('fs').createWriteStream;
			var browserStream = browserifying();
			var uglyStream = uglifying();
			var writeFull = cws('./dist/chrome-ruler.js', {encoding: 'utf8'});
			var writeMin = cws('./dist/chrome-ruler.min.js', {encoding: 'utf8'});
			var isFullFinished, isMinFinished;

			uglyStream.pipe(writeMin);  // pipe to min file
			writeFull.on('finish', function(){
				isFullFinished = true;
				notifyCb();
			});
			writeMin.on('finish', function() {
				isMinFinished = true;
				notifyCb();
			});

			getCurrentCommit(function(err, commit) {
				var prefix = '/* Commit: <commit>. Built on: <time> */\n';
				prefix = prefix
									.replace('<commit>', commit.trim())
									.replace('<time>', new Date().toUTCString());

				// we append prefixes before writing to distributed files
				writeFull.write(prefix);
				writeMin.write(prefix);

				browserStream.pipe(writeFull);  // start writing un-minified file
				browserStream.pipe(uglyStream); // start feeding data to uglify
			});

			function notifyCb() {
				// when both files has been written successfully
				if (isFullFinished && isMinFinished)
					cb();
			}
		}

		// return a stream
		function browserifying() {
			var browserify = require('browserify');
			var reactify = require('reactify');

			var b = browserify(['./src/chrome-ruler.js']);
			b.transform(reactify);
			return b.bundle();
		}

		// return a stream
		function uglifying() {
			var es = require('event-stream');
			var minify = require('uglify-js').minify;

			return es.pipeline(
				es.wait(),
				es.map(function(data, done) {
					var options = {compress: true, mangle: true, fromString: true, comments: true};
					var minified = minify(data, options).code;

					return done(null, minified);
				})
			);
		}

		// cb style
		function getCurrentCommit(cb) {
			var exec = require('child_process').exec;
			exec('git rev-parse HEAD', cb);
		}
	});
};
