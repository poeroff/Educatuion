import { useMemo, useState } from 'react';
import { Box, Image, TMainHeaderInfoTypes, IQuestionProps, EStyleButtonTypes, BottomSheet, ETagLine, Tag, Scroll, Typography } from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { isAnswer, removeSpaces } from '@maidt-cntn/util/CommonUtil';
import { TBoxType } from '@/components/atoms/Box/Box.style';

type TSubmitType = 'marking' | 'complete';

export interface IEM0100101 {
  headerInfo?: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageInfo: IImageInfo;
  answers: {
    [key: string]: string;
  };
  solution: {
    [key: string]: string;
  };
  inputNode: React.ReactNode;
  commentImageInfo?: IImageInfo;
  commentary: string;
  isSubmitted?: boolean;
  onSubmit?: (isCorrect: boolean) => void;
  submitType?: TSubmitType;
}

export interface IImageInfo {
  altText: string;
  hiddenAltText?: React.ReactNode;
  imageSrc: string;
  title?: string[];
  imageWidth?: string;
  imageHeight?: string;
  boxType?: TBoxType;
}

const EM0100101 = ({
  headerInfo,
  questionInfo,
  imageInfo,
  answers,
  solution,
  inputNode,
  commentImageInfo,
  commentary,
  isSubmitted,
  onSubmit,
  submitType = 'marking',
}: IEM0100101) => {
  const [isShow, setShow] = useState<boolean>(false);
  const isDisabled = useMemo(() => Object.keys(answers).some(key => !answers[key]), [answers]);

  const isCorrectAnswer = (inputs: { [key: string]: string }, answers: { [key: string]: string }) => {
    return Object.keys(inputs).every(key => isAnswer(removeSpaces(inputs[key]), removeSpaces(answers[key])));
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setShow(show => !show);
    } else {
      const result = isCorrectAnswer(answers, solution);
      onSubmit && onSubmit(result);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo ?? {}}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : submitType === 'marking' ? '채점하기' : '완료하기'}
      submitBtnColor={!isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isDisabled}
      onSubmit={handleSubmit}
      useRound
    >
      <Box useRound tabIndex={101}>
        <Box vAlign='center' flexDirection='column' type={imageInfo.boxType ?? 'paint'} useRound>
          <Image
            src={imageInfo.imageSrc}
            width={imageInfo?.imageWidth}
            height={imageInfo?.imageHeight}
            alt={imageInfo.altText}
            ariaDescribedby={imageInfo.hiddenAltText ? 'img_desc' : undefined}
          />
          {imageInfo.hiddenAltText && (
            <Box type='hidden' id='img_desc'>
              {imageInfo.hiddenAltText}
            </Box>
          )}
        </Box>
        <Box hAlign='center' marginTop='20px' flexDirection='column' marginBottom='20px'>
          {inputNode}
        </Box>
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
            <Box marginTop={'40px'}>
              <Box>
                <Tag type={ETagLine.GREEN} label={'풀이'} />
              </Box>
              <Box marginTop='12px'>
                <Typography usePre>
                  <MathExpression equation={commentary} />
                </Typography>
              </Box>
              {commentImageInfo && (
                <Box vAlign='flex-start' flexDirection='column'>
                  <Image
                    src={commentImageInfo.imageSrc}
                    width={commentImageInfo?.imageWidth}
                    height={commentImageInfo?.imageHeight}
                    alt={commentImageInfo.altText}
                    ariaDescribedby={commentImageInfo.hiddenAltText ? 'img_desc' : undefined}
                  />
                  {commentImageInfo.hiddenAltText && (
                    <Box type='hidden' id='img_desc'>
                      {commentImageInfo.hiddenAltText}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default EM0100101;
