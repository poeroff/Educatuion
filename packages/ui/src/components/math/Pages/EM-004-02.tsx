import {
  IQuestionProps,
  TMainHeaderInfoTypes,
  Box,
  EStyleTableTypes,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  Typography,
  OverlayTooltip,
  EStyleFontSizes,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import bear from '@/assets/example/EM-032-01/bear.svg';
import { useState } from 'react';
import { isNotEmptyString, areArraysEqualIgnoringCaseAndWhitespace } from '@maidt-cntn/util/CommonUtil';

export type TBgColors = 'red' | 'blue' | 'green';
export interface IEM00402 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  math?: IMath;
  value: string[];
  answer: IAnswer;
  onSubmit?: (result: boolean) => void;
  submitted: boolean;
  tooltip?: ITooltip;
}

export interface IMath {
  caption?: string;
  math?: string[];
  th: string[];
  td: string[][]; //ex) 0 : 1,5,3, '' / 1 : 6,4,2,+
  input: React.ReactNode;
  bgColors?: TBgColors[];
  superScript?: ISuperScript[];
  incorrectMark?: boolean[][]; //ex) 0 : false, false, false, false,  / 1 : true, false, false, false
  /*
  백의자리 left : 455px, 십의자리 left='508px', 일의자리 left='558px' 순서대로 윗첨자 숫자 표기 (해당 자릿수의 윗첨자가 없으면 '' 공란으로 표기)
  superScript: [
      { value: '', left: '455px' },
      { value: '1', left: '508px' },
      { value: '', left: '558px' },
    ],
  */
}

export interface IAnswer {
  answer: string[];
  description: string[];
}

export interface ITooltip {
  isBearBalloon: boolean;
  content: React.ReactNode;
}

export interface ISuperScript {
  value: string;
  left: string;
}

const EM00402 = ({ headerInfo, questionInfo, math, value, answer, onSubmit, submitted, tooltip }: IEM00402) => {
  const [isShow, setShow] = useState<boolean>(false);
  const valueArray = Array.isArray(value) ? value : [];
  const result = areArraysEqualIgnoringCaseAndWhitespace(valueArray, answer.answer);

  const handleSubmit = () => {
    if (submitted) {
      setShow(show => !show);
    } else if (value.every(isNotEmptyString)) {
      onSubmit && onSubmit(result);
    }
  };
  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
      submitLabel={submitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!valueArray.every(isNotEmptyString)}
      submitBtnColor={valueArray.every(isNotEmptyString) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.GRAY}
      onSubmit={() => {
        handleSubmit();
      }}
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding={math?.superScript ? '30px 44px' : '20px 44px'} useRound>
          {math?.superScript?.map((item, index) => (
            <Box position='absolute' top='5px' left={item.left} key={`SUPER_` + index}>
              <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-pink-500)'>
                {item.value}
              </Typography>
            </Box>
          ))}
          <Table color={EStyleTableTypes.MATH} bgColors={math?.bgColors} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption={math?.caption} math={math?.math || []} />
            <THead hidden>
              <TR>
                {math?.th.map((item, index) => {
                  return (
                    <TH scope='col' key={index}>
                      {item}
                    </TH>
                  );
                })}
              </TR>
            </THead>
            <TBody>
              {math?.td.map((item, index) => {
                return (
                  <TR key={index}>
                    {item.map((td, idx) => (
                      <TD key={idx} {...(math?.incorrectMark ? { isMathCheck: math.incorrectMark[index][idx] } : {})}>
                        {td}
                      </TD>
                    ))}
                  </TR>
                );
              })}
            </TBody>
            <TFoot>
              <TR>{math?.input}</TR>
            </TFoot>
          </Table>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>

          <Box marginTop='12px'>
            {answer.answer.map((a, index) => (
              <Typography key={index}>
                {a}
                {index === answer.answer.length - 1 ? '' : ','}
              </Typography>
            ))}
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              {answer.description.map((a, index) => (
                <Typography key={index} lineHeight='normal'>
                  {a.indexOf('$') === -1 ? a : <MathExpression equation={a} />}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </BottomSheet>
      {tooltip?.isBearBalloon && (
        <>
          <BearBalloon>
            <OverlayTooltip type='cloud' place='top'>
              <Typography size={EStyleFontSizes['X-SMALL']} width='100%' align='center'>
                {tooltip.content}
              </Typography>
            </OverlayTooltip>
          </BearBalloon>
        </>
      )}
    </Container>
  );
};

export default EM00402;

const BearBalloon = styled.span`
  position: absolute;
  right: 190px;
  top: 50px;

  display: inline-block;
  background: url(${bear}) bottom right no-repeat;
  height: 239px;
  width: 134px;
`;
