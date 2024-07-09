import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
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
  TMarkType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP03_1 } from './store';
import { L01SP03_2 } from '@/cards/L01/SP03-2/store';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';

interface P15Props {
  pageNumber?: string;
  store?: 'SP03-1' | 'SP03-2';
}

const P15 = ({ pageNumber = 'p15', store = 'SP03-1' }: P15Props) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(store === 'SP03-1' ? L01SP03_1 : L01SP03_2);

  const PAGE_NUM = pageNumber.toUpperCase();
  const [isShow, setShow] = useState<boolean>(false);

  const [mark, setMark] = useState<TMarkType>('none');
  const answer = 5;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Typography>
        1. 다음 글의 밑줄 친 부분 중, 문맥상 낱말의 쓰임이 적절하지 <u>않은</u> 것을 고르시오.
      </Typography>
    ),
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
        <Box height='360px' width='594px' background='white' lineHeight='48px' useRound paddingRight='10px'>
          <Scroll height='100%' tabIndex={0}>
            <Typography>
              Brian Hare conducted an experiment to see how dogs would respond to human gestures compared to wolves, who share the (1)
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>same</u> common ancestor. He placed two cups on the ground
              with food hidden under only one of them. When he pointed to the cup with the food, the dogs found it easily. The wolves, however, (2)
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>struggled</u> and chose cups at random, paying no attention to
              his gestures. Dr. Hare concluded that the dogs’ ability to read human gestures allowed them to perform (3)
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>better</u> than the wolves. He explained that dogs, unlike
              wolves, have developed communicative skills with humans and a sense of friendliness. This explanation sounds (4)
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>reasonable</u> according to several evolutionary biologists.
              They say that from the common ancestors of these two species, those that acted friendly toward humans evolved into dogs, and those that
              didn’t became wolves. Furthermore, Dr. Hare suggested that the friendly nature of dogs probably provided them a survival (5)
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>disadvantage</u> that allowed their population to grow larger
              than that of wolves.
            </Typography>
          </Scroll>
        </Box>
        <Box useFull flex='1'>
          <Scroll height='360px' tabIndex={0}>
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
                  ariaLabel={`${index}번째 답안`}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            />
          </Scroll>
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
              Hare 박사는 늑대에 비해 개들이 인간에게 친근감 있게 다가간 덕분에 개의 개체수가 늑대보다 더 많이 증가했을 수 있다는 의견을 냈는데,
              이러한 개의 본성은 생존에 있어서 ‘유리함’으로 작용했다고 보는 것이 자연스러우므로 5번 disadvantage(불리함)는 advantage(유리함)가 되어야
              한다.
            </Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              Brian Hare는 개들이 같은 공통의 조상을 공유하고 있는 늑대와 비교해서 인간의 몸동작에 어떻게 반응하는지 보기 위해 실험을 했습니다. 그는
              딱 하나의 컵 아래에만 음식이 숨겨져 있는 채로 두 개의 컵을 땅에 두었습니다. 그가 음식이 든 컵을 가리킬 때, 개들은 그것을 쉽게
              찾아냈습니다. 그러나 늑대들은 그의 몸동작에 관심을 기울이지 않으면서, 애를 쓰다가 무작위로 컵을 골랐습니다. Hare 박사는 인간의 몸동작을
              읽는 개들의 능력이 그들이 늑대보다 일을 더 잘 수행하게 한다고 결론을 지었습니다. 그는 개들이 늑대들과는 다르게 인간과의 의사소통 기술과
              친밀감을 발달시켜 왔다고 설명했습니다. 이러한 설명은 몇몇 진화생물학자들에 따르면 타당하게 들립니다. 그들은 이 두 가지 종의 공통
              조상으로부터 인간에게 친근감 있게 행동하는 종은 개로 진화했고, 그렇지 않은 종은 늑대가 되었다고 말합니다. 게다가, Hare 박사는 아마도
              개의 친근감 있는 본성으로 인해 개의 개체수가 늑대의 개체수보다 더 많이 증가하게 한 생존의 불리함(→유리함)이 있었을 것이라는 의견을
              냈습니다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P15;
