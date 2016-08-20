# -*- encoding:utf-8 -*-

__author__ = 'SHENOISZ'

from playlist import Playlist

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

        return html    

    def render(self, args, music):

        html = self.read(args)

        # music play and name 
        
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

        # playlist

        lista = Playlist()        

        tem_3 = html.split('<!-- loop -->')[1]

        subs = """
                    <div class="swiper-slide">
                        <img src="images/music-icon.svg" data-name="{0}" data-path="{1}" class="img-thumbnail border-none" onclick='started(this)'>
                        <h5>{2}</h5>
                    </div>
               """ 

        all = "" 

        try:
            for media in lista.get_medias(music):
                nome = self.music_name(media['name'])
                all += subs.format(nome, media['fullname'], nome)   
        
            html = html.replace(tem_3, all) 
            
        except:
            pass          

        return html

    def add(self, args, music):
        
        music = str(music)
        html = str(self.render(args, music))
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
