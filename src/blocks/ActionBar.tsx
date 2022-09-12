import styled from 'styled-components';
import theme, { Row } from '../theme';

const ActionRow = styled(Row)`
    min-height: 40px;
    border-bottom: 3px solid black;
    width: 100vw;
    background-color: #eee;
`

const Title = styled.p`
    font-family: ${theme.fonts.primary};
    font-weight: bold;
    font-size: 1.6rem;
`

export const ActionBar = () => {
    return (
        <ActionRow>
            <Title>
                Traffic Simulator
            </Title>
            <button>
                Something 1
            </button>
            <button>
                Something 2
            </button>
            <button>
                Something 3
            </button>
            <button>
                Something 4
            </button>
            <button>
                Something 5
            </button>
        </ActionRow>
    )
}