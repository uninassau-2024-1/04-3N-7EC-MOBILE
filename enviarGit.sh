find . -type d -name '.angular'     -exec rm -rf {} +
find . -type d -name '.nx'          -exec rm -rf {} +
find . -type d -name '.vscode'      -exec rm -rf {} +
find . -type d -name 'node_modules' -exec rm -rf {} +

# find GRP* -print | sort | while read filename; do
#     touch $filename;
#     git rm -r --cached $filename;
#     git add $filename;
#     git update-index --no-assume-unchanged $filename
# done

git add . -A
git commit -m 'Repositório fechado.'
git push origin main --force
