import {
  Box,
  TMainHeaderInfoTypes,
  Dialog,
  TextView,
  Button,
  EStyleButtonTypes,
  ETextViewColor,
  List,
  BoxWrap,
  Label,
  Typography,
  EStyleSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE01901 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Choose',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Check out the structure of the review notes.',
  };

  const wordArr = ['Lecture Topic', 'Speaker', 'Interesting Points', 'My Reflection'];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box useFull display='flex' flexDirection='column' alignItems='center'>
        <Box alignSelf='flex-end'>
          <Button minWidth='118px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound onClick={() => {}} />
        </Box>
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

      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default HE01901;
