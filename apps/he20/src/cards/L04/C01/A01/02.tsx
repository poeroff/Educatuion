import HE00102 from '@maidt-cntn/pages/HE-001-02';

const P02 = () => {
  return (
    <>
      <HE00102
        value1={'Advances in neural implants will make it possible to install software in our brains.'}
        highlight1={['make it', 'to install']}
        value2={'There’s a risk that organizations could access personal data without permission.'}
        highlight2={['a risk that']}
      />
    </>
  );
};

export default P02;
