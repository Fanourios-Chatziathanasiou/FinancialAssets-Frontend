
export type searchAssetsType = {
    "name": string,
    "symbol": string,
    "currency": string,
    "exchange": string,
    "mic_code": string,
    "country": string,
    "type": string
}


export type candlestickValueType =
    {

        "id": string
        "datetime": string | any
        "open": string
        "high": string
        "low": string
        "close": string
        "volume": string
    }


export type assetDataType = {
    "meta"?: {
        "id": string,
        "symbol": string,
        "interval": string,
        "currency": string,
        "exchange": string,
        "lastUpdate": string,
        "iscurrentlyupdating": string,
        "exchange_timezone": string,
        "type": string
    }
    "values"?: [{
        "id": string
        "datetime": string | any
        "open": string
        "high": string
        "low": string
        "close": string
        "volume": string
    }]
}

export type chartParametersType = {
    data: candlestickValueType[],
    xScale: any,
    xAccessor: (data: any) => number,
    displayXAccessor: (data: any) => number;

}

export type GlobalIndicatorTypes = {
    name?: string;
    indicatorName?: string;
    indicatorType?: string;
    id?: string | number
}

export type EmaIndicatorTypes = {
    data: candlestickValueType[],
    period: number,
    lineWidth: number,
    color: string,
    positionMultiplier: number,
    chartParameters: chartParametersType,


} & GlobalIndicatorTypes
export type SmaIndicatorTypes = {
    data: candlestickValueType[],
    period: number,
    lineWidth: number,
    color: string,
    positionMultiplier: number,
    chartParameters: chartParametersType,


} & GlobalIndicatorTypes


export type RSIIndicatorTypes = {

    data: candlestickValueType[],
    chartParameters: chartParametersType,
    period: number,
    height: number,
    width: number,
    ratio: number,
    positionMultiplier: number,
    overboughtThreshold: number,
    oversoldThreshold: number,
    color: string
    chartHeight: number
    lineWidth: number,
    indicatorsArray: any[];
    setIndicatorsArray: any;

} & GlobalIndicatorTypes

export type MACDIndicatorTypes = {
    data: candlestickValueType[];
    chartParameters: chartParametersType;
    fastEMA: number;
    signalLine: number;
    slowEMA: number;
    setChartParameters: any;
    indicatorsArray: any[];
    setIndicatorsArray: any;
    positionMultiplier: number;
} & GlobalIndicatorTypes

export type IndicatorTypes = Partial<(MACDIndicatorTypes | RSIIndicatorTypes | SmaIndicatorTypes | EmaIndicatorTypes)>

export type IndicatorsArrayTypes = IndicatorTypes[]


export type IndicatorsListModalTypes = {
    indicatorsArray: IndicatorsArrayTypes;
    setIndicatorsArray: (indicatorsArray: IndicatorsArrayTypes) => void
}

export type IndicatorsEditorModalTypes = {
    isEditorModalShowing: boolean;
    setIsEditorModalShowing: (isShowing: boolean) => void;
    editedIndicator: IndicatorTypes;
    setEditedIndicator: (editedIndicator: IndicatorTypes | null) => void;
    indicatorsArray: IndicatorsArrayTypes;
    setIndicatorsArray: (indicatorsArray: IndicatorsArrayTypes) => void
}

export type IndicatorsModalTypes = {
    indicatorsArray: IndicatorsArrayTypes;
    chartParameters: chartParametersType | null;
    setIndicatorsArray: any
}