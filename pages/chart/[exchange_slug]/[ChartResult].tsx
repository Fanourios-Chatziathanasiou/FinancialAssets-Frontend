import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetAssetDataByNameQuery } from "../../../src/services/assetDataApi";
import { useAppDispatch, useAppSelector } from "../../../src/app/hooks";
import { updateDataset } from "../../../src/features/datasetSlice";
import StockChart from "../../../src/components/chart/StockChart";
import { candlestickValueType } from "../../../src/types/typesCollection";
import EmaIndicator from "../../../src/components/chart/technical Indicators/EmaIndicator";

const ChartResult = () => {
	const router = useRouter();
	const { ChartResult } = router.query;
	const dispatch = useAppDispatch();
	const dataset = useAppSelector((state) => state.dataset);
	const { data, isSuccess } = useGetAssetDataByNameQuery(ChartResult as string, { skip: ChartResult === undefined });
	useEffect(() => {
		if (isSuccess === true) {
			let dataCopy = JSON.parse(JSON.stringify(data));
			dataCopy.values.reverse();
			dataCopy.values.forEach((element: any, index: number, arr: any) => {
				dataCopy.values[index].datetime = new Date(element.datetime);
			});

			dispatch(updateDataset(dataCopy));
		}
	}, [isSuccess]);
	let newData: candlestickValueType[] = [];
	if (dataset.values) {
		newData = dataset.values.map((item) => Object.assign({}, item, { selected: false }));
	}

	return (
		<div className="w-[100%] mt-2">
			<button className="text-white border-FA-Primary-purple-050 border-2 p-2 rounded-lg">Indicators</button>
			{/* <div style={{ height: "100%", width: "100%", paddingTop: "2rem" }}>
				{dataset.values && isSuccess === true ? <EmaIndicator data={newData} /> : ""}
			</div> */}
			<div style={{ height: "100%", width: "100%", paddingTop: "2rem" }}>
				{dataset.values && isSuccess === true ? <StockChart data={newData} /> : ""}
			</div>
		</div>
	);
};

export default ChartResult;
