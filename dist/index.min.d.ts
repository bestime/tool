import { observeDomResize } from '@bestime/utils_browser';
import { Animate } from '@bestime/utils_base';

type TDirection = 'horizontal' | 'vertical';
interface IOption$1 {
    el: HTMLDivElement;
    direction: TDirection;
    onChange: (ratio: number) => void;
}
declare class SingleBar {
    _oBar: HTMLDivElement;
    _oController: HTMLSpanElement;
    _oBorder: HTMLDivElement;
    _config: IOption$1;
    _max: number;
    _startX: number;
    _startY: number;
    _distence: number;
    _downDistence: number;
    _ratio: number;
    _animate: Animate<{
        value: number;
    }>;
    constructor(option: IOption$1);
    _onMouseMove(ev: MouseEvent): void;
    setRatio(r: number, setcontentScroll?: boolean): void;
    _onMouseDown(ev: MouseEvent): void;
    _onMouseUp(): void;
    setSize(wrapperSize: number, contentSize: number): void;
    dispose(): void;
}

interface IOption {
    el: HTMLDivElement;
    fade?: boolean;
}
declare class ScrollBar {
    _config: IOption;
    _horizontal: SingleBar;
    _vartical: SingleBar;
    _obsv: ReturnType<typeof observeDomResize>;
    constructor(config: IOption);
    _initListen(): void;
    _onMouseScroll(): void;
    _onHorizontalChange(ratio: number): void;
    _onVerticalChange(ratio: number): void;
    refresh(): void;
    dispose(): void;
}

export { ScrollBar as default };
