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
    /* width: 100%;
    height: 100%; */
`

export const WorldCanvas = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const blockRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        core.setCanvas(canvasRef.current as HTMLCanvasElement);
        window.requestAnimationFrame(core.render);
        setInterval(() => {
            console.log("Update");
            if (blockRef.current && canvasRef.current) {
                const { width, height } = blockRef.current.getBoundingClientRect();
                console.log(width, height);
                canvasRef.current.width = width - 4;
                canvasRef.current.height = height - 4;
            }
        }, 500);
    }, []);

    return (
        <Block ref={blockRef}>
            <Canvas width={600} height={600} ref={canvasRef}>

            </Canvas>
        </Block>
    )
}