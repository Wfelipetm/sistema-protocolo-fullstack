import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { email, senha } = await request.json()

        // Simular validação básica para teste
        if (email === "admin@teste.com" && senha === "123456") {
            return NextResponse.json({
                token: "test-jwt-token-12345",
                usuario: {
                    id: 1,
                    nome: "Administrador",
                    email: "admin@teste.com",
                    papel: "admin"
                }
            })
        }

        // Retornar erro 401 para credenciais inválidas
        return NextResponse.json(
            { error: "Credenciais inválidas" },
            { status: 401 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        )
    }
}
