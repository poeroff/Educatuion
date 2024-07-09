import {
  Button,
  EStyleSizes,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  MainTitleHeader,
  AudioPlayer,
  IAudioPlayerProps,
  Scroll,
  Box,
} from '@maidt-cntn/ui';
import { IWAI } from '@emotion/react';
import Style from './MContainer.style';
import { useEffect, useMemo, useRef, useState } from 'react';
import Question, { IQuestionProps } from '../../atoms/Question/Question';
import { Property } from 'csstype';
import React from 'react';

interface IMContainerProps extends IWAI {
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
  cardType?: 'problem' | 'mainText';
  hasMark?: boolean;
  markIcon?: string;
  markText?: string;
}

export const MContainer = ({
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
  cardType = 'problem',
  hasMark = false,
  markIcon,
  markText,
}: IMContainerProps) => {
  const [titleHeight, setTitleHeight] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);

  const topHeight = useMemo(() => {
    if (questionInfo?.text) {
      return titleHeight + 56;
    }
    return 56;
  }, [questionInfo?.text, titleHeight]);

  useEffect(() => {
    const clientHeight = ref.current?.clientHeight ?? 0;
    setTitleHeight(clientHeight);
  }, [children, ref.current?.clientHeight]);

  useEffect(() => {
    if (ref2.current?.clientHeight && ref3.current?.clientHeight) {
      const scrollHeight = ref2.current?.clientHeight;
      const contentHeight = ref3.current?.clientHeight + 30;
      if (contentHeight > scrollHeight) setIsScroll(true);
    }
  }, [children, ref3.current?.clientHeight]);

  return (
    <>
      {background && <Style.Background background={background} useRound={useRound} />}
      {headerInfo && (
        <Box padding='0 34px 0 42px'>
          <Style.HeaderWrapper>
            <MainTitleHeader
              pattern={headerInfo.headerPattern ?? 'text'}
              title={
                hasMark ? (
                  <>
                    {headerInfo.headerText}
                    <Style.Mark>
                      <Style.MarkIcon>{markIcon}</Style.MarkIcon>
                      <Style.MarkText>{markText}</Style.MarkText>
                    </Style.Mark>
                  </>
                ) : (
                  headerInfo.headerText
                )
              }
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
        </Box>
      )}
      {questionInfo && (
        <Box padding='0 34px 0 42px'>
          <Style.Title ref={ref}>
            <Question subject={'math'} size={'large'} {...questionInfo} />
          </Style.Title>
        </Box>
      )}

      <Scroll ref={ref2} height={(useScroll && `calc(100% - ${topHeight}px)`) || '100%'} paddingRight={0} useScroll={useScroll}>
        <Style.Content ref={ref3} vAlign={vAlign} id={bodyId} useExtend={useExtend} isScroll={isScroll} cardType={cardType}>
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

export default MContainer;
