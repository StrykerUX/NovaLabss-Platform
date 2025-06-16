import { createClient } from '@supabase/supabase-js'

// Verificar que las variables de entorno existan
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Por favor configura las variables REACT_APP_SUPABASE_URL y REACT_APP_SUPABASE_ANON_KEY en tu archivo .env.local'
  )
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Tipos de autenticación
export type AuthError = {
  message: string
  status?: number
}

export type User = {
  id: string
  email: string
  role?: string
  created_at?: string
}
