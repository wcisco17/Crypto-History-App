import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { TypeChooser } from 'react-stockcharts/lib/helper';
import ChartHorizontal from './charts/ChartHorizontal';

type ICryptoTextData = {
  stylesEl: {
    current: {
      backgroundColor: string
      borderColor: string
      textColor: string;
    }
  }
  data: any
  crypto: string
}

const CryptoTextData = ({ stylesEl, data: barData, crypto }: ICryptoTextData) => {
  return (
    <Flex>
      <Box
        borderColor={stylesEl.current.borderColor}
        borderWidth={2}
        py={'6'}
        px={'12'}
        borderRadius={'10'}
        width={'60%'} mt={'12'} marginLeft={'50px'}
      >
        <Text fontSize={'4xl'}>Current News</Text>
        <Text fontSize={'18px'}>News update for {crypto}</Text>

        <Box width={'100%'}>
          <Table mt={'18px'} size={'lg'} variant="simple" borderColor={'white'} borderWidth={'0.1'}>
            <Thead>
              <Tr>
                <Th fontSize={'18px'}>Symbol</Th>
                <Th fontSize={'18px'}>Date</Th>
                <Th fontSize={'18px'}>Article Content</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontSize={'18px'}>Ethereum</Td>
                <Td fontSize={'18px'}>{new Date(1646654400).toDateString()}</Td>
                <Td>Traders warn that ETH price could fall to $1,700, triggering a “turbo nuke” in altcoins and
                  altering the market structure of a struggling bull market.</Td>
              </Tr>
              <Tr>
                <Td fontSize={'18px'}>Ethereum</Td>
                <Td fontSize={'18px'}>{new Date(1646654400).toDateString()}</Td>
                <Td>Traders warn that ETH price could fall to $1,700, triggering a “turbo nuke” in altcoins and
                  altering the market structure of a struggling bull market.</Td>
              </Tr>
              <Tr>
                <Td fontSize={'18px'}>Ethereum</Td>
                <Td fontSize={'18px'}>{new Date(1646654400).toDateString()}</Td>
                <Td>Traders warn that ETH price could fall to $1,700, triggering a “turbo nuke” in altcoins and
                  altering the market structure of a struggling bull market.</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>

      <Box
        borderColor={stylesEl.current.borderColor}
        borderWidth={2}
        py={'6'}
        px={'12'}
        borderRadius={'10'}
        width={'60%'} mt={'12'} marginLeft={'50px'}
      >
        <Text fontSize={'4xl'}>Sentiment Analysis</Text>
        <Text fontSize={'18px'}>Performing sentiment analysis for {crypto} news </Text>
        <Box mt={'12'} backgroundColor={'white'} borderRadius={'10'}>
          <TypeChooser>
            {(type: any) => barData != null ? <ChartHorizontal data={barData} /> : <p>Nothing yet..</p>}
          </TypeChooser>
        </Box>
      </Box>
    </Flex>
  );
};

export default CryptoTextData;