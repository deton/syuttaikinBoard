#!/usr/bin/python
# coding: utf8
#
# Lync presence to thing shadow of syuttaikinBoard
# */5 *  *   *   1-5     python /home/deton/src/syuttaikinBoard/lyncpresence.py 'http://localhost:8080/LyncUcwa2013/lyncGateway?presences=user1@example.jp' 'http://localhost:35035/things/syuttaikinBoard/shadow'

import sys, urllib2, json, datetime

if len(sys.argv) <= 2:
    print 'Usage: python lyncpresence.py <url of lyncGatewayServlet> <url of device shadow>'
    quit()
url = sys.argv[1]
posturl = sys.argv[2]

def update_shadow(presences):
    desired = {}
    # {"taro@example.com":"Away", "jiro@example.com":"Online", ...}
    for email in presences.keys():
        if email == 'ResponseCode':
            continue
        if presences[email] == 'Offline':
            desired[email] = 0;
        else:
            desired[email] = 1;
    headers = {"Content-Type": "application/json"}
    state = {"state": {"desired": desired}}
    json_data = json.dumps(state).encode("utf-8")
    try:
        req = urllib2.Request(posturl, data=json_data, headers=headers)
        r = None
        r = urllib2.urlopen(req, timeout=60)
        respbody = r.read()
    except Exception, err:
        print '{} HTTP error: {}'.format(datetime.datetime.now(), err)
        sys.stdout.flush()
    finally:
        if r: r.close()

def geturl(url):
    presences = None
    try:
        r = None
        r = urllib2.urlopen(url, timeout=60)
        presences = json.loads(r.read())
    except Exception, err:
        print '{} HTTP error: {}'.format(datetime.datetime.now(), err)
        sys.stdout.flush()
    finally:
        if r: r.close()
    return presences

def main():
    #presences = {"user1@example.jp": "Online"} # DEBUG
    presences = geturl(url)
    if presences:
        update_shadow(presences)

if __name__ == "__main__":
    main()
