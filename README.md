# VAPerforma — Long-Scroll Perfected Build

This is the quality-reviewed long-scroll VAPerforma website.

## Included

- Single-page long-scroll layout with fewer page changes
- Aqua, green, and lime brand palette
- Transparent VA logo asset
- Upright `rotateY(360deg)` VA logo animation
- Globe used as the “O” in the PERFORMA wordmark
- Service words link to the exact matching service card
- Expandable and keyboard-accessible service details
- Book a Session buttons automatically preselect the service
- Detailed How It Works cards with hover, focus, and tap transitions
- Optional estimated monthly budget
- Facebook, Instagram, LinkedIn, and TikTok links
- Client-only Resend inquiry workflow
- Stronger validation, request-size checks, honeypot protection, and minimum form-completion timing
- Legacy page routes redirect to the correct long-scroll section

## Replace the existing GitHub project files

Copy the contents of this folder into:

```text
C:\Users\Gin\Desktop\l6\VAPerforma
```

Keep the existing `.git` folder and your local `package-lock.json`.

## Test locally

```powershell
cd "C:\Users\Gin\Desktop\l6\VAPerforma"
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm install
npm run lint
npm run build
npm run dev
```

Open:

```text
http://localhost:3000
```

Test these items:

1. Click every navigation link.
2. Click a service word in the strip.
3. Expand each service card.
4. Click Book a Session and confirm the correct service is selected.
5. Expand each How It Works step by hover, keyboard focus, and tap.
6. Open every social link.
7. Submit one test inquiry.
8. Confirm the email arrives at `bspartners.vaperforma@gmail.com`.

## Publish through GitHub

```powershell
git add .
git commit -m "Perfect VAPerforma long-scroll revision"
git push origin main
```

Vercel will automatically deploy from the connected `main` branch.

## Vercel environment variables

```text
RESEND_API_KEY
BUSINESS_EMAIL
RESEND_FROM_EMAIL
```

Current testing sender:

```text
VAPerforma Website <onboarding@resend.dev>
```

After `vaperforma.com` is purchased and verified in Resend:

```text
VAPerforma Website <inquiries@vaperforma.com>
```

## Clean dependency installation

This v2 package pins compatible framework and ESLint versions.

```powershell
Remove-Item -Recurse -Force node_modules, .next -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache verify
npm install
npm run check
```

Do not use `npm audit fix --force`.



## v4 reliability fix

The interactive areas now use native browser controls:

- Service **View Details** uses `<details>` and `<summary>`.
- **Book a Session** uses a normal URL link.
- The page reads the service query on the server and preselects the form.
- How It Works cards also use native expandable controls.
- The VA logo is a crisp vector rather than a small raster screenshot.

Run:

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run check
npm run dev
```

For another device on the same network, open `http://192.168.100.5:3000`.
