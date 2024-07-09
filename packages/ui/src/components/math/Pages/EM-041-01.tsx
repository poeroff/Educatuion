import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Image, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { useMemo, useState } from 'react';

type TSubmitType = 'marking' | 'complete';

type IImageInfoType = {
  margin: string;
  imageSrc: string;
  alt: string;
  width: string;
  height: string;
};

interface IEM04201 {
  headerInfo?: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageInfo?: IImageInfoType[];
  answerNode: React.ReactNode;
  answer: { [key: string]: string };
  solution: { [key: string]: string };
  commentary?: string;
  onSubmit?: (state: boolean[]) => void;
  submitType?: TSubmitType;
  isSubmitted?: boolean;
}

const EM04101 = ({
  headerInfo,
  questionInfo,
  imageInfo,
  answerNode,
  answer,
  solution,
  commentary,
  onSubmit,
  submitType = 'marking',
  isSubmitted,
}: IEM04201) => {
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
      useRound
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
    >
      <Box display='flex' hAlign='center'>
        {imageInfo &&
          imageInfo.map((value, index) => {
            return (
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='end'
                type='dashed'
                marginLeft={value.margin}
                padding={'24px 17px'}
                borderRadius={16}
                height={324}
                key={`list-item-${index}`}
              >
                <Box display='flex' justifyContent='center'>
                  <Image src={value.imageSrc || ''} alt={value.alt} width={value.width} height={value.height} />
                </Box>
                <Box marginTop={24}>{answerNode}</Box>
              </Box>
            );
          })}
      </Box>

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
                <Typography usePre>{commentary.includes('$') ? <MathExpression equation={commentary} /> : commentary}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default EM04101;
