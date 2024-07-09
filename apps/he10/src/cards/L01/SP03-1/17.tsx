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
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';

interface P17Props {
  pageNumber?: string;
  store?: 'SP03-1' | 'SP03-2';
}

const P17 = ({ pageNumber = 'p17', store = 'SP03-1' }: P17Props) => {
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
    text: (
      <Typography>
        3. 밑줄 친 (a)~(e) 중에서 가리키는 대상이 나머지 넷과 <u>다른</u> 것을 고르시오.
      </Typography>
    ),
    mark: mark,
    markSize: 'middle',
  };
  const data = [
    {
      text: '(a)',
    },
    {
      text: '(b)',
    },
    {
      text: '(c)',
    },
    {
      text: '(d)',
    },
    {
      text: '(e)',
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
              Now let’s turn our attention to (a)<u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>ourselves</u>,
              <Typography fontStyle='italic'>Homo sapiens</Typography>. How have we managed to survive for so long? Neanderthals existed together with
              <Typography fontStyle='italic'>Homo sapiens</Typography> until about 40,000 years ago, and (b)
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>they</u> were known to be intelligent and physically superior
              to <Typography fontStyle='italic'>Homo sapiens</Typography>. Neanderthals were able to make tools and fire and had strong bodies with
              well-developed muscles and broad shoulders. Despite these attributes, however, it was (c)
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                <Typography fontStyle='italic'>Homo sapiens</Typography>
              </u>
              who ultimately survived and thrived. One possible explanation is that (d)
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>our ancestors</u> lived in larger communities that promoted
              cooperation and the free exchange of knowledge, while Neanderthals tended to live in smaller groups. These social differences may have
              given <Typography fontStyle='italic'>Homo sapiens</Typography> a competitive advantage over Neanderthals, allowing (e)
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>them</u> to adapt to an ever-changing environment.
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
              b의 앞 문장에서 네안데르탈인은 약 40,000년 전까지 호모 사피엔스와 함께 존재했었고, b가 있는 문장에서 “they”는 똑똑하고 호모 사피엔스보다
              신체적으로도 우월하다고 알려져 있다고 했으므로, b의 they는 네안데르탈인을 가리킨다. 나머지 a, b, c, e는 호모 사피엔스를 가리키므로, 밑줄
              친 a~e 중에서 가리키는 대상이 나머지 넷과 다른 것은 b이다.
            </Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              그럼 이제 우리 자신, 호모 사피엔스에게 주의를 돌려 봅시다. 어떻게 우리는 그렇게 오랫동안 용케 살아남았을까요? 네안데르탈인은 약 40,000년
              전까지 호모 사피엔스와 함께 존재했었고, 똑똑하고 호모 사피엔스보다 신체적으로도 우월하다고 알려졌습니다. 네안데르탈인은 도구와 불을 만들
              수 있었고 잘 발달된 근육과 넓은 어깨를 가진 강한 신체를 지녔습니다. 그러나 이러한 특성들에도 불구하고, 최후로 살아남아 번영했던 것은
              호모 사피엔스였습니다. 한 가지 가능성 있는 설명은 네안데르탈인이 더 작은 집단으로 사는 경향이 있던 반면에, 우리의 조상은 협력과 자유롭게
              지식을 나누는 것을 장려했던 더 큰 공동체에서 살았다는 것입니다. 이러한 사회적 차이는 호모 사피엔스가 끊임없이 변화하는 환경에 적응하도록
              하면서, 네안데르탈인보다 경쟁 우위를 제공했을 수 있습니다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P17;
