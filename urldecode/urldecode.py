import urllib2
import sys
if __name__ == '__main__':
    print urllib2.unquote(sys.argv[1]).decode('utf-8')


