import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import type { GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType } from 'next/types';
import { getCryptoSupported, getData, getDataBar } from '../../utils/data';
import { TypeChooser } from 'react-stockcharts/lib/helper';
import { config } from '../../utils/theme';
import { useEffect, useRef, useState } from 'react';
import CryptoHeader from '../../components/CryptoHeader';
import CryptoNumerical from '../../components/CryptoNumerical';
import ChartHorizontal from '../../components/charts/ChartHorizontal';
import Chart from '../../components/charts/Chart';
import CryptoTextData from '../../components/CryptoTextData';

function CryptoPrices({ crypto }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [data, setData] = useState<null | unknown[]>();
  const [barData, setBarData] = useState<null | unknown[]>();

  let styles = {
    backgroundColor: config.colors.brand.main,
    borderColor: config.colors.brand.gray,
    textColor: config.colors.brand.textColor
  };
  const stylesEl = useRef(styles);

  useEffect(() => {
    getData().then(pricesData => setData(pricesData));
  }, []);

  useEffect(() => {
    getDataBar().then(bar => setBarData(bar));
  }, []);

  return (
    <Box my={'12'} mx={'3'}>
      <CryptoHeader crypto={crypto} />

      <CryptoNumerical crypto={crypto} data={data} stylesEl={stylesEl} />

      <CryptoTextData stylesEl={stylesEl} data={barData} crypto={crypto} />

      <Flex mt={'12'}>
        <Box
          borderColor={stylesEl.current.borderColor}
          borderWidth={2}
          py={'6'}
          px={'8'}
          borderRadius={'10'}
          width={'100%'} mt={'6'} marginLeft={'50px'}

        >
          <Text fontSize={'4xl'}>Synthetic Data</Text>
          <Text fontSize={'18px'}>Personal Synthetic data</Text>
          {data != null ? (
            <div style={{ backgroundColor: 'white', marginTop: '18px', borderRadius: 10 }}>
              <TypeChooser>
                {(type: any) => <Chart type={'svg'} data={data} />}
              </TypeChooser>
            </div>
          ) : <p>No data...</p>}
        </Box>
      </Flex>

    </Box>
  );
}

export default CryptoPrices;

export async function getStaticPaths() {
  const crypto = getCryptoSupported();
  return {
    paths: crypto.map((symbol) => ({
      params: {
        crypto: symbol
      }
    })) || [{ params: { crypto: '' } }],
    fallback: false
  };
}

export async function getStaticProps({
  params
}: GetStaticPropsContext<{ crypto: string }, any>): Promise<GetStaticPropsResult<{
  crypto: string
}>> {
  const crypto: string | undefined = (params?.crypto);
  if (!crypto) return { props: { crypto: '' } };
  return {
    props: {
      crypto
    }
  };
}
