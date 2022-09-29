import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetAssetDataByNameQuery } from "../../../src/services/assetDataApi";
import { useAppDispatch } from "../../../src/app/hooks";
import StockChart from "../../../src/components/chart/StockChart";
import { candlestickValueType, chartParametersType } from "../../../src/types/typesCollection";
import { discontinuousTimeScaleProviderBuilder } from "react-financial-charts";
import IndicatorsModal from "../../../src/components/indicatorsModal/IndicatorsModal";
import { IOHLCData } from "../../../src/components/chart/iOHLCData";
import IndicatorsEditorModal from "../../../src/components/indicatorsModal/indicatorsEditorModal/IndicatorsEditorModal";
import IndicatorsListModal from "../../../src/components/indicatorsListModal/IndicatorsListModal";

const ChartResult = () => {
	//chartparameters hold the shared element between chart and indicators.That way we avoid initializing them every time.
	//It comes handy when we have to create Indicators on a different component than the one we render the chart. (For example
	//we create indicators inside <IndicatorsModal/> but render it on the StockChart).
	const [chartParameters, setChartParameters] = useState<chartParametersType>();
	//The array of the *internal* indicators (Indicators placed inside the chart-excluding Volume).
	const [indicatorsArray, setindicatorsArray] = useState<JSX.Element[]>([]);
	useEffect(() => {
		console.log(indicatorsArray);
	}, [indicatorsArray]);
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

	function setindicatorsArrayFunc(el: any) {
		setindicatorsArray(el);
	}

	return (
		<div className="w-[100%] mt-2">
			<div className="flex  gap-4">
				<IndicatorsModal
					indicatorsArray={indicatorsArray}
					chartParameters={chartParameters}
					setindicatorsArray={setindicatorsArrayFunc}
				/>

				<IndicatorsListModal indicatorsArray={indicatorsArray} setindicatorsArray={setindicatorsArrayFunc} />
			</div>
			<IndicatorsEditorModal
				indicatorsArray={indicatorsArray}
				chartParameters={chartParameters}
				setindicatorsArray={setindicatorsArrayFunc}
			/>
			<div style={{ height: "100%", width: "100%", paddingTop: "2rem" }}>
				{chartParameters && chartParameters.data && isSuccess === true ? (
					<StockChart indicatorsArray={indicatorsArray} chartParameters={chartParameters} />
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default ChartResult;
