import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Fragment } from 'react';
import logo from '../public/log-zryoto.png';
import { config } from '../utils/theme';
import { CryptoCard } from '../components/CryptoCoinCard';
import { CryptoSymbolTableDB } from '../utils/global.types';

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const logoSize = '60%';
  const activeCoins = props.data.filter(({ CryptoSymbolID }) =>
    CryptoSymbolID.S == 'bitcoin' || CryptoSymbolID.S == 'ethereum'
  );

  return (
    <Fragment>
      <Box d={'block'} margin={'0 auto'}>
        <Flex mb={'6'} mt={'12'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Box>
            <Image height={logoSize} width={logoSize} src={logo} alt={'logo-png'} />
          </Box>
          <Box>
            <Text fontSize="5xl">Crypto-History</Text>
          </Box>
          <Box textAlign={'center'} pt={'5'}>
            <Text fontSize={'2xl'}>Take a trip down memory lane and predict the future</Text>
            <Text pt={'3'} fontSize={'2xl'}>Date visiting: 2022-03-06</Text>
          </Box>
          <Box
            fontWeight={'900'}
            backgroundColor={'#fff'}
            padding={'10px'}
            borderRadius={'10'}
            mt={'8'}
            textColor={config.colors.brand.main}>
            <Text fontSize={'1xl'}>Choose Crypto Coin</Text>
          </Box>
        </Flex>

        <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'} mt={'12'} mx={'8'}>
          {
            activeCoins.map((crypto) => (
              <CryptoCard
                key={crypto.Name.S}
                cryptoCoins={{
                  src: `https://crypto-history-dev.s3.amazonaws.com/${crypto.CryptoSymbolID.S}.png`,
                  symbol: crypto.Name.S,
                  name: crypto.CryptoSymbolID.S,
                  lastUpdated: crypto.LastUpdated.S,
                  price: Number(Number(crypto.CurrentPrice.S).toFixed(4))
                }}
              />
            ))
          }
        </Flex>
      </Box>
    </Fragment>
  );
};

export default Home;

export async function getStaticProps(_: GetStaticPropsContext) {
  const cryptoCoins = await fetch('https://xavcwst1x9.execute-api.us-east-1.amazonaws.com/currencies');
  const data: CryptoSymbolTableDB[] = await cryptoCoins.json();

  return {
    props: {
      data
    }
  };
}