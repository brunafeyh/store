import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Role } from '../schemas/auth'
import UserService from '../service/person'
import { User } from '../schemas/person'

export const useUsers = (role: Role) => {
    const path = role === 'CLIENT' ? 'clients' : 'employees'
    const service = new UserService(path)

    const fetchUsers = async (): Promise<User[]> => {
        return await service.listUsers()
    }

    const options: UseQueryOptions<User[], Error> = {
        queryKey: ['users', role],
        queryFn: fetchUsers,
    }

    return useQuery(options)
}
