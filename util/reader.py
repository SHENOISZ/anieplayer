# -*- encoding:utf-8 -*-

class Reader():
    
    def write(self, args, content):
        
        text = open(args, 'w')
        html = text.write(content)
        text.close()

    def read(self, args):

        text = open(args, 'r')
        html = text.read()
        text.close()
        html = str(html)

        temp = html.split('<audio id="player" src="')[1]
        temp = temp.split('"')[0]

        html = html.replace(
                '<audio id="player" src="' + temp + '"></audio>',
                '<audio id="player" src="{0}"></audio>'
                )

        temp_2 = html.split('<span class="music-title">')[1]  
        temp_2 = temp_2.split('<')[0]   

        html = html.replace(
                '<span class="music-title">' + temp_2 + '</span>',
                '<span class="music-title">{1}</span>'
                )   

        return html

    def add(self, args, music):
        
        music = str(music)
        html = str(self.read(args))
        html = html.format(music, self.music_name(music))    
        self.write(args, html)

    def music_name(self, args):

        # get name
        music = str(args).split('/')
        music = music[len(music) - 1]
        # get extension
        temp = music.split('.')
        ext = temp[len(temp) - 1]
        music = music.replace('.' + ext, '')
        return music     
