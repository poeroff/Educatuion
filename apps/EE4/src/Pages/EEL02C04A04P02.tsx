import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  TMainHeaderInfoTypes,
  ListHeader,
  ToggleButton,
  IQuestionProps,
  Box,
  SimpleAudioPlayer,
  List,
  Scroll,
  Label,
  Typography,
} from '@maidt-cntn/ui';
import { useState } from 'react';
// import styled from '@emotion/styled';
import styled from 'styled-components';

export interface IListenAndAnswer {
  key: number;
  type: string;
  question: string;
  answer: string;
  color: string;
}

export interface EEL02C04A04P02 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: IListenAndAnswer[];
  keyInfo: number[];
  audioList: Array<{ audioSrc: string }>;
}

const EEL02C04A04P02 = ({ headerInfo, questionInfo, data, audioList, keyInfo }: EEL02C04A04P02) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} useExtend vAlign='flex-start'>
      <Scroll>
        <ListHeader>
          <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
        </ListHeader>
        <Box hAlign={'center'} marginTop={'-50px'} width={'1000px'}>
          <Box width={'720px'} gap={40} hAlign={'flex-start'} display='flex' flex-wrap='wrap' alignItems='flex-start'>
            {keyInfo.map(idx => (
              // <Scroll>
              <Box key={idx} width={'320px'} gap={8}>
                <Box width='264px' height='58px' gap={8} hAlign={'flex-start'}>
                  <Typography style={{ fontSize: '36px', fontWeight: '800', lineHeight: '58px', color: '#996500' }}>{idx + 1}</Typography>
                  <SimpleAudioPlayer audioSrc={audioList[idx as number].audioSrc} />
                </Box>
                <List<IListenAndAnswer>
                  data={data.filter(dataItem => dataItem.key === idx)}
                  row={({ value }) => (
                    // <BoxWrap height={value?.question.includes('\n') || value?.answer.includes('\n') ? '184px' : '142px'}>
                    <BoxWrap
                      height={
                        value?.question.includes('\n') && value?.answer.includes('\n') ? '184px' :  value?.question.includes('\n') || value?.answer.includes('\n')  ? '142px' : '100px'
                      }
                    >
                      <Box marginRight={'16px'}>
                        <Label value={value?.type || ''} type={'paint'} background={value?.color} />
                      </Box>
                      <Box>
                        <Typography
                          style={{
                            fontSize: '28px',
                            fontWeight: '500',
                            lineHeight: '42px',
                            color: 'var(--color-grey-900)',
                          }}
                          useGap={false}
                        >
                          {value?.question}
                        </Typography>
                        {isOpen && (
                          <Box>
                            <Typography style={{ fontSize: '28px', fontWeight: '500', lineHeight: '42px', color: '#2F38C7' }} useGap={false}>
                              {value?.answer}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </BoxWrap>
                  )}
                />
              </Box>
              // </Scroll>
            ))}
          </Box>
        </Box>
      </Scroll>
    </Container>
  );
};

export default EEL02C04A04P02;

// 스타일이 적용된 ListHeader 정의
// export const StyledListHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: end;
//   padding: 4px 0;
//   margin-right: 16px;
//   font-size: 18px;
//   font-weight: var(--font-weight-medium);
//   line-height: 48px;
// `;
