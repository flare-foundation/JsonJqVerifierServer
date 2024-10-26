/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  IJsonApiTemporary,
  IJsonApiTemporaryInterface,
} from "../IJsonApiTemporary";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32[]",
            name: "merkleProof",
            type: "bytes32[]",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "attestationType",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "sourceId",
                type: "bytes32",
              },
              {
                internalType: "uint64",
                name: "votingRound",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "lowestUsedTimestamp",
                type: "uint64",
              },
              {
                components: [
                  {
                    internalType: "string",
                    name: "url",
                    type: "string",
                  },
                  {
                    internalType: "string",
                    name: "postprocessJq",
                    type: "string",
                  },
                  {
                    internalType: "string",
                    name: "abi_signature",
                    type: "string",
                  },
                ],
                internalType: "struct IJsonApi.RequestBody",
                name: "requestBody",
                type: "tuple",
              },
              {
                components: [
                  {
                    internalType: "bytes",
                    name: "abi_encoded_data",
                    type: "bytes",
                  },
                ],
                internalType: "struct IJsonApi.ResponseBody",
                name: "responseBody",
                type: "tuple",
              },
            ],
            internalType: "struct IJsonApi.Response",
            name: "data",
            type: "tuple",
          },
        ],
        internalType: "struct IJsonApi.Proof",
        name: "_proof",
        type: "tuple",
      },
    ],
    name: "proof",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "attestationType",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "sourceId",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "messageIntegrityCode",
            type: "bytes32",
          },
          {
            components: [
              {
                internalType: "string",
                name: "url",
                type: "string",
              },
              {
                internalType: "string",
                name: "postprocessJq",
                type: "string",
              },
              {
                internalType: "string",
                name: "abi_signature",
                type: "string",
              },
            ],
            internalType: "struct IJsonApi.RequestBody",
            name: "requestBody",
            type: "tuple",
          },
        ],
        internalType: "struct IJsonApi.Request",
        name: "_request",
        type: "tuple",
      },
    ],
    name: "request",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "attestationType",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "sourceId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "votingRound",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "lowestUsedTimestamp",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "string",
                name: "url",
                type: "string",
              },
              {
                internalType: "string",
                name: "postprocessJq",
                type: "string",
              },
              {
                internalType: "string",
                name: "abi_signature",
                type: "string",
              },
            ],
            internalType: "struct IJsonApi.RequestBody",
            name: "requestBody",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "bytes",
                name: "abi_encoded_data",
                type: "bytes",
              },
            ],
            internalType: "struct IJsonApi.ResponseBody",
            name: "responseBody",
            type: "tuple",
          },
        ],
        internalType: "struct IJsonApi.Response",
        name: "_response",
        type: "tuple",
      },
    ],
    name: "response",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610163806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063088c0e4f146100465780637c8ad5fd14610059578063fd8f604314610067575b600080fd5b610057610054366004610075565b50565b005b6100576100543660046100b7565b6100576100543660046100f2565b60006020828403121561008757600080fd5b813567ffffffffffffffff81111561009e57600080fd5b8201604081850312156100b057600080fd5b9392505050565b6000602082840312156100c957600080fd5b813567ffffffffffffffff8111156100e057600080fd5b8201608081850312156100b057600080fd5b60006020828403121561010457600080fd5b813567ffffffffffffffff81111561011b57600080fd5b820160c081850312156100b057600080fdfea264697066735822122032ed51af8ffeefa3ff955a3c2eb34f95db87195840f9de847b0b4bc5e2e3580964736f6c63430008140033";

type IJsonApiTemporaryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: IJsonApiTemporaryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class IJsonApiTemporary__factory extends ContractFactory {
  constructor(...args: IJsonApiTemporaryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      IJsonApiTemporary & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): IJsonApiTemporary__factory {
    return super.connect(runner) as IJsonApiTemporary__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): IJsonApiTemporaryInterface {
    return new Interface(_abi) as IJsonApiTemporaryInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IJsonApiTemporary {
    return new Contract(address, _abi, runner) as unknown as IJsonApiTemporary;
  }
}
