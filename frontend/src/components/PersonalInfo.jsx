import React from 'react'
import styled from "styled-components";
import AppBarComponent from "../components/AppBar";
const PersonalInfo = () => {
    return (
        <Root>
            <AppBarComponent comp={'profile'} />
        </Root>
    )
}
const Root = styled.div`
  display: flex;
`;
export default PersonalInfo