import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import {
  BoxWrap,
  Box,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  List,
  Label,
  BottomSheet,
  Radio,
  IQuestionProps,
  EStyleButtonTypes,
  Tag,
  ETagLine,
  TextView,
  TMarkType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP03_1 } from './store';
import { L01SP03_2 } from '@/cards/L01/SP03-2/store';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

interface P16Props {
  pageNumber?: string;
  store?: 'SP03-1' | 'SP03-2';
}

const P16 = ({ pageNumber = 'p16', store = 'SP03-1' }: P16Props) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(store === 'SP03-1' ? L01SP03_1 : L01SP03_2);

  const PAGE_NUM = pageNumber.toUpperCase();
  const [isShow, setShow] = useState<boolean>(false);

  const [mark, setMark] = useState<TMarkType>('none');
  const answer = 2;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <Typography>2. 글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳을 고르시오.</Typography>,
    mark: mark,
    markSize: 'middle',
  };
  const data = [
    {
      text: '(1)',
    },
    {
      text: '(2)',
    },
    {
      text: '(3)',
    },
    {
      text: '(4)',
    },
    {
      text: '(5)',
    },
  ];

  const wordArr = ['The bonobos, on the other hand, got along much better than the chimpanzees.'];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: null,
        },
      ],
    },
  ];

  const isCorrect = useMemo(() => cardData[pageNumber].selectedIdx === answer - 1, [cardData[pageNumber].selectedIdx]);
  useEffect(() => {
    if (cardData[pageNumber].isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData[pageNumber].isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            selectedIdx: userSubmissionList[0].inputData[0]?.value || prev[pageNumber].selectedIdx,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageNumber].selectedIdx,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(PAGE_NUM, userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUM);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleRowClick = (index: number) => {
    if (cardData[pageNumber].isSubmitted) return;

    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], selectedIdx: index } }));
    changeData(PAGE_NUM, 1, 1, index);
  };

  const handleSubmitClick = () => {
    if (cardData[pageNumber].isSubmitted) {
      setShow(!isShow);
    } else {
      submitAnswer();
    }
  };

  return (
    <Container
      vAlign='flex-start'
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageNumber].isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitBtnColor={
        cardData[pageNumber].selectedIdx != null ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={cardData[pageNumber].selectedIdx === null}
      onSubmit={handleSubmitClick}
    >
      <BoxWrap>
        <Box width='594px'>
          <Box height='238px' background='white' lineHeight='48px' useRound paddingRight='10px'>
            <Scroll height='100%' tabIndex={0}>
              <Typography>
                Dr. Hare’s team set up a device which required two individuals to pull both ends of a rope at the same time in order to access food on
                a board. When placed with partners that the chimpanzees knew, they were able to work together to get the food. ( 1 ) However, when
                paired with new partners, the chimpanzees usually failed to get the food, and when they occasionally succeeded, they did not share the
                food with their partner. ( 2 ) They solved the problem regardless of which individual they were paired with, and they were also more
                willing to share the food. ( 3 ) This research shows that bonobos have a cooperative and friendly nature. ( 4 ) Experts suggest that
                their nature has helped their species survive. ( 5 ) Without these characteristics, they could have faced extinction.
              </Typography>
            </Scroll>
          </Box>
          <Box marginTop={'24px'} height='160px'>
            <TextView title='보기'>
              <List align='horizontal' data={wordArr} row={({ value }) => <Typography>{value}</Typography>} />
            </TextView>
          </Box>
        </Box>
        <Box useFull flex='1' hAlign='center'>
          <List
            gap={10}
            data={data}
            row={({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                value={index - 1 === cardData[pageNumber].selectedIdx}
                onClick={() => handleRowClick(index - 1)}
                readOnly={cardData[pageNumber].isSubmitted}
                isError={cardData[pageNumber].isSubmitted && cardData[pageNumber].selectedIdx !== answer - 1}
                ariaLabel={`${index}번째 답안 `}
              >
                <BoxWrap alignItems='baseline'>
                  <Label value={index} />
                  <Typography>{value?.text}</Typography>
                </BoxWrap>
              </Radio>
            )}
          />
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{answer}</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              주어진 문장에 “on the other hand”가 있으므로 글의 흐름이 전환되는 곳에 들어가야 하는데, 2번의 앞 문장에서 침팬지들이 새로운 파트너와
              일을 원만하게 하지 못했다는 내용이 나오고 2번의 뒤에서는 그들이 누구와 짝을 이루든 문제를 잘 해결했다는 상반된 내용이 나온다. 따라서
              2번의 다음 문장의 they는 bonobos를 가리키며, 주어진 문장은 2번에 들어가는 것이 가장 자연스럽다.
            </Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              Hare 박사의 팀은 판자 위에 있는 음식에 접근하기 위해 두 개체가 줄의 양 끝을 동시에 당기도록 요구하는 장치를 설치했습니다. 침팬지들이
              알고 있던 짝과 배치되었을 때, 그들은 음식을 얻기 위해 함께 일할 수 있었습니다. 그러나 새로운 파트너와 짝을 이루었을 때, 침팬지들은 대개
              음식을 얻는 데 실패했고, 때때로 그들이 성공했을 때 그들의 파트너와 음식을 공유하지 않았습니다. 반면에, 보노보들은 침팬지들보다 서로 훨씬
              잘 어울려 지냈습니다. 그들은 누구와 짝을 이루는지에 상관없이 문제를 해결했고, 그들은 또한 더욱 기꺼이 음식을 공유했습니다. 이 연구는
              보노보들이 협조적이고 우호적인 성격을 지닌 것을 보여 줍니다. 전문가들은 그들의 성격이 그들 종이 살아남도록 도왔다고 말합니다. 이러한
              특성이 없었다면, 그들은 멸종을 맞았을 수도 있습니다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P16;
