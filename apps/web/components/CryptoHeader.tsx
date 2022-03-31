import { config } from '../utils/theme';
import { useRef } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { CurrencyInfo } from '../utils/global.types';

type ICryptoHeaderProps = {
  crypto: string;
  currencyInfo: CurrencyInfo[];
}

const CryptoHeader = ({ crypto, currencyInfo }: ICryptoHeaderProps) => {
  let styles = {
    backgroundColor: config.colors.brand.main,
    borderColor: config.colors.brand.gray,
    textColor: config.colors.brand.textColor
  };
  const stylesEl = useRef(styles);

  return (
    <Flex>
      {/*Current Price BOX*/}
      <Box
        borderColor={stylesEl.current.borderColor}
        borderWidth={2}
        ml={'12'}
        px={'12'}
        width={'100%'}
        py={'6'}
        borderRadius={'10'}
        backgroundColor={stylesEl.current.backgroundColor}>
        <Text textTransform={'capitalize'} fontSize={'5xl'}>{crypto}</Text>

        <Text fontSize={'2xl'}>Last updated: {new Date(currencyInfo[0].LastUpdated?.S).toDateString()}</Text>
        <Text pb={'3'} fontSize={'1xl'}>Price (BTC/UDT)</Text>

        <Text pb={'4'} fontSize={'6xl'}>${parseInt(currencyInfo[0].CurrentPrice.S)}</Text>

      </Box>
    </Flex>
  );
};

export default CryptoHeader;