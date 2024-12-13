#!/bin/zsh
cd ../frontend
npm run build
cd ../backend
mkdir -p ../backend/public
cp -r ../frontend/dist/* ../backend/public/