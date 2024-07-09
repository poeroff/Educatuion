import { ChangeEventHandler, useEffect } from 'react';
import { Box, TMainHeaderInfoTypes, IQuestionProps, EStyleButtonTypes, BoxWrap, Image, PinchZoom, Textarea } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { L01C08A02 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A02);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Across Cultures',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '영어로 부르는 말을 더 찾아보고, 짝과 말해 봅시다.',
  };

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
            value: cardData.p02.answer1,
          },
        ],
      },
    ];
    submitData('P02', userSubmission);
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = event => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: event.target.value } }));
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
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
      submitDisabled={cardData.p02.isSubmitted || !isNotEmptyString(cardData.p02.answer1)}
      submitBtnColor={cardData.p02.isSubmitted || !isNotEmptyString(cardData.p02.answer1) ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap>
        <Box hAlign='center' useFull>
          <PinchZoom>
            <Image
              src='/L01/C08/A02/ME1-L01-C08-A02-P02.jpg'
              width='450px'
              alt="인터넷 검색 입력창에 'calling ... in English' 라는 검색어가 입력되어 있다."
            />
          </PinchZoom>
        </Box>
        <Box useFull>
          <Textarea
            value={cardData.p02.answer1}
            onChange={handleChange}
            width='100%'
            height='310px'
            placeholder='내용을 넣어 주세요.'
            readOnly={cardData.p02.isSubmitted}
            status={!cardData.p02.answer1 ? 'default' : 'enable'}
            ariaLabel='답 입력란'
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P02;
