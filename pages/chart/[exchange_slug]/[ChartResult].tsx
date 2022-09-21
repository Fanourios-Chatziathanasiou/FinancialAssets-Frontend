import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetAssetDataByNameQuery } from "../../../src/services/assetDataApi";
import { timeParse } from "d3-time-format";
import { PriceChart } from "../../../src/components/chart/PriceChart";
import { useAppDispatch, useAppSelector } from "../../../src/app/hooks";
import { updateDataset } from "../../../src/features/datasetSlice";
import { Daily } from "../../../src/components/chart/PriceChart2";

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

	console.log(dataset);
	const parseDate = timeParse("%Y-%m-%d");
	return (
		<div style={{ height: "100%", width: "100%", paddingTop: "2rem" }}>
			{dataset.values && isSuccess ? <Daily data={dataset.values} /> : ""}
		</div>
	);
};

export default ChartResult;
