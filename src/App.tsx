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
`

const BottomRow = styled(Row)` 
  height: 100%;
`

function App() {
  return (
    <Container>
      <Row>
        <ActionBar />
      </Row>
      <BottomRow>
        <OptionsSideBar />
        <WorldCanvas />
      </BottomRow>
    </Container>
  );
}

export default App;
