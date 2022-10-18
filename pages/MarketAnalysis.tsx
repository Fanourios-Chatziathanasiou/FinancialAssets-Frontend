import React from "react";
import MarketAnalysisDataGrid from "../src/components/dataGrid/MarketAnalysisDataGrid";

const MarketAnalysis = () => {
	return (
		<div className="w-full animate-appear">
			<h1 className="text-white text-2xl text-center">Market Analysis</h1>
			<MarketAnalysisDataGrid />
		</div>
	);
};

export default MarketAnalysis;
