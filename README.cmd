@echo OFF

busybox grep -E "^#+ " README.md | sed -e "s/^# \(.*\)$/- \[\1\](#\1)/g" -e "s/^## \(.*\)$/  - \[\1\](#\1)/g" -e "s/^### \(.*\)$/    - \[\1\](#\1)/g" |^
busybox sed -e ":l s/\(([^:)]*\)[:]/\1/;tl" -e ":l s/\(([^ )]*\)[ ]/\1-/;tl"

echo:
echo                DO NOT FORGET to remove the parenthesis in the anchors!
echo:
pause
:: we want to substitute space by - only after the last ]
:: the below used to work but does not anymore
REM -e "s/ /-/4g;s/ \()\)/-\1/"


