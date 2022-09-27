import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetAssetDataByNameQuery } from "../../../src/services/assetDataApi";
import { useAppDispatch, useAppSelector } from "../../../src/app/hooks";

import StockChart from "../../../src/components/chart/StockChart";
import { candlestickValueType, chartParametersType } from "../../../src/types/typesCollection";
import { discontinuousTimeScaleProviderBuilder } from "react-financial-charts";
import IndicatorsModal from "../../../src/components/indicatorsModal/IndicatorsModal";
import { IOHLCData } from "../../../src/components/chart/iOHLCData";
import IndicatorsEditorModal from "../../../src/components/indicatorsEditorModal/IndicatorsEditorModal";

const ChartResult = () => {
	//IndicatorsEditorModal state to manipulate wheter it is showing or not.
	const [isIndicatorsEditorModalShowing, setIsIndicatorsEditorModalShowing] = useState<boolean>(false);
	const setIsIndicatorsEditorModalShowingFunc = (boolean: boolean) => {
		setIsIndicatorsEditorModalShowing(boolean);
	};
	//chartparameters hold the shared element between chart and indicators.That way we avoid initializing them every time.
	//It comes handy when we have to create Indicators on a different component than the one we render the chart. (For example
	//we create indicators inside <IndicatorsModal/> but render it on the StockChart).
	const [chartParameters, setChartParameters] = useState<chartParametersType>();
	//The array of the *internal* indicators (Indicators placed inside the chart-excluding Volume).
	const [internalIndicatorsArray, setInternalIndicatorsArray] = useState<JSX.Element[]>([]);
	//Nextjs route parameter
	const router = useRouter();
	//Nextjs route parameter
	const { ChartResult } = router.query;
	//Redux-Toolkit dispatch
	const dispatch = useAppDispatch();
	//React Query fetch to get the data from our endpoint.
	const { data, isSuccess } = useGetAssetDataByNameQuery(ChartResult as string, { skip: ChartResult === undefined });

	//When the data is ready
	useEffect(() => {
		if (isSuccess === true) {
			//convert the datetime from string to Date Object and change its order
			let dataCopy = JSON.parse(JSON.stringify(data));
			dataCopy.values.reverse();
			dataCopy.values.forEach((element: any, index: number, arr: any) => {
				dataCopy.values[index].datetime = new Date(element.datetime);
			});

			//Create the chart parameters needed to render the chart and its indicators
			//These values will be shared across all indicators
			const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
				(d: candlestickValueType) => d.datetime
			);
			//create and set the chartParameters
			const chartParametersTempObject = {
				xScaleProvider: discontinuousTimeScaleProviderBuilder().inputDateAccessor((d: IOHLCData) => d.datetime),
				data: xScaleProvider(dataCopy.values).data,
				xScale: xScaleProvider(dataCopy.values).xScale,
				xAccessor: xScaleProvider(dataCopy.values).xAccessor,
				displayXAccessor: xScaleProvider(dataCopy.values).displayXAccessor,
			};
			setChartParameters({ ...chartParametersTempObject });
		}
	}, [isSuccess]);

	function setInternalIndicatorsArrayFunc(el: any) {
		setInternalIndicatorsArray(el);
	}

	return (
		<div className="w-[100%] mt-2">
			<IndicatorsModal
				internalIndicatorsArray={internalIndicatorsArray}
				chartParameters={chartParameters}
				setInternalIndicatorsArray={setInternalIndicatorsArrayFunc}
			/>
			<IndicatorsEditorModal
				isIndicatorsEditorModalShowing={isIndicatorsEditorModalShowing}
				setIsIndicatorsEditorModalShowing={setIsIndicatorsEditorModalShowingFunc}
				internalIndicatorsArray={internalIndicatorsArray}
				chartParameters={chartParameters}
				setInternalIndicatorsArray={setInternalIndicatorsArrayFunc}
			/>

			<div style={{ height: "100%", width: "100%", paddingTop: "2rem" }}>
				{chartParameters && chartParameters.data && isSuccess === true ? (
					<StockChart internalIndicatorsArray={internalIndicatorsArray} chartParameters={chartParameters} />
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default ChartResult;
