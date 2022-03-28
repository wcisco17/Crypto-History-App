import { config } from '../utils/theme';
import { useRef } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

const CryptoHeader = ({ crypto }: { crypto: string }) => {
  let styles = {
    backgroundColor: config.colors.brand.main,
    borderColor: config.colors.brand.gray,
    textColor: config.colors.brand.textColor
  };
  const stylesEl = useRef(styles);
  const date = 'January 20, 2022';

  return (
    <Flex>
      {/*Current Price BOX*/}
      <Box
        borderColor={stylesEl.current.borderColor}
        borderWidth={2}
        ml={'12'}
        px={'12'}
        width={'40%'}
        py={'6'}
        borderRadius={'10'}
        backgroundColor={stylesEl.current.backgroundColor}>
        <Text textTransform={'capitalize'} fontSize={'5xl'}>{crypto}</Text>

        <Text fontSize={'2xl'}>December, 20, 2022</Text>
        <Text pb={'3'} fontSize={'1xl'}>Price (BTC/UDT)</Text>

        <Text pb={'4'} fontSize={'6xl'}>$34,000.10</Text>
        <Flex d={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Text color={config.colors.brand.negative} fontSize={'1xl'} fontWeight={'bold'}>Low $39,000.10</Text>
          </Box>

          <Box>
            <Text color={config.colors.brand.positive} fontSize={'1xl'} fontWeight={'bold'}>High 45,000.10</Text>
          </Box>
        </Flex>

      </Box>

      {/*Predict the future button */}
      <Box
        borderColor={stylesEl.current.borderColor}
        borderWidth={2}
        ml={'12'}
        px={'12'}
        width={'60%'}
        py={'6'}
        borderRadius={'10'}
        backgroundColor={stylesEl.current.backgroundColor}>
        <Text textTransform={'capitalize'} fontSize={'3xl'}>
          Predict the future price of {crypto}
        </Text>
        <Text py={'2'} fontSize={'1xl'}>
          Visualizing the future price of {crypto} by selecting the date.
          Selecting this action will perform machine learning on the following data set.
        </Text>

        <Text pt={'3'} fontSize={'2xl'}>Choose a future Date</Text>
        <Button mt={'5'} fontWeight={'bold'}>{date}</Button>
      </Box>
    </Flex>
  );
};

export default CryptoHeader;