import { useRouter } from "next/router";
import React from "react";
import { useGetAssetDataByNameQuery } from "../../../src/services/assetDataApi";

const ChartResult = () => {
	const router = useRouter();
	const { ChartResult } = router.query;

	//@ts-ignore
	const { data } = useGetAssetDataByNameQuery(ChartResult);

	return <div>{ChartResult}</div>;
};

export default ChartResult;
