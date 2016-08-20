# -*- encoding:utf-8 -*-

__author__ = 'SHENOISZ'

import os
import re

class Playlist():
    
    def get_ext(self, args):
        
        try:
            files = str(args)
            divid = files.split('.')
            ext = divid[len(divid) - 1] 

            return ext

        except:
            return None    

    def get_path(self, args):
        
        full_path = str(args)
        full_size = len(full_path)

        music = full_path.split('/')
        music = len(music[len(music) - 1])
        full_path = full_path[: full_size - music]

        return full_path
        
    def get_medias(self, args):
        
        media_regex = re.compile("mp4|mp3|aac|ogg|avi|flv|mkv")
        media_all = []
        path = self.get_path(args)

        for media in os.listdir(path):
            if media_regex.findall(self.get_ext(media)):
                media_all.append({'fullname': path + media, 'name': media})
       
        #print(media_all)
        return media_all

