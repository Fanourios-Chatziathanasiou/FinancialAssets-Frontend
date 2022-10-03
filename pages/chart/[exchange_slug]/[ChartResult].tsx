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
	const [indicatorsArray, setIndicatorsArray] = useState<JSX.Element[]>([]);
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
			console.log(data);
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

	function setIndicatorsArrayFunc(el: any) {
		setIndicatorsArray(el);
	}

	return isSuccess === false ? (
		<div role="status" className="p-2 w-full h-[80vh]">
			<div className="w-full h-full   rounded-lg flex justify-center items-center">
				<h1 className="animate-pulse  text-lg text-FA-Primary-yellow-vivid-300 font-[200]">
					Loading Data for {ChartResult} . . .
				</h1>
			</div>
			<span className="sr-only">Loading...</span>
		</div>
	) : (
		<div className="w-[100%] mt-6 ">
			<div className="flex justify-between">
				<div className="flex  gap-4">
					<IndicatorsModal
						indicatorsArray={indicatorsArray}
						chartParameters={chartParameters}
						setIndicatorsArray={setIndicatorsArrayFunc}
					/>

					<IndicatorsListModal indicatorsArray={indicatorsArray} setIndicatorsArray={setIndicatorsArrayFunc} />
				</div>
				<h1 className="text-FA-Primary-yellow-vivid-400 text-lg mobile:text-sm font-[300]">
					{data?.meta?.symbol} {data?.meta?.symbol ? " - " : ""} {data?.meta?.exchange}
				</h1>
			</div>
			<IndicatorsEditorModal
				indicatorsArray={indicatorsArray}
				chartParameters={chartParameters}
				setIndicatorsArray={setIndicatorsArrayFunc}
			/>
			<div style={{ height: "100%", width: "100%", resize: "both" }}>
				{chartParameters && chartParameters.data && isSuccess === true ? (
					<StockChart
						indicatorsArray={indicatorsArray}
						chartParameters={chartParameters}
						setIndicatorsArray={setIndicatorsArrayFunc}
					/>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default ChartResult;
