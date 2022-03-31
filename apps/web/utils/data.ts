// @ts-ignore
import { tsvParse, csvParse } from 'd3-dsv';

export const getCryptoSupported = () => [
  'bitcoin',
  'ethereum'
];

function parseData(parse: any) {
  return function(d: any) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    return d;
  };
}

export function getData() {
  const promiseIntraDayDiscontinuous = fetch('https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT_INTRA_DAY.tsv')
    .then(response => response.text())
    .then(data => {
        return tsvParse(data, parseData((d: any) => new Date(+d)));
      }
    );
  promiseIntraDayDiscontinuous.then(res => console.log(res))
  return promiseIntraDayDiscontinuous;
}

export function getDataBar() {
  const promiseBarData = fetch('https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/barData.json')
    .then(response => response.json());
  return promiseBarData;
}
