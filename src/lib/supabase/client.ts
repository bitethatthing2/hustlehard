// src/lib/supabase/client.ts

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Ensure environment variables are loaded (e.g., in .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
    try {
        // Create the Supabase client instance
        supabase = createClient(supabaseUrl, supabaseAnonKey);
        console.log("Supabase client initialized successfully.");
    } catch (error) {
        console.error("Supabase client initialization error:", error);
    }

} else {
    console.warn(
        "Supabase URL or Anon Key is missing in environment variables. Supabase client not initialized. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
}

// Export the initialized client (or null if initialization failed)
export { supabase };

// Export default client as well for potential convenience
export default supabase;