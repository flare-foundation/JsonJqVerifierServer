import { ChainType, MccCreate } from '@flarenetwork/mcc';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// export type VerifierTypeOptions = 'doge' | 'btc' | 'xrp';

export interface IConfig {
  // server port (PORT)
  port: number;
  // comma separated list of API keys (API_KEYS)
  api_keys: string[];

  db: DatabaseConfig;

  verifierConfig: VerifierServerConfig;

  mccCreate: MccCreate;

  typeOrmModuleOptions: TypeOrmModuleOptions;

  isTestnet: boolean;
}

interface DatabaseConfig {
  /**
   * Database server address (host)
   */
  host: string; // "localhost";

  /**
   * Database name.
   */
  database: string; // "database";

  /**
   * Database server port number.
   */
  port: number; // 3306

  /**
   * Database user name.
   */
  username: string; //"username";

  /**
   * Database user password.
   */
  password: string; //"password";
}

export interface VerifierServerConfig {
  verifierType: ChainType;

  /**
   * The page size for indexer API queries when listing outputs
   */
  indexerServerPageLimit: number;

  /**
   * The number of confirmations required for a transaction to be considered confirmed
   */
  numberOfConfirmations: number;
}

export default () => {
  const api_keys = process.env.API_KEYS?.split(',') || [''];
  const verifier_type = extractVerifierType();
  const isTestnet = process.env.TESTNET == 'true';

  const db = {
    database: process.env.DB_DATABASE || 'database',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT) || 8080,
    username: process.env.DB_USERNAME || 'username',
    password: process.env.DB_PASSWORD || 'password',
  };

  const verifierConfig: VerifierServerConfig = {
    verifierType: verifier_type,
    numberOfConfirmations: parseInt(process.env.NUMBER_OF_CONFIRMATIONS || '6'), // TODO: This should be read from db state
    indexerServerPageLimit: parseInt(
      process.env.INDEXER_SERVER_PAGE_LIMIT || '100',
    ),
  };

  const config: IConfig = {
    port: parseInt(process.env.PORT || '3120'),
    api_keys,
    verifierConfig,
    db: db,
    mccCreate: {
      url: process.env.UNDERLYING_NODE_URL || 'url',
      username: process.env.UNDERLYING_NODE_USER || 'user',
      password: process.env.UNDERLYING_NODE_PASS || 'pass',
    },
    typeOrmModuleOptions: {
      ...db,
      type: 'postgres', // TODO: If we ever use something other than postgres, we need to change this
      synchronize: false,
      migrationsRun: false,
      logging: false,
    },
    isTestnet,
  };
  return config;
};

export function extractVerifierType(): ChainType {
  const verifierType = process.env.VERIFIER_TYPE?.toLowerCase();
  switch (verifierType) {
    case 'doge':
      return ChainType.DOGE;
    case 'btc':
      return ChainType.BTC;
    case 'xrp':
      return ChainType.XRP;
    default:
      'other';
  }
}

export type SourceNames = 'DOGE' | 'BTC' | 'XRP' | 'WEB2';
export type AttestationTypeOptions =
  | 'AddressValidity'
  | 'BalanceDecreasingTransaction'
  | 'ConfirmedBlockHeightExists'
  | 'Payment'
  | 'ReferencedPaymentNonexistence';
