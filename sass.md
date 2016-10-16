# Sassとgulpについて

## Sassの使い方

### 基本的な使い方

例えばこういうマークアップをしたとする。

	<div class="title">
		<h1><span>Sass</span>の使い方</h1>
	</div>

Sassではこう書く

	.title {
		background: #ffffff;
		h1 {
			font-size: 20px;
			line-height: 24px;
			span {
				color: #ff0000;
			}
		}
	}

↓レッツコンパイル

	.title {
	  background: #ffffff;
	}
	.title h1 {
	  font-size: 20px;
	  line-height: 24px;
	}
	.title h1 span {
	  color: #ff0000;
	}

では、一つのタグの中にクラスが2個あったり、:beforeを使う場合はどうするか？

	<div class="title hoge">
		<h1><span>Sass</span>の使い方</h1>
	</div>

&を使って記述する

	.title {
		background: #ffffff;
		&.hoge {
			display: inline-block;
		}
		h1 {
			font-size: 20px;
			line-height: 24px;
			span {
				color: #ff0000;
				&:before {
					content: "";
				}
			}
		}
	}

↓レッツコンパイル

	.title {
	  background: #ffffff;
	}
	.title.hoge {
	  display: inline-block;
	}
	.title h1 {
	  font-size: 20px;
	  line-height: 24px;
	}
	.title h1 span {
	  color: #ff0000;
	}
	.title h1 span:before {
	  content: "";
	}

***

### mixinについて

なんども使うようなスタイルを@mixinで定義し、使うときは@includeで呼び出す。

	@mixin size {
	    width: 50px;
	    height: 50px;
	}

	.box1 {
	    @include size;
	    background: #ffcc00;
	}

	.box2 {
	    @include size;
	    background: #ffff00;
	}

↓レッツコンパイル

	.box1 {
	  width: 50px;
	  height: 50px;
	  background: #ffcc00;
	}

	.box2 {
	  width: 50px;
	  height: 50px;
	  background: #ffff00;
	}

mixinは引数を使うことができ、うまく使うと汎用性が高まる。

	@mixin size($size) {
	    width: $size;
	    height: $size;
	}

	.box1 {
	     @include size(100px);
	     background: #ffcc00;
	}

	.box2 {
	     @include size(80px);
	     background: #ffff00;
	}

↓レッツコンパイル

	.box1 {
	  width: 100px;
	  height: 100px;
	  background: #ffcc00;
	}

	.box2 {
	  width: 80px;
	  height: 80px;
	  background: #ffff00;
	}

***

### extendについて

既に記述してあるスタイルを@extendで呼び出し、呼び出し先と呼び出し元をグルーピングしてくれる。  
このグルーピングがmixinとの一番の違いであり、mixinのように呼び出さないと出力されないということではなく既にあるものを継承するのがextendになる。

	.box {
		margin-top: 15px;
		padding: 10px;
		background-color: #ccc;
		p {
		    line-height: 1.3;
		}
	}

	.contentsBox {
		@extend .box;
		background-color: #eee;
	}

↓レッツコンパイル

	.box, .contentsBox {
	  margin-top: 15px;
	  padding: 10px;
	  background-color: #ccc;
	}
	.box p, .contentsBox p {
	  line-height: 1.3;
	}

	.contentsBox {
	  background-color: #eee;
	}

呼び出し元のスタイルを出力したくない場合はプレースホルダーセレクタを使う。  
＃や.の代わりに%で定義する。

	%box {
		margin-top: 15px;
		padding: 10px;
		background-color: #ccc;
		p {
		    line-height: 1.3;
		}
	}

	.contentsBox {
		@extend %box;
		background-color: #eee;
	}

↓レッツコンパイル

	.contentsBox {
	  margin-top: 15px;
	  padding: 10px;
	  background-color: #ccc;
	}
	.contentsBox p {
	  line-height: 1.3;
	}

	.contentsBox {
	  background-color: #eee;
	}

***

### 変数について

先頭に$をつけた変数を作成することができる。

	$red: #ff0000;

	.hoge {
		font-size: $red;
	}

↓レッツコンパイル

	.hoge {
	  font-size: #ff0000;
	}

***

### パーシャルについて

ファイル名の前に＿をつけると。そのファイルは出力されない。  
このファイルはパーシャルと言い、CSSを分割する際に利用する。  
例えば変数を記述した＿variable.scssというパーシャルを@importで呼び出せば、variable.cssという無駄なファイルを出力せずに必要最低限のCSSが出力できる。

	@import "_variable";

***

### いろいろな便利機能

JSなどプログラミングを得意としている人にはお馴染みのif文やfor文も扱うことができる。

***

### Sassのコマンドラインでの呼び出し方

sassという命令の後に、入力先、出力先、オプションを記述しエンター

	$ sass 【入力パス】.scss:【出力パス】.css --style expanded --watch

--styleで出力形式を変えることができる。Nested、Expanded、Compact、Compressedの4種類。  
--watchでsassの更新を監視することができる。いちいちコンパイルする必要がなくなるが、エラーが出ると監視が止まってしまうので注意。

## gulpの使い方

### gulpのコマンドラインでの呼び出し方

cdでコマンドラインのディレクトリを作業フォルダに移してから、gulpコマンドを入力。

	$ gulp

###gulpfile.jsの簡単な説明

gulpはgulpfile.jsという設定ファイルを作業フォルダのルートディレクトリに設置することで機能する。
以下はSassを使うのに必要最低限な中身についての簡単な説明。

	//gulp及びプラグインをこのように読み込む
	var gulp = require('gulp'),
	    plumber = require('gulp-plumber'),
		sass = require('gulp-ruby-sass'),
		pleeease = require('gulp-pleeease'),
		cssmin = require('gulp-cssmin'),
	    runSequence = require('run-sequence'),

	//必須ではないがこのようにパスを入出力先のパスを設定しておくと便利
	var path = {
	    sass: 'asset/sass/',
	    css: 'asset/css/',
	    cssmin: 'dist/asset/css/'
	}

	//gulpは基本的にタスクを設定し、プラグインを.pipeでチェーンして設定していくことになる
	//gulp-ruby-sassでのタスクの設定
	gulp.task('sass',function(){
		//入力先のパスを設定する。{}の中はgulp-ruby-sassのオプション。
	    return sass(path.sass + '**/*.scss',{
	    	//出力スタイルはexpanded
	        style : 'expanded',
	        //ソースマップ出力の設定
	        'sourcemap=none': true,
	        //コンパスを利用するかの設定
	        compass: true
	    })
	    //gulp-plumberでエラー回避
	    .pipe(plumber())
	    //Sassにいろいろな機能を追加してくれるgulp-pleeease
	    .pipe(pleeease({
	    	//ベンダープレフィックスをどのブラウザバージョンまで利用するか
	        autoprefixer: {
	            'browsers': ['last 4 versions', 'Firefox ESR', 'ie 8', 'Safari 4', 'Android 2.3', 'iOS 4']
	        },
	        //rem指定された単位をpx単位に変換
	        rem: ['10px'],
	        //minifyするか指定
	        minifier: false,
	        //メディアクエリをまとめるか指定
	        mqpacker: true
	    }))
	    //CSSを出力する
	    .pipe(gulp.dest(path.css));
	});

	//CSSをminifyするタスクの設定
	gulp.task('cssmin', function () {
		//minifyするCSSの入力先（この前に出力したCSS）
	    return gulp.src(path.css + '**/*.css')
	    //gulp-plumberでエラー回避
	    .pipe(plumber())
	    //gulp-cssminでminifyする
	    .pipe(cssmin())
	    //gulp-renameでminifyしたCSSの名前を変更（xxx.min.cssというように）
	    .pipe(rename({
	        suffix: '.min'
	    }))
	    //min.CSSを出力する
	    .pipe(gulp.dest(path.cssmin));
	});

	//上記の二つのタスクを、Sass→cssminの順番で処理されるようにcssタスク設定
	gulp.task('css', function(callback) {
	    console.log('--------- CSSを処理します ----------');
	    //run-sequenceを使って順番通りに処理
	    return runSequence('sass','cssmin',callback);
	});

	//監視する
	gulp.task('watch', function() {
		//Sassの入力先ディレクトリを監視
	    gulp.watch((path.sass + '**/*.scss'), ['css']);
	});
	//watchタスクをデフォルトにすることで、コマンドラインでgulpと打つだけで監視できるようにする
	gulp.task('default', ['watch']);
