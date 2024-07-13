/*
    1. URL: http://localhost:4270/#/ee40/L01-C01-A06
    2. 페이지: EE4-L01-C01-A06-P01

    3. PropsTypes
        - headerInfo: TMainHeaderInfoTypes;
        - questionInfo: IQuestionProps;
        - audioInfo: IAudioPlayerProps;
        - files: any;
        - pageNumber: number;
        - mainKey: number;
        - subKey: string;
        - list: { src: string; alt: string }[];
        - correctData: number;
*/

// UI 공통
import {
  Image,
  BoxWrap,
  Box,
  PinchZoom,
  Radio,
  Label,
  EStyleButtonTypes,
  Tag,
  Typography,
  BottomSheet,
  ETagLine,
  TMainHeaderInfoTypes,
  IQuestionProps,
  IAudioPlayerProps,
  List,
  ListHeader,
  ToggleButton,
  EStyleFontSizes,
  SimpleAudioPlayer,
} from '@maidt-cntn/ui';

// UI en
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

// API
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import { initDataType } from '@maidt-cntn/api';

export type IListData = {
  isClick?: boolean;
  audioSrc?: string;
  data?: { question: string; answer: string; type: string; color: string }[];
};

export type PageProps = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  pageData: IListData[];
};

const EE4L06C01A06aP03 = ({ headerInfo, questionInfo, pageData }: PageProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Container headerInfo={headerInfo} vAlign='top' submitBtnColor={EStyleButtonTypes.SECONDARY} questionInfo={questionInfo}>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>

      <BoxWrap>
        <List<IListData>
          align='horizontal'
          data={pageData}
          gap={0}
          row={({ value, index }) => (
            <Box width='406px'>
              <Box display='flex' alignItems='center'>
                <Typography size={EStyleFontSizes['LARGE']} color='#996500' weight={800}>
                  {index}
                </Typography>
                {value?.audioSrc && <SimpleAudioPlayer audioSrc={value?.audioSrc} />}
              </Box>

              {value?.data &&
                value?.data.map((value, index) => {
                  return (
                    <Box key={index} height='120px' marginTop='10px' paddingLeft='10px'>
                      <Label type='paint' value={value?.type} background={value?.color} />
                      <Typography weight={600}>{value.question}</Typography>
                      {isOpen && (
                        <Box {...{ margin: '10px 0 0 38px' }}>
                          <Typography weight={600} color='#2F38C7'>
                            {value.answer}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  );
                })}
            </Box>
          )}
        />
      </BoxWrap>
    </Container>
  );
};
export default EE4L06C01A06aP03;
