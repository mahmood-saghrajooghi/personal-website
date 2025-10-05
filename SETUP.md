# Gym Tracker Setup

## Environment Variables Required

To fix the loading issue, you need to create a `.env.local` file in the root directory with your Supabase credentials:

```bash
# Create .env.local file
touch .env.local
```

Add the following content to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Getting Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project or select an existing one
3. Go to Settings → API
4. Copy the Project URL and anon/public key
5. Replace the placeholder values in `.env.local`

## Database Setup

Make sure to run the SQL schema from `supabase-gym-schema.sql` in your Supabase project's SQL editor to create the required tables.

## After Setup

Once you've added the environment variables:
1. Restart your development server (`npm run dev`)
2. The gym page should now load properly
3. You'll see either the authentication form or the gym tracker interface
