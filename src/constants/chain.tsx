import { Chain } from 'models/chain'
import { ReactComponent as ETH } from 'assets/svg/eth_logo.svg'
import EthUrl from 'assets/svg/eth_logo.svg'
import BSCUrl from 'assets/svg/binance.svg'
import { ReactComponent as BSC } from 'assets/svg/binance.svg'
import BigNumberjs from 'bignumber.js'

export function numberToHex(number: number) {
  return '0x' + new BigNumberjs(number).toString(16)
}

export enum ChainId {
  MAINNET = 1,
  GÖRLI = 5,
  SEPOLIA = 11155111,
  BSC = 56,
  BSCTEST = 97
}

export const NETWORK_CHAIN_ID: ChainId = process.env.REACT_APP_CHAIN_ID
  ? parseInt(process.env.REACT_APP_CHAIN_ID)
  : ChainId.BSC

export const SUPPORT_NETWORK_CHAIN_IDS: ChainId[] = process.env.REACT_APP_CHAIN_IDS
  ? process.env.REACT_APP_CHAIN_IDS.split(',').map(v => Number(v) as ChainId)
  : [ChainId.BSC]

export const AllChainList = [
  {
    icon: <ETH />,
    logo: EthUrl,
    symbol: 'ETH',
    name: 'ETH Mainnet',
    id: ChainId.MAINNET,
    hex: numberToHex(ChainId.MAINNET)
  },
  {
    icon: <ETH />,
    logo: EthUrl,
    symbol: 'GÖRLI',
    name: 'GÖRLI Testnet',
    id: ChainId.GÖRLI,
    hex: numberToHex(ChainId.GÖRLI)
  },
  {
    icon: <BSC height={20} width={20} />,
    logo: BSCUrl,
    symbol: 'BSC',
    name: 'BNB Chain',
    id: ChainId.BSC,
    hex: numberToHex(ChainId.BSC)
  },
  {
    icon: <BSC />,
    logo: BSCUrl,
    symbol: 'BSCTEST',
    name: 'BNB Testnet',
    id: ChainId.BSCTEST,
    hex: numberToHex(ChainId.BSCTEST)
  },
  {
    icon: <ETH />,
    logo: EthUrl,
    symbol: 'Sepolia',
    name: 'Sepolia',
    id: ChainId.SEPOLIA,
    hex: numberToHex(ChainId.SEPOLIA)
  }
]

export const ChainList = AllChainList.filter(v => SUPPORT_NETWORK_CHAIN_IDS.includes(v.id))

export const ChainListMap: {
  [key in ChainId]?: { icon: JSX.Element; link?: string; selectedIcon?: JSX.Element } & Chain
} = ChainList.reduce((acc, item) => {
  acc[item.id] = item
  return acc
}, {} as any)

function getChainIdHex(chainId: ChainId) {
  return ChainListMap[chainId]?.hex || '0x1'
}

export const SUPPORTED_NETWORKS: {
  [chainId in ChainId]?: {
    chainId: string
    chainName: string
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
      logo?: string
    }
    rpcUrls: string[]
    blockExplorerUrls: string[]
  }
} = {
  [ChainId.MAINNET]: {
    chainId: getChainIdHex(ChainId.MAINNET),
    chainName: ChainListMap[ChainId.MAINNET]?.name || '',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      logo: ChainListMap[ChainId.MAINNET]?.logo
    },
    rpcUrls: ['https://mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://etherscan.com']
  },
  [ChainId.GÖRLI]: {
    chainId: getChainIdHex(ChainId.GÖRLI),
    chainName: ChainListMap[ChainId.GÖRLI]?.name || '',
    nativeCurrency: {
      name: 'GoerliETH',
      symbol: 'ETH',
      decimals: 18,
      logo: ChainListMap[ChainId.GÖRLI]?.logo
    },
    rpcUrls: ['https://goerli.infura.io/v3/'],
    blockExplorerUrls: ['https://goerli.etherscan.io/']
  },
  [ChainId.SEPOLIA]: {
    chainId: getChainIdHex(ChainId.SEPOLIA),
    chainName: ChainListMap[ChainId.SEPOLIA]?.name || '',
    nativeCurrency: {
      name: 'SepoliaETH',
      symbol: 'ETH',
      decimals: 18,
      logo: ChainListMap[ChainId.SEPOLIA]?.logo
    },
    rpcUrls: ['https://sepolia.infura.io/v3/'],
    blockExplorerUrls: ['https://sepolia.etherscan.io/']
  },
  [ChainId.BSC]: {
    chainId: getChainIdHex(ChainId.BSC),
    chainName: ChainListMap[ChainId.BSC]?.name || '',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
      logo: ChainListMap[ChainId.BSC]?.logo
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com']
  },
  [ChainId.BSCTEST]: {
    chainId: getChainIdHex(ChainId.BSCTEST),
    chainName: ChainListMap[ChainId.BSCTEST]?.name || '',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
      logo: ChainListMap[ChainId.BSCTEST]?.logo
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com/']
  }
}
