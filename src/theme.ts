import styled from 'styled-components';

export default {
    colors: {
        primary: "black"
    },

    fonts: {
        primary: "Arial",
        secondary: "sans-serif"
    }
};

const Row = styled.div`
    display: flex;
    flex-direction: row;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
`

export { Row, Column };