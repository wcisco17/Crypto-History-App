import type { AllSyntheticData, SyntheticData as SyntheticDataType } from '../utils/global.types';
import { TypeChooser } from 'react-stockcharts/lib/helper';
import { Box, Text } from '@chakra-ui/react';
import ChartGrid from './charts/ChartGrid';
import moment from 'moment';

type ISyntheticDataProps = {
  stylesEl: {
    current: {
      backgroundColor: string
      borderColor: string
      textColor: string;
    }
  }
  pureSyntheticData: SyntheticDataType[];
  allSyntheticData: AllSyntheticData;
}

function transformValues(start: string, value: number[], pureSyntheticData: SyntheticDataType[]) {
  let val = [];

  for (let i = 0; i < value.length; i++) {
    let va = value[i];

    val.push({
      date: moment(start).add(i, 'hours').toDate(),
      syntheticData: {
        value: va,
      },
      predictedData: {
        value: undefined,
      }
    });
  }

  for (let i = 0; i < pureSyntheticData.length;i++) {
    let pure = pureSyntheticData[i]?.Mean.N;

    val.push({
      date: moment(start).add(value.length + i, 'hours').toDate(),
      syntheticData: {
        value: undefined,
      },
      predictedData: {
        value: pure,
      }
    })
  }

  return val;
}

const SyntheticData = ({ pureSyntheticData, stylesEl, allSyntheticData }: ISyntheticDataProps) => {
  const target = transformValues(allSyntheticData.start, allSyntheticData.target, pureSyntheticData);
  return (
    <Box
      borderColor={stylesEl.current.borderColor}
      borderWidth={2}
      py={'6'}
      px={'12'}
      borderRadius={'10'}
      height={'100%'}
      width={'100%'} mt={'12'} marginLeft={'50px'}
    >
      <Text fontSize={'4xl'}>Synthetic Analysis</Text>
      <Text fontSize={'18px'}>Performing Synthetic analysis using DPAR </Text>
      <Text fontSize={'2xl'}>ORANGE IS THE SYNTHETIC DATA</Text>
      <Text fontSize={'2xl'}>GREEN IS THE PREDICTION</Text>
      <Box mt={'12'} backgroundColor={'white'} borderRadius={'10'}>
        <TypeChooser>
          {(type: any) => <ChartGrid data={target} />}
        </TypeChooser>
      </Box>
    </Box>
  );
};

export default SyntheticData;