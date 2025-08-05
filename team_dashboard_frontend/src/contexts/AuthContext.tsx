import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient, User } from "@supabase/supabase-js";
import type { Session } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  role: string | null;
  login: (email: string, password: string) => Promise<{ error?: string|null }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  role: null,
  login: async () => ({}),
  logout: async () => {}
});

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // PUBLIC_INTERFACE
  async function getRoleForUser(uid?: string | null): Promise<string | null> {
    if (!uid) return null;
    // Assume user_roles table {id, user_id, role}
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", uid)
      .single();
    if (error || !data) return null;
    return data.role;
  }

  useEffect(() => {
    const currentSession = supabase.auth.getSession();
    currentSession.then(async ({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        const roleVal = await getRoleForUser(data.session.user.id);
        setRole(roleVal);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setRole(await getRoleForUser(session.user.id));
        } else {
          setRole(null);
        }
        setLoading(false);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // PUBLIC_INTERFACE
  const login = async (email: string, password: string) => {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    // Fetch role after login if possible
    if (!error && data.session?.user) {
      const userId = data.session.user.id;
      const roleValue = await getRoleForUser(userId);
      setRole(roleValue);
      setUser(data.session.user);
      setSession(data.session);
    }
    setLoading(false);
    return { error: error?.message ?? null };
  };

  // PUBLIC_INTERFACE
  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
