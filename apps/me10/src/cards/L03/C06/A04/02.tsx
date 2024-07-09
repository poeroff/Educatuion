import { TMainHeaderInfoTypes, Box, Typography, ToggleButton, ListHeader, Scroll, List, BoxWrap, Label, EStyleFontSizes } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'We Have a Cat on Our Team! (1)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: '해석을 확인해 봅시다.',
  };

  const headerData: IListenAndAnswer = {
    originText: (
      <Box border='none' padding='4px 12px' hAlign='center' width={'900px'}>
        <Typography useGap={false} weight={700}>
          We Have a Cat on Our Team!
        </Typography>
      </Box>
    ),
    translation: (
      <Box border='none' padding='4px 12px' hAlign='center' width={'900px'}>
        <Typography useGap={false} weight={700}>
          우리 팀에 고양이가 있어요!
        </Typography>
      </Box>
    ),
  };

  const data: IListenAndAnswer[] = [
    {
      originText: `Coach Biscuit's team was on the field for Saturday practice.`,
      translation: 'Biscuit 코치 팀은 토요일 연습을 위해 경기장에 있었다.',
    },
    {
      originText: `"I have some exciting news for you`,
      translation: `"너희들에게 신나는 소식이 있단다.`,
    },
    {
      originText: `We have a new member," Coach Biscuit said.`,
      translation: `새로운 멤버가 있어." Biscuit 코치가 말했다.`,
    },
    {
      originText: `"Everyone, let's welcome our new friend.`,
      translation: `"모두, 새 친구를 환영합시다.`,
    },
    {
      originText: `Cathy, please come out."`,
      translation: `Cathy, 나와 주세요."`,
    },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton
          id='toggle'
          isChecked={isOpen}
          isTranslation
          onClick={() => setIsOpen(!isOpen)}
          ariaLabel={isOpen ? '해석 숨기기' : '해석 보기'}
        />
      </ListHeader>
      <BoxWrap boxGap={10}>
        <Box>
          <Typography>{headerData.originText}</Typography>
          <Box height='80px' paddingTop={4}>
            {isOpen && (
              <Typography color={'var(--color-blue-900)'} size={EStyleFontSizes['X-MEDIUM']}>
                {headerData.translation}
              </Typography>
            )}
          </Box>
        </Box>
      </BoxWrap>

      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer> data={data}>
          {({ value }) => (
            <BoxWrap boxGap={10}>
              {value?.label && (
                <Box padding={'4px 0px'}>
                  <Label value={value?.label} type={'paint'} background={value?.labelColor} />
                </Box>
              )}
              <Box>
                <Typography>{value?.originText}</Typography>
                <Box height='72px'>
                  {isOpen && (
                    <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                      {value?.translation}
                    </Typography>
                  )}
                </Box>
              </Box>
            </BoxWrap>
          )}
        </List>
      </Scroll>
    </Container>
  );
};

export default P03;
