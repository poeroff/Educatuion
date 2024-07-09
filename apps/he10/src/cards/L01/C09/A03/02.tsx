import { ChangeEventHandler, useEffect } from 'react';
import { BoxWrap, Box, TMainHeaderInfoTypes, Textarea, Image, PinchZoom, IQuestionProps, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C09A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C09A03);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Write and Share',
  };
  const questionInfo: IQuestionProps = {
    text: 'Write a letter of advice based on Page 1 and share it with your partner. Then, revise it according to the feedback from your partner.',
  };

  const { userId } = useRecoilValue(studentAtom);
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleSubmit = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer,
          },
        ],
      },
    ];
    submitData('P02', userSubmission);
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = event => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: event.target.value } }));
    changeData('P02', 1, 1, event.target.value);
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
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={handleSubmit}
      submitDisabled={cardData.p02.isSubmitted || !isNotEmptyString(cardData.p02.answer)}
      submitBtnColor={cardData.p02.isSubmitted || !isNotEmptyString(cardData.p02.answer) ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap>
        <Box hAlign='center' useFull>
          <PinchZoom>
            <Image src='/L01/C09/A03/HE1-L01-C09-A03-P02.jpg' width='450px' height='310px' ariaDescribedby='img-desc' alt='' />
            <Box type='hidden' id='img-desc'>
              편지 글 양식 Dear , 빈칸 I’m sorry to hear that you’re having a tough time 빈칸 . Here are some useful tips which 빈칸 . First, 빈칸 .
              This will help you 빈칸 . In addition, 빈칸 . This can help you 빈칸 . Following these tips, you will be able to overcome the
              difficulty. Best wishes, 빈칸
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull>
          <Textarea
            value={cardData.p02.answer}
            onChange={handleChange}
            width='100%'
            height='311px'
            placeholder='내용을 넣어 주세요.'
            readOnly={cardData.p02.isSubmitted}
            status={!cardData.p02.answer ? 'default' : 'enable'}
            ariaLabel='답 입력란'
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P02;
