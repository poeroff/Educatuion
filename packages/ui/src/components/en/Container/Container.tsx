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
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import Question, { IQuestionProps } from '../../atoms/Question/Question';
import { Property } from 'csstype';
import React from 'react';

interface IContainerProps extends IWAI {
  headerInfo: TMainHeaderInfoTypes | null;
  questionInfo?: IQuestionProps | null;
  useExtend?: boolean;
  vAlign?: Property.AlignContent;
  children?: React.ReactNode;
  submitLabel?: string;
  submitBtnColor?: EStyleButtonTypes;
  submitDisabled?: boolean;
  onSubmit?: () => void;
  audioInfo?: IAudioPlayerProps | null;
  bodyId?: string;
  useScroll?: boolean;
  scrollRef?: RefObject<HTMLDivElement>;
}

export const Container = ({
  headerInfo = null,
  questionInfo = null,
  useExtend = false,
  vAlign = 'center',
  children,
  submitLabel = '제출하기',
  submitBtnColor = EStyleButtonTypes.SECONDARY,
  submitDisabled = false,
  onSubmit,
  audioInfo = null,
  bodyId,
  useScroll = true,
  scrollRef,
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
      {headerInfo && (
        <Style.HeaderWrapper>
          <MainTitleHeader
            pattern={headerInfo.headerPattern ?? 'text'}
            title={headerInfo.headerText}
            titleColor={headerInfo.headerTextColor}
            iconType={headerInfo.iconType}
            number={headerInfo.headerNumber}
            subject='en'
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
                onChangeStatus={audioInfo?.onChangeStatus}
              ></AudioPlayer>
            </Style.AudioWrapper>
          )}
        </Style.HeaderWrapper>
      )}
      {questionInfo && (
        <Style.Title ref={titleRef}>
          <Question size={'medium'} {...questionInfo} />
        </Style.Title>
      )}

      <Scroll ref={scrollRef} height={useScroll ? `calc(100% - ${topHeight}px)` : `auto`} paddingRight={0} useScroll={useScroll}>
        <Style.Content ref={contentRef} useExtend={useExtend} vAlign={vAlign} id={bodyId} topHeight={topHeight} width={contentWidth}>
          {children}
        </Style.Content>
      </Scroll>

      {onSubmit && (
        <Style.SubmitBtn>
          <Button
            label={submitLabel}
            ariaLabel={submitLabel}
            color={submitBtnColor}
            size={EStyleSizes['XX-SMALL']}
            useRound
            disabled={submitDisabled}
            onClick={onSubmit}
            width={'152px'}
          />
        </Style.SubmitBtn>
      )}
    </>
  );
};

export default Container;
