import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleSizes,
  ETagLine,
  Image,
  PinchZoom,
  Tag,
  Textarea,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L02C07A03 } from './store';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C07A03);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Write and Act Out',
  };
  const questionInfo = {
    text: 'Write a script based on one scene from the story and act it out with your peers.',
  };

  const modalText = {
    text1:
      'The phone rang, and it was my dad calling from my hometown, Waituhi. “Can you take a week off?” he asked. “Your Nani Tama wants you here.” \n' +
      '“But Dad!” I answered. “My boss won’t let me take any more time off.” The phone went silent, and then I heard my grandfather say faintly, “I need\n' +
      'your help, Grandson. I must go to Murupara to finish the whakapapa. Drive me there. Hurry, I may not have much time.” I just knew I had no choice. \n' +
      '“All right, Nani,” I replied with a sigh. “I’ll come.”',
    text2:
      'For some time, my grandfather had been busy writing down the village genealogy, known as the whakapapa. The whakapapa had been in his old house. \n' +
      'But then came the night of the fire, which ran through the house and destroyed our past. In only one night, everything we knew was gone. Nani Tama,\n' +
      'in despair, went to stay with his daughter, my Auntie Hiraina. Trying to find a way out of the ashes of the past, Nani began to write the whakapapa again \n' +
      'with his shaky hands. He chanted the names of the ancestors, joining the past to the present once more. The village went quiet and listened to his chanting. \n' +
      'His voice traveled along the lines of our genealogy, searching back across the centuries. Sometimes, there were lines that were difficult to remember. \n' +
      'Then his voice suddenly stopped in the middle of the chant. The village waited in worried silence until the next name burst out of his mouth. It took Nani Tama \n' +
      'almost two years to gather most of the whakapapa, but there were still missing names he needed to fill in. Now, he wanted me to drive him to Murupara to finish\n' +
      'his work.',
    text3:
      'When I arrived at Auntie’s place, I was shocked to see how thin Nani Tama was. “Look, Nani,” I said. “I’m not taking you anywhere. You could die on me!”\n' +
      'Nani looked at me in anger. “You want me to die here in this room? Looking at these four walls? When the whakapapa is not yet finished?”\n' +
      'The old man held on tightly to the side of the bed and cried out as he stood up. Every slow, painful step hurt him, but he tried to walk. I could\n' +
      'not help but carry him to the car, and we set off with Auntie. We traveled all night, mostly in silence, listening to Nani chanting in the darkness. \n' +
      'It was strange but wonderful to hear him. Sometimes, he burst into a song that he had taught Auntie. They sang together, lifting up their voices to send the song \n' +
      'flying like a bird through the sky.',
    text4:
      'Just before noon, we arrived at a small town called Murupara. “Where do we go now?” I asked Nani. He did not reply, but he was searching inside himself, staring at\n' +
      'the small houses. Then, at a street corner, he told us to turn. After turning the corner, we saw an old man standing in front of a house. He welcomed Nani Tama with \n' +
      'a gentle smile, but in his eyes, I saw the message, “We must hurry.”',
    text5:
      'Now that day seems like a dream to me. I remember the two old men sitting at the table and the soft sounds of the Maori words as they talked. All through the quiet afternoon \n' +
      'and into the evening, they recalled missing names. I had a strange feeling that there were other people in the room. I felt as if people from the past were looking over the shoulders of\n' +
      'the two old men to see if the work was correct. Finally, they stopped. It was done. After a moment of silence, the old man whispered to Nani, “Goodbye, friend.” Crying, they pressed their\n' +
      'noses together to say goodbye.',
    text6:
      'It was early morning and still dark when we returned to Auntie’s place. All the lights were on, and the village people were waiting for us. Smiling, Nani Tama lifted up the whakapapa and offered it to the village. Our hearts were full because our grandfather had saved our past for us. Our Nani Tama smiled again. His smile grew tired. He sighed. “At last, I may go now.”\n' +
      'Then, he closed his eyes. “No, Dad!” Auntie Hiraina cried. The sun burst across the hills.',
  };

  const answers = [
    {
      name: 'NANI',
      content:
        '[looking at Grandson in anger] You want me to die here in this room? I must complete the whakapapa before I meet my ancestors. [crying out in pain as standing up to go] Please, drive me to Murupara. I don’t have much time.',
    },
    { name: 'GRANDSON', content: 'Okay, okay. Let’s go. [leaving the room] I’ll get ready to set off.' },
    {
      name: 'AUNTIE',
      content:
        'I’ll go with you, too. Dad holds Nani by his arms and helps him walk. Nani, Auntie, and Grandson all get in the car and leave the town.',
    },
  ];

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: {
              ...prev.p02.answer,
              value: userSubmissionList[0].inputData[0]?.value || prev.p02.answer.value,
            },
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

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer.value,
          },
        ],
      },
    ];
    submitData('P02', userSubmission);
  };

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      submitAnswer();
    } else {
      setShowAnswer(!showAnswer);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: { ...prev.p02.answer, value: e.target.value } } }));
    changeData('P02', 1, 1, e.target.value);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={handleSubmit}
      submitDisabled={!isNotEmptyString(cardData.p02.answer.value)}
      submitBtnColor={
        isNotEmptyString(cardData.p02.answer.value)
          ? showAnswer
            ? EStyleButtonTypes.DEFAULT
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap display={'block'} useFull>
        <Box hAlign='right'>
          <Button
            minWidth='118px'
            size={EStyleSizes.SMALL}
            color={EStyleButtonTypes.SECONDARY}
            label='지문보기'
            useRound
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        </Box>
        <Box hAlign={'center'}>
          <Box hAlign={'center'} useFull>
            <PinchZoom>
              <Image height='300px' alt='' src={'/L02/C07/A03/HE1-L02-C07-A03-P01.jpg'} ariaDescribedby={'img_desc'} />
              <Box type={'hidden'} id={'img_desc'}>
                <p>
                  연기 대본 Scene Ⅱ. At Auntie’s house Nani sits on the bed with no energy while Dad (Nani’s son) and Auntie (Nani’s daughter) stand
                  beside him.
                </p>
                <p>NANI: [with a tired face and voice ] I can’t remember. They’re on the tip of my tongue. I can’t recall any more missing names.</p>
                <p>DAD: [with a sigh ] Dad, you’ve been trying to gather the whakapapa for almost two years. That’s enough.</p>
                <p>NANI: It’s not enough! I must go to Murupara and see my friend. I need his help to f inish the whakapapa. I must go there.</p>
                <p>GRANDSON: [entering the room] Oh, no, Nani. You’re so thin! You can’t go anywhere.</p>
                <p>NANI: [strongly ] I can go. Drive me to Murupara.</p>
                <p>AUNTIE: No, Dad. You can hardly walk.</p>
                <p>GRANDSON: Look, Nani. I’m not taking you anywhere. You could die on me!</p>
              </Box>
            </PinchZoom>
          </Box>
          <Box useFull>
            <Textarea
              readOnly={cardData.p02.isSubmitted}
              height={'280px'}
              value={cardData.p02.answer.value}
              onChange={handleTextChange}
              placeholder='내용을 넣어 주세요.'
            />
          </Box>
        </Box>
      </BoxWrap>

      {/* 답안보기 바텀시트 */}
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer && cardData.p02.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <ScriptContainer>
              {answers.map((item, index) => (
                <Line key={index}>
                  <Name useGap={false} weight={'var(--font-weight-extraBold)'}>
                    {item.name}
                  </Name>
                  <Dialogue useGap={false}>{item.content}</Dialogue>
                </Line>
              ))}
            </ScriptContainer>
          </Box>
        </Box>
      </BottomSheet>

      {/* 지문 모달 */}
      <Dialog
        width={921}
        height={500}
        topHeight={110}
        useHeader
        header={() => (
          <Box display={'flex'} flexDirection={'column'} background={'gray'} useRound marginBottom={'12px'}>
            <Typography weight={'var(--font-weight-extraBold)'} align={'center'}>
              Gathering of the Whakapapa
            </Typography>
            <Typography align={'center'}>by Witi Ihimaera</Typography>
          </Box>
        )}
        isShow={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        useFooter={true}
        closeLabel='지문 닫기'
        tabIndex={104}
      >
        <Box>
          <Typography>
            &nbsp;&nbsp;{modalText.text1}
            <br /> <br /> &nbsp;&nbsp;{modalText.text2}
            <br /> <br /> &nbsp;&nbsp;{modalText.text3}
            <br /> <br /> &nbsp;&nbsp;{modalText.text4}
            <br /> <br /> &nbsp;&nbsp;{modalText.text5}
            <br /> <br /> &nbsp;&nbsp;{modalText.text6}
          </Typography>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P02;

const ScriptContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Line = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Name = styled(Typography)`
  width: 180px;
  text-align: right;
  padding-right: 16px;
`;

const Dialogue = styled(Typography)`
  flex: 1;
  text-align: left;
`;
