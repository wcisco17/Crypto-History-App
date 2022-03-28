import { loadDynamoDBClient } from '@crypto-aws/client';
// @ts-ignore
import inquirer from 'inquirer';
import { createCryptoItem } from './create-crypto.js';
import { S1FullCryptoName, S2FullCryptoName, S3FullCryptoName } from '@crypto-api/db/src/global.types';
import {
  createCommands,
  DynamoActionsConfiguration,
  IDynamoActionsConfiguration,
  TypesOfWrite
} from './inquirer-util.js';
import { createNumerical } from './create-numerical.js';
import { convertToUnixEpoch } from '@crypto-api/db/src/util.js';
import { createTextData } from './create-text-data.js';

(async () => {
  const commandActions: IDynamoActionsConfiguration[] = Object.values(DynamoActionsConfiguration);
  const client = await loadDynamoDBClient();

  // Select a command for Dynamo-DB
  const initCommands = await createCommands({
    type: 'list',
    message: 'Which [DynamoDB] commands should I excecute?',
    actions: commandActions
  });

  if ((initCommands as typeof DynamoActionsConfiguration).includes('write')) {
    const writeTypes = Object.values(TypesOfWrite);

    // Select insert for Partition key Write: New Coin [Profile] or [Timestamp]
    const typesOfWrite = await createCommands({
      type: 'list',
      message: 'Write New Coin OR Update Timestamp Key?',
      actions: writeTypes
    });

    let pickCoins: S1FullCryptoName[] = [
      'bitcoin', 'xrp', 'dogecoin', 'ethereum', 'bch', 'polygon', 'tether'
    ];

    /***
     * @type S1FullCryptoName
     * - go to type {S1FullCryptoName} to add more coins we can make it more generic later.
     * the default is 4 coins.
     * This Condition might not be necessary BUT can be extended futher as the application grows in popularity.
     */
    if ((typesOfWrite as typeof TypesOfWrite).includes('new-coin')) {
      const coinName: string = await createCommands({
        type: 'list',
        message: 'For which Coin?',
        actions: pickCoins
      });

      return createCryptoItem(client, (coinName as S1FullCryptoName));
    }

    // [Condition] Updates a Specifc Partition Key By adding a sort key with the [Prefix Timestamp_]
    if ((typesOfWrite as typeof TypesOfWrite).includes('time-stamp')) {
      const coinName: S1FullCryptoName = await createCommands({
        type: 'list',
        message: 'For which Coin?',
        actions: [...pickCoins]
      });

      let coinApi: S2FullCryptoName;
      let coinCompare: S3FullCryptoName;

      switch (coinName) {
        case 'bitcoin':
          coinApi = 'BITSTAMP_SPOT_BTC_USD';
          coinCompare = 'BTC';
          break;
        case 'xrp':
          coinApi = 'BITSTAMP_SPOT_XRP_USD';
          coinCompare = 'XRP';
          break;
        case 'dogecoin':
          coinApi = 'BITSTAMP_SPOT_DOGE_USD';
          coinCompare = 'DOGE';
          break;
        case 'ethereum':
          coinApi = 'BITSTAMP_SPOT_ETH_USD';
          coinCompare = 'ETH';
          break;

        case 'bch':
          coinApi = 'BITSTAMP_SPOT_BCH_USD';
          coinCompare = 'BCH';
          break;
        case 'polygon':
          coinApi = 'BITSTAMP_SPOT_POLYGON_USD';
          coinCompare = 'POLYGON';
          break;
      }

      let amount: string | number = await createCommands({
        type: 'input',
        message: 'How many would you like to PUT? [condition: every number is added per hour]'
      });

      // 2022-03-07T09:30:00.fffffff
      const date: string = await createCommands({
        type: 'input',
        message: 'Which date would you like to PULL your data from? [REQUIRED FORMAT: yyyy-MM-ddTHH:mm:ss.fffffff]'
      });

      const hour: string = await createCommands({
        type: 'input',
        message: 'Which hour should we start from?'
      });

      let hourIdx = 0;
      amount = Number(amount);

      let min: number = 10;
      let endMin: number = 60;

      while (hourIdx < amount && min < endMin) {
        let time: string;

        let minText: string;
        let hourText: string;
        let currentTime: number = Number(hour) + hourIdx;

        if (currentTime < 10) hourText = `0${currentTime}`;
        else if (currentTime >= 10) hourText = `${currentTime}`;

        if (min < 10) minText = `0${min}`;
        else if (min >= 10) minText = `${min}`;

        time = `${date}T${hourText}:${minText}:00`;

        const convertTime = convertToUnixEpoch(time);

        // const numerical = await createNumerical({
        //     client,
        //     coinName,
        //     coinapi: coinApi,
        //     coinCompare,
        //     limit: (amount.toString() as string),
        //     time,
        //     hour: (hour as string),
        //     convertTime
        //   }
        // );

        const text_data = await createTextData(
          client,
          coinName,
          (amount.toString() as string),
          date,
          (hour as string),
          convertTime,
          coinCompare
        );

        Promise.all([text_data]).then(([data]) => {
          console.log(
            `${hourIdx} Successfully added both [numericalResult & testResult] with dates: ${time}`
          );
        }).catch(console.log);

        min++;

        if (min == endMin) {
          min = 0;
          hourIdx++;
        }
      }
    }
  }
})();







