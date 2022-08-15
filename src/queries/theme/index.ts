import { useQuery } from 'react-query';
import { getViewThemeTreatment } from '../../service';

export const useQueryThemeTreatment = (uId?: string, cId?: string) => {
  return useQuery(['theme'], () => getViewThemeTreatment(uId, cId));
};
