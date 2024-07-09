import HE00102 from '@maidt-cntn/pages/HE-001-02';

const P02 = () => {
  return (
    <>
      <HE00102
        value1={'The sentiment is shared by many, with coffee shops springing up on every street corner.'}
        highlight1={['with', 'springing']}
        value2={'Reusable cups not only have an appealing appearance but also preserve the taste of the coffee.'}
        highlight2={['not only have', 'but also preserve']}
      />
    </>
  );
};

export default P02;
