"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
const API_URL = process.env.NEXT_PUBLIC_API_URL;




type User = {
	id: number;
	nome: string;
	email: string;
	papel: string;
	
	
	
};

type AuthContextType = {
	user: User | null;
	token: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const initAuth = () => {
			try {
				const storedToken = localStorage.getItem("token");
				const storedUser = localStorage.getItem("user");

				if (storedToken && storedUser) {
					const parsedUser = JSON.parse(storedUser);
					setToken(storedToken);
					setUser(parsedUser);
					api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
				} else {
					setToken(null);
					setUser(null);
					delete api.defaults.headers.common.Authorization;
				}
			} catch (error) {
				console.error("Erro ao inicializar autenticação:", error);
				setToken(null);
				setUser(null);
				localStorage.removeItem("token");
				localStorage.removeItem("user");
			} finally {
				setIsLoading(false);
			}
		};

		initAuth();
	}, []);

	const login = async (email: string, password: string) => {
		try {
			setError(null); // Limpar erro anterior
			const response = await api.post("/auth/login", {
				email,
				senha: password,
			});

			const { token, usuario } = response.data;

			

		

			setToken(token);
			setUser(usuario);
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(usuario));
			api.defaults.headers.common.Authorization = `Bearer ${token}`;

			// 👉 Redireciona para a home
			router.push("/");
		} catch (error: any) {
			// Exibe todos os detalhes do erro para diagnóstico
			console.error("Erro no login:", error);
			if (error.response) {
				// Erro HTTP
				setError(`HTTP ${error.response.status}: ${JSON.stringify(error.response.data)}`);
			} else if (error.request) {
				// Sem resposta do servidor
				setError("Sem resposta do servidor. Verifique se o backend está rodando e se o CORS está habilitado.");
			} else {
				// Outro erro
				setError(`Erro: ${error.message}`);
			}
		}
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		setError(null);
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		delete api.defaults.headers.common.Authorization;
		// Remove cookies de autenticação
		document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		router.push("/login");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				login,
				logout,
				isAuthenticated: !!user,
				isLoading,
				error,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}
	return context;
}
