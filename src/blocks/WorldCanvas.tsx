import styled from "styled-components"
import React from "react"
import core from '../core';

const Block = styled.div`
    background-color: black;
    flex: 1;
    width: 100%;
    height: 100%;
`

const Canvas = styled.canvas`
    border: 1px solid red;
    width: 100%;
    height: 100%;
`

export const WorldCanvas = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        core.setCanvas(canvasRef.current);
        window.requestAnimationFrame(core.render);
    });

    return (
        <Block>
            <Canvas width={600} height={600} ref={canvasRef}>

            </Canvas>
        </Block>
    )
}