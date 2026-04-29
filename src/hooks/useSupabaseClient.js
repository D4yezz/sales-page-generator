"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

let supabaseClientInstance = null;

export function useSupabaseClient() {
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (supabaseClientInstance) {
        setClient(supabaseClientInstance);
        setIsLoading(false);
        return;
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
          "Missing Supabase credentials in environment variables",
        );
      }

      supabaseClientInstance = createClient(supabaseUrl, supabaseAnonKey);
      setClient(supabaseClientInstance);
      setIsLoading(false);
    } catch (err) {
      console.error("Error initializing Supabase client:", err);
      setError(err);
      setIsLoading(false);
    }
  }, []);

  return { client, isLoading, error };
}
