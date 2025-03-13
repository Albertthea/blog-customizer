import { useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';

import {
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontFamilyOptions,
  OptionType,
  defaultArticleState,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useCloseOnOutsideClick } from 'src/ui/select/hooks/useCloseOnOutsideClick';

type Props = {
  onApply: (settings: {
    fontFamily: string;
    fontSize: string;
    fontColor: string;
    contentWidth: string;
    backgroundColor: string;
  }) => void;
};

export const ArticleParamsForm = ({ onApply }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const defaultSettings = {
    fontFamily: defaultArticleState.fontFamilyOption,
    fontSize: defaultArticleState.fontSizeOption,
    fontColor: defaultArticleState.fontColor,
    contentWidth: defaultArticleState.contentWidth,
    backgroundColor: defaultArticleState.backgroundColor,
  };

  const [settings, setSettings] = useState(defaultSettings);
  useCloseOnOutsideClick(isOpen, containerRef, () => setIsOpen(false));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply({
      fontFamily: settings.fontFamily.value,
      fontSize: settings.fontSize.value,
      fontColor: settings.fontColor.value,
      contentWidth: settings.contentWidth.value,
      backgroundColor: settings.backgroundColor.value,
    });
	setIsOpen(false);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
	onApply({
		fontFamily: defaultSettings.fontFamily.value,
		fontSize: defaultSettings.fontSize.value,
		fontColor: defaultSettings.fontColor.value,
		contentWidth: defaultSettings.contentWidth.value,
		backgroundColor: defaultSettings.backgroundColor.value,
	  });
	setIsOpen(false);
  };

  const handleChange = (group: keyof typeof settings, option: OptionType) => {
    setSettings((prev) => ({
      ...prev,
      [group]: option,
    }));
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <aside ref={containerRef} className={clsx(styles.container, { [styles.container_open]: isOpen })}>
          <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
		  <h2 className={styles.title}>Задайте параметры</h2>
            <Select
			title="Шрифт"
			options={fontFamilyOptions}
			selected={settings.fontFamily}
			onChange={(option) => handleChange('fontFamily', option)}
			/>

			<RadioGroup
			name="fontSize"
			title="Размер шрифта"
			options={fontSizeOptions}
			selected={settings.fontSize}
			onChange={(option) => handleChange('fontSize', option)}
			/>

			<Select
			title="Цвет шрифта"
			options={fontColors}
			selected={settings.fontColor}
			onChange={(option) => handleChange('fontColor', option)}
			/>

			<Select
			title="Цвет фона"
			options={backgroundColors}
			selected={settings.backgroundColor}
			onChange={(option) => handleChange('backgroundColor', option)}
			/>

			<Select
			title="Ширина контента"
			options={contentWidthArr}
			selected={settings.contentWidth}
			onChange={(option) => handleChange('contentWidth', option)}
			/>

            <div className={styles.bottomContainer}>
              <Button title="Сбросить" htmlType="reset" type="clear" />
              <Button title="Применить" htmlType="submit" type="apply" />
            </div>
          </form>
        </aside>
      )}
    </>
  );
};