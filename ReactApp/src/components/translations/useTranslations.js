import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetTranslationValuesQuery } from '../../redux/apis/translations';
import { add } from '../../redux/slices/missing-translations';

export default function useTranslations({ group, keys = [], fill = true }) {
  const query = useGetTranslationValuesQuery(group);
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.isSuccess) {
      const missings = {
        group,
        keys: keys.filter((key) => !query.data?.some((translation) => translation.key === key))
      };
      dispatch(add(missings));
    }
  }, [query.isSuccess]);

  return {
    translations: {
      ...((fill) ? keys.reduce((translations, key) => ({ ...translations, [key]: `${group}.${key}` }), {}) : {}),
      ...query.data?.reduce((translations, translation) => ({ ...translations, [translation.key]: translation.value }), {})
    },
    ...query
  };
}