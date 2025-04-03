import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthService } from '../service/auth'
import { CreateAccountSubmitFormData } from '../schemas/auth'
import { toast } from 'react-toastify'

const service = new AuthService()

const useRegisterClientMutations = () => {
    const queryClient = useQueryClient()

    const registerClientMutation = useMutation({
        mutationFn: async (form: CreateAccountSubmitFormData) => {
            await service.createClient(form)
        },
        onError: (error) => {
            toast.error(`Erro na criação de Conta: ${error}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['client'] })
            toast.success('Conta criada com sucesso!')
        },
    })

    return {
        registerClientMutation
    }
}

export default useRegisterClientMutations
