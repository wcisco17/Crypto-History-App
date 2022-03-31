import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { TypeChooser } from 'react-stockcharts/lib/helper';
import ChartHorizontal from './charts/ChartHorizontal';
import { NewsAPI, SentimentAnalysi } from '../utils/global.types';
import moment from 'moment';

type ICryptoTextData = {
  stylesEl: {
    current: {
      backgroundColor: string
      borderColor: string
      textColor: string;
    }
  }
  crypto: string
  newsAPI: NewsAPI[];
  sentimentAnalysis: SentimentAnalysi[]
}

const CryptoTextData = ({ stylesEl, crypto, newsAPI, sentimentAnalysis }: ICryptoTextData) => {
  return (
    <Flex>
      <Box
        borderColor={stylesEl.current.borderColor}
        borderWidth={2}
        py={'6'}
        height={'700px'}
        overflow={'auto'}
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
              {
                newsAPI.map((news, key) => {
                  const date = moment(Number(news.ArticleTimeStamp.N) * 1000).toDate().toString();
                  return (
                    <Tr key={key}>
                      <Td fontSize={'18px'}>{news.CryptoSymbolID.S}</Td>
                      <Td fontSize={'18px'}>{date}</Td>
                      <Td>{news.Content.S}</Td>
                    </Tr>
                  );
                })
              }
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
        height={'100%'}
        width={'60%'} mt={'12'} marginLeft={'50px'}
      >
        <Text fontSize={'4xl'}>Sentiment Analysis</Text>
        <Text fontSize={'18px'}>Performing sentiment analysis for {crypto} news </Text>
        <Box mt={'12'} backgroundColor={'white'} borderRadius={'10'}>
          <TypeChooser>
            {(type: any) => <ChartHorizontal news={sentimentAnalysis} />}
          </TypeChooser>
        </Box>
      </Box>

    </Flex>
  );
};

export default CryptoTextData;