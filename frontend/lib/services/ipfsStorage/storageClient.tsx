import axios from "axios";

const nftheader = { Authorization: `Bearer ${process.env.NFT_API_KEY}` };

const nftstorageClient = axios.create({
  baseURL: `${process.env.NFT_URL}`,
  headers: nftheader,
});

export { nftstorageClient };
