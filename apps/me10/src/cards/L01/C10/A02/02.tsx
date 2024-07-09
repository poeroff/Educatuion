import styled from '@emotion/styled';
import {
  Box,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleSizes,
  EStyleTableTypes,
  IQuestionProps,
  Image,
  Input,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  Typography,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { L01C10A02, L01C10A02HeaderInfo, L01C10A02TableHeader } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C10A02);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', '', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const imageUrl = '/L01/C10/A02/ME1-L01-C10-A02-P02 1.png';
  const iamgeAlt = '학교';

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        <Box marginRight='10px'>
          <Typography useGap={false} fontSize='32px' lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
            Step 2
          </Typography>
          <Typography>Step 1을 바탕으로 자신의 학교생활을 소개하는 글을 써 봅시다.</Typography>
        </Box>
      </>
    ),
  };

  const closeModal = () => {
    setIsShow(false);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  const checkDisableInput = () => {
    return cardData.p02.answer?.some(val => val === '');
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = cardData.p02.answer?.map((ans, idx) => (idx === index ? value : ans));

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer: updatedAnswers,
      },
    }));
    changeData('P02', 1, 1, cardData.p02.answer);
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p02.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData('P02', userSubmission);
  };
  return (
    <Container
      headerInfo={L01C10A02HeaderInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={cardData.p02.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p02.isSubmitted || checkDisableInput()}
      onSubmit={submitAnswer}
      useExtend
    >
      <BackgroundWrap>
        <Box hAlign='center' paddingTop='15px'>
          <Typography weight={'var(--font-weight-extraBold)'}>My School Life</Typography>
        </Box>
        <Content>
          <Box>
            <Typography>I go to</Typography>
            <Input
              textAlign='left'
              width='450px'
              maxLength={30}
              placeholder='e.g. Hanguk'
              value={cardData.p02.answer[0]}
              ariaLabel='답란1'
              readOnly={cardData.p02.isSubmitted}
              onChange={e => handleInputChange(0, e.target.value)}
            />
            <Typography>School.</Typography>
          </Box>
          <Box marginTop='10px'>
            <Typography>I</Typography>
            <Input
              width='700px'
              maxLength={30}
              placeholder='e.g. walk to school'
              value={cardData.p02.answer[1]}
              ariaLabel='답란2'
              readOnly={cardData.p02.isSubmitted}
              onChange={e => handleInputChange(1, e.target.value)}
            />
            <Typography>.</Typography>
          </Box>
          <Box marginTop='10px' hAlign='flex-start'>
            <Typography>My classmates are</Typography>
            <Input
              width='480px'
              maxLength={30}
              placeholder='e.g. nice'
              value={cardData.p02.answer[2]}
              ariaLabel='답란3'
              readOnly={cardData.p02.isSubmitted}
              onChange={e => handleInputChange(2, e.target.value)}
            />
            <Typography>.</Typography>
          </Box>
          <Box marginTop='10px' hAlign='flex-start'>
            <Typography>I love</Typography>
            <Input
              width='460px'
              maxLength={30}
              placeholder='e.g. lunchtime'
              value={cardData.p02.answer[3]}
              ariaLabel='답란4'
              readOnly={cardData.p02.isSubmitted}
              onChange={e => handleInputChange(3, e.target.value)}
            />
            <Typography>.</Typography>
          </Box>
          <Box marginTop='10px' hAlign='flex-start'>
            <Typography>My favorite food is</Typography>
            <Input
              width='478px'
              maxLength={30}
              placeholder='e.g. bibimbap'
              value={cardData.p02.answer[4]}
              ariaLabel='답란5'
              readOnly={cardData.p02.isSubmitted}
              onChange={e => handleInputChange(4, e.target.value)}
            />
            <Typography>.</Typography>
          </Box>
        </Content>
      </BackgroundWrap>
      <Box position='absolute' right={-12} bottom={0}>
        <Image src={imageUrl} alt={iamgeAlt} width='220px' />
      </Box>
      <SubmitBtn>
        <Button
          label={'작성 내용 보기'}
          color={EStyleButtonTypes.SECONDARY}
          size={EStyleSizes['XX-SMALL']}
          useRound
          disabled={!cardData.p01.isSubmitted}
          onClick={() => {
            setIsShow(!isShow);
          }}
          width={'152px'}
        />
        <Dialog width={984} height={425} isShow={isShow} useHeader={true} onClose={closeModal}>
          <Table color={EStyleTableTypes.PINK_AND_GREEN} sizes={['200px', '200px', '200px', '200px', '200px']}>
            <THead>
              <TR>
                {L01C10A02TableHeader.map((value, index) => (
                  <TH vAlign='middle' color={EStyleTableTypes.PINK_AND_GREEN} scope={'col'} key={`1${index}1`}>
                    <Typography weight={'var(--font-weight-extraBold)'} style={{ fontSize: '20px' }}>
                      {value.thText}
                    </Typography>
                  </TH>
                ))}
              </TR>
            </THead>
            <TBody>
              <TR>
                {L01C10A02TableHeader.map((value, index) => (
                  <TD hAlign='center' color={EStyleTableTypes.PINK_AND_GREEN} scope={'col'} key={`1${index}2`}>
                    <Typography style={{ fontSize: '20px' }}>{value.eg}</Typography>
                  </TD>
                ))}
              </TR>
              <TR>
                {L01C10A02TableHeader.map((__, index) => (
                  <TD color={EStyleTableTypes.PINK_AND_GREEN} height='109px' key={`1${index}3`} vAlign='top'>
                    <Typography style={{ fontSize: '20px', lineHeight: '36px' }}>{cardData.p01.answer[index]}</Typography>
                  </TD>
                ))}
              </TR>
            </TBody>
          </Table>
        </Dialog>
      </SubmitBtn>
    </Container>
  );
};

export default P02;

const BackgroundWrap = styled.div`
  min-height: 400px;
  width: 80%;
  border: 1px solid;
  border-radius: 20px;
`;

const Content = styled.div`
  padding: 14px 0 0 20px;
`;

const SubmitBtn = styled.div`
  position: absolute;
  right: 0px;
  bottom: 8px;
`;
