import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  List,
  PinchZoom,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L05C09A03 } from './store';
import { ChangeEvent, useEffect, useState } from 'react';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L05C09A03);
  const [isShow, setIsShow] = useState<boolean>(false);

  const currentPage = 'P01';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mePractice',
    headerText: 'A',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고, Anne에게 주변 인물들이 해 준 일을 써 봅시다.',
  };

  const imageInfo = {
    src: `/L05/C09/A03/ME1-L05-C09-A03-P01.jpg`,
    alt: 'Anne에게 1번 Marilla는 make/ a pie를, 2번 Matthew는 buy/a dress를, 3번 Gilbert는 give/ flowers를, 4번 Diana는 send / a letter를 해준다.',
  };

  const data = ['Marilla made Anne', 'Matthew'];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0].value,
            isSubmitted,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const updatedAnswers = cardData.p01.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: updatedAnswers } }));
    changeData(currentPage, 1, 1, value);
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(prev => !prev);
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
    submitData(currentPage, userSubmission);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      bodyId='targetContainer'
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!Array.isArray(cardData.p01.answer) || cardData.p01.answer.some(value => value === '' || value === undefined)}
      submitBtnColor={
        !Array.isArray(cardData.p01.answer) || cardData.p01.answer.some(value => value === '' || value === undefined)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Box useFull hAlign='center'>
          <PinchZoom>
            <Image src={imageInfo.src} alt={imageInfo.alt} height='239px' />
          </PinchZoom>
        </Box>
      </BoxWrap>

      <Box vAlign='center' marginTop='9px'>
        <List data={data}>
          {({ value, index = 1 }) => (
            <Box>
              <Typography>
                ({index}) {value}{' '}
                <Input
                  tabIndex={100 + index}
                  width='500px'
                  placeholder='내용을 넣어 주세요.'
                  maxLength={100}
                  value={cardData.p01.answer[index - 1]}
                  onChange={e => handleChangeValue(e, index - 1)}
                  ariaLabel={index + '번 답안'}
                  readOnly={cardData.p01.isSubmitted}
                  status={cardData.p01.answer[index - 1] === '' ? InputStatus.DEFAULT : InputStatus.ENABLE}
                />
                .
              </Typography>
            </Box>
          )}
        </List>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='25%' margin-top={'10px'}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='10px'>
            {Array.from({ length: cardData.p01.solution.length }, (_, i) => (
              <Typography key={'solution_' + i} style={{ display: 'block' }}>
                ({i + 1}) {cardData.p01.solution[i]}
              </Typography>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
