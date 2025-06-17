import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Layout } from '../components/Layout';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<any>(null);
  const [uwarpData, setUwarpData] = React.useState({
    current: 0,
    max: 0,
    percentage: 0
  });

  React.useEffect(() => {
    // Obtener usuario actual
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        // Aquí más adelante cargaremos los datos de UWarp
        // Por ahora usamos datos de ejemplo
        setUwarpData({
          current: 75,
          max: 120,
          percentage: 62.5
        });
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header del Dashboard */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Bienvenido, {user?.email || 'Usuario'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Grid de widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Widget de Combustible UWarp */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-lg p-6 border border-yellow-500/20">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">
              Combustible Warp ⚡
            </h2>
            
            {/* Medidor circular */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-gray-700"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - uwarpData.percentage / 100)}`}
                  className="text-yellow-500 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{uwarpData.current}</div>
                  <div className="text-xs text-gray-400">UWarp</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-400">
                {uwarpData.current} / {uwarpData.max} UWarp disponibles
              </p>
              <button className="mt-3 text-yellow-500 hover:text-yellow-400 text-sm transition-colors">
                Recargar combustible →
              </button>
            </div>
          </div>

          {/* Widget de Actividad Reciente */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-lg p-6 border border-yellow-500/20">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">
              Actividad Reciente 📊
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-800">
                <span className="text-sm text-gray-400">Chat con NOVA AI</span>
                <span className="text-xs text-gray-500">Hace 5 min</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-800">
                <span className="text-sm text-gray-400">Nuevo contacto CRM</span>
                <span className="text-xs text-gray-500">Hace 1 hora</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-400">WhatsApp mensaje enviado</span>
                <span className="text-xs text-gray-500">Hace 2 horas</span>
              </div>
            </div>
          </div>

          {/* Widget de Quick Actions */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-lg p-6 border border-yellow-500/20">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">
              Acciones Rápidas 🚀
            </h2>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 text-sm font-medium transition-all">
                💬 Nuevo Chat IA
              </button>
              <button className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 text-sm font-medium transition-all">
                👥 Agregar Contacto
              </button>
              <button className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 text-sm font-medium transition-all">
                📱 Conectar WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Sección Coming Soon */}
        <div className="mt-12 bg-gray-900/30 rounded-lg p-8 border border-gray-800 text-center">
          <h3 className="text-2xl font-bold text-gray-300 mb-4">
            🚧 En Construcción
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Estamos trabajando en traerte las mejores herramientas de IA, CRM y automatización.
            Tu hub tecnológico empresarial estará listo muy pronto.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 text-sm">
              IA Assistant
            </span>
            <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-400 text-sm">
              CRM
            </span>
            <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-400 text-sm">
              WhatsApp
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
