
//////////////////////////////////////////////////////////////////////////////////////////
/////// THIS CODE IS AUTOGENERATED. DO NOT CHANGE!!!                             /////////
//////////////////////////////////////////////////////////////////////////////////////////
import { ApiProperty, OmitType } from "@nestjs/swagger";
      import { Type } from "class-transformer";
      import { Validate, IsBoolean, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";

      

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// CUSTOM VALIDATORS ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Validator constraint if the given value is a number or 0x-prefixed hexadecimal string.
 */
@ValidatorConstraint({ name: "unsigned-int", async: false })
class IsUnsignedIntLike implements ValidatorConstraintInterface {
  /**
   * Validates if the given value is a string of decimal unsigned number or 0x-prefixed hexadecimal string.
   * @param text
   * @param args
   * @returns
   */
  validate(text: any, _args: ValidationArguments) {
    return typeof text === "string" && (/^0x[0-9a-fA-F]+$/i.test(text) || /^[0-9]+$/i.test(text));
  }

  /**
   * Returns the default error message template.
   * @param args
   * @returns
   */
  defaultMessage(_args: ValidationArguments) {
    return "($property) value ($value) is not a decimal number in string or 0x-prefixed hexadecimal string";
  }
}

/**
 * Validator constraint if the given value is a number or 0x-prefixed hexadecimal string.
 */
@ValidatorConstraint({ name: "signed-int", async: false })
class IsSignedIntLike implements ValidatorConstraintInterface {
  /**
   * Validates if the given value is a number or 0x-prefixed hexadecimal string.
   * @param text
   * @param args
   * @returns
   */
  validate(text: any, _args: ValidationArguments) {
    return typeof text === "string" && (/^-?0x[0-9a-fA-F]+$/i.test(text) || /^-?[0-9]+$/i.test(text));
  }

  /**
   * Returns the default error message template.
   * @param args
   * @returns
   */
  defaultMessage(_args: ValidationArguments) {
    return "($property) value ($value) is not a signed decimal integer in string or signed 0x-prefixed hexadecimal string";
  }
}

/**
 * Validator constraint if the given value is a 0x-prefixed hexadecimal string representing 32 bytes.
 */
@ValidatorConstraint({ name: "hash-32", async: false })
class IsHash32 implements ValidatorConstraintInterface {
  /**
   * Validates if the given value is a 0x-prefixed hexadecimal string representing 32 bytes.
   * @param text
   * @param args
   * @returns
   */
  validate(text: any, _args: ValidationArguments) {
    return typeof text === "string" && /^0x[0-9a-f]{64}$/i.test(text);
  }

  /**
   * Returns the default error message template.
   * @param args
   * @returns
   */
  defaultMessage(_args: ValidationArguments) {
    return "($property) value ($value) is not 0x-prefixed hexadecimal string representing 32 bytes";
  }
}


/**
 * Validator constraint if the given value is a 0x-prefixed hexadecimal string
 */
@ValidatorConstraint({ name: "hash-0x", async: false })
class Is0xHex implements ValidatorConstraintInterface {
  /**
   * Validates if the given value is a 0x-prefixed hexadecimal string 
   * @param text
   * @param args
   * @returns
   */
  validate(text: any, _args: ValidationArguments) {
    return typeof text === "string" && /^0x[0-9a-f]+$/i.test(text);
  }

  /**
   * Returns the default error message template.
   * @param args
   * @returns
   */
  defaultMessage(_args: ValidationArguments) {
    return "($property) value ($value) is not 0x-prefixed hexadecimal string";
  }
}


/**
 * Validator constraint if the given value is an EVM address, hence 0x-prefixed hexadecimal string representing 20 bytes.
 */
@ValidatorConstraint({ name: "evm-address", async: false })
class IsEVMAddress implements ValidatorConstraintInterface {
  /**
   * Validates if the given value is an EVM address, hence 0x-prefixed hexadecimal string representing 20 bytes.
   * @param text
   * @param args
   * @returns
   */
  validate(text: any, _args: ValidationArguments) {
    return typeof text === "string" && /^0x[0-9a-f]{40}$/i.test(text);
  }

  /**
   * Returns the default error message template.
   * @param args
   * @returns
   */
  defaultMessage(_args: ValidationArguments) {
    return "($property) value ($value) is not 0x-prefixed hexadecimal string representing 20 bytes (EVM address)";
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// DTOs /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Attestation status
 */
export enum AttestationResponseStatus {
    /**
     * Attestation request is valid.
     */
    VALID = "VALID",
    /**
     * Attestation request is invalid.
     */
    INVALID = "INVALID",
    /**
     * Attestation request cannot be confirmed neither rejected by the verifier at the moment.
     */
    INDETERMINATE = "INDETERMINATE",
}


  /**
  * Attestation response for specific attestation type (flattened)
  */
  export class AttestationResponseDTO_IJsonApi_Response {
    constructor(params: Required<AttestationResponseDTO_IJsonApi_Response>) {
        Object.assign(this, params);
    }

    status: AttestationResponseStatus;

    response?: IJsonApi_Response;
  }
  


export class IJsonApi_ResponseBody {
         constructor(params: Required<IJsonApi_ResponseBody>) {
            Object.assign(this, params);
          }         
   
      /**
* ABI encoded data
*/
      @Validate(Is0xHex)
      @ApiProperty({description: `ABI encoded data`, example: "0x1234abcd"})
abi_encoded_data: string;
}
export class IJsonApi_RequestBody {
         constructor(params: Required<IJsonApi_RequestBody>) {
            Object.assign(this, params);
          }         
   
      /**
* URL of the data source
*/
      @ApiProperty({description: `URL of the data source`, example: "Example string"})
url: string;

      /**
* jq filter to postprocess the data
*/
      @ApiProperty({description: `jq filter to postprocess the data`, example: "Example string"})
postprocessJq: string;

      /**
* ABI signature of the data
*/
      @ApiProperty({description: `ABI signature of the data`, example: "Example string"})
abi_signature: string;
}
export class IJsonApi_Request {
         constructor(params: Required<IJsonApi_Request>) {
            Object.assign(this, params);
          }         
   
      /**
* ID of the attestation type.
*/
      @Validate(IsHash32)
      @ApiProperty({description: `ID of the attestation type.`, example: "0x494a736f6e417069000000000000000000000000000000000000000000000000"})
attestationType: string;

      /**
* ID of the data source.
*/
      @Validate(IsHash32)
      @ApiProperty({description: `ID of the data source.`, example: "0x4254430000000000000000000000000000000000000000000000000000000000"})
sourceId: string;

      /**
* `MessageIntegrityCode` that is derived from the expected response.
*/
      @Validate(IsHash32)
      @ApiProperty({description: `'MessageIntegrityCode' that is derived from the expected response.`, example: "0x0000000000000000000000000000000000000000000000000000000000000000"})
messageIntegrityCode: string;

   /**
* Data defining the request. Type (struct) and interpretation is determined
*/
   @ValidateNested()
        @Type(() => IJsonApi_RequestBody)
        @IsDefined()
@IsNotEmptyObject()
   @IsObject()   
  
   @ApiProperty({description: `Data defining the request. Type (struct) and interpretation is determined`})
requestBody: IJsonApi_RequestBody;
}
export class IJsonApi_Response {
         constructor(params: Required<IJsonApi_Response>) {
            Object.assign(this, params);
          }         
   
      /**
* Extracted from the request.
*/
      @Validate(IsHash32)
      @ApiProperty({description: `Extracted from the request.`, example: "0x494a736f6e417069000000000000000000000000000000000000000000000000"})
attestationType: string;

      /**
* Extracted from the request.
*/
      @Validate(IsHash32)
      @ApiProperty({description: `Extracted from the request.`, example: "0x4254430000000000000000000000000000000000000000000000000000000000"})
sourceId: string;

      /**
* The ID of the State Connector round in which the request was considered.
*/
      @Validate(IsUnsignedIntLike)
      @ApiProperty({description: `The ID of the State Connector round in which the request was considered.`, example: "123"})
votingRound: string;

      /**
* The lowest timestamp used to generate the response.
*/
      @Validate(IsUnsignedIntLike)
      @ApiProperty({description: `The lowest timestamp used to generate the response.`, example: "123"})
lowestUsedTimestamp: string;

   /**
* Extracted from the request.
*/
   @ValidateNested()
        @Type(() => IJsonApi_RequestBody)
        @IsDefined()
@IsNotEmptyObject()
   @IsObject()   
  
   @ApiProperty({description: `Extracted from the request.`})
requestBody: IJsonApi_RequestBody;

   /**
* Data defining the response. The verification rules for the construction
*/
   @ValidateNested()
        @Type(() => IJsonApi_ResponseBody)
        @IsDefined()
@IsNotEmptyObject()
   @IsObject()   
  
   @ApiProperty({description: `Data defining the response. The verification rules for the construction`})
responseBody: IJsonApi_ResponseBody;
}
export class IJsonApi_Proof {
         constructor(params: Required<IJsonApi_Proof>) {
            Object.assign(this, params);
          }         
   
      /**
* Merkle proof corresponding to the attestation response.
*/
      @Validate(IsHash32, {each: true})
      @ApiProperty({description: `Merkle proof corresponding to the attestation response.`, example: ["0x0000000000000000000000000000000000000000000000000000000000000000"]})
merkleProof: string[];

   /**
* Attestation response.
*/
   @ValidateNested()
        @Type(() => IJsonApi_Response)
        @IsDefined()
@IsNotEmptyObject()
   @IsObject()   
  
   @ApiProperty({description: `Attestation response.`})
data: IJsonApi_Response;
}

export class IJsonApi_RequestNoMic extends OmitType<IJsonApi_Request, "messageIntegrityCode">(IJsonApi_Request, ['messageIntegrityCode'] as const) {}

