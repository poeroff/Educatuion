import { useState } from 'react';
import {
  Box,
  Label,
  Typography,
  Image,
  Input,
  TMainHeaderInfoTypes,
  IQuestionProps,
  EStyleButtonTypes,
  InputStatus,
  BottomSheet,
  ETagLine,
  Tag,
  Scroll,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isAnswer, isEquationAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

export interface IEM01001 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  help?: React.ReactNode;
  initialData: TAnswers[];
  value1?: string;
  value2?: string;
  unit?: string;
  info: IEM01001Info;
  answer: React.ReactNode;
  explanation?: React.ReactNode;
  isSubmitted?: boolean;
  handleInputChange?: (index: number, value: string) => void;
  onSubmit?: () => void;
}

export interface IEM01001Info {
  altText: string;
  hiddenAltText?: React.ReactNode;
  imageSrc: string;
  title?: string[];
  imageWidth?: string;
  imageHeight?: string;
}

export type TAnswers = { value: string; answer: string };

const EM01001 = ({
  headerInfo,
  questionInfo,
  help,
  initialData,
  unit,
  info,
  answer,
  explanation,
  isSubmitted,
  handleInputChange,
  onSubmit,
}: IEM01001) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleInputChangeEvent = (index: number, value: string) => {
    handleInputChange && handleInputChange(index, value);
  };

  const handleSubmitChange = () => {
    if (!isSubmitted) {
      onSubmit && onSubmit();
    } else {
      setIsShow(!isShow);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      onSubmit={handleSubmitChange}
      submitLabel={isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={initialData.some(val => val.value === '')}
      submitBtnColor={
        !initialData.some(val => val.value === '') ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY
      }
      useRound
    >
      <Scroll tabIndex={0}>
        <Box useRound tabIndex={101}>
          <Box vAlign='center' flexDirection='column'>
            <Image
              src={info.imageSrc}
              width={info?.imageWidth || '100%'}
              height={info?.imageHeight || '100%'}
              alt={info.altText}
              ariaDescribedby={info.hiddenAltText ? 'img_desc' : undefined}
            />
            {info.hiddenAltText && (
              <Box type='hidden' id='img_desc'>
                {info.hiddenAltText}
              </Box>
            )}
            <Box vAlign='left' hAlign='flex-start'>
              {help}
            </Box>
          </Box>
          <Box hAlign='center' marginTop='20px' flexDirection='column' marginBottom='20px'>
            <Box vAlign='center'>
              <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
              <Input
                title='식 입력란'
                marginLeft={8}
                maxLength={30}
                width='292px'
                value={initialData[0].value}
                onChange={e => handleInputChangeEvent(0, e.target.value)}
                status={
                  !isNotEmptyString(initialData[0].value)
                    ? InputStatus.DEFAULT
                    : isSubmitted && !isEquationAnswer(initialData[0].value, initialData[0].answer)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                readOnly={isSubmitted}
              />
            </Box>
            <Box vAlign='center' marginTop='8px'>
              <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
              <Input
                title='답 입력란'
                marginLeft={8}
                maxLength={30}
                width='245px'
                value={initialData[1].value}
                onChange={e => handleInputChangeEvent(1, e.target.value)}
                status={
                  !isNotEmptyString(initialData[1].value)
                    ? InputStatus.DEFAULT
                    : isSubmitted && !isAnswer(initialData[1].value, initialData[1].answer)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                readOnly={isSubmitted}
              />
              <Typography>{unit}</Typography>
            </Box>
          </Box>
        </Box>
        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow} marginTop={40}>
          <Box background='lightGray' borderRadius='12px' marginTop='40px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='답안' />
            </Box>
            <Box marginTop='12px'>{answer}</Box>
            {explanation && (
              <>
                <Box marginTop='40px'>
                  <Tag type={ETagLine.GREEN} label='해설' />
                </Box>
                {explanation}
              </>
            )}
          </Box>
        </BottomSheet>
      </Scroll>
    </Container>
  );
};

export default EM01001;
