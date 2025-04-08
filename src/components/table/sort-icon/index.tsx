import { FC } from 'react';
import { ArrowDown, ArrowUp, ArrowsVertical } from '@carbon/icons-react';
import { Direction } from '../../../types/table_filter';
import { ascDirection, descDirection } from '../../../utils/filter';
import { THEME_COLORS } from '../../../theme/colors';

interface SortIconProps {
  sortState: Direction | false;
}

const SortIcon: FC<SortIconProps> = ({ sortState }) => {
  if (ascDirection(sortState)) {
    return <ArrowDown  style={{ width: 16, height: 16, color: THEME_COLORS.primary.c60 }} />;
  }

  if (descDirection(sortState)) {
    return <ArrowUp style={{ width: 16, height: 16, color: THEME_COLORS.primary.c60 }}/>;
  }

  return <ArrowsVertical width={16} height={16} />;
};

export default SortIcon;
