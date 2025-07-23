"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { UserPlus } from "lucide-react";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [papel, setPapel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const res = await api.post("/auth/cadastro", {
        nome,
        email,
        senha,
        papel,
      });
      setSuccess("Cadastro realizado com sucesso!");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao cadastrar usuário");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
          <div className="mb-4 flex flex-col items-center">
            <span className="bg-blue-100 rounded-full p-3 mb-2">
              <UserPlus className="h-8 w-8 text-blue-700" />
            </span>
            <h2 className="text-2xl font-bold text-blue-700 mb-1">
              Cadastro de Usuário
            </h2>
            <p className="text-sm text-gray-500">
              Crie sua conta para acessar o sistema
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full mt-2 space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Seu nome completo"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="seu@email.com"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Crie uma senha forte"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Papel
              </label>
              <select
                value={papel}
                onChange={(e) => setPapel(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Selecione...</option>
                <option value="admin">Admin</option>
                <option value="user">Usuário</option>
              </select>
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-lg py-2">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-600 text-sm text-center bg-green-50 border border-green-200 rounded-lg py-2">
                {success}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Cadastrar
            </button>
          </form>
          <div className="mt-6 text-sm text-gray-600 text-center">
            Já tem conta?
            <a
              href="/login"
              className="ml-1 text-blue-700 font-semibold hover:underline"
            >
              Entrar
            </a>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-6">
          Sistema desenvolvido para controle de protocolo
        </div>
      </div>
    </div>
  );
}
