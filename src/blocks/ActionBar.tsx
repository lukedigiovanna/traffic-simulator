import styled from 'styled-components';
import theme, { Row } from '../theme';
import * as React from 'react';
import { Tool } from '../core/toolmanager';
import core from '../core';

const ActionRow = styled(Row)`
    min-height: 40px;
    border-bottom: 3px solid black;
    width: 100vw;
    background-color: #eee;
    align-items: center;
`

const Title = styled.p`
    font-family: ${theme.fonts.primary};
    font-weight: bold;
    font-size: 1.6rem;
    margin-inline: 20px;
`

const ControlButton = styled.button`
    width: 40px;
    height: 40px;
    border: 2px solid black;
    background-color: #ddd;
    border-radius: 1px;
    margin-inline: 5px;
    padding: 0;
`

const Image = styled.img`
    width: inherit;
    height: inherit;
    margin: 0;
`

const ToolButton = styled.button<{selected: boolean}>`
    border: ${props => props.selected ? "2px solid aqua" : "1px solid black"};
    border-radius: 1px;
    transition: 0.4s ease-in-out;
    background-color: #eee;
    padding: 5px;
    font-weight: bold;
    margin-inline: 5px;

    &:hover {
        background-color: #ddd;
    }
`

const Spacer = styled.div`
    width: 1px;
    background-color: #222;
    height: 50px;
    margin-inline: 15px;
`

export const ActionBar = () => {
    const [tool, setTool] = React.useState<Tool>(null);

    React.useEffect(() => {
        core.setTool(tool);
    }, [tool]);

    return (
        <ActionRow>
            <Title>
                Traffic Simulator
            </Title>
            <Row>
                {/* Simulation controls */}
                <ControlButton>
                    <Image src={require("../assets/play.png")} />
                </ControlButton>
                <ControlButton>
                    Speed
                </ControlButton>
                <ControlButton>
                    Reset
                </ControlButton>
            </Row>
            <Spacer />
            <ToolButton selected={tool === "select"} onClick={() => {
                setTool("select");
            }}>
                Select
            </ToolButton>
            <ToolButton selected={tool === "build-road"} onClick={() => {
                setTool("build-road");
            }}>
                Build Road
            </ToolButton>
            <ToolButton selected={tool === "destroy"} onClick={() => {
                setTool("destroy");
            }}>
                Destroy Road
            </ToolButton>
        </ActionRow>
    )
}