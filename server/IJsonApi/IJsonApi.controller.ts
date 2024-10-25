import { Body, Controller, HttpCode, Post } from '@nestjs/common';
    import { ApiTags } from '@nestjs/swagger';
    import {
      IJsonApi_Request,
       IJsonApi_Response,
    } from 'generated/dto/IJsonApi.dto';
    import { BaseVerifierController } from 'src/controllers/base/verifier-base.controller';
    import { AttestationResponse } from 'src/dtos/generic/generic.dto';
    import { IJsonApiVerifierService } from './IJsonApi.service';
    
    @ApiTags('IJsonApi')
    @Controller('IJsonApi')
    export class IJsonApiVerifierController extends BaseVerifierController<
       IJsonApi_Request,
       IJsonApi_Response
    > {
      constructor(protected readonly verifierService: IJsonApiVerifierService) {
        super();
      }

    /**
    * Tries to verify attestation request (given in JSON) without checking message integrity code, and if successful it returns response.
    * @param prepareResponseBody
    * @returns
    */
    @HttpCode(200)
    @Post('prepareResponse') 
    async prepareResponse(@Body() body: IJsonApi_Request): Promise<AttestationResponse<IJsonApi_Response>> {
      return this.verifierService.prepareResponse(body);
    }
}
