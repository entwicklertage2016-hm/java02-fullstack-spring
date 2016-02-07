'use strict';

var gulp = require('gulp');
var config = require('./config');
var proxyMiddleware = require('http-proxy-middleware');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var scriptsToRunOnChange = ['default']

gulp.task('serve', scriptsToRunOnChange, function() {

    var server = {
		baseDir: config.buildPath
	};

    server.middleware = proxyMiddleware(
    	['/api'],
    	{
    		target: 'http://localhost:8080',
    		hostRewrite: true
    	}
    );

    browserSync.instance = browserSync.init({
		startPath: '/',
		server: server
	});

    gulp.watch(config.srcPath + "/**", ['reloadInBrowser']);
});

browserSync.use(browserSyncSpa({
	selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('reloadInBrowser', scriptsToRunOnChange, function() {
    browserSync.reload();
});
