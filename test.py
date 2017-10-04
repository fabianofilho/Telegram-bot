#!/usr/bin/env python

IDENTIFICATION = "/bot450624598:AAFKGY8CqIReycn7rQGBso8rE3LzztLQsMM" 

SERVICE = ["/getMe","/getUpdates"]

import httplib
c = httplib.HTTPSConnection("api.telegram.org")

request = IDENTIFICATION+SERVICE[0]

c.request("GET", request)
response = c.getresponse()
print response.status, response.reason
data = response.read()
print data

