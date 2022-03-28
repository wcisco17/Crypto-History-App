import { Box, Flex, Text, Table, Th, Tr, Tbody, Td, Thead } from '@chakra-ui/react';
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
  data: any
  crypto: string
}

const CryptoNumerical = ({ stylesEl, data, crypto }: ICryptoNumerical) => {
  return (
    <Flex>
      <Flex>
        <Box
          borderColor={stylesEl.current.borderColor}
          borderWidth={2}
          py={'6'}
          px={'1'}
          borderRadius={'10'}
          width={'40%'} mt={'6'} marginLeft={'50px'}
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
                <Tr>
                  <Td fontSize={'15px'}>6.59299319</Td>
                  <Td>47658.32</Td>
                </Tr>
                <Tr>
                  <Td fontSize={'15px'}>6.59299319</Td>
                  <Td>47658.32</Td>
                </Tr>
                <Tr>
                  <Td fontSize={'15px'}>6.59299319</Td>
                  <Td>47658.32</Td>
                </Tr>

              </Tbody>
            </Table>
          </Box>
        </Box>
        <Box
          borderColor={stylesEl.current.borderColor}
          borderWidth={2}
          py={'6'}
          px={'1'}
          borderRadius={'10'}
          width={'60%'} mt={'6'} marginLeft={'50px'}
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
                <Tr>
                  <Td fontSize={'15px'}>6.59299319</Td>
                  <Td>47658.32</Td>
                </Tr>
                <Tr>
                  <Td fontSize={'15px'}>6.59299319</Td>
                  <Td>47658.32</Td>
                </Tr>
                <Tr>
                  <Td fontSize={'15px'}>6.59299319</Td>
                  <Td>47658.32</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>

      <Box
        borderColor={stylesEl.current.borderColor}
        borderWidth={2}
        py={'6'}
        px={'8'}
        borderRadius={'10'}
        width={'100%'} mt={'6'} marginLeft={'50px'}

      >
        <Text fontSize={'4xl'}>Numerical Data</Text>
        <Text fontSize={'18px'}>Showcasing the price of {crypto}</Text>
        {data != null ? (
          <div style={{ backgroundColor: 'white', marginTop: '18px', borderRadius: 10 }}>
            <TypeChooser>
              {(type: any) => <Chart type={'svg'} data={data} />}
            </TypeChooser>
          </div>
        ) : <p>No data...</p>}
      </Box>
    </Flex>
  );
};

export default CryptoNumerical;