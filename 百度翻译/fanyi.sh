#/bin/bash
src=$1
echo 英文:$1
src=${src// /+}

s=$(curl -o temp.json -d "from=en&to=zh&query=$src" "http://fanyi.baidu.com/v2transapi" 2>>/dev/null)

python ./fanyi.py
 



