import { NetworkConnector } from './NetworkConnector'
import { Web3Provider } from '@ethersproject/providers'
import { ChainId, SUPPORTED_NETWORKS } from '../constants/chain'

const MainNetwork = new NetworkConnector({
  urls: {
    [ChainId.MAINNET]: 'https://mainnet.infura.io/v3/3f6f55ba1ee540328662f8496ddbc228'
  }
})
const RinkebyNetwork = new NetworkConnector({
  urls: {
    [ChainId.RINKEBY]: 'https://rinkeby.infura.io/v3/ab440a3a67f74b6b8a0a8e8e13a76a52'
  }
})

export function getOtherNetworkLibrary(chainId: ChainId) {
  switch (chainId) {
    case ChainId.MAINNET:
      return new Web3Provider(MainNetwork.provider as any)
    case ChainId.RINKEBY:
      return new Web3Provider(RinkebyNetwork.provider as any)
    default:
      if (SUPPORTED_NETWORKS?.[chainId]?.rpcUrls.length) {
        const network = new NetworkConnector({
          urls: {
            [chainId]: SUPPORTED_NETWORKS[chainId]?.rpcUrls[0] || ''
          }
        })
        return new Web3Provider(network.provider as any)
      }
      return undefined
  }
}
