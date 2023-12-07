import React, { useState } from 'react'
import Personalization from '../components/Personalization';
import styled from 'styled-components';
import CarouselComponent from '../components/CarouselComponent';
const PersonalizedPage = () => {
  const [openModal, setOpenModal] = useState(true);
  const [personalizedUrl, setPersonalizedUrl] = useState("");
  return (
    <Root>
      {openModal ? <Personalization setOpenModal={setOpenModal} setPersonalizedUrl={setPersonalizedUrl} /> : <CarouselComponent url={personalizedUrl}/>}
    </Root>
  )
}

const Root = styled.div`
  
`;

export default PersonalizedPage;

