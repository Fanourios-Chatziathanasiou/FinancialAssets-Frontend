import * as React from "react";
import { CurrentCoordinate } from "react-financial-charts";
import { ema } from "react-financial-charts";
import { LineSeries } from "react-financial-charts";
import { MovingAverageTooltip } from "react-financial-charts";
import { EmaIndicatorTypes } from "../../../../types/typesCollection";

class EmaIndicator extends React.Component<EmaIndicatorTypes> {
	private readonly margin = { left: 0, right: 58, top: 8, bottom: 24 };
	// private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d: IOHLCData) => d.datetime);

	public render() {
		const { period, lineWidth, color } = this.props;

		const emaCalculator = ema()
			.id(Number(this.props.id))
			.options({ windowSize: period })
			.merge((d: any, c: any) => {
				d[`EMA_${this.props.period}`] = c;
			})
			.accessor((d: any) => d[`EMA_${period}`]);

		const { data: initialData, xScale, xAccessor } = this.props.chartParameters;
		const calculatedData = emaCalculator(initialData);

		// const { data } = this.props.chartParameters.xScaleProvider(calculatedData);
		// const max = xAccessor(data[data.length - 1]);
		// const min = xAccessor(data[Math.max(0, data.length - 100)]);
		// const xExtents = [min, max];

		return (
			<React.Fragment key={this.props.id}>
				<LineSeries yAccessor={emaCalculator.accessor()} strokeWidth={lineWidth} strokeStyle={color} />

				<MovingAverageTooltip
					labelFill={"#FFFFFF"}
					// onClick={() => {
					// 	store.dispatch(updateisIndicatorsModalShowing(true));
					// }}
					origin={[8 + 65 * this.props.positionMultiplier, 24]}
					textFill={"#FFFFFF"}
					options={[
						{
							yAccessor: emaCalculator.accessor(),
							type: "EMA",
							stroke: color,
							windowSize: emaCalculator.options().windowSize,
						},
					]}
				/>
				<CurrentCoordinate yAccessor={emaCalculator.accessor()} r={this.props.lineWidth + 2} fillStyle={color} />
			</React.Fragment>
		);
	}
}
// const mapStateToProps = (state: RootState) => ({
// 	count: state.isIndicatorsModalShowing.value,
// });

// export default connect(mapStateToProps)(EmaIndicator);

export default EmaIndicator;
