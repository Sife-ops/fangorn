import axios from "axios";
import { headers, url } from "./constant";

const commandId = process.argv[2];

axios
  .delete(`${url}/${commandId}`, {
    headers: headers,
  })
  .then((e) => {
    // console.log(e.status, e.data);
    console.log(e);
  });
