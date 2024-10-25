import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IJsonApi_Request,
  IJsonApi_Response,
  IJsonApi_ResponseBody,
} from 'generated/dto/IJsonApi.dto';
import { IConfig } from 'src/config/configuration';
import {
  BaseVerifierService,
  IVerificationServiceConfig,
} from 'src/services/common/verifier-base.service';
import { Web3 } from 'web3';
import {
  AttestationResponse,
  AttestationResponseStatus,
} from '../../src/dtos/generic/generic.dto';

@Injectable()
export class IJsonApiVerifierService extends BaseVerifierService<
  IJsonApi_Request,
  IJsonApi_Response
> {
  constructor(protected configService: ConfigService<IConfig>) {
    const config: IVerificationServiceConfig = {
      source: 'WEB2', //CONFIGURE THIS
      attestationName: 'JsonApi',
    };
    super(configService, config);
  }

  protected async verifyRequest(
    fixedRequest: IJsonApi_Request,
  ): Promise<AttestationResponse<IJsonApi_Response>> {
    const axios = require('axios');
    const jq = require('node-jq');

    const url = fixedRequest.requestBody.url;
    const jqScheme = fixedRequest.requestBody.postprocessJq;
    const abiSign = JSON.parse(fixedRequest.requestBody.abi_signature);

    let responseData;
    let dataJq;

    const result = new AttestationResponse<IJsonApi_Response>();

    // axios get data
    await axios
      .get(url)
      .then((response) => {
        responseData = response['data'];
        console.log(responseData);
      })
      .catch((error) => {
        console.error(error);
        result.status = AttestationResponseStatus.INVALID;
        return result;
      });
    // jq transform
    await jq
      .run(jqScheme, responseData, { input: 'json' })
      .then((output) => {
        dataJq = JSON.parse(output);
      })
      .catch((error) => {
        console.error(error);
        result.status = AttestationResponseStatus.INVALID;
        return result;
      });

    console.log(abiSign);
    console.log(dataJq);

    // encode info
    const web3 = new Web3();
    const res1 = web3.eth.abi.encodeParameter(abiSign, dataJq);

    // construct correct data types
    const responseBodyParams: Required<IJsonApi_ResponseBody> = {
      abi_encoded_data: res1,
    };
    const responseBodyObj = new IJsonApi_ResponseBody(responseBodyParams);

    const attResponseParams: Required<IJsonApi_Response> = {
      attestationType: fixedRequest.attestationType,
      sourceId: fixedRequest.sourceId,
      votingRound: '0',
      lowestUsedTimestamp: '0xffffffffffffffff', // Irrelevant for this attestation type
      requestBody: fixedRequest.requestBody,
      responseBody: responseBodyObj,
    };
    const attResponse = new IJsonApi_Response(attResponseParams);

    // construct final result
    result.response = attResponse;
    result.status = AttestationResponseStatus.VALID;
    return result;
  }
}
