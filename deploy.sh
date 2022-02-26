cd book

rm -rf .git

date=$(date '+%Y-%m-%d %H:%M:%S')

git init
git add -A
git commit -m $(date '+%Y-%m-%d')

git push -f https://github.com/SinoAHpx/Mirai.Net.Documents.git master:new-gh-pages

cd ..