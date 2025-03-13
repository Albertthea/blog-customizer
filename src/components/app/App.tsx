import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import styles from '../../styles/index.module.scss';

export const App = () => {
  const [articleStyles, setArticleStyles] = useState({
    fontFamily: defaultArticleState.fontFamilyOption.value,
    fontSize: defaultArticleState.fontSizeOption.value,
    fontColor: defaultArticleState.fontColor.value,
    contentWidth: defaultArticleState.contentWidth.value,
    backgroundColor: defaultArticleState.backgroundColor.value,
  });

  return (
    <main
      className={styles.main}
      style={
        {
          '--font-family': articleStyles.fontFamily,
          '--font-size': articleStyles.fontSize,
          '--font-color': articleStyles.fontColor,
          '--container-width': articleStyles.contentWidth,
          '--bg-color': articleStyles.backgroundColor,
        } as CSSProperties
      }
    >
      <ArticleParamsForm
        onApply={setArticleStyles}
      />
      <Article />
    </main>
  );
};
