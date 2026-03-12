import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { API_ENDPOINTS } from '../api/config';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(API_ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Erro ao fazer login');

            login(data.token, data.user);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-10 animate-fadeInUp">
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200 rotate-12">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">Bem-vindo de volta</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Acesse sua blindagem digital</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                    <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm font-bold border border-red-100 dark:border-red-900/30 flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all text-slate-800 dark:text-slate-100 font-bold"
                        placeholder="seu@email.com"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                        <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Senha</label>
                        <Link to="/forgot-password" variant="ghost" className="text-xs font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest">Perdeu a senha?</Link>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all text-slate-800 dark:text-slate-100 font-bold"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none hover:opacity-90 transition-all flex justify-center items-center text-lg mt-4"
                >
                    {isLoading ? (
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : 'Entrar no Sistema'}
                </button>
            </form>

            <div className="mt-10 text-center text-sm font-bold text-slate-500 dark:text-slate-400 pt-8 border-t border-slate-50 dark:border-slate-800">
                Novo por aqui? <Link to="/register" className="text-indigo-600 hover:underline">Crie sua conta</Link>
            </div>
        </div>
    );
}
