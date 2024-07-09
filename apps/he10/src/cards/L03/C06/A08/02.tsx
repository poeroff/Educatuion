import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography } from '@maidt-cntn/ui';

const headerInfo = {
  headerText: 'Viewing Critically : Deep Learning',
};
const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L03/C06/A08/HE1-L03-C06-A08-P02.mp3',
  captionSrc: '/L03/C06/A08/HE1-L03-C06-A08-P02.srt',
};

const imageSrc = '/L03/C06/A08/HE1-L03-C06-A08-P02.jpg';
const imageAlt = (
  <>
    <h1>이 이미지는 인간의 귀 구조를 설명하는 다이어그램이다.</h1>
    <p>소리가 귀를 통해 뇌로 전달되는 과정을 시각적으로 표현하고 있다.</p>
    <p>이미지에는 외이, 중이, 내이의 구조가 상세히 묘사되어 있다.</p>
    <h2>외이(Outer Ear): 소리가 귀에 들어가는 경로이다. 여기에는 귀바퀴와 외이도가 포함되어 있다.</h2>
    <p>Sound Waves: 소리 파동이 귀로 들어간다.</p>
    <p>Ear Canal: 소리 파동이 외이도를 통해 이동한다.</p>
    <h2>중이(Middle Ear): 소리 파동이 고막을 통해 중이로 전달된다.</h2>
    <p>Eardrum: 소리 파동이 고막에 닿아 진동을 일으킨다.</p>
    <p>Tiny Bones: 이 진동은 작은 뼈들에 의해 증폭된다.</p>
    <h2>내이(Inner Ear): 진동이 내이로 전달되어 신경 신호로 변환된다.</h2>
    <p>Snail-Shaped Structure: 달팽이 모양의 구조에서 소리 진동이 신경 신호로 변환된다.</p>
    <p>Hair Cells: 달팽이관 내의 작은 털 세포들이 진동을 감지하여 신경 신호로 변환한다.</p>
    <p>Auditory Nerve: 이 신경 신호는 청신경을 통해 뇌로 전달된다.</p>
  </>
);

const contentTitle = ['The Journey of Sound Waves Through Our Ears'];
const contentText = (
  <Typography style={{ whiteSpace: 'pre-wrap' }}>
    {'   '}
    Have you ever wondered what happens to sound waves when they enter our ears? Let’s take a closer look. The journey starts from the external part
    of the outer ear, which gathers the waves and directs them into the ear. The collected waves then travel through the ear canal and reach the
    eardrum, located in the middle ear. When the eardrum vibrates, these vibrations are transmitted to three small bones in the middle ear. These
    bones make the vibrations stronger and then pass them to a snail-shaped structure in the inner ear. Inside this fluid-filled structure are tiny
    hair cells. When the vibrations make waves in the fluid, the tiny hair cells move and generate electrical signals that travel to the auditory
    nerve. This nerve carries the information to the brain, where the signals are interpreted, allowing us to hear sound. Undoubtedly, it is a quite
    remarkable journey!
  </Typography>
);

const info: IHE01602Info = {
  imageSrc: imageSrc,
  altText: '',
  hiddenAltText: imageAlt,
  title: contentTitle,
  text: contentText,
};

const P02 = () => {
  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P02;
