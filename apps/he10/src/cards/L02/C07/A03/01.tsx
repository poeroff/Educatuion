import { Image, Box, Button, EStyleButtonTypes, EStyleSizes, TMainHeaderInfoTypes, PinchZoom, Dialog, Typography, Scroll } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const P01 = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
      'But then came the night of the f ire, which ran through the house and destroyed our past. In only one night, everything we knew was gone. Nani Tama,\n' +
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

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} position={'relative'} height={'100vh'}>
        <Box position={'absolute'} left={'50%'} transform={'translateX(-50%)'}>
          <PinchZoom>
            <Image height='365px' alt='' src={'/L02/C07/A03/HE1-L02-C07-A03-P01.jpg'} ariaDescribedby={'img_desc'} />
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
        <Box position={'absolute'} top={'0'} right={'0'}>
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
      </Box>
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

export default P01;
