import styled from "styled-components"
import React from "react"
import core from '../core';

const Block = styled.div`
    background-color: red;
    flex: 1;
    /* width: 100%;
    height: 100%; */
`

const Canvas = styled.canvas`
    /* width: 100%;
    height: 100%; */
`

export const WorldCanvas = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const blockRef = React.useRef<HTMLDivElement>(null);

    const resizeCanvas = function () {
        if (blockRef.current && canvasRef.current) {
            const [width, height] = [window.innerWidth - 230, window.innerHeight - 84];
            canvasRef.current.width = width;
            canvasRef.current.height = height;
        }
    }

    React.useEffect(() => {
        window.onload = () => {
            core.setCanvas(canvasRef.current as HTMLCanvasElement);
            window.requestAnimationFrame(core.render);
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas);
        }
    }, []);

    return (
        <Block ref={blockRef}>
            <Canvas ref={canvasRef} tabIndex={0}>

            </Canvas>
        </Block>
    )
}