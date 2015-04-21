#/bin/bash
echo 中译英:zh content  ---  英译中按en content
echo 翻译成文言文 towyw content
src=$2
echo 文本:$2
src=${src// /+}
if [ "$1" == "towyw" ]; then
s=$(curl -o temp.json -d "from=zh&to=wyw&query=$src" "http://fanyi.baidu.com/v2transapi" 2>>/dev/null)
elif [ "$1" == "en" ]; then
s=$(curl -o temp.json -d "from=en&to=zh&query=$src" "http://fanyi.baidu.com/v2transapi" 2>>/dev/null)
else
s=$(curl -o temp.json -d "from=zh&to=en&query=$src" "http://fanyi.baidu.com/v2transapi" 2>>/dev/null)
fi
python ./fanyi.py
