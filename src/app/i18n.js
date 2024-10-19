import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getI18nProps = async (locale, namespaces = ['common']) => {
  return {
    ...(await serverSideTranslations(locale, namespaces)),
  };
};

export const getStaticPropsWithI18n = (namespaces) => async ({ locale }) => ({
  props: await getI18nProps(locale, namespaces),
});
