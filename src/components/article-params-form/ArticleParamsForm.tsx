import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Option } from '../../ui/radio-group/Option';

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
            <div>
              <h3>Шрифт</h3>
              {fontFamilyOptions.map((opt) => (
                <Option
                  key={opt.value}
                  value={opt.value}
                  title={opt.title}
                  groupName="fontFamily"
                  selected={settings.fontFamily}
                  option={opt}
                  onChange={(option) => handleChange('fontFamily', option)}
                />
              ))}
            </div>

            <div>
              <h3>Размер шрифта</h3>
              {fontSizeOptions.map((opt) => (
                <Option
                  key={opt.value}
                  value={opt.value}
                  title={opt.title}
                  groupName="fontSize"
                  selected={settings.fontSize}
                  option={opt}
                  onChange={(option) => handleChange('fontSize', option)}
                />
              ))}
            </div>

            <div>
              <h3>Цвет шрифта</h3>
              {fontColors.map((opt) => (
                <Option
                  key={opt.value}
                  value={opt.value}
                  title={opt.title}
                  groupName="fontColor"
                  selected={settings.fontColor}
                  option={opt}
                  onChange={(option) => handleChange('fontColor', option)}
                />
              ))}
            </div>

            <div>
              <h3>Ширина контента</h3>
              {contentWidthArr.map((opt) => (
                <Option
                  key={opt.value}
                  value={opt.value}
                  title={opt.title}
                  groupName="contentWidth"
                  selected={settings.contentWidth}
                  option={opt}
                  onChange={(option) => handleChange('contentWidth', option)}
                />
              ))}
            </div>

            <div>
              <h3>Цвет фона</h3>
              {backgroundColors.map((opt) => (
                <Option
                  key={opt.value}
                  value={opt.value}
                  title={opt.title}
                  groupName="backgroundColor"
                  selected={settings.backgroundColor}
                  option={opt}
                  onChange={(option) => handleChange('backgroundColor', option)}
                />
              ))}
            </div>

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