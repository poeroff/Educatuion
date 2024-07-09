import {
  Button,
  EStyleSizes,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  MainTitleHeader,
  AudioPlayer,
  IAudioPlayerProps,
  Scroll,
  SvgIcon,
  Label,
} from '@maidt-cntn/ui';
import { IWAI } from '@emotion/react';
import Style from './HContainer.style';
import { useEffect, useMemo, useRef, useState } from 'react';
import Question, { IQuestionProps } from '../../atoms/Question/Question';
import { Property } from 'csstype';
import React from 'react';

import MathInference from '../../../assets/icons/header/header_M_H_inference.svg';
import MathRelation from '../../../assets/icons/header/header_M_H_relation.svg';
import MathCommunicate from '../../../assets/icons/header/header_M_H_communicate.svg';
import MathCompute from '../../../assets/icons/header/header_M_H_compute.svg';
import MathSolution from '../../../assets/icons/header/header_M_H_solution.svg';

type TSubTitle = 'inference' | 'solution' | 'relation' | 'communicate' | 'compute' | 'predicate';

export type THighLevelMainHeaderInfoTypes = TMainHeaderInfoTypes & {
  headerSubTexts?: TSubTitle[];
};

interface IHContainerProps extends IWAI {
  headerInfo: THighLevelMainHeaderInfoTypes | null;
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
  useScroll?: boolean;
}

const SubTitle = ({ str }: { str: TSubTitle }) => {
  const content = useMemo(() => {
    switch (str) {
      case 'inference':
        return (
          <Style.SubTitle>
            <SvgIcon src={MathInference} size='20px' />
            <Style.SubTitleText>추론</Style.SubTitleText>
          </Style.SubTitle>
        );
      case 'solution':
        return (
          <Style.SubTitle>
            <SvgIcon src={MathSolution} size='20px' />
            <Style.SubTitleText>문제해결</Style.SubTitleText>
          </Style.SubTitle>
        );
      case 'relation':
        return (
          <Style.SubTitle>
            <SvgIcon src={MathRelation} size='20px' />
            <Style.SubTitleText>연결</Style.SubTitleText>
          </Style.SubTitle>
        );
      case 'communicate':
        return (
          <Style.SubTitle>
            <SvgIcon src={MathCommunicate} size='20px' />
            <Style.SubTitleText>의사소통</Style.SubTitleText>
          </Style.SubTitle>
        );
      case 'compute':
        return (
          <Style.SubTitle>
            <SvgIcon src={MathCompute} size='20px' />
            <Style.SubTitleText>정보처리</Style.SubTitleText>
          </Style.SubTitle>
        );
      case 'predicate':
        return (
          <Style.Predicate>
            <Label value={<Style.PredicateText>하</Style.PredicateText>} level={'low'} type='level' />
            <Label value={<Style.PredicateText>중</Style.PredicateText>} level={'middle'} type='level' />
            <Label value={<Style.PredicateText>상</Style.PredicateText>} level={'high'} type='level' />
          </Style.Predicate>
        );
      default:
        return <></>;
    }
  }, [str]);

  return content;
};

export const HContainer = ({
  headerInfo = null,
  questionInfo = null,
  useExtend = false,
  vAlign = 'center',
  children,
  useLinkLabel,
  linkLabel,
  onLink,
  submitLabel = '제출하기',
  submitBtnColor = EStyleButtonTypes.SECONDARY,
  submitDisabled = false,
  onSubmit,
  audioInfo = null,
  bodyId,
  useScroll = true,
}: IHContainerProps) => {
  const [titleHeight, setTitleHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const topHeight = useMemo(() => {
    if (questionInfo?.text) {
      return titleHeight + 86;
    }
    return 86;
  }, [questionInfo?.text, titleHeight]);

  useEffect(() => {
    const clientHeight = ref.current?.clientHeight ?? 0;
    setTitleHeight(clientHeight);
  }, [children, ref.current?.clientHeight]);

  return (
    <>
      <Style.HeaderWrapper minHeight={34}>
        {headerInfo && (
          <>
            <MainTitleHeader
              pattern={headerInfo.headerPattern ?? 'text'}
              title={headerInfo.headerText}
              titleColor={headerInfo.headerTextColor}
              iconType={headerInfo.iconType}
              number={headerInfo.headerNumber}
              useExtend={headerInfo.useExtend}
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
                  onChangeStatus={audioInfo?.onChangeStatus}
                ></AudioPlayer>
              </Style.AudioWrapper>
            )}
            {!!headerInfo.headerSubTexts?.length && (
              <Style.SubTitleWrap>
                {headerInfo.headerSubTexts.map((val, idx) => (
                  <React.Fragment key={`headerRightInfo-${idx}`}>
                    <SubTitle str={val} />
                  </React.Fragment>
                ))}
              </Style.SubTitleWrap>
            )}
          </>
        )}
      </Style.HeaderWrapper>

      {questionInfo && (
        <Style.Title ref={ref}>
          <Question size={'medium'} {...questionInfo} />
        </Style.Title>
      )}

      <Scroll height={useScroll ? `calc(100% - ${topHeight}px)` : `auto`} paddingRight={0} useScroll={useScroll}>
        <Style.Content useExtend={useExtend} vAlign={vAlign} id={bodyId} topHeight={topHeight}>
          {children}
        </Style.Content>
      </Scroll>

      {(onSubmit || useLinkLabel) && (
        <Style.SubmitBtn>
          {onSubmit && (
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
          )}
          {useLinkLabel && (
            <Button label={linkLabel} color={EStyleButtonTypes.BROWN} size={EStyleSizes['XX-SMALL']} useRound onClick={onLink} width={'152px'} />
          )}
        </Style.SubmitBtn>
      )}
    </>
  );
};

export default HContainer;
