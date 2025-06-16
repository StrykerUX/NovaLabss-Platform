import React from 'react'
import { supabase } from './lib/supabase'
import { Layout } from './components/Layout'

function App() {
  const [connectionStatus, setConnectionStatus] = React.useState<'checking' | 'connected' | 'error'>('checking')
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  React.useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      // Intentar obtener la sesión actual (esto verifica la conexión)
      const { data, error } = await supabase.auth.getSession()
      
      if (error) {
        throw error
      }
      
      setConnectionStatus('connected')
      console.log('✅ Supabase conectado correctamente!')
    } catch (error: any) {
      setConnectionStatus('error')
      setErrorMessage(error.message || 'Error desconocido')
      console.error('❌ Error de conexión:', error)
    }
  }

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        {/* Logo */}
        <h1 className="text-7xl font-bold text-yellow-500 mb-8 animate-pulse">
          NovaLabss
        </h1>

        {/* Status de conexión */}
        <div className="bg-black/50 backdrop-blur-xl border border-yellow-500/20 rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Estado de Conexión
          </h2>

          {connectionStatus === 'checking' && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
              <p className="text-gray-400">Verificando conexión con Supabase...</p>
            </div>
          )}

          {connectionStatus === 'connected' && (
            <div className="text-center">
              <div className="text-green-500 text-5xl mb-4">✅</div>
              <p className="text-green-400 font-semibold">¡Supabase conectado correctamente!</p>
              <p className="text-gray-400 mt-2">Tu Hub Tecnológico está listo 🚀</p>
            </div>
          )}

          {connectionStatus === 'error' && (
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">❌</div>
              <p className="text-red-400 font-semibold">Error de conexión</p>
              <p className="text-gray-400 mt-2 text-sm">{errorMessage}</p>
              <button
                onClick={checkConnection}
                className="mt-4 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition-colors"
              >
                Reintentar
              </button>
            </div>
          )}
        </div>

        {/* Info adicional */}
        <div className="mt-8 text-center max-w-2xl">
          <p className="text-gray-400">
            Versión: <span className="text-yellow-500">v0.1.004</span> | 
            Ambiente: <span className="text-yellow-500">Development</span>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default App
