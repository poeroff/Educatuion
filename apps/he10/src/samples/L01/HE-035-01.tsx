import {
  Box,
  Image,
  TMainHeaderInfoTypes,
  IQuestionProps,
  PinchZoom,
  Table,
  TR,
  TH,
  TBody,
  TD,
  Radio,
  List,
  IAudioPlayerProps,
  EStyleTableTypes,
  Question,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE03501 = () => {
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        <Question size='medium'>1. &nbsp;</Question>
        Choose the age group and skin type at which the
        <br /> advertisement is aimed
      </>
    ),
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
    top: 10,
    right: 10,
  };
  const ageData = ['Teenager', 'Adults', 'Seniors'];
  const skinTypeData = ['Dry & Sensitive', 'Combination', 'Oily & Sensitive'];

  return (
    <Container
      useExtend
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box hAlign='center'>
        <PinchZoom>
          <Image
            src={'/example/HE2-L02-C04-A02-1.jpg'}
            width='352px'
            height='220px'
            alt='태블릿으로 Green Plus Skin-care set이라고 쓰여진 화장품 광고를 보고 있는 모습'
          />
        </PinchZoom>
      </Box>
      <Box marginTop='20px'>
        <Table color={EStyleTableTypes.SECONDARY} sizes={['204px', 'auto']}>
          <TBody>
            <TR>
              <TH scope='row'>(1) Age</TH>
              <TD vAlign='middle'>
                <List align='horizontal' gap={8} data={ageData}>
                  {({ value }) => (
                    <Box vAlign='center' width='238px'>
                      <Radio type={'circle'} align='horizontal' name={'radio-age'} gap={30} label={value} value={false} />
                    </Box>
                  )}
                </List>
              </TD>
            </TR>
            <TR>
              <TH scope='row'>(2) Skin Type</TH>
              <TD vAlign='middle'>
                <List
                  align='horizontal'
                  gap={8}
                  data={skinTypeData}
                  row={({ value }) => (
                    <Box vAlign='center' width='238px'>
                      <Radio type={'circle'} align='horizontal' name={'radio-skin-type'} gap={30} label={value} value={false} />
                    </Box>
                  )}
                />
              </TD>
            </TR>
          </TBody>
        </Table>
      </Box>
    </Container>
  );
};
export default HE03501;
