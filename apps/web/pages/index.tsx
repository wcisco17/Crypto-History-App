import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Fragment, useEffect, useState } from 'react';
import { CryptoCard } from '../components/CryptoCoinCard';
import { CryptoSymbolTableDB, InternalServerErro } from '../utils/global.types';
import CryptoPrices from '../view/CryptoCoin';

const Home = () => {
  const [data, setData] = useState<{ cryptoItems: null | string | CryptoSymbolTableDB[] }>({ cryptoItems: null });
  const [message, setMessage] = useState<string | null>(null);

  const logoSize: string = '60%';
  const web = 'wss://65njyxbm5i.execute-api.us-east-1.amazonaws.com/production/';

  function navigate(name: string) {
    setMessage(`get-crypto-prices-${name}`);
    setTimeout(() => {
      localStorage.setItem('key', `get-crypto-prices-${name}`);
      window.location.reload()
    }, 10)
  }

  function back() {
    setMessage(null);
    localStorage.removeItem('key');
    window.location.reload()
  }

  function connectWebsocket() {
    const connection = new WebSocket(web);
    connection.onopen = (event) => {
      const { isTrusted } = event;
      const mess = localStorage.getItem('key') ? localStorage.getItem('key') : 'get-crypto-currencies';
      const action = localStorage.getItem('key') ? 'cryptoCurrencies' : 'sendMessage';

      if (isTrusted) connection.send(
        JSON.stringify(
          { action: action, message: mess }
        )
      );
    };

    connection.onmessage = (msg) => {
      setData({
        cryptoItems: msg.data
      });
    };

    connection.onerror = (event) => {
      console.error(`Error connecting... `, JSON.stringify(event));
    };
  }

  useEffect(() => {
    setMessage(localStorage.getItem('key'));
    connectWebsocket();
  }, [message]);

  if (message != null) {
    return (
      <>
        <Button onClick={() => back()}>Back to Main page</Button>
        <CryptoPrices resultData={data.cryptoItems as string} />
      </>
    );
  } else {
    const cryptoItemsExist: CryptoSymbolTableDB[] | InternalServerErro | string | null = JSON.parse(data.cryptoItems as string) !== null ? JSON.parse(data.cryptoItems as string) as CryptoSymbolTableDB[] | InternalServerErro | string : null;
    const isInternalServerError = cryptoItemsExist != null && Object.keys(cryptoItemsExist).includes('message');

    if (isInternalServerError) {
      return <Text>Seems like there is internal error, please try again</Text>;
    }

    if (!cryptoItemsExist || typeof cryptoItemsExist === 'string') {
      console.log(cryptoItemsExist);
      return <Text>Too fast! Give data a second incoming...</Text>;
    } else {

      return (
        <Fragment>
          <Box d={'block'} margin={'0 auto'}>
            <Flex mb={'6'} mt={'12'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
              <Box>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img height={logoSize} width={logoSize} src={'https://assetscrypto.s3.amazonaws.com/log-zryoto.png'}
                     alt={'logo-png'} />
              </Box>
              <Box>
                <Text fontSize="5xl">Crypto-History</Text>
              </Box>
              <Box textAlign={'center'} pt={'5'}>
                <Text fontSize={'2xl'}>Take a trip down memory lane and predict the future</Text>
                <Text pt={'3'} fontSize={'2xl'}>Date visiting: 2022-03-06</Text>
              </Box>

            </Flex>
            <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'} mt={'12'} mx={'8'}>
              {
                (cryptoItemsExist as CryptoSymbolTableDB[])?.filter(({ CryptoSymbolID }) =>
                  CryptoSymbolID.S == 'bitcoin' || CryptoSymbolID.S == 'ethereum').map((crypto) => {
                  return (
                    <CryptoCard
                      key={crypto.Name.S}
                      onClick={() => navigate(crypto.CryptoSymbolID.S)}
                      cryptoCoins={{
                        src: `https://assetscrypto.s3.amazonaws.com/${crypto.CryptoSymbolID.S}.png`,
                        symbol: crypto.Name.S,
                        name: crypto.CryptoSymbolID.S,
                        lastUpdated: crypto.LastUpdated.S,
                        price: Number(Number(crypto.CurrentPrice.S).toFixed(4))
                      }}
                    />
                  );
                })
              }
            </Flex>
          </Box>
        </Fragment>
      );
    }
  }
};

export default Home;