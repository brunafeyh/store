import { FC } from 'react';
import { Search } from '@carbon/icons-react';
import styles from './FilterTextField.module.scss';
import { Filter } from '../../../types/filter';

interface FilterInputProps {
  filterType: Filter;
  options?: { label: string; value: any }[] | null;
  value: any;
  onChange: (value: string | number) => void;
}

const FilterTextField: FC<FilterInputProps> = ({ filterType, options, value, onChange }) => {
  if (filterType === 'text' || filterType === 'unknown') {
    return (
      <div className={styles.inputWrapper}>
        <label className={styles.label}>
          <Search className={styles.icon} />
          <input
            type="text"
            placeholder="Pesquisar"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
          />
        </label>
      </div>
    );
  }

  if (filterType === 'number') {
    return (
      <div className={styles.inputWrapper}>
        <label className={styles.label}>
          <input
            type="number"
            placeholder="Número"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
          />
        </label>
      </div>
    );
  }

 // const selectedOption = options?.find((opt) => opt.value === value);

  return (
    <div className={styles.inputWrapper}>
      <select
        className={styles.select}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Selecione</option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterTextField;
