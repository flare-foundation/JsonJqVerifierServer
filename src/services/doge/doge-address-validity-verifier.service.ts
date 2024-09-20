import { Injectable } from '@nestjs/common';
import { BaseAddressValidityVerifierService } from '../common/address-validity-verifier-base.service';
import { AddressValidity_ResponseBody } from 'src/dtos/attestation-types/AddressValidity.dto';
import { VerificationResponse } from 'src/verification/verification-utils';
import { verifyAddressDOGE } from 'src/verification/address-validity/address-validity-doge';

@Injectable()
export class DOGEAddressValidityVerifierService extends BaseAddressValidityVerifierService {
  verifyAddress(
    address: string,
    testnet: boolean,
  ): VerificationResponse<AddressValidity_ResponseBody> {
    return verifyAddressDOGE(address, testnet);
  }
}
