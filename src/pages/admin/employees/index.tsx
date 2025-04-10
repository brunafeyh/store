import { FC } from "react";
import PageAdminLayout from "../../../layout/page-admin-layout";
import PagesHeader from "../../../components/pages-header";
import { useUsers } from "../../../hooks/use-users";
import Loading from "../../../components/loading";
import { usePaginateArray } from "../../../hooks/use-paginate-array";
import { ColumnDef } from "@tanstack/react-table";
import Table from "../../../components/table";

const TITLE = 'Funcionários'

export const EmployeesPage: FC = () => {
    const { data, isLoading, error } = useUsers('EMPLOYEE')
    const paginatedData = usePaginateArray(data || [])

    const columns: ColumnDef<any, any>[] = [
        {
            accessorKey: 'name',
            header: 'Nome',
            meta: {
                filterVariant: 'text'
            }
        },
        {
            accessorKey: 'email',
            header: 'Email',
            meta: {
                filterVariant: 'text',
            }
        },
    ]
    if (isLoading) return <Loading />
    
    return (
        <PageAdminLayout title={TITLE}>
            <PagesHeader title={TITLE} />
            <Table
                columns={columns}
                data={paginatedData || []}
                totalRows={data?.length || 0}
                isLoading={isLoading}
                error={error}
                renderData={(row) => (
                    <tr key={row.original.id} className="table-row">
                        <td className="table-cell">{row.original.name}</td>
                        <td className="table-cell">{row.original.email}</td>
                    </tr>
                )}
            />
        </PageAdminLayout>
    )
}