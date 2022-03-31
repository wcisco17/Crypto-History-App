import { useRef } from 'react';
import { config } from '../utils/theme';
import { Box, Text } from '@chakra-ui/react';

type ICryptoCard = {
  cryptoCoins: {
    src: string;
    symbol: string;
    lastUpdated: Date;
    price: number;
    name: string;
  }
  onClick: () => void;
}

export const CryptoCard = ({ cryptoCoins: { src, symbol, lastUpdated, price, name }, onClick }: ICryptoCard) => {
  const cryptoLogoSize = '60%';
  let styles = {
    backgroundColor: config.colors.brand.main,
    borderColor: config.colors.brand.gray,
    textColor: config.colors.brand.textColor
  };

  const stylesEl = useRef(styles);
  return (
    <div onClick={onClick}>
      <Box
        borderColor={stylesEl.current.borderColor}
        borderWidth={2}
        ml={'12'}
        cursor={'pointer'}
        px={'12'}
        py={'6'}
        borderRadius={'10'}
        backgroundColor={stylesEl.current.backgroundColor}
      >
        <Box d={'flex'} pb={'3'} alignItems={'center'} justifyContent={'flex-start'} flexDirection={'row'}>
          <div>
            <img
              height={cryptoLogoSize}
              width={cryptoLogoSize}
              src={src}
              alt={symbol}
            />
          </div>
          <div>
            <Text textTransform={'uppercase'} fontWeight={'700'} textColor={stylesEl.current.textColor}>
              {symbol}/USDT
            </Text>
          </div>
        </Box>

        <Box>
          <Text textColor={stylesEl.current.textColor} fontWeight={'800'} fontSize={'3xl'}>${price}</Text>
          <Text pt={'2'} textColor={stylesEl.current.textColor}>
            Last updated: {new Date(lastUpdated).toDateString()}</Text>
        </Box>
      </Box>
    </div>
  );
};
