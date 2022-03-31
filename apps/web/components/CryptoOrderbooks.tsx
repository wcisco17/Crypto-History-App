import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { Orderbook } from '../utils/global.types';

type ICryptoOrderbooks = {
  stylesEl: {
    current: {
      backgroundColor: string
      borderColor: string
      textColor: string;
    }
  }
  crypto: string;
  orderbooks: Orderbook[]
}

const CryptoOrderbooks = ({
  stylesEl,
  orderbooks
}: ICryptoOrderbooks) => {
  const bids = orderbooks?.map((bid) => {
    return { 'BidSize': bid.BidSize.N, 'BidPrice': bid.BidPrice.N };
  });

  const asks = orderbooks?.map((ask) => {
    return { 'AsksSize': ask.AsksSize.N, 'AsksPrice': ask.AsksPrice.N };
  });

  return (
    <Flex>
      <Box
        borderColor={stylesEl.current.borderColor}
        borderWidth={2}
        py={'6'}
        px={'1'}
        borderRadius={'10'}
        width={'100%'} mt={'6'} marginLeft={'50px'}
        height={'700px'}
        overflow={'auto'}

      >
        <Text pl={'7'} fontSize={'4xl'}>Asks</Text>
        <Box mt={'6'}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize={'16px'}>Amount</Th>
                <Th fontSize={'16px'}>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                asks.map((ask, key) => (
                  <Tr key={key}>
                    <Td fontSize={'15px'}>{ask.AsksSize}</Td>
                    <Td>{ask.AsksPrice}</Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </Box>
      </Box>
      <Box
        borderColor={stylesEl.current.borderColor}
        borderWidth={2}
        py={'6'}
        px={'1'}
        height={'700px'}
        overflow={'auto'}
        borderRadius={'10'}
        width={'100%'} mt={'6'} marginLeft={'50px'}
      >
        <Text pl={'7'} fontSize={'4xl'}>Bids</Text>
        <Box mt={'6'}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize={'16px'}>Amount</Th>
                <Th fontSize={'16px'}>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                bids.map((bid, key) => (
                  <Tr key={key}>
                    <Td fontSize={'15px'}>{bid.BidSize}</Td>
                    <Td>{bid.BidPrice}</Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Flex>
  );
};

export default CryptoOrderbooks;