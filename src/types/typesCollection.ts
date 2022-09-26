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
    data: candlestickValueType[];
    period: number;
    lineWidth: number;
    color: string;
    positionMultiplier: number;
    chartParameters: chartParametersType;
    id: number;
}