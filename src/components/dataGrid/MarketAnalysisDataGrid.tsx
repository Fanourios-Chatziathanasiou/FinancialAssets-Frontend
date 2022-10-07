import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, gridClasses, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// When using TypeScript 4.x and above
import type {} from "@mui/x-data-grid/themeAugmentation";
import createTheme from "@mui/material/styles/createTheme";
import { GlobalStyles, styled, ThemeProvider } from "@mui/material";
import { useGetDbAssetsTrackerQuery } from "../../services/dbAssetsTrackerApi";
import { useEffect } from "react";

const theme = createTheme({
	components: {
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					fontSize: 15,
				},
			},
		},
	},
});

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
	border: 0,
	fontSize: 17,
	color: theme.palette.mode === "light" ? "rgba(0,0,0,.85)" : "rgba(255,255,255,0.85)",
	fontFamily: "Poppins",
	WebkitFontSmoothing: "auto",
	letterSpacing: "normal",
	[`& .${gridClasses.row}.even`]: {
		backgroundColor: theme.palette.grey[200],
	},
	"& .MuiDataGrid-columnsContainer": {
		backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
	},
	"& .MuiDataGrid-iconSeparator": {
		display: "none",
	},
	"& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
		borderRight: `1px solid ${theme.palette.mode === "light" ? "#f0f0f0" : "#303030"}`,
	},
	"& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
		borderBottom: `1px solid ${theme.palette.mode === "light" ? "#f0f0f0" : "#303030"}`,
	},
	"& .MuiDataGrid-cell": {
		color: theme.palette.mode === "light" ? "rgba(0,0,0,.85)" : "rgba(255,255,255,0.65)",
	},
	"& .MuiPaginationItem-root": {
		borderRadius: 0,
	},
}));

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", hide: true },
	// {
	// 	field: "firstName",
	// 	headerName: "First name",
	// 	width: 150,
	// 	editable: false,
	// 	headerAlign: "center",
	// 	flex: 1,
	// },
	{
		field: "name",
		headerName: "Name",

		width: 110,
		editable: false,
		headerAlign: "center",
		flex: 1,
		align: "center",
	},
	{
		field: "symbol",
		headerName: "Symbol",
		width: 150,
		editable: false,
		headerAlign: "center",
		flex: 1,
		align: "center",
	},
	{
		field: "exchange",
		headerName: "Exchange",
		width: 150,
		editable: false,
		headerAlign: "center",
		flex: 1,
		align: "center",
	},
	{
		field: "currency",
		headerName: "Currency",
		width: 150,
		editable: false,
		headerAlign: "center",
		flex: 1,
		align: "center",
	},
	{
		field: "predictiveAnalysis",
		headerName: "PredictiveAnalysis",
		width: 160,
		headerAlign: "center",
		flex: 1,
		align: "center",
	},
];

export default function MarketAnalysisDataGrid() {
	const { data, isLoading } = useGetDbAssetsTrackerQuery("");

	return (
		<>
			<ThemeProvider theme={theme}>
				{data?.values ? (
					<Box sx={{ height: 630, width: "100%" }}>
						<GlobalStyles
							styles={{
								".MuiDataGrid-menuList": {
									backgroundColor: "white",
									"& .MuiMenuItem-root": {
										fontSize: 16,
									},
									"& .MuiDataGrid-menuIconButton": {
										fontSize: 26,
									},
									"& .MuiDataGrid": {
										fontSize: 26,
									},
								},
							}}
						/>
						<StyledDataGrid
							componentsProps={{
								panel: {
									sx: {
										"& .MuiTypography-root": {
											fontSize: 20,
										},
										"& .MuiDataGrid-filterForm ": {
											fontSize: 20,
										},
										"& .MuiFormLabel-root ": {
											fontSize: 20,
										},
										"& .MuiInputBase-root": {
											fontSize: 16,
										},
										"& .MuiSvgIcon-root": {
											fontSize: 20,
										},
										"& .MuiTooltip-tooltip": {
											fontSize: 25,
										},
									},
								},
								pagination: {
									sx: {
										"& .MuiTablePagination-displayedRows": {
											fontSize: 20,
											fontWeight: 400,
										},
										"& .MuiTablePagination-actions": {
											"& .MuiButtonBase-root": {
												"& .MuiSvgIcon-root": {
													fontSize: 25,
												},
											},
										},
									},
								},
							}}
							rows={data}
							columns={columns}
							pageSize={10}
							checkboxSelection={false}
							rowsPerPageOptions={[5]}
							disableSelectionOnClick
							experimentalFeatures={{ newEditingApi: true }}
							sx={{
								"& .MuiSvgIcon-fontSizeSmall": {
									fontSize: 16,
								},
								background: "white",
								"& .MuiTablePagination-displayedRows": {
									fontSize: 16,
									fontWeight: 500,
								},
								"& .MuiFormLabel-root": {
									fontSize: 16,
								},
							}}
							getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
						/>
					</Box>
				) : (
					<div role="status" className="p-2 w-full h-[80vh]">
						<div className="w-full h-full   rounded-lg flex justify-center items-center">
							<h1 className="animate-pulse  text-lg text-FA-Primary-yellow-vivid-300 font-[200]">
								Loading Market Analysis Data...
							</h1>
						</div>
						<span className="sr-only">Loading...</span>
					</div>
				)}
			</ThemeProvider>
		</>
	);
}
