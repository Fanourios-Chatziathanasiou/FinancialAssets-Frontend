import * as React from "react";
import { CurrentCoordinate, sma } from "react-financial-charts";
import { LineSeries } from "react-financial-charts";
import { MovingAverageTooltip } from "react-financial-charts";
import { SmaIndicatorTypes } from "../../../../types/typesCollection";

class SmaIndicator extends React.Component<SmaIndicatorTypes> {
	private readonly margin = { left: 0, right: 58, top: 8, bottom: 24 };
	// private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d: IOHLCData) => d.datetime);

	public render() {
		const { period, lineWidth, color } = this.props;

		const smaCalculator = sma()
			.id(Number(this.props.id))
			.options({ windowSize: period })
			.merge((d: any, c: any) => {
				d[`SMA_${this.props.period}`] = c;
			})
			.accessor((d: any) => d[`SMA_${period}`]);

		const { data: initialData, xScale, xAccessor } = this.props.chartParameters;
		const calculatedData = smaCalculator(initialData);

		// const { data } = this.props.chartParameters.xScaleProvider(calculatedData);
		// const max = xAccessor(data[data.length - 1]);
		// const min = xAccessor(data[Math.max(0, data.length - 100)]);
		// const xExtents = [min, max];

		return (
			<React.Fragment key={this.props.id}>
				<LineSeries yAccessor={smaCalculator.accessor()} strokeWidth={lineWidth} strokeStyle={color} />

				<MovingAverageTooltip
					labelFill="#FFFFFF"
					// onClick={() => {
					// 	store.dispatch(updateisIndicatorsModalShowing(true));
					// }}
					origin={[8 + 65 * this.props.positionMultiplier, 24]}
					textFill={"#FFFFFF"}
					options={[
						{
							yAccessor: smaCalculator.accessor(),
							type: "SMA",
							stroke: color,
							windowSize: smaCalculator.options().windowSize,
						},
					]}
				/>
				<CurrentCoordinate yAccessor={smaCalculator.accessor()} r={this.props.lineWidth + 2} fillStyle={color} />
			</React.Fragment>
		);
	}
}
// const mapStateToProps = (state: RootState) => ({
// 	count: state.isIndicatorsModalShowing.value,
// });

// export default connect(mapStateToProps)(EmaIndicator);

export default SmaIndicator;
