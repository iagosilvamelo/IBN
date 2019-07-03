const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

//
//	Compila SASS e gera arquivo vomprimido
//
function compilaSass() {
	return gulp
		// Caminho do SASS
		.src('sass/**/*.scss')
		// Seta para comprimir o resultado css
		.pipe(sass({outputStyle: 'compressed'}))
		// Seta para o resultado css ser compativel com versões anteriores
		.pipe(autoprefixer({overrideBrowserslist: ['last 5 versions'],cascade: false}))
		// Caminho do css
		.pipe(gulp.dest('../public/css/'))
		// Atualiza o Browser Sync
		.pipe(browserSync.stream());
}
gulp.task('sass', compilaSass);

//
//	Função para juntar o JS
//
function gulpJS(){
	return gulp
		.src('js/**/*.js')
		.pipe(concat('app.js'))
		.pipe(babel({
    		presets: ["@babel/preset-env"]
  		}))
		.pipe(uglify())
		.pipe(gulp.dest('../public/js/'))
		.pipe(browserSync.stream());
}
gulp.task('mainjs', gulpJS);


//
//	Verifica mudanças no html e cria servidor atualizado automaticamente
//
function browser() {
	browserSync.init({ 
		// server: {
		// 	baseDir: "./"
		// } 
		proxy: 'http://127.0.0.1:8000'
	});
}
gulp.task('browser-sync', browser);


//
//	Monitora mudanças nos arquivos
//
function watch() {
	gulp.watch('sass/**/*.scss', compilaSass);
	gulp.watch('js/**/*.js', gulpJS);
	gulp.watch(['views/**/*.php']).on('change', browserSync.reload);
}
gulp.task('watch', watch);


gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs'));
//
//	No Linux pode haver erro de ENOPS
//	Usar o seguinte comanto:
//	'echo fs.inotify.max_user_watches = 524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p'
//