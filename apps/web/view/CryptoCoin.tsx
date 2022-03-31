import { Box, Flex, Text } from '@chakra-ui/react';
import { config } from '../utils/theme';
import CryptoHeader from '../components/CryptoHeader';
import CryptoNumerical from '../components/CryptoNumerical';
import SyntheticData from '../components/SyntheticData';
import CryptoTextData from '../components/CryptoTextData';
import type {
  AllSyntheticData,
  CryptoDataResult,
  InternalServerErro,
  Price,
  SyntheticData as SyntheticDataTypes
} from '../utils/global.types';
import CryptoOrderbooks from '../components/CryptoOrderbooks';
import moment from 'moment';

function CryptoPrices({ resultData }: { resultData: string }) {
  let styles = {
    current: {
      backgroundColor: config.colors.brand.main,
      borderColor: config.colors.brand.gray,
      textColor: config.colors.brand.textColor
    }
  };

  const items: CryptoDataResult | string = resultData != null ? JSON.parse(resultData as string) : 'No data returned';

  const response = (items as CryptoDataResult | InternalServerErro | string);
  const isIntervalServerError = Object.keys(response).includes('message');

  const cryptoItems = (response as CryptoDataResult);

  if (isIntervalServerError) {
    return (
      <Box>
        <Text fontSize={'4xl'} pt={'7'} textAlign={'center'}>Oops! Please reload the page</Text>
      </Box>
    );

  }
  if (typeof response === 'string' || !cryptoItems) {
    return <Text>Too fast! Give data a second incoming...</Text>;
  } else {
    const prices = parsePricesData(cryptoItems?.prices, cryptoItems?.syntheticData);

    return (
      <Box my={'12'} mx={'3'}>
        <CryptoHeader
          currencyInfo={cryptoItems.currencyInfo}
          crypto={cryptoItems.currencyInfo![0]?.CryptoSymbolID.S}
        />
        <Flex>
          <CryptoNumerical prices={prices} crypto={cryptoItems.currencyInfo[0]?.CryptoSymbolID.S} stylesEl={styles} />
        </Flex>

        <CryptoOrderbooks stylesEl={styles} crypto={cryptoItems.currencyInfo[0]?.CryptoSymbolID.S}
                          orderbooks={cryptoItems.orderbooks} />
        <CryptoTextData
          sentimentAnalysis={cryptoItems.sentimentAnalysis}
          newsAPI={cryptoItems.newsAPI}
          stylesEl={styles}
          crypto={cryptoItems.currencyInfo[0]?.CryptoSymbolID.S}
        />
        <Flex>
          <SyntheticData
            stylesEl={styles}
            pureSyntheticData={cryptoItems.pureSyntheticData}
            allSyntheticData={JSON.parse(cryptoItems?.allSyntheticData) as AllSyntheticData}
          />
        </Flex>
      </Box>
    );
  }
}

export default CryptoPrices;

function parsePricesData(prices: Price[], sythenticAnalysis: SyntheticDataTypes[]) {
  let parsed = [];

  for (let i = 0; i < prices?.length; i++) {
    const price = prices[i];
    parsed.push({
      date: moment.unix(Number(price.PriceTimeStamp.N)).toDate(),
      open: Number(price.Open.N),
      high: Number(price.High.N),
      low: Number(price.Low.N),
      close: Number(price.Close.N),
      volume: 0,
      predictedData: {
        mean: Number(price.Open.N),
        one: undefined,
        nine: undefined
      }
    });
  }
  const currentEndDate = parsed[parsed.length - 1]?.date;

  for (let i = 0; i < sythenticAnalysis?.length; i++) {
    const synthetic = sythenticAnalysis[i];
    parsed.push({
      date: moment(currentEndDate).add(i + 1, 'minute').toDate(),
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
      predictedData: {
        mean: Number(synthetic?.Mean.N),
        one: (synthetic?.QuantilesZeroOne.N),
        nine: (synthetic?.QuantilesZeroNine.N)
      }
    });
  }

  return parsed;
}