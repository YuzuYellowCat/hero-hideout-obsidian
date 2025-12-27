"use client";
import React, {
    useCallback,
    useEffect,
    createRef,
    useState,
    useMemo,
} from "react";
import "./index.css";

type FadePoint = {
    x: number;
    y: number;
    colors: [Color, ...Color[]];
    duration: number;
    frame: number;
    speed: number;
};

type CanvasSize = {
    width: number;
    height: number;
};

type Color = {
    red: number;
    green: number;
    blue: number;
};

const ColorfulHex: React.FC = () => {
    const canvasRef = createRef<HTMLCanvasElement>();
    const points: FadePoint[] = useMemo(() => [], []);
    const [context, setContext] = useState<CanvasRenderingContext2D>();
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({
        width: 0,
        height: 0,
    });

    const _colorDiffEq = useCallback(
        (beforeColor: number, afterColor: number, pctBetween: number) => {
            return (
                beforeColor +
                Math.floor((afterColor - beforeColor) * pctBetween)
            );
        },
        []
    );

    const _getCurrentColor = useCallback(
        (pctThrough: number, colors: Color[]) => {
            const indexLocation = (colors.length - 1) * pctThrough;
            const beforeColor = colors[Math.floor(indexLocation)];
            const afterColor = colors[Math.ceil(indexLocation)];
            if (beforeColor === afterColor) {
                return beforeColor;
            }
            const pctBetween = indexLocation - Math.floor(indexLocation);
            return {
                red: _colorDiffEq(beforeColor.red, afterColor.red, pctBetween),
                green: _colorDiffEq(
                    beforeColor.green,
                    afterColor.green,
                    pctBetween
                ),
                blue: _colorDiffEq(
                    beforeColor.blue,
                    afterColor.blue,
                    pctBetween
                ),
            };
        },
        [_colorDiffEq]
    );

    const draw = useCallback(() => {
        if (!context) {
            return;
        }
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // Copy the points array for looping so we can remove points
        for (const point of Array.from(points)) {
            const pctThrough = point.frame / point.duration;
            const opacity = 1 - Math.min(pctThrough, 1);
            if (!opacity) {
                points.splice(points.indexOf(point), 1);
                continue;
            }
            const color = _getCurrentColor(pctThrough, point.colors);
            context.fillStyle = `rgba(${color.red}, ${color.green}, ${color.blue}, ${opacity})`;
            context.beginPath();
            context.arc(
                point.x,
                point.y,
                point.frame * point.speed,
                0,
                Math.PI * 2,
                false
            );
            context.fill();
            point.frame++;
        }
    }, [context, points, _getCurrentColor]);

    const onMouseMove = useCallback(
        (event: MouseEvent) => {
            points.push({
                x: event.clientX,
                y: event.clientY,
                frame: 0,
                // Yellow -> Teal
                colors: [
                    { red: 255, green: 231, blue: 106 },
                    { red: 28, green: 130, blue: 165 },
                ],
                duration: 50,
                speed: 1,
            });
        },
        [points]
    );

    const onClick = useCallback(
        (event: MouseEvent) => {
            points.push({
                x: event.clientX,
                y: event.clientY,
                frame: 0,
                // White -> Yellow -> Cyan
                colors: [
                    { red: 255, green: 244, blue: 183 },
                    { red: 255, green: 244, blue: 183 },
                    { red: 255, green: 231, blue: 106 },
                    { red: 255, green: 190, blue: 38 },
                ],
                duration: 70,
                speed: 2,
            });
        },
        [points]
    );

    useEffect(() => {
        const potentialContext = canvasRef.current?.getContext("2d");
        if (potentialContext) {
            setContext(potentialContext);
        }
    }, [canvasRef]);

    useEffect(() => {
        let animationFrameId: number;

        const render = () => {
            draw();
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);

    useEffect(() => {
        const updateCanvasSize = () => {
            setCanvasSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", updateCanvasSize);
        window.addEventListener("click", onClick);
        window.addEventListener("mousemove", onMouseMove);
        updateCanvasSize();
        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            window.removeEventListener("click", onClick);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [onMouseMove, onClick]);

    return (
        <canvas
            className="hex"
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
        />
    );
};

export default ColorfulHex;
