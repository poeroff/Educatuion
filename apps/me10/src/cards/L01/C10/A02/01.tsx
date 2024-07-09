import {
  Box,
  Typography,
  IQuestionProps,
  Table,
  TBody,
  TR,
  TH,
  EStyleTableTypes,
  THead,
  TD,
  Textarea,
  TableCaption,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect } from 'react';
import { L01C10A02, L01C10A02HeaderInfo, L01C10A02TableHeader } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
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

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Box marginRight='10px'>
          <Typography useGap={false} fontSize='32px' lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
            Step 1
          </Typography>
          <Typography>자신의 학교생활에 관해 간단히 써 봅시다.</Typography>
        </Box>
      </>
    ),
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  const checkDisableInput = () => {
    return cardData.p01.answer?.some(val => val === '');
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = cardData.p01.answer?.map((ans, idx) => (idx === index ? value : ans));

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer: updatedAnswers,
      },
    }));
    changeData('P01', 1, 1, cardData.p01.answer);
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData('P01', userSubmission);
  };

  return (
    <Container
      headerInfo={L01C10A02HeaderInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={cardData.p01.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p01.isSubmitted || checkDisableInput()}
      onSubmit={submitAnswer}
      useExtend
    >
      <Table color={EStyleTableTypes.PINK_AND_GREEN} sizes={['200px', '200px', '200px', '200px', '200px']}>
        <TableCaption caption='학교생활 쓰기 목록' hidden />
        <THead>
          <TR>
            {L01C10A02TableHeader.map((value, index) => (
              <TH vAlign='middle' color={EStyleTableTypes.PINK_AND_GREEN} scope={'col'} key={`1${index}1`}>
                {value.thText}
              </TH>
            ))}
          </TR>
        </THead>
        <TBody>
          <TR>
            {L01C10A02TableHeader.map((value, index) => (
              <TD hAlign='center' color={EStyleTableTypes.PINK_AND_GREEN} scope={'col'} key={`1${index}2`}>
                {value.eg}
              </TD>
            ))}
          </TR>
          <TR>
            {L01C10A02TableHeader.map((__, index) => (
              <TD color={EStyleTableTypes.PINK_AND_GREEN} key={`1${index}3`}>
                <Textarea
                  height='196px'
                  placeholder='내용을 넣어 주세요.'
                  ariaLabel='답 입력란'
                  readOnly={cardData.p01.isSubmitted}
                  value={cardData.p01.answer[index]}
                  onChange={e => handleInputChange(index, e.target.value)}
                />
              </TD>
            ))}
          </TR>
        </TBody>
      </Table>
    </Container>
  );
};

export default P01;
