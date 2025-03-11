import { useEffect, useRef, useState } from 'react';
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
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onApply: (settings: {
    fontFamily: string;
    fontSize: string;
    fontColor: string;
    contentWidth: string;
    backgroundColor: string;
  }) => void;
};

export const ArticleParamsForm = ({ isOpen, onOpen, onClose, onApply }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [settings, setSettings] = useState({
    fontFamily: fontFamilyOptions[0],
    fontSize: fontSizeOptions[0],
    fontColor: fontColors[0],
    contentWidth: contentWidthArr[0],
    backgroundColor: backgroundColors[0],
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const clickTarget = e.target as Node;
      if (containerRef.current?.contains(clickTarget)) return;
      onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply({
      fontFamily: settings.fontFamily.value,
      fontSize: settings.fontSize.value,
      fontColor: settings.fontColor.value,
      contentWidth: settings.contentWidth.value,
      backgroundColor: settings.backgroundColor.value,
    });
  };

  const handleReset = () => {
    setSettings({
      fontFamily: fontFamilyOptions[0],
      fontSize: fontSizeOptions[0],
      fontColor: fontColors[0],
      contentWidth: contentWidthArr[0],
      backgroundColor: backgroundColors[0],
    });
  };

  const handleChange = (group: keyof typeof settings, option: OptionType) => {
    setSettings((prev) => ({
      ...prev,
      [group]: option,
    }));
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={isOpen ? onClose : onOpen} />
      {isOpen && (
        <aside ref={containerRef} className={clsx(styles.container, { [styles.container_open]: isOpen })}>
          <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
            
            <Select
			// name="fontFamily"
			title="Шрифт"
			options={fontFamilyOptions}
			selected={settings.fontFamily}
			onChange={(option) => handleChange('fontFamily', option)}
			/>

<			RadioGroup
			name="fontSize"
			title="Размер шрифта"
			options={fontSizeOptions}
			selected={settings.fontSize}
			onChange={(option) => handleChange('fontSize', option)}
			/>

			<Select
			// name="fontColor"
			title="Цвет шрифта"
			options={fontColors}
			selected={settings.fontColor}
			onChange={(option) => handleChange('fontColor', option)}
			/>

			<Select
			// name="backgroundColor"
			title="Цвет фона"
			options={backgroundColors}
			selected={settings.backgroundColor}
			onChange={(option) => handleChange('backgroundColor', option)}
			/>

			<Select
			// name="contentWidth"
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