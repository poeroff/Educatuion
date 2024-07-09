import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Dialog,
  TextView,
  Button,
  EStyleButtonTypes,
  Typography,
  Input,
  ETextViewColor,
  Label,
  List,
  EStyleSizes,
  Question,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE01903 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Choose',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Choose the correct words to complete the review notes based on the main text.',
  };
  const wordArr = ['Lecture Topic', 'Speaker', 'Interesting Points', 'My Reflection'];

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap useFull justifyContent='center'>
        <Box width='380px'>
          <TextView height='306px' type={ETextViewColor.SKYBLUE} title={'Review Notes'}>
            <Box padding='32px 20px'>
              <List
                data={wordArr}
                row={({ value, index = 1 }) => (
                  <BoxWrap>
                    <Box display='flex' alignItems='center' marginRight='10px'>
                      <Label value={index} type={'icon'} size={'xx-small'} />
                    </Box>
                    <Typography>{value}</Typography>
                  </BoxWrap>
                )}
              />
            </Box>
          </TextView>
        </Box>

        <Box useFull width='calc(100% - 380px)' hAlign='center' flexDirection='column'>
          <Box alignSelf='end'>
            <Button minWidth='118px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound onClick={() => {}} />
          </Box>
          <Box useFull marginTop='20px'>
            <Box>
              <Question size='small' type='dot'>
                Chimpanzees and bonobos are
              </Question>
              <Box hAlign='flex' marginTop='8px'>
                <Typography>gentically (5)</Typography>
                <Input onChange={e => setValue1(e.target.value)} placeholder='내용을 넣어 주세요.' status='default' value={value1} width='260px' />
              </Box>
              <Box hAlign='flex' marginTop='8px' width='100%'>
                <Typography>but they have a (6)</Typography>
                <Input onChange={e => setValue2(e.target.value)} placeholder='내용을 넣어 주세요.' status='default' value={value2} width='190px' />
              </Box>
              <Box marginTop='8px'>
                <Question size='small' type='dot'>
                  Although Neanderthals could
                </Question>
              </Box>
              <Box marginTop='8px'>
                <Typography>make tools and fire and had </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default HE01903;
