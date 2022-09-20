import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetAssetDataByNameQuery } from "../../../src/services/assetDataApi";
import { timeParse } from "d3-time-format";
import { PriceChart } from "../../../src/components/chart/PriceChart";

const ChartResult = () => {
	const router = useRouter();
	const { ChartResult } = router.query;

	const { data, isSuccess } = useGetAssetDataByNameQuery(ChartResult as string);
	let modifiedData = [];
	useEffect(() => {}, [isSuccess]);

	const parseDate = timeParse("%Y-%m-%d");
	return (
		<div style={{ height: "100%", width: "100%", paddingTop: "2rem" }}>
			<div style={{ backgroundColor: "#191c27", minHeight: "80vh" }}>
				<PriceChart />
			</div>
		</div>
	);
};

export default ChartResult;
