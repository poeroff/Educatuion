import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Dialog,
  TextView,
  Button,
  EStyleButtonTypes,
  Typography,
  ETextViewColor,
  Label,
  List,
  Dropdown,
  EStyleSizes,
  Question,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE01902 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Choose',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Choose the correct words to complete the review notes based on the main text.',
  };

  const wordArr = ['Lecture Topic', 'Speaker', 'Interesting Points', 'My Reflection'];
  const dropArr = ['ability', 'friendliness'];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap useFull>
        <Box hAlign='center' useFull>
          <Box width='380px'>
            <TextView type={ETextViewColor.SKYBLUE} title={'Review Notes'}>
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
        </Box>

        <Box useFull hAlign='center' flexDirection='column'>
          <Box alignSelf='end'>
            <Button minWidth='118px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound onClick={() => {}} />
          </Box>
          <Box useFull alignSelf='start' hAlign='center'>
            <Box>
              <Box hAlign='flex' whiteSpace='nowrap'>
                <Question type='dot' size='small'>
                  Where does our
                </Question>
                <Typography>(1)</Typography> <Dropdown width='200px' dropdownList={dropArr} />
              </Box>
              <Question size='small'>come from, end why is it important?</Question>
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

export default HE01902;
