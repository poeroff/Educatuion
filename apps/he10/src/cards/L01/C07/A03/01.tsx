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
  EStyleFontSizes,
  IQuestionProps,
  EStyleSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useRef } from 'react';
import { ContentInfo } from './contentInfo';

const DialogHeader = () => {
  return (
    <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
      <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
        The Power of Friendliness: Soft but Strong
      </Typography>
    </Box>
  );
};

const P01 = () => {
  const [isContentShow, setContentShow] = useState<boolean>(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Choose',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Check out the structure of the review notes.',
  };

  const wordArr = ['Lecture Topic', 'Speaker', 'Interesting Points', 'My Reflection'];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box useFull display='flex' flexDirection='column' alignItems='center'>
        <Box alignSelf='flex-end'>
          <Button
            minWidth='118px'
            size={EStyleSizes.SMALL}
            color={EStyleButtonTypes.SECONDARY}
            label='지문보기'
            useRound
            onClick={() => {
              lastFocusedElementRef.current = document.activeElement as HTMLElement;
              setContentShow(!isContentShow);
            }}
          />
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
                    <Typography fontSize='var(--font-size-28)' align='left'>
                      {value}
                    </Typography>
                  </BoxWrap>
                )}
              />
            </Box>
          </TextView>
        </Box>
      </Box>
      <Dialog
        useHeader
        header={DialogHeader}
        isShow={isContentShow}
        width={893}
        height={458}
        topHeight={50}
        useFooter
        onClose={() => {
          setContentShow(!isContentShow);
          if (lastFocusedElementRef.current) {
            lastFocusedElementRef.current.focus();
          }
        }}
        closeLabel='닫기'
        tabIndex={101}
      >
        <Typography>
          <ContentInfo />
        </Typography>
      </Dialog>
    </Container>
  );
};

export default P01;
