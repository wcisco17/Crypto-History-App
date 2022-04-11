import React from 'react';

import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

import { Chart, ChartCanvas, ZoomButtons } from 'react-stockcharts';
import { CandlestickSeries, LineSeries, ScatterSeries, SquareMarker } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } from 'react-stockcharts/lib/coordinates';

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';

type IData = {
  close: number;
  date: Date;
  high: number;
  low: number;
  open: number;
  predictedData: {
    mean: number;
    nine: number;
    one: number
  }
}

type ICandleStickProps = {
  type: string
  data: IData[];
  width?: any;
  ratio?: any
}

class CandleStickChartForDiscontinuousIntraDay extends React.Component<ICandleStickProps> {
  state = {
    suffix: 0
  };

  constructor(props: any) {
    super(props);
    this.saveNode = this.saveNode.bind(this);
    this.resetYDomain = this.resetYDomain.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    this.setState({
      suffix: 1
    });
  }

  saveNode(node: any) {
    ((this as any).node) = node;
  }

  resetYDomain() {
    (this as any).node.resetYDomain();
  }

  handleReset() {
    this.setState({
      suffix: this.state.suffix + 1
    });
  }

  render() {
    const { type, width, ratio } = this.props;
    const CandleStickChartWithZoomPan = {
      type: 'svg',
      mouseMoveEvent: true,
      panEvent: true,
      zoomEvent: true,
      clamp: false
    };

    const { mouseMoveEvent, panEvent, zoomEvent, clamp } = CandleStickChartWithZoomPan;

    const { data: initialData } = this.props;

    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor((d: any) => d.date);

    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor
    } = xScaleProvider(initialData);

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 500)]);
    const xExtents = [start, end];

    const margin = { left: 70, right: 70, top: 20, bottom: 30 };

    const height = 400;

    const gridHeight = height - margin.top - margin.bottom;
    const gridWidth = width - margin.left - margin.right;

    const showGrid = true;
    const yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 } : {};
    const xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 } : {};

    return (
      <ChartCanvas
        ref={this.saveNode} height={500}
        ratio={ratio}
        width={width}
        margin={{ left: 70, right: 70, top: 10, bottom: 30 }}

        mouseMoveEvent={mouseMoveEvent}
        panEvent={panEvent}
        zoomEvent={zoomEvent}
        clamp={clamp}
        type={type}
        seriesName={`_${this.state.suffix}`}
        data={data}
        xScale={xScale}
        xExtents={xExtents}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
      >

        <Chart
          id={1}
          yExtents={[(d: any) => [d.high, d.low]]}
          padding={{ top: 10, bottom: 20 }}
        >
          <XAxis axisAt="bottom"
                 orient="bottom"
                 zoomEnabled={zoomEvent}
                 {...xGrid} />
          <YAxis axisAt="right"
                 orient="right"
                 ticks={5}
                 zoomEnabled={zoomEvent}
                 {...yGrid}
          />
          <XAxis axisAt="top" orient="top" flexTicks />
          <CandlestickSeries />

          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format('.2f')} />

          <CandlestickSeries />
          <OHLCTooltip origin={[-40, 0]} />

          <ZoomButtons
            onReset={this.handleReset}
          />
        </Chart>

        <Chart id={2} yExtents={(d: IData) => {
          return d.predictedData.mean;
        }}>
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat('%Y-%m-%d')} />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format('.2f')} />

          <LineSeries
            yAccessor={(d: IData) => {
              if (d.open == 0) return d.predictedData.mean;
            }}
            stroke="#ff7f0e"
            strokeDasharray="Dot" />
          <ScatterSeries
            yAccessor={(d: IData) => {
              if (d.open == 0) return d.predictedData.mean;
            }}
            marker={SquareMarker}
            markerProps={{ width: 6, stroke: '#ff7f0e', fill: '#ff7f0e' }} />
          <OHLCTooltip forChart={1} origin={[-40, 0]} />
        </Chart>

        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

export default fitWidth(CandleStickChartForDiscontinuousIntraDay);