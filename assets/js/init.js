/*
 *@AUTHOR SHENOISZ
 */
// globals

var playing = true,
    mute = true,
    postionX = 0,
    duration = 0;

// objects globals

var btn_play = $('.player-btn-play'),
    btn_sound = $('.player-btn-sound'),
    player_ = document.getElementById('player'),
    video = $('#video-view'),
    volume_bar = $('.volume-bar'),
    nivel_volume = $('.nivel-volume'),
    progress_bar = $('.progress-bar'),
    progress_nivel = $('.progress-nivel'),
    documento = $(document),
    music_view_open = $('.music-views-open'),
    music_view = $('.music-views');


// var updates

var postionX = volume_bar.offset().left,
    progressX = progress_bar.offset().left;

window.onresize = function() {

    postionX = volume_bar.offset().left;
    progressX = progress_bar.offset().left;
};

// mouse events

btn_play.click(function() {

    if (!playing) {

        player_.play();
        playing = true;
        btn_play.attr('src', 'images/btn-stop.png');

    } else {

        player_.pause();
        playing = false;
        btn_play.attr('src', 'images/btn-play.png');
    }

});

btn_sound.click(function() {

    if (mute) {
        btn_sound.attr('src', 'images/btn-no-sound.png');
        player_.muted = true;
        mute = false;
    } else {
        btn_sound.attr('src', 'images/btn-sound.png');
        player_.muted = false;
        mute = true;

    }
});


// func volume + -

volume_bar.click(function(e) {

    function volumeState() {
        var barra = volume_bar.width();

        function x(args) {

            var y = barra * args;
            y = y / 100;

            return y;
        }

        volume = postionX - e.pageX;
        volume = volume.toString().replace('-', '');
        volume = volume.split('.')[0];

        if (volume <= x(10)) {
            player_.volume = 0.1;
            nivel_volume.css({ 'width': '10%' });

        } else if (volume <= x(20)) {
            player_.volume = 0.2;
            nivel_volume.css({ 'width': '20%' });

        } else if (volume <= x(30)) {
            player_.volume = 0.3;
            nivel_volume.css({ 'width': '30%' });

        } else if (volume <= x(40)) {
            player_.volume = 0.4;
            nivel_volume.css({ 'width': '40%' });

        } else if (volume <= x(50)) {
            player_.volume = 0.5;
            nivel_volume.css({ 'width': '50%' });

        } else if (volume <= x(60)) {
            player_.volume = 0.6;
            nivel_volume.css({ 'width': '60%' });

        } else if (volume <= x(70)) {
            player_.volume = 0.7;
            nivel_volume.css({ 'width': '70%' });

        } else if (volume <= x(80)) {
            player_.volume = 0.8;
            nivel_volume.css({ 'width': '80%' });

        } else if (volume <= x(90)) {
            player_.volume = 0.9;
            nivel_volume.css({ 'width': '90%' });

        } else if (volume > x(90)) {
            player_.volume = 1.0;
            nivel_volume.css({ 'width': '100%' });

        }
    }

    volumeState();
});


// func duration + -

function converterhs(args) {

    var s = args % 60;
    args /= 60;
    var m = args % 60;
    args /= 60;
    var h = args % 24;

    s = parseInt(s).toString();
    m = parseInt(m).toString();
    h = parseInt(h).toString();

    if (s.length < 2) {
        s = '0' + s;
    }

    if (m.length < 2) {
        m = '0' + m;
    }

    if (h.length < 2) {
        h = '0' + h;
    }

    return h + ':' + m + ':' + s;
}

function getSegund(args) {

    var tempo = converterhs(args).split(':');
    var h = tempo[0];
    var m = tempo[1];
    var s = tempo[2];

    h = h * 24;
    m = m * 60;
    s = s * 60;
    m = (h + m) + '.' + s
    m = parseFloat(m);

    return m;
}

function duracao() {

    var duration = $('.progress-duration');

    var time = converterhs(player_.duration);

    if (time != 'NaN:NaN:NaN') {
        duration.html(time);
    }

}


// func duration - +

progress_bar.click(function(e) {

    var progressbar = progress_bar.width();

    var click = progressX - e.pageX;

    click = click.toString().replace('-', '');
    click = click.split('.')[0];

    var x = click / progressbar;
    x = x * 100;

    var y = duration * x;
    y = y / 100;

    player_.currentTime = y;

    progress_nivel.css({ 'width': x + '%' });

    if (x == 100) {
        playing = false;
        btn_play.attr('src', 'images/btn-play.png');
    }
});

// count timer music

setTimeout(function() {

    var count = 1;

    setInterval(function() {

        var tempo = converterhs(player_.currentTime);
        $('.progress-gettime').html(tempo);

        var current = player_.currentTime / player_.duration;
        current = current * 100;

        progress_nivel.css({ 'width': current + '%' });

        if (current == 100) {
            playing = false;
            btn_play.attr('src', 'images/btn-play.png');
        }

    }, 1000);

}, 1000);


// efects

titulo = $('.music-title');
var tam = titulo.html();
tam = tam.length * 11;

titulo.css({ 'width': tam + 'px' });

(function title_efect() {
    titulo.animate({ 'left': '-' + titulo.width() + 'px' }, 8000, function() {
        titulo.css({ 'left': '100%' });
        title_efect();
    });
})();

var exibir = true;

music_view_open.click(function() {

    if (exibir) {

        music_view_open.css({ 'right': '0', 'border-radius': '3px 0 0 3px' });
        music_view_open.html('«');
        exibir = false;
        music_view.animate({ 'width': '100%' }, 800);
    } else {

        music_view_open.css({ 'right': '-20px', 'border-radius': '0 3px 3px 0' });
        music_view_open.html('»');
        exibir = true;
        music_view.animate({ 'width': '0' }, 800);
    }

});

//views slide

var views = [
        '01.mp4',
        '02.mp4',
        '03.mp4',
        '04.mp4'
    ],
    viewCount = 1;

setInterval(function() {
    video.animate({ 'opacity': 0.0 }, 2000, function() {

        video.attr('src', 'views/' + views[viewCount]);
        video.animate({ 'opacity': 0.50 }, 1500);

        viewCount++;
        if (viewCount == views.length) viewCount = 0;
    });
}, 30000);

//start player

documento.ready(function() {

    player_.volume = 0.3;
    nivel_volume.css({ 'width': '30%' });
    player_.play();

    setTimeout(function() {
        duracao();
        duration = player_.duration;
    }, 1000);

    player_.onended = volumeState;

});

// mouse right block

documento.contextmenu(function() {
    return false;
});