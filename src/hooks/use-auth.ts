import { useAtom } from "jotai"
import { accessTokenAtom } from "../contexts/auth"
import { useNavigate } from "react-router-dom"
import { AuthService } from "../service/auth"
import { LoginFormData } from "../schemas/auth"
import { useCallback, useMemo } from "react"
import { setAuthorizationHeader } from "../utils/auth"
import { RESET } from 'jotai/utils'
import store_API from "../shared"
import { toast } from "react-toastify"
import { DecodedToken, decodeJwtToken } from "../utils/decode-jwt-token"

const authService = new AuthService()

export const useAuth = () => {
    const [accessToken, setAccessToken] = useAtom(accessTokenAtom)
    const navigate = useNavigate()

    const login = useCallback(async (credentials: LoginFormData) => {
        try {
            const token = await authService.login(credentials)
            setAccessToken(token)
            setAuthorizationHeader({ instance: store_API, token: token })
            console.log(token)
            navigate('/')
            toast.success('Seja bem vindo! Login feito com sucesso!')
            return true
        } catch (error) {
            toast.error('Erro ao fazer login, verifique suas credenciais')
            console.error('Erro ao fazer login:', error)
            return false
        }
    }, [])

    const logout = useCallback(async () => {
        if (!accessToken) return
        setAccessToken(RESET)
        navigate('/login')
    }, [])

    const isAuthenticated = useCallback(() => {
        return accessToken
    }, [accessToken])

    const user = useMemo(() => {
        const decoded: DecodedToken | null = decodeJwtToken(accessToken || '')

        const userValue = {
            name: decoded?.payload.name || '',
            email: decoded?.payload.email || '',
            role: decoded?.payload.role || ''
        }

        return userValue
    }, [accessToken])

    return {
        token: accessToken,
        accessToken,
        login,
        logout,
        isAuthenticated,
        user
    }
}
