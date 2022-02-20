cd book

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/SinoAHpx/Mirai.Net.Documents.git master:new-gh-pages

cd ..