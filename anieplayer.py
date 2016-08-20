# -*- encoding:utf-8 -*-

__author__ = 'SHENOISZ'
__version__ = '1.0.0'

import sys
from PyQt4 import QtGui, QtCore
from PyQt4.QtGui import QApplication, QVBoxLayout
from PyQt4.QtWebKit import QWebView
# project
from util.reader import Reader

class AniPlayer(QtGui.QWidget):

    fullscreen = True

    def __init__(self, *args, **kwargs):

        super(AniPlayer, self).__init__()

        local = str(sys.argv[0])
        self.local = local.replace('anieplayer.py', '')

        try:
            self.music = sys.argv[1]

        except:
            self.music = 'AniePlayer'

        make = Reader()
        make.add(self.local + 'assets/index.html', self.music)

        self.initUI()

    def initUI(self): 

        # try media path
  
        # self.setWindowTitle(self.music + '  -  Anieplayer')
        self.setWindowTitle('Anieplayer')

        # create webkit    
        self.resize(960, 410)
        self.view = QWebView(self)
        self.view.load(QtCore.QUrl(self.local + 'assets/index.html'))

        layout = QVBoxLayout(self)
        layout.setMargin(0)
        layout.addWidget(self.view)

        # create button
        btn1 = QtGui.QPushButton("[   ]", self)
        btn1.move(5, 5)
        btn1.resize(30, 20);
        btn1.setStyleSheet(
            'background-color: #03ff00; color: #ffffff; border-radius: 3px;cursor: pointer;'
            )
        btn1.clicked.connect(self.dubbleClicked)

        # show window
        #self.setWindowOpacity(0.99)
        self.show()

    # event button click    
    def dubbleClicked(self):
    
        if self.fullscreen:    
            self.showFullScreen()
            self.fullscreen = False

        else:
            self.showNormal()
            self.fullscreen = True      

    def mouseDoubleClickEvent(self, event):     

        if self.fullscreen:    
            self.showFullScreen()
            self.fullscreen = False

        else:
            self.showNormal()
            self.fullscreen = True   

if __name__ == '__main__':
    
    # instance class
    app = QApplication(sys.argv)        
    ani = AniPlayer()
    sys.exit(app.exec_())

