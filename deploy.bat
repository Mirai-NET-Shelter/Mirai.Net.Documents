cd book

@echo off
setlocal
for /f "skip=8 tokens=2,3,4,5,6,7,8 delims=: " %%D in ('robocopy /l * \ \ /ns /nc /ndl /nfl /np /njh /XF * /XD *') do (
 set "dow=%%D"
 set "month=%%E"
 set "day=%%F"
 set "HH=%%G"
 set "MM=%%H"
 set "SS=%%I"
 set "year=%%J"
)


git init
git add -A
git commit -m '%year%-%month%-%day% %HH%:%MM%:%SS%'

git push -f https://github.com/SinoAHpx/Mirai.Net.Documents.git master:new-gh-pages

cd ..

endlocal