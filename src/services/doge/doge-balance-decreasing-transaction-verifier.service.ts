import {
  ChainType,
  DogeTransaction,
  MCC,
  MccCreate,
  UtxoMccCreate,
} from '@flarenetwork/mcc';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfig, VerifierServerConfig } from 'src/config/configuration';
import { DogeIndexedQueryManager } from 'src/indexed-query-manager/DogeIndexQueryManager';
import { IIndexedQueryManager } from 'src/indexed-query-manager/IIndexedQueryManager';
import { IndexedQueryManagerOptions } from 'src/indexed-query-manager/indexed-query-manager-types';
import { verifyBalanceDecreasingTransaction } from 'src/verification/generic-chain-verifications';
import { EntityManager } from 'typeorm';
import {
  AttestationResponseDTO_BalanceDecreasingTransaction_Response,
  BalanceDecreasingTransaction_Request,
  BalanceDecreasingTransaction_RequestNoMic,
  BalanceDecreasingTransaction_Response,
} from '../../dtos/attestation-types/BalanceDecreasingTransaction.dto';
import {
  EncodedRequestResponse,
  MicResponse,
} from '../../dtos/generic/generic.dto';
import { AttestationDefinitionStore } from '../../external-libs/AttestationDefinitionStore';
import {
  AttestationResponse,
  AttestationResponseStatus,
} from '../../external-libs/AttestationResponse';
// import { ExampleData } from '../../external-libs/interfaces';
import { ZERO_BYTES_32 } from '@flarenetwork/mcc';
import {
  MIC_SALT,
  encodeAttestationName,
  serializeBigInts,
} from '../../external-libs/utils';
import { getAttestationStatus } from '../../verification/attestation-types/attestation-types';

@Injectable()
export class DOGEBalanceDecreasingTransactionVerifierService {
  store: AttestationDefinitionStore;
  //   exampleData!: ExampleData<
  //     BalanceDecreasingTransaction_RequestNoMic,
  //     BalanceDecreasingTransaction_Request,
  //     BalanceDecreasingTransaction_Response
  //   >;

  //-$$$<start-constructor> Start of custom code section. Do not change this comment.

  client: MCC.DOGE;
  indexedQueryManager: IIndexedQueryManager;

  constructor(
    private configService: ConfigService<IConfig>,
    private manager: EntityManager,
  ) {
    this.store = new AttestationDefinitionStore('src/config/type-definitions');

    const mccCreate = this.configService.get<MccCreate>('mccCreate');
    const verifierConfig =
      this.configService.get<VerifierServerConfig>('verifierConfig');
    const numberOfConfirmations = verifierConfig.numberOfConfirmations;

    this.client = new MCC.DOGE(mccCreate as UtxoMccCreate);
    const options: IndexedQueryManagerOptions = {
      chainType: ChainType.DOGE,
      entityManager: this.manager,
      numberOfConfirmations: () => {
        return numberOfConfirmations;
      },
    };

    this.indexedQueryManager = new DogeIndexedQueryManager(options);
  }

  //-$$$<end-constructor> End of custom code section. Do not change this comment.

  async verifyRequestInternal(
    request:
      | BalanceDecreasingTransaction_Request
      | BalanceDecreasingTransaction_RequestNoMic,
  ): Promise<AttestationResponseDTO_BalanceDecreasingTransaction_Response> {
    if (
      request.attestationType !==
        encodeAttestationName('BalanceDecreasingTransaction') ||
      request.sourceId !==
        encodeAttestationName(
          (process.env.TESTNET == 'true' ? 'test' : '') + 'DOGE',
        )
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Attestation type and source id combination not supported: (${
            request.attestationType
          }, ${
            request.sourceId
          }). This source supports attestation type 'BalanceDecreasingTransaction' (${encodeAttestationName(
            'BalanceDecreasingTransaction',
          )}) and source id '${
            (process.env.TESTNET == 'true' ? 'test' : '') + 'DOGE'
          }' (${encodeAttestationName(
            (process.env.TESTNET == 'true' ? 'test' : '') + 'DOGE',
          )}).`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const fixedRequest = {
      ...request,
    } as BalanceDecreasingTransaction_Request;
    if (!fixedRequest.messageIntegrityCode) {
      fixedRequest.messageIntegrityCode = ZERO_BYTES_32;
    }

    return this.verifyRequest(fixedRequest);
  }

  async verifyRequest(
    fixedRequest: BalanceDecreasingTransaction_Request,
  ): Promise<AttestationResponseDTO_BalanceDecreasingTransaction_Response> {
    //-$$$<start-verifyRequest> Start of custom code section. Do not change this comment.

    const result = await verifyBalanceDecreasingTransaction(
      DogeTransaction,
      fixedRequest,
      this.indexedQueryManager,
      this.client,
    );
    return serializeBigInts({
      status: getAttestationStatus(result.status),
      response: result.response,
    }) as AttestationResponse<BalanceDecreasingTransaction_Response>;

    //-$$$<end-verifyRequest> End of custom code section. Do not change this comment.
  }

  public async verifyEncodedRequest(
    abiEncodedRequest: string,
  ): Promise<AttestationResponseDTO_BalanceDecreasingTransaction_Response> {
    const requestJSON =
      this.store.parseRequest<BalanceDecreasingTransaction_Request>(
        abiEncodedRequest,
      );
    const response = await this.verifyRequestInternal(requestJSON);
    return response;
  }

  public async prepareResponse(
    request: BalanceDecreasingTransaction_RequestNoMic,
  ): Promise<AttestationResponseDTO_BalanceDecreasingTransaction_Response> {
    const response = await this.verifyRequestInternal(request);
    return response;
  }

  public async mic(
    request: BalanceDecreasingTransaction_RequestNoMic,
  ): Promise<MicResponse> {
    const result = await this.verifyRequestInternal(request);
    if (result.status !== AttestationResponseStatus.VALID) {
      return new MicResponse({ status: result.status });
    }
    const response = result.response;
    if (!response) return new MicResponse({ status: result.status });
    return new MicResponse({
      status: AttestationResponseStatus.VALID,
      messageIntegrityCode:
        this.store.attestationResponseHash<BalanceDecreasingTransaction_Response>(
          response,
          MIC_SALT,
        ),
    });
  }

  public async prepareRequest(
    request: BalanceDecreasingTransaction_RequestNoMic,
  ): Promise<EncodedRequestResponse> {
    const result = await this.verifyRequestInternal(request);
    if (result.status !== AttestationResponseStatus.VALID) {
      return new EncodedRequestResponse({ status: result.status });
    }
    const response = result.response;

    if (!response) return new EncodedRequestResponse({ status: result.status });
    const newRequest = {
      ...request,
      messageIntegrityCode:
        this.store.attestationResponseHash<BalanceDecreasingTransaction_Response>(
          response,
          MIC_SALT,
        )!,
    } as BalanceDecreasingTransaction_Request;

    return new EncodedRequestResponse({
      status: AttestationResponseStatus.VALID,
      abiEncodedRequest: this.store.encodeRequest(newRequest),
    });
  }
}
