import { scalePoint } from 'd3-scale';
import React from 'react';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { BarSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { fitWidth } from 'react-stockcharts/lib/helper';

type IChartHorizontalProps = {
  data: any;
  width?: any;
  ratio?: any;
}

class BarChart extends React.Component<IChartHorizontalProps> {
  render() {
    const { data, width, ratio } = this.props;

    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={400}
        margin={{ left: 80, right: 10, top: 20, bottom: 30 }}
        type={'svg'}
        seriesName="Fruits"
        xExtents={(list: any) => list.map((d: any) => d.x)}
        data={data}
        xAccessor={(d: any) => d.x}
        xScale={scalePoint()}
        padding={1}
      >
        <Chart id={1} yExtents={(d: any) => [0, d.y]}>
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="left" orient="left" />
          <BarSeries yAccessor={(d: any) => d.y} />
        </Chart>
      </ChartCanvas>

    );
  }
}

export default fitWidth(BarChart);