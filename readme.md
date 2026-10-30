# Telsa.io website

This is the static GitHub Pages website for Telsa.io.

## Files
- `index.html` — page content, official news links, contact form, newsletter request form, and member-access modal.
- `style.css` — responsive styling.
- `script.js` — navigation, forms, and Supabase authentication integration.

## Contact messages and newsletter requests
Both forms currently post to FormSubmit for `Agentfrankavila@gmail.com`. The first time the contact form is used, FormSubmit may send an activation email to that inbox. Open that message and confirm the address before submissions can be delivered. Test it after activation.

The newsletter form collects subscription requests by email; it does **not** maintain a mailing list or send bulk newsletters automatically. Connect a mailing-list service before sending newsletters.

## Enable real member registration and login
The signup/login UI is prepared to use Supabase Auth, but account creation will remain inactive until configured:

1. Create a project at https://supabase.com/.
2. In Supabase, open **Project Settings → API** (or API Keys) and copy the Project URL and the publishable/anon key. Do not use a service-role/secret key.
3. In `script.js`, set `SUPABASE_URL` and `SUPABASE_ANON_KEY` to those two values.
4. In Supabase Authentication settings, enable email/password sign-in and configure the site URL and allowed redirect URL to your GitHub Pages URL: `https://futureinnovationhub.github.io/Tesla.io/`.
5. Upload the updated `script.js` to the repository and test signup with an email you control.

## Notifications about new signups
A public browser file cannot safely send a private notification email on its own. To notify `Agentfrankavila@gmail.com` each time a member registers, configure a server-side Supabase Auth hook/Edge Function with an email provider. Do not put email-provider API keys or a Supabase service-role key in `script.js`. The Gmail address alone cannot enable signup alerts.

## Publish on GitHub Pages
Upload `index.html`, `style.css`, `script.js`, and `readme.md` to the repository root on the `main` branch. Keep filenames exact. GitHub Pages should rebuild automatically.

## Notes
- The page links to official sources; it does not automatically import live news headlines.
- Telsa.io is an independent publication and is not affiliated with Tesla, SpaceX, NASA, OpenAI, Elon Musk, or any organization mentioned.
- Do not add passwords, verification codes, or private API keys to public files.

## Latest mobile fixes
The latest `style.css` fixes the small-screen navigation and makes contact/newsletter form fields stack vertically. The HTML references versioned CSS/JS filenames (`?v=3`) to help browsers load the latest files instead of an old cached version.

After uploading all four files, refresh the live site. If the old design remains, close the browser tab and open the site again.

## Important: real member accounts
Uploading files alone cannot activate sign-up/login. You still need to create a Supabase project and add its Project URL and public publishable/anon key to `script.js`. Never use a service-role/secret key. Once you have the Supabase project details, the auth setup can be completed.
