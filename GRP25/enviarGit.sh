find . -type d -name '.angular'     -exec rm -rf {} +
find . -type d -name '.nx'          -exec rm -rf {} +
find . -type d -name '.vscode'      -exec rm -rf {} +
find . -type d -name 'node_modules' -exec rm -rf {} +

git add .
git commit -m 'Revisão Projeto 2'
git push origin main
