import { TMainHeaderInfoTypes, MainTitleHeader, Scroll, Button, EStyleSizes, EStyleButtonTypes } from '@maidt-cntn/ui';
import { IWAI } from '@emotion/react';
import Style from './DialogContainer.style';
import { useEffect, useMemo, useRef, useState } from 'react';
import Question, { IQuestionProps } from '../../atoms/Question/Question';
import { Property } from 'csstype';
import React from 'react';

interface IDialogContainerProps extends IWAI {
  headerInfo: TMainHeaderInfoTypes | null;
  questionInfo?: IQuestionProps | null;
  vAlign?: Property.AlignContent;
  children?: React.ReactNode;
  submitLabel?: string;
  submitBtnColor?: EStyleButtonTypes;
  submitDisabled?: boolean;
  onSubmit?: () => void;
  bodyId?: string;
  useScroll?: boolean;
}

export const DialogContainer = ({
  headerInfo = null,
  questionInfo = null,
  vAlign = 'flex-start',
  children,
  submitLabel = '제출하기',
  submitBtnColor = EStyleButtonTypes.SECONDARY,
  submitDisabled = false,
  onSubmit,
  bodyId,
  useScroll = true,
}: IDialogContainerProps) => {
  const [titleHeight, setTitleHeight] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const contentWidth = titleRef.current?.clientWidth;

  const topHeight = useMemo(() => {
    if (questionInfo?.text) {
      return titleHeight + 84;
    }
    return 84;
  }, [questionInfo?.text, titleHeight]);

  useEffect(() => {
    const clientHeight = titleRef.current?.clientHeight ?? 0;
    setTitleHeight(clientHeight);
  }, [children, titleRef.current?.clientHeight]);

  return (
    <Style.Wrap>
      {headerInfo && (
        <Style.HeaderWrapper>
          <MainTitleHeader
            pattern={headerInfo.headerPattern ?? 'text'}
            title={headerInfo.headerText}
            titleColor={headerInfo.headerTextColor || 'var(--color-black)'}
            iconType={headerInfo.iconType}
            number={headerInfo.headerNumber}
            subject='math'
          />
        </Style.HeaderWrapper>
      )}
      {questionInfo && (
        <Style.Title ref={titleRef}>
          <Question subject={'math'} size={'large'} markPosition={'-20px 0 0 20px'} {...questionInfo} />
        </Style.Title>
      )}

      <Scroll height={(useScroll && `calc(100% - ${topHeight}px)`) || '100%'} paddingRight={0} useScroll={useScroll} tabIndex={0}>
        <Style.Content ref={contentRef} vAlign={vAlign} id={bodyId} width={contentWidth}>
          {children}
        </Style.Content>
      </Scroll>

      {onSubmit && (
        <Style.SubmitBtn>
          <Button
            label={submitLabel}
            color={submitBtnColor}
            size={EStyleSizes['XX-SMALL']}
            useRound
            disabled={submitDisabled}
            onClick={onSubmit}
            width={'152px'}
          />
        </Style.SubmitBtn>
      )}
    </Style.Wrap>
  );
};

export default DialogContainer;
