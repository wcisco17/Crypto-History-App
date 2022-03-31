import { scalePoint } from 'd3-scale';
import React from 'react';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { BarSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { SentimentAnalysi } from '../../utils/global.types';

type IChartHorizontalProps = {
  width?: any;
  ratio?: any;
  news: SentimentAnalysi[]
}

class BarChart extends React.Component<IChartHorizontalProps> {
  render() {
    const { width, ratio, news } = this.props;

    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={400}
        margin={{ left: 80, right: 10, top: 20, bottom: 30 }}
        type={'svg'}
        seriesName="Fruits"
        xExtents={(list: SentimentAnalysi[]) => list.map((d: SentimentAnalysi) => d.Sentiment.S)}
        data={news}
        xAccessor={(d: SentimentAnalysi) => d.Sentiment.S}
        xScale={scalePoint()}
        padding={1}
      >
        <Chart id={1} yExtents={(d: SentimentAnalysi) => [0, d.SentimentScore.N]}>
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="left" orient="left" />
          <BarSeries yAccessor={(d: SentimentAnalysi) => d.SentimentScore.N} />
        </Chart>
      </ChartCanvas>

    );
  }
}

export default fitWidth(BarChart);