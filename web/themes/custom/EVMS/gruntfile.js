'use strict'
module.exports = function(grunt)
{
  require('time-grunt')(grunt);

  require('jit-grunt')(grunt);

  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'css/styles.css' : 'css/styles.scss',
          'css/custom.bootstrap.css' : 'css/custom.bootstrap.scss',
          'css/slick-product.css': 'css/slick-product.scss',
          'css/slick-banner.css': 'css/slick-banner.scss'
        }
      }
    },
    uglify: { 
      options: { 
          compress: true ,
          mangle: {
            reserved: ['jQuery', 'Backbone']
          }
      }, 
      my_target: {
        files: {
          'js/scripts.min.js': ['js/scripts.js']
        }
      }
    },
    watch: {
      css: {
        files: 'css/*.scss',
        tasks: ['sass','cssmin']
      },
      js:{
        files: 'js/*.js',
        tasks: ['uglify']
      }

    },
    copy: {
      vendor: {
          files: [
          
          {
              expand: true,
              dot: true,
              cwd: 'node_modules/bootstrap/dist/css',
              src: ['*.min.css'],
              dest: 'vendor/bootstrap/css'
          },
          {
            expand: true,
            dot: true,
            cwd: 'node_modules/bootstrap/dist/js',
            src: ['*.min.js'],
            dest: 'vendor/bootstrap/js'
          },
          {
            expand: true,
            dot: true,
            cwd: 'node_modules/font-awesome/css',
            src: ['*.min.css'],
            dest: 'vendor/font-awesome/css'
          },
          {
            //for font-awesome
            expand: true,
            dot: true,
            cwd: 'node_modules/font-awesome',
            src: ['fonts/*.*'],
            dest: 'vendor/font-awesome'
          },
          {
            expand: true,
            dot: true,
            cwd: 'node_modules/jquery.easing',
            src: ['*.min.js'],
            dest: 'vendor/jquery.easing'
          },
          {
            //for slick-carousel
            expand: true,
            dot: true,
            cwd: 'node_modules/slick-carousel/slick',
            src: ['*.min.js','*.gif'],
            dest: 'vendor/slick'
          },
          {
            //for auto complete
            expand: true,
            dot: true,
            cwd: 'node_modules/easy-autocomplete/dist',
            src: ['*.min.js','*.min.css'],
            dest: 'vendor/easy-autocomplete'
          },
          {
            //for ico fonts
            expand: true,
            dot: true,
            cwd: 'node_modules/@icon/icofont',
            src: ['*.woff*','*.woff2','*.eot'],
            dest: 'vendor/icofont'
          },
          {
            expand: true,
            dot: true,
            cwd: 'node_modules/animate.css',
            src: ['*.min.css'],
            dest: 'vendor/animate'
          },
          {
            //for ico fonts
            expand: true,
            dot: true,
            cwd: 'node_modules/@icon/icofont',
            src: ['*.css'],
            dest: 'vendor/icofont'
          },
        ]
      }
    },
    clean: {
      build: {
          src: [ 'vendor']
      }
    },
    imagemin: {
      dynamic: {
          files: [{
              expand: true,                  // Enable dynamic expansion
              cwd: './',                   // Src matches are relative to this path
              src: ['img/*.{png,jpg,gif}'],   // Actual patterns to match
              dest: 'dist/img'                  // Destination path prefix
          }]
      }
  },
  concat: {
    basic_and_extras: {
      files: {
        'dist/css/styles.css': ['dist/css/styles.css'],
        'dist/js/script.js': ['dist/js/script.js'],
      },
    },
  },
    cssmin: {
			maincss: {
				src: 'css/styles.css',
				dest: 'css/styles.min.css'
      },
      bootstrapcss: {
        src: 'css/custom.bootstrap.css',
				dest: 'css/custom.bootstrap.min.css'
      },
      slick_product: {
        src: 'css/slick-product.css',
				dest: 'css/slick-product.min.css'
      },
      slick_banner: {
        src: 'css/slick-banner.css',
				dest: 'css/slick-banner.min.css'
      }

    },
    filerev: {
      options: {
          encoding: 'utf8',
          algorithm: 'md5',
          length: 20
      },

      release: {
      // filerev:release hashes(md5) all assets (images, js and css )
      // in dist directory
          files: [{
              src: [
                  'js/*.js',
                  'css/*.css',
              ]
          }]
      }
  },
    browserSync:{
      dev: {
        bsFiles: {
          src: [
            'css/*.css',
            'js/*.js',
            '*.html',
          ]
        },
        options: {
          watchTask : true,
          server: {
            baseDir: './'
          },
          //proxy: "http://vms.dd:8083",
        }
      }  
    }
  });
  grunt.registerTask('encoding',['filerev']);
  grunt.registerTask('default',['build','watch']);
  grunt.registerTask('build',[
  'clean',
  'copy',
  'sass',
  'cssmin',
  'uglify'
  ]);
};