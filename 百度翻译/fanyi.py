#!/usr/bin/python
import json
import os
f = file("temp.json")
s = f.read()
data = json.loads(s)
print data["trans_result"]["data"][0]["dst"] 
f.close()
os.remove("./temp.json")
