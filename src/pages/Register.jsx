import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { API_ENDPOINTS } from '../api/config';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('As senhas não coincidem.');
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(API_ENDPOINTS.REGISTER, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Erro ao criar conta');

            login(data.token, data.user);
            navigate('/dashboard'); // Req: redirect to dashboard after registration
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
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                </div>
                <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">Crie sua conta</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Comece sua blindagem gratuita agora</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
                {error && (
                    <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm font-bold border border-red-100 dark:border-red-900/30 flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Nome Completo</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all text-slate-800 dark:text-slate-100 font-bold"
                        placeholder="Seu Nome"
                        required
                    />
                </div>

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
                    <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all text-slate-800 dark:text-slate-100 font-bold"
                        placeholder="••••••••"
                        required
                        minLength={6}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Confirmar Senha</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
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
                    ) : 'Criar Minha Conta'}
                </button>
            </form>

            <div className="mt-10 text-center text-sm font-bold text-slate-500 dark:text-slate-400 pt-8 border-t border-slate-50 dark:border-slate-800">
                Já possui conta? <Link to="/login" className="text-indigo-600 hover:underline">Fazer login</Link>
            </div>
        </div>
    );
}
