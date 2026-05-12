# Deployment Instructions for Halfa.Plus MVP

The easiest and fastest free way to get this Next.js App Router application live is using **Vercel**, the company behind Next.js. Vercel provides seamless deployment directly from GitHub with zero configuration required.

## Step 1: Push to GitHub
1. Create a new empty repository on your GitHub account.
2. In your local terminal, link your repository and push the code:
   `git remote add origin https://github.com/your-username/halfa-plus.git`
   `git branch -M main`
   `git push -u origin main`

## Step 2: Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **Add New** > **Project**.
3. Import the `halfa-plus` repository you just pushed to GitHub.
4. Vercel will automatically detect that it's a Next.js project. You do not need to change any build commands.
5. Click **Deploy**.

In a few minutes, Vercel will provide you with a live, secure HTTPS URL (e.g., `halfa-plus.vercel.app`) where your MVP will be publicly accessible.

Since the MVP uses `localStorage` (via Zustand) to persist ticket orders and check-ins, the site will function perfectly as a static client-side demo without needing a backend database yet.
