import React from 'react';

import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

import { Chart, ChartCanvas } from 'react-stockcharts';
import { LineSeries, ScatterSeries, SquareMarker, TriangleMarker } from 'react-stockcharts/lib/series';

import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } from 'react-stockcharts/lib/coordinates';

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';

type IData = {
  date: Date;
  syntheticData: {
    value: any
  };
  predictedData: {
    value: any
  }
}

type ILineAndScatterProps = {
  data: Array<IData>;
  ratio: any;
  width: any;
  interpolation: any;
  gridProps: any
  seriesType: any
}

class LineAndScatterChartGrid extends React.Component<ILineAndScatterProps> {
  render() {
    const { gridProps, data: initialData, width, ratio, interpolation, seriesType } = this.props;
    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor((d: IData) => d.date);
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor
    } = xScaleProvider(initialData);
    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[data.length - 150])
    ];

    return (
      <ChartCanvas
        ratio={ratio} width={width} height={400}
        margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
        type={'svg'}
        pointsPerPxThreshold={1}
        seriesName="MSFT"
        data={data}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xScale={xScale}
        xExtents={xExtents}
      >
        <Chart id={1}
               yExtents={(d: IData) => [d.syntheticData.value, d.predictedData.value]}>
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis
            axisAt="right"
            orient="right"
            // tickInterval={5}
            // tickValues={[40, 60]}
            ticks={5}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat('%Y-%m-%d')} />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format('.2f')} />

          <LineSeries
            yAccessor={(d: IData) => d.syntheticData.value}
            stroke="#ff7f0e"
            strokeDasharray="Dot" />
          <ScatterSeries
            yAccessor={(d: IData) => {
              return typeof d.syntheticData.value === 'undefined' ? 0 : d.syntheticData.value;
            }}
            marker={SquareMarker}
            markerProps={{ width: 12, stroke: '#ff7f0e', fill: '#ff7f0e' }} />

          <LineSeries
            yAccessor={(d: IData) => d.predictedData.value}
            stroke="#2ca02c" />
          <ScatterSeries
            yAccessor={(d: IData) => d.predictedData.value}
            marker={TriangleMarker}
            markerProps={{ width: 12, stroke: '#2ca02c', fill: '#2ca02c' }} />

          <OHLCTooltip forChart={1} origin={[-40, 0]} />
        </Chart>

        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

export default fitWidth(LineAndScatterChartGrid);
