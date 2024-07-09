import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Image,
  IQuestionProps,
  Tag,
  ETagLine,
  BottomSheet,
  EStyleButtonTypes,
  PinchZoom,
  BoxWrap,
  Typography,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useMemo, useState } from 'react';
import { isAnswer, removeSpaces } from '@maidt-cntn/util/CommonUtil';

export interface IContentList {
  children: React.ReactNode;
}

type TSubmitType = 'marking' | 'complete';
interface IHE02202 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageSrc: string;
  udl?: string[];
  nodeData: IContentList[];
  inputs: { [key: string]: string };
  answer: { [key: string]: string };
  submitType?: TSubmitType;
  submitted?: boolean;
  onSubmit?: (state: boolean[]) => void;
}

const HE02202 = ({
  headerInfo,
  questionInfo,
  imageSrc,
  udl,
  nodeData,
  inputs,
  answer,
  submitType = 'marking',
  submitted = false,
  onSubmit,
}: IHE02202) => {
  const [isShow, setShow] = useState(false);
  const isDisabled = useMemo(() => Object.keys(inputs).some(key => !inputs[key]), [inputs]);

  const handleSubmit = () => {
    if (submitted) {
      setShow(show => !show);
    } else {
      const result = Object.keys(inputs).map(key => !isAnswer(removeSpaces(inputs[key]), removeSpaces(answer[key])));
      onSubmit && onSubmit(result);
    }
  };
  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={submitted ? (isShow ? '답안 닫기' : '답안 보기') : submitType === 'marking' ? '채점하기' : '완료하기'}
      submitBtnColor={!isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isDisabled}
      onSubmit={() => {
        handleSubmit();
      }}
    >
      <BoxWrap flexDirection='column' useFull paddingTop='40px'>
        <Box width='920px'>
          <TextView title='보기'>
            <Box hAlign='center' vAlign='center' paddingTop='10px'>
              <PinchZoom pinchType={'image'}>
                <Image src={imageSrc} width={'100%'} alt={''} ariaDescribedby='img_desc' />
                {udl && (
                  <Box type='hidden' id='img_desc'>
                    {udl.map((item, index) => (
                      <p key={`img_desc_${index}`}>{item}</p>
                    ))}
                  </Box>
                )}
              </PinchZoom>
            </Box>
          </TextView>
        </Box>
        <Box marginTop='50px' flexDirection='row'>
          {nodeData.map((item, index) => {
            return <Box key={index}>{item?.children}</Box>;
          })}
        </Box>
        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
          <Box background='lightGray' borderRadius='12px' marginTop='40px'>
            <Box>
              <Tag type={ETagLine.GREEN} label={submitType === 'marking' ? '답안' : '모범답안'} />
            </Box>{' '}
            <Box marginTop='10px' padding={8}>
              <Typography size={EStyleFontSizes.MEDIUM}>
                {Object.keys(answer)
                  .map(key => answer[key])
                  .join(', ')}
              </Typography>
            </Box>
          </Box>
        </BottomSheet>
      </BoxWrap>
    </Container>
  );
};
export default HE02202;
