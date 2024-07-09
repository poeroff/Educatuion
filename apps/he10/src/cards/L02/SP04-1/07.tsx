import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  Box,
  Typography,
  TMainHeaderInfoTypes,
  BottomSheet,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  Tag,
  EStyleFontSizes,
  InputStatus,
} from '@maidt-cntn/ui';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useState, useEffect } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L02CP041 } from './store';

interface pageType {
  _page?: string;
}

const P07 = ({ _page = 'P07' }: pageType) => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02CP041);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const answers = ['I feel upset because Amy says as if she wrote the report without any help.'];
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 문장쓰기 연습',
    headerPattern: 'text',
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

  const onSubmitText = () => {
    if (cardData.p07.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p07: { ...prev.p07, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p07.answer,
            },
          ],
        },
      ];
      submitData(_page.toUpperCase(), userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p07: {
            ...prev.p07,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p07.answer,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p07: { ...prev.p07, answer: e.target.value } }));
    changeData(_page.toUpperCase(), 1, 1, e.target.value);
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '밑줄 친 부분을 바르게 고쳐 문장을 다시 써 봅시다.',
  };

  useEffect(() => {
    return () => {
      saveData(_page.toUpperCase());
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);
  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={
        !isNotEmptyString(cardData.p07.answer) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p07.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '완료하기'}
      submitDisabled={!isNotEmptyString(cardData.p07.answer)}
      onSubmit={onSubmitText}
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        <Box vAlign='center' width='775px' height='193px' hAlign={'center'} background='white' useRound useShadow>
          <Box display='flex' hAlign='center' flexDirection='column'>
            <Typography>
              I feel upset because Amy says as if she
              <Typography textDecoration={'underline'} title='밑줄'>
                writes
              </Typography>
              the report without any help.
            </Typography>
            <Box color='var(--color-blue-900)'>
              <Typography size={EStyleFontSizes['X-MEDIUM']}>
                Amy가 마치 자신이 어떠한 도움도 없이 보고서를 쓴 것처럼 말해서 나는 화가 난다.
              </Typography>
            </Box>
          </Box>
        </Box>
        <BoxWrap>
          <Box flex='1' hAlign={'center'}>
            <Input
              name='value'
              value={cardData.p07.answer}
              width='75%'
              maxLength={100}
              placeholder='내용을 넣어 주세요.'
              onChange={handleInputChange}
              status={cardData.p07.answer !== '' ? (cardData.p07.isSubmitted ? InputStatus.DEFAULT : InputStatus.ENABLE) : InputStatus.DEFAULT}
              readOnly={cardData.p07.isSubmitted}
              ariaLabel='답란'
            />
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='0px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{answers.join(', ')}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P07;
