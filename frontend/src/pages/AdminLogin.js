import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        username,
        password,
      });
      
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin_username', response.data.username);
      toast.success('Connexion réussie');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4 transition-colors duration-300" data-testid="admin-login-page">
      <div className="max-w-md w-full">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 mb-4 shadow-sm">
            <img
                loading="lazy"
                src="https://customer-assets.emergentagent.com/job_c3efae68-56d0-4924-8ecf-4f7502ce3630/artifacts/34n0n91l_Notre-Dame-d-Autan.png"
              alt="Notre Dame d'Autan"
              className="h-10 w-auto"
            />
          </div>
          <h1 className="font-serif text-3xl text-slate-800 dark:text-slate-100 dark:text-slate-100 mb-1">Administration</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Connectez-vous pour gérer le contenu de votre paroisse</p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 dark:text-slate-300 mb-2">Nom d'utilisateur</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gold/50 bg-slate-50/50 dark:bg-slate-700 text-sm dark:text-slate-200 transition-all focus:bg-white dark:focus:bg-slate-600"
                  placeholder="admin"
                  required
                  data-testid="admin-username-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 dark:text-slate-300 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gold/50 bg-slate-50/50 dark:bg-slate-700 text-sm dark:text-slate-200 transition-all focus:bg-white dark:focus:bg-slate-600"
                  placeholder="••••••••"
                  required
                  data-testid="admin-password-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white py-3 rounded-xl font-medium transition-all disabled:opacity-50 shadow-md shadow-gold/20 hover:shadow-lg hover:shadow-gold/30 flex items-center justify-center gap-2 group"
              data-testid="admin-login-button"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">Notre Dame d'Autan — Espace administrateur</p>
      </div>
    </div>
  );
};

export default AdminLogin;
