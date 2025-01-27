import { Connection, DeployResult } from "jsforce";
import { delay } from '../shared/delay';


export async function checkRetrievalStatus(conn: Connection, retrievedId: string) {
    let metadata_result

    while (true) {
      await conn.metadata.checkRetrieveStatus(retrievedId, function (error, result) {
        if (error) { return console.error(error); }
        metadata_result = result
      });

      if (metadata_result.done === "false" ) {

        console.log(`Polling for Retrieval Status`)
        await delay(5000);
      }
      else {
        //this.ux.logJson(metadata_result);
        break;
      }

    }
    return metadata_result;
  }


