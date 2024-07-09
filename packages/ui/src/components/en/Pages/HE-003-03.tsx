import { useState } from 'react';
import {
  Image,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Textarea,
  PinchZoom,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

export interface IHE00303 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  info: IHE00303Info;
  textAnswer: string;
  isSubmitted: boolean;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
}

export interface IHE00303Info {
  imageSrc: string;
  placeHolder?: string;
  altText?: string;
  hiddenText?: string;
  imageWidth?: string;
  imageHeight?: string;
  exampleAnswer?: string;
}

const HE00303 = ({ headerInfo, questionInfo, info, textAnswer, isSubmitted, onChange, onSubmit }: IHE00303) => {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const isAnswered = textAnswer.trim().length > 0;
  const isExistExample = info.exampleAnswer && info.exampleAnswer.length > 0;
  const isSubmitAvailable = isAnswered && !isSubmitted;
  const submitBtnColor = isSubmitted
    ? isShowAnswer
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.PRIMARY
    : isSubmitAvailable
    ? EStyleButtonTypes.PRIMARY
    : EStyleButtonTypes.SECONDARY;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (typeof onChange === 'function') onChange(e.target.value);
  };

  const handleSubmit = () => {
    if (!isSubmitted) {
      if (typeof onSubmit === 'function') onSubmit();
    } else if (isExistExample) setIsShowAnswer(!isShowAnswer);
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isSubmitted && isExistExample ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={!isAnswered || (isSubmitted && !isExistExample)}
      onSubmit={handleSubmit}
    >
      <BoxWrap useFull>
        <Box hAlign={'center'} useFull>
          <PinchZoom>
            <Image src={info.imageSrc} width={info.imageWidth || '450px'} height={info.imageHeight || '280px'} alt={info.altText} />
            {info.hiddenText && <Box type='hidden'>{info.hiddenText}</Box>}
          </PinchZoom>
        </Box>

        <Box useFull>
          <Textarea placeholder={info.placeHolder || '내용을 넣어 주세요.'} disabled={isSubmitted} value={textAnswer} onChange={handleChange} />
        </Box>
      </BoxWrap>

      <BottomSheet
        show={isShowAnswer}
        bottomSheetTargetId='container'
        height={'40%'}
        closeOption={{ useYn: true, onClose: () => setIsShowAnswer(false) }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>

          <Box marginTop='12px'>
            <Typography useGap={false}>{info.exampleAnswer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE00303;
