import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  ETextViewColor,
  IQuestionProps,
  Input,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  TextView,
  TextViewTitle,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM00903 = () => {
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box vAlign='center'>
        <TextViewTitle title='보기' type={ETextViewColor.DEFAULT} />
        &nbsp;와 같이 254-132로 문제를 만들고 답을 구해 보세요.
      </Box>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      submitBtnColor={EStyleButtonTypes.SECONDARY}
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
    >
      <Box useFull display='flex' flexDirection='column'>
        <Box display='flex' justifyContent='center' marginBottom='15px'>
          <TextView title='보기' hAlign='start'>
            <Typography size={EStyleFontSizes.MEDIUM}>공항에는 배달 로봇과 안내 로봇이 254대 있습니다.</Typography>
            <Typography size={EStyleFontSizes.MEDIUM}>그중에서 132대가 배달 로봇이면 안내 로봇은 몇 대인가요?</Typography>
          </TextView>
        </Box>
        <BoxWrap marginTop='10px' flex='1'>
          <Box marginRight='10px'>
            <Tag type={ETagLine.BLUE} label='문제' />
          </Box>
          <Box useFull>{/* 그리기 도구 영역 */}</Box>
        </BoxWrap>
        <Box display='flex' justifyContent='right' alignItems='center' marginTop='10px'>
          <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
          <Input marginLeft={8} width='245px' onChange={() => {}} value='' ariaLabel='254-132로 만든 문제의 답' />
        </Box>
      </Box>
    </Container>
  );
};

export default EM00903;
