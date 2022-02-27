mdbook build

cd book

date=$(date '+%Y-%m-%d-%H-%M-%S')

git init
git add -A
git commit -m $date

git push -f https://github.com/SinoAHpx/Mirai.Net.Documents.git master:new-gh-pages

rm -rf .git

cd ..