
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

export type EmaIndicatorTypes = {
    data: candlestickValueType[],
    period: number,
    lineWidth: number,
    color: string,
    positionMultiplier: number,
    chartParameters: chartParametersType,
    id: number,

}
export type SmaIndicatorTypes = {
    data: candlestickValueType[],
    period: number,
    lineWidth: number,
    color: string,
    positionMultiplier: number,
    chartParameters: chartParametersType,
    id: number,

}


export type RSIIndicatorTypes = {
    data: candlestickValueType[],
    chartParameters: chartParametersType,
    period: number,
    id: number | string,
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

}

export type MACDIndicatorTypes = {
    data: candlestickValueType[];
    chartParameters: chartParametersType;
    fastEMA: number;
    signalLine: number;
    slowEMA: number;
    id: number | string;
    setChartParameters: any;
    indicatorsArray: any[];
    setIndicatorsArray: any;
    positionMultiplier: number;
}