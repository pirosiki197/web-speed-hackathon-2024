import {ArrowBack ,Close, Favorite, FavoriteBorder, NavigateNext, Search} from '@mui/icons-material';

type Props = {
  color: string;
  height: number;
  type: 'ArrowBack' | 'Close' | 'NavigateNext' | 'Favorite' | 'FavoriteBorder' | 'Search';
  width: number;
};

export const SvgIcon: React.FC<Props> = ({ color, height, type, width }) => {
  let Icon;
  switch (type) {
    case 'ArrowBack':
      Icon = ArrowBack;
      break;
    case 'Close':
      Icon = Close;
      break;
    case 'NavigateNext':
      Icon = NavigateNext;
      break;
    case 'Search':
      Icon = Search;
      break;
    case 'Favorite':
      Icon = Favorite;
      break;
    case 'FavoriteBorder':
      Icon = FavoriteBorder;
      break;
  }
  return <Icon style={{ color, height, width }} />;
};
