import { Connection, clusterApiUrl } from '@solana/web3.js'

let connection: Connection | null = null

export function getConnection(): Connection {
  if (!connection) {
    const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl('devnet')
    connection = new Connection(rpcUrl, 'confirmed')
  }
  return connection
}
