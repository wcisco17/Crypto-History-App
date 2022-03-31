import { Box, Text } from '@chakra-ui/react';
import { TypeChooser } from 'react-stockcharts/lib/helper';
import Chart from './charts/Chart';

type ICryptoNumerical = {
  stylesEl: {
    current: {
      backgroundColor: string
      borderColor: string
      textColor: string;
    }
  }
  crypto: string;
  prices: Array<{
    date: Date;
    low: unknown;
    high: unknown;
    close: unknown;
    volume: unknown;
    open: unknown;
    predictedData: {
      mean: unknown;
      nine: unknown;
      one: unknown
    }
  }>
}

const CryptoNumerical = ({ stylesEl, crypto, prices }: ICryptoNumerical) => {
  return (
    <Box
      borderColor={stylesEl.current.borderColor}
      borderWidth={2}
      py={'6'}
      px={'8'}
      borderRadius={'10'}
      width={'100%'} mt={'6'} marginLeft={'50px'}
      height={'100%'}
    >
      <Text fontSize={'4xl'}>Numerical Data</Text>
      <Text fontSize={'18px'}>Showcasing the price of {crypto}</Text>
      <Text py={'4'} fontSize={'2xl'} fontWeight={'bold'} >(ORANGE COLOR) Slide all the way to the right to view the prediction made by our machine learning algorithm</Text>
      {prices && (
        <div style={{ backgroundColor: 'white', marginTop: '18px', borderRadius: 10 }}>
          <TypeChooser>
            {(type: any) => <Chart type={'svg'} data={prices} />}
          </TypeChooser>
        </div>
      )}
    </Box>
  );
};

export default CryptoNumerical;