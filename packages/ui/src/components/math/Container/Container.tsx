import {
  Button,
  EStyleSizes,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  MainTitleHeader,
  AudioPlayer,
  IAudioPlayerProps,
  Scroll,
} from '@maidt-cntn/ui';
import { IWAI } from '@emotion/react';
import Style from './Container.style';
import { useEffect, useMemo, useRef, useState } from 'react';
import Question, { IQuestionProps } from '../../atoms/Question/Question';
import { Property } from 'csstype';
import React from 'react';

interface IContainerProps extends IWAI {
  headerInfo: TMainHeaderInfoTypes | null;
  questionInfo?: IQuestionProps | null;
  useExtend?: boolean;
  vAlign?: Property.AlignContent;
  children?: React.ReactNode;
  useLinkLabel?: boolean;
  linkLabel?: string;
  onLink?: () => void;
  submitLabel?: string;
  submitBtnColor?: EStyleButtonTypes;
  submitDisabled?: boolean;
  onSubmit?: () => void;
  audioInfo?: IAudioPlayerProps | null;
  bodyId?: string;
  background?: string;
  useRound?: boolean;
  useScroll?: boolean;
}

export const Container = ({
  headerInfo = null,
  questionInfo = null,
  useExtend = false,
  vAlign = 'center',
  children,
  useLinkLabel = false,
  linkLabel = '',
  onLink,
  submitLabel = '제출하기',
  submitBtnColor = EStyleButtonTypes.SECONDARY,
  submitDisabled = false,
  onSubmit,
  audioInfo = null,
  bodyId,
  background,
  useRound,
  useScroll = true,
}: IContainerProps) => {
  const [titleHeight, setTitleHeight] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const contentWidth = titleRef.current?.clientWidth;

  const topHeight = useMemo(() => {
    if (questionInfo?.text) {
      return titleHeight + 52;
    }
    return 52;
  }, [questionInfo?.text, titleHeight]);

  useEffect(() => {
    const clientHeight = titleRef.current?.clientHeight ?? 0;
    setTitleHeight(clientHeight);
  }, [children, titleRef.current?.clientHeight]);

  return (
    <>
      {background && <Style.Background background={background} useRound={useRound} />}
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
          {audioInfo && (
            <Style.AudioWrapper>
              <AudioPlayer
                audioSrc={audioInfo.audioSrc}
                captionSrc={audioInfo?.captionSrc}
                top={audioInfo?.top}
                right={audioInfo?.right}
                opened={audioInfo?.opened}
                startTime={audioInfo?.startTime}
                audioState={audioInfo?.audioState}
                tabIndex={audioInfo?.tabIndex}
              ></AudioPlayer>
            </Style.AudioWrapper>
          )}
        </Style.HeaderWrapper>
      )}
      {questionInfo && (
        <Style.Title ref={titleRef}>
          <Question subject={'math'} size={'large'} {...questionInfo} />
        </Style.Title>
      )}

      <Scroll height={(useScroll && `calc(100% - ${topHeight}px)`) || '100%'} paddingRight={0} useScroll={useScroll}>
        <Style.Content ref={contentRef} useExtend={useExtend} vAlign={vAlign} id={bodyId} topHeight={topHeight} width={contentWidth}>
          {children}
        </Style.Content>
      </Scroll>

      {(onSubmit || useLinkLabel) && (
        <Style.SubmitBtn>
          {onSubmit && (
            <Button
              label={submitLabel}
              color={submitBtnColor}
              size={EStyleSizes['XX-SMALL']}
              useRound
              disabled={submitDisabled}
              onClick={onSubmit}
              width={'152px'}
            />
          )}
          {useLinkLabel && (
            <Button label={linkLabel} color={EStyleButtonTypes.BROWN} size={EStyleSizes['XX-SMALL']} useRound onClick={onLink} width={'152px'} />
          )}
        </Style.SubmitBtn>
      )}
    </>
  );
};

export default Container;
