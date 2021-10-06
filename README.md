# Deploy

Maybe should delete all files on server as well.

```

rm -rf ~/dev/webb-handlingslista/build/handlingslista

npm run build

cp -a -r build/. ../build/handlingslista

// go to /webb-handlingslista/build
scp -r handlingslista/. root@karlssonkristoffer.com:/var/www/html/handlingslista
```