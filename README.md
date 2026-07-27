# VAPerforma

Latest corrected VAPerforma website build.

## Included

- Official uploaded VAPerforma logo
- Standing 360-degree vertical-axis logo rotation
- Hover to pause the logo animation
- Client-only inquiry form
- Resend email API integration
- Vercel-ready Next.js project

## Run locally

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Deploy

```powershell
npm run build
npx vercel --prod --force
```
