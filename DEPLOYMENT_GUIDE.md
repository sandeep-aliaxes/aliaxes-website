# Deploying aliaxestech.com

This project is a Vite + React app. The fastest, free path to get it live on your
GoDaddy domain is: **GitHub → Vercel → point GoDaddy DNS at Vercel.**

---

## 1. Add your missing assets

Open the `public/` folder and check `ASSETS_NEEDED.txt` — drop in your logo, video,
and product images with the exact filenames listed. Then delete that txt file.

## 2. Test it locally (optional but recommended)

```bash
npm install
npm run dev
```

Open the local URL it prints and click through every page to confirm everything
looks right before you publish.

## 3. Push the project to GitHub

1. Create a new repository on [github.com](https://github.com) (e.g. `aliaxes-website`).
2. In this project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/aliaxes-website.git
   git push -u origin main
   ```

## 4. Deploy on Vercel (free)

1. Go to [vercel.com](https://vercel.com) → sign up/log in with your GitHub account.
2. Click **Add New → Project**, select your `aliaxes-website` repo.
3. Vercel auto-detects Vite. Leave the defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. In ~1 minute you'll get a live URL like
   `aliaxes-website.vercel.app` — confirm the site works there first.

## 5. Connect your GoDaddy domain

1. In your Vercel project, go to **Settings → Domains** and add:
   - `aliaxestech.com`
   - `www.aliaxestech.com`
2. Vercel will show you DNS records to add. Typically:
   - **A record** — Host: `@` → Value: `76.76.21.21`
   - **CNAME record** — Host: `www` → Value: `cname.vercel-dns.com`
   (Vercel shows the exact current values on this screen — use those, they can change.)
3. Log into **GoDaddy → My Products → DNS** for aliaxestech.com.
4. Edit/add those same records:
   - Delete any existing `A` record on `@` and `CNAME` on `www` that conflict.
   - Add the `A` record and `CNAME` record exactly as Vercel showed you.
5. Save. DNS changes usually take effect in 10–60 minutes, sometimes up to 24–48 hours.
6. Back in Vercel, the domain status will flip to **Valid** once it detects the DNS,
   and it automatically issues a free SSL certificate (https).

## 6. Final check

Visit `https://aliaxestech.com` and `https://www.aliaxestech.com` — both should load
your site securely.

---

### Alternatives to Vercel
- **Netlify** — nearly identical flow (drag-and-drop or GitHub-connected), same DNS approach.
- **Cloudflare Pages** — also free, and a good option if you want to also move your
  domain's nameservers to Cloudflare for extra performance/security features.

### Ongoing updates
Once connected, any `git push` to your `main` branch automatically redeploys the
live site — no need to touch GoDaddy or DNS again.
