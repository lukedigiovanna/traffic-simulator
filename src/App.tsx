import React from 'react';

import { ActionBar } from './blocks/ActionBar';
import { OptionsSideBar } from './blocks/OptionsSideBar';
import { WorldCanvas } from './blocks/WorldCanvas';
import { Row } from './theme';

import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ddd;
  display: flex;
  flex-direction: column;
`

const TopRow = styled(Row)`
  flex: 1;
`

const BottomRow = styled(Row)` 
  flex: 9;
`


function App() {
  return (
    <Container>
      <TopRow>
        <ActionBar />
      </TopRow>
      <BottomRow>
        <OptionsSideBar />
        <WorldCanvas />
      </BottomRow>
    </Container>
  );
}

export default App;
