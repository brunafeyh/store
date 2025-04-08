import { ChangeEvent, FC, MouseEvent, ReactNode } from 'react';
import { Filter } from '@carbon/icons-react';
import { ColumnDef, Row, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import styles from './Table.module.scss';
import { Popover, usePopover } from '../popover';
import { usePaginationParams } from '../../hooks/params/pagination';
import { useTableFilter } from '../../hooks/use-table-filter';
import { useTableQueryParams } from '../../hooks/use-table-query-paramns';
import { DESCEND } from '../../utils/constants/tables';
import { Direction } from '../../types/table_filter';
import { isEmptyData, isValidHeader } from '../../utils/filter';
import { isFiltered } from '../../utils/table';
import FilterTextField from './filter-text';
import SortIcon from './sort-icon';

interface TableProps {
  columns: ColumnDef<any, any>[];
  data: any[];
  totalRows: number;
  renderData: (row: Row<any>, index: number) => ReactNode;
  isLoading: boolean;
  error: Error | null;
}

const Table: FC<TableProps> = ({ columns, data, totalRows, renderData, isLoading, error }) => {
  const {
    setActiveFilter,
    activeSortColumn,
    setActiveSortColumn,
    getFilterValue,
    setFilterValue,
    getFilterVariantByAccessorKey,
    getOptionsByAccessorKey,
  } = useTableFilter();
  const {
    sorting,
    setSorting,
    filters: columnFilters,
    setFilters: setColumnFilters,
    clearSorting,
    clearFilters,
  } = useTableQueryParams();
  const { page, pageSize, changePage, changePageSize } = usePaginationParams();
  const rowsPerPageOptions = [5, 10, 15, 20];

  const popoverFilter = usePopover();
  const popoverSort = usePopover();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
  });

  const handlePageChange = (_: unknown, newPage: number) => changePage(newPage);

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    changePageSize(Number.parseInt(event.target.value, 10));
  };

  const handleFilterClick = (event: MouseEvent<HTMLElement>, columnId: string) => {
    setActiveFilter(columnId);
    popoverFilter.current?.openPopover(event.currentTarget);
  };

  const handleSortClick = (event: MouseEvent<HTMLElement>, columnId: string) => {
    setActiveSortColumn(columnId);
    popoverSort.current?.openPopover(event.currentTarget);
  };

  const handleSortChange = (direction: Direction) => {
    setSorting([{ id: activeSortColumn!, desc: direction === DESCEND }]);
    popoverSort.current?.closePopover();
  };

  const handleClearSort = () => {
    clearSorting();
    popoverSort.current?.closePopover();
  };

  const handleClearFilter = () => {
    setFilterValue('', table);
    clearFilters();
    popoverFilter.current?.closePopover();
  };

  const isActive = () => {
    if (sorting.length > 0) return activeSortColumn === sorting[0].id;
    return false;
  };

  const isAscActive = isActive() && !sorting[0].desc;
  const isDescActive = isActive() && !isAscActive;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {isValidHeader(header) && (
                    <div className={styles.headerCell}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <button onClick={(e) => handleSortClick(e, header.column.id)}>
                        <SortIcon sortState={header.column.getIsSorted()} />
                      </button>
                      <button onClick={(e) => handleFilterClick(e, header.column.id)}>
                        <Filter className={isFiltered(header.column.getFilterValue()) ? styles.activeFilter : ''} />
                      </button>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td colSpan={columns.length} className={styles.centered}>Erro ao carregar dados.</td>
            </tr>
          ) : isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx}>
                {columns.map((_, colIdx) => (
                  <td key={colIdx} className={styles.skeletonCell}></td>
                ))}
              </tr>
            ))
          ) : isEmptyData(data) ? (
            <tr>
              <td colSpan={columns.length} className={styles.centered}>Nenhum registro encontrado.</td>
            </tr>
          ) : (
            table.getRowModel().rows.map(renderData)
          )}
        </tbody>
      </table>
      {!isLoading && !error && (
        <div className={styles.pagination}>
          <span>Linhas por página:</span>
          <select value={pageSize} onChange={handleRowsPerPageChange}>
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <span>{`${page * pageSize + 1} a ${Math.min((page + 1) * pageSize, totalRows)} de ${totalRows}`}</span>

          <div className={styles.paginationButtons}>
            <button
              onClick={() => handlePageChange(null, Math.max(0, page - 1))}
              disabled={page === 0}
            >
              {'<'}
            </button>
            <button
              onClick={() => handlePageChange(null, page + 1)}
              disabled={(page + 1) * pageSize >= totalRows}
            >
              {'>'}
            </button>
          </div>
        </div>
      )}

      <Popover ref={popoverFilter}>
        <div className={styles.popoverContent}>
          <FilterTextField
            filterType={getFilterVariantByAccessorKey(table)}
            options={getOptionsByAccessorKey(columns)}
            value={getFilterValue(table) || ''}
            onChange={(newValue) => setFilterValue(newValue, table)}
          />
          <button className={styles.clearButton} onClick={handleClearFilter}>Limpar</button>
        </div>
      </Popover>
      <Popover ref={popoverSort}>
        <div className={styles.popoverContent}>
          <button onClick={() => handleSortChange('asc')} className={isAscActive ? styles.active : ''}>↑ Crescente</button>
          <button onClick={() => handleSortChange('desc')} className={isDescActive ? styles.active : ''}>↓ Decrescente</button>
          <button className={styles.clearButton} onClick={handleClearSort}>Limpar</button>
        </div>
      </Popover>
    </div>
  );
};

export default Table;
