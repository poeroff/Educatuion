import { useMemo, useState } from 'react';

import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Image,
  TBody,
  TD,
  TH,
  TMainHeaderInfoTypes,
  TR,
  Table,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';

type TSubmitType = 'marking' | 'complete';

interface IIconInfo {
  bigIconSrc: string;
  bigIconAlt: string;
  bigIconW: string;
  bigIconH: string;
  smallIconSrc: string;
  smallIconAlt: string;
  smallIconW: string;
  smallIconH: string;
}

interface IEM052101 {
  headerInfo?: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  questionData: (string | React.ReactNode)[][];
  dataTitle: string;
  iconInfo: IIconInfo;
  answerNode: React.ReactNode;
  answer: { [key: string]: string };
  solution: { [key: string]: string };
  commentary?: string;
  onSubmit?: (state: boolean[]) => void;
  submitType?: TSubmitType;
  isSubmitted?: boolean;
}
export const renderIcon = (iconInfo: IIconInfo, iconType: 'big' | 'small', quantity: number) => {
  return Array.from({ length: quantity }, (_, index) => {
    const iconW = iconType === 'big' ? iconInfo.bigIconW : iconInfo.smallIconW;
    const iconH = iconType === 'big' ? iconInfo.bigIconH : iconInfo.smallIconH;
    return (
      <Box key={index} marginRight={0}>
        <Image
          src={iconType === 'big' ? iconInfo.bigIconSrc : iconInfo.smallIconSrc}
          alt={iconType === 'big' ? iconInfo.bigIconAlt : iconInfo.smallIconAlt}
          width={iconW}
          height={iconH}
        />
      </Box>
    );
  });
};
const EMA03602 = ({
  headerInfo,
  questionInfo,
  questionData,
  dataTitle,
  iconInfo,
  answerNode,
  answer,
  solution,
  commentary,
  onSubmit,
  submitType = 'marking',
  isSubmitted,
}: IEM052101) => {
  const isDisabled = useMemo(() => Object.keys(answer).some(key => !answer[key]), [answer]);
  const [isShow, setShow] = useState<boolean>(false);

  const isCorrectAnswer = (input: string, answer: string) => {
    return input === answer;
  };
  const handleSubmit = () => {
    if (isSubmitted) {
      setShow(show => !show);
    } else {
      const result = Object.keys(answer).map(key => isCorrectAnswer(answer[key], solution[key]));
      onSubmit && onSubmit(result);
    }
  };

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo || {}}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : submitType === 'marking' ? '채점하기' : '완료하기'}
      submitBtnColor={!isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isDisabled}
      onSubmit={() => {
        handleSubmit();
      }}
      vAlign={'flex-start'}
      useRound
      useExtend
    >
      <BoxWrap flexDirection='column' alignItems='center' justifyContent='center'>
        <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-900)'>
          {dataTitle}
        </Typography>
        <BoxWrap justifyContent='center' paddingTop='24px' paddingBottom='40px'>
          <Table color={EStyleTableTypes.YELLOW_SECONDARY} sizes={['139px', '465px']} caption='반별 인형수'>
            <TBody>
              {questionData.map((item, index) => (
                <TR key={index}>
                  {item.map((value, idx) => {
                    if (index === 0) {
                      return (
                        <TH key={idx} scope='col' vAlign={'middle'} hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                          {value}
                        </TH>
                      );
                    } else
                      return (
                        <TD key={idx} vAlign={'middle'} hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                          {value}
                        </TD>
                      );
                  })}
                </TR>
              ))}
            </TBody>
          </Table>

          <BoxWrap paddingLeft='16px' width='fit-content' flexDirection='column' justifyContent='flex-end'>
            <BoxWrap gap='12px' paddingBottom='10px'>
              {renderIcon(iconInfo, 'big', 1)}
              <Typography size={EStyleFontSizes['X-MEDIUM']}>10개</Typography>
            </BoxWrap>

            <BoxWrap gap='12px'>
              {renderIcon(iconInfo, 'small', 1)}
              <Box paddingLeft='15px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']}>1개</Typography>
              </Box>
            </BoxWrap>
          </BoxWrap>
        </BoxWrap>

        <BoxWrap justifyContent='center' alignItems='center' marginBottom='10px'>
          {answerNode}
        </BoxWrap>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={submitType === 'marking' ? '답안' : '모범답안'} />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>
              {Object.keys(solution)
                .map(key => solution[key])
                .join(', ')}
            </Typography>
          </Box>
          {commentary && (
            <Box marginTop={'10px'}>
              <Box>
                <Tag type={ETagLine.GREEN} label={'풀이'} />
              </Box>
              <Box marginTop='12px'>
                <Typography usePre>
                  <MathExpression equation={commentary} />
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default EMA03602;
