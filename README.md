### To connect the Prisma

```
sudo pscale auth login
```

```
sudo pscale org switch trudy-tube
```

```
sudo pscale connect db main --port 3309
```

### To sync the Prisma

```
npx prisma db push
```

```
pscale shell db main
```

To see if the changes updated

```
describe Song;
```
